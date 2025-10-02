import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    try {
        media.addEventListener('change', listener);
    } catch (e) {
        media.addListener(listener); // Deprecated but fallback
    }

    return () => {
        try {
            media.removeEventListener('change', listener);
        } catch (e) {
            media.removeListener(listener); // Deprecated but fallback
        }
    };
  }, [matches, query]);

  return matches;
};
