import { useRef, useCallback } from 'react';

const useThrottle = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay = 1000
) => {
  const lastExecuted = useRef<number>(0);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: T) => {
      const now = Date.now();
      const timeSinceLastExecution = now - lastExecuted.current;

      if (timeSinceLastExecution >= delay) {
        fn(...args);
        lastExecuted.current = now;
      } else {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
          fn(...args);
          lastExecuted.current = Date.now();
          timeoutId.current = null;
        }, delay - timeSinceLastExecution);
      }
    },
    [fn, delay]
  );
};

export default useThrottle;
