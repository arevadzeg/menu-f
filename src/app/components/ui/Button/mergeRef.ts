import type React from "react";

type Ref<T> = React.RefCallback<T> | React.RefObject<T> | null;

export const mergeRefs =
  <T>(...refs: Ref<T>[]): React.RefCallback<T> =>
  (inst: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(inst);
      } else if (ref && "current" in ref) {
        // Using type assertion to bypass TypeScript error
        // eslint-disable-next-line no-param-reassign
        (ref as React.MutableRefObject<T | null>).current = inst;
      }
    });
  };
