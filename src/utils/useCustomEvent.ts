import { useEffect } from "react";
import { subscribe, unsubscribe } from "./events";

export const useCustomEvent = (
  eventName: string,
  cb: (e: CustomEvent) => void,
) => {
  useEffect(() => {
    const wrappedCallback = (e: Event) => {
      if (e instanceof CustomEvent) {
        cb(e);
      }
    };

    subscribe(eventName, wrappedCallback);
    return () => unsubscribe(eventName, wrappedCallback);
    
  }, [eventName, cb]);
};
