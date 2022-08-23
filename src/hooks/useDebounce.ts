import { useCallback, useEffect, useRef, useState } from 'react';

// export function useDebounce(callback: (...args: any) => void, delay: number) {
//   const timer = useRef<any>();
//
//   const debouncedCallback = useCallback(
//     (...args: any) => {
//       if (timer.current) clearTimeout(timer.current);
//       timer.current = setTimeout(() => {
//         callback(...args);
//       }, delay);
//     },
//     [callback, delay],
//   );
//   return debouncedCallback;
// }

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value]);
  return debouncedValue;
}

