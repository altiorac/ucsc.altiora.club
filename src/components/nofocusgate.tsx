"use client";
import { useEffect } from "react";

export default function NoFocusGate() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") e.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown, { capture: true });

    const focusables = document.querySelectorAll<HTMLElement>(
      'a, button, input, select, textarea, details, [tabindex]'
    );
    const originalTabIndex = new Map<HTMLElement, string | null>();
    focusables.forEach(el => {
      originalTabIndex.set(el, el.getAttribute("tabindex"));
      el.setAttribute("tabindex", "-1");
    });

    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      originalTabIndex.forEach((val, el) => {
        if (val === null) el.removeAttribute("tabindex");
        else el.setAttribute("tabindex", val);
      });
    };
  }, []);

  return null;
}
