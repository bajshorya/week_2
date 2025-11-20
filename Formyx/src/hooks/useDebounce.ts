import { useRef, useCallback } from 'react';
const useDebounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay = 1000
) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (...args: T) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
        fn(...args);
        timeoutId.current = null;
      }, delay);
    },
    [fn, delay]
  );
};
export default useDebounce;
