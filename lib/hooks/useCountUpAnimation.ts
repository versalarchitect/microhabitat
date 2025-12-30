import { useEffect, useState } from "react";
import { useIntersectionVisibility } from "./useIntersectionVisibility";

interface UseCountUpAnimationOptions {
  duration?: number;
  threshold?: number;
}

export function useCountUpAnimation(
  end: number,
  options: UseCountUpAnimationOptions = {}
) {
  const { duration = 2000, threshold = 0.3 } = options;
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useIntersectionVisibility<HTMLDivElement>({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quart for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return { count, ref, isVisible };
}
