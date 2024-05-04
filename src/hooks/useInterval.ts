import { useEffect, useRef } from "react";

type CallbackFunction = () => void;

export const useInterval = (callback: CallbackFunction, delay: number): any => {
  const savedCallback = useRef<CallbackFunction | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect((): any => {
    function tick(): void {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
