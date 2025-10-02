"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from 'next/navigation';

const SPRING = {
  stiffness: 0.05,
  damping: 0.95,
  maxDelta: 80,
  touchMult: 0.6,
  momentum: 0.98,
  precision: 0.01,
};

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);

  const target = useRef(0);
  const current = useRef(0);
  const velocity = useRef(0);

  const pathname = usePathname();

  useLayoutEffect(() => {
    if (reduced || !contentRef.current || !spacerRef.current) return;
    
    const content = contentRef.current;
    const spacer = spacerRef.current;

    const ro = new ResizeObserver(() => {
      spacer.style.height = `${content.offsetHeight}px`;
    });

    ro.observe(content);

    return () => {
      ro.disconnect();
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    target.current = 0;
    current.current = 0;
    velocity.current = 0;
    if (rootRef.current) {
      rootRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  }, [pathname, reduced]);

  useEffect(() => {
    if (reduced) return;

    const root = rootRef.current!;
    const spacer = spacerRef.current!;

    let rafId = 0;

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
    const maxScroll = () => Math.max(0, spacer.offsetHeight - window.innerHeight);

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      if (e.deltaMode === 2) delta *= window.innerHeight;
      target.current = clamp(target.current + delta, 0, maxScroll());
    }

    let touchActive = false;
    let lastY = 0;
    
    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      touchActive = true; 
      lastY = t.clientY;
      velocity.current = 0;
    }
    
    function onTouchMove(e: TouchEvent) {
      if (!touchActive) return;
      e.preventDefault();
      const t = e.touches[0];
      const dy = (lastY - t.clientY) * 1.5; 
      lastY = t.clientY;
      target.current = clamp(target.current + dy, 0, maxScroll());
    }
    
    function onTouchEnd() {
      touchActive = false;
    }

    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      const absoluteTop = window.scrollY + el.getBoundingClientRect().top;
      target.current = clamp(absoluteTop, 0, maxScroll());
      history.pushState(null, "", `#${id}`);
    };

    function tick() {
      const delta = target.current - current.current;
      
      if (Math.abs(delta) < SPRING.precision && Math.abs(velocity.current) < SPRING.precision) {
        current.current = target.current; 
        velocity.current = 0;
        root.style.transform = `translate3d(0, ${-Math.round(current.current)}px, 0)`;
      } else {
        const springForce = delta * SPRING.stiffness;
        const dampingForce = -velocity.current * SPRING.damping;
        velocity.current += springForce + dampingForce;
        current.current += velocity.current;
        const transform = Math.round(current.current * 100) / 100;
        root.style.transform = `translate3d(0, ${-transform}px, 0)`;
      }
      
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("click", onClick);

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <>
      <div
        ref={rootRef}
        className="fixed top-0 left-0 w-full will-change-transform"
      >
        <div ref={contentRef}>
          {children}
        </div>
      </div>
      
      <div ref={spacerRef} aria-hidden="true" />
    </>
  );
}
