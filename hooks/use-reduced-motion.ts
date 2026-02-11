import { useEffect, useState } from 'react';

/**
 * Hook to detect if user prefers reduced motion for accessibility
 * Returns true if user has enabled "reduce motion" in their OS settings
 *
 * Usage:
 * const prefersReducedMotion = useReducedMotion();
 * if (!prefersReducedMotion) {
 *   // Apply animations
 * }
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check media query for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener (modern browsers)
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
