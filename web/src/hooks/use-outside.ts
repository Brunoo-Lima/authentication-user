import { RefObject, useEffect } from 'react';

export const useOutside = (
  ref: RefObject<HTMLElement>,
  callback: (() => void) | null,
) => {
  useEffect(() => {
    if (!callback) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        callback &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        callback();
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};
