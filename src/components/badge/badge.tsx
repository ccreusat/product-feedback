import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

export type ButtonProps = QwikIntrinsicElements["button"] & {
  isActive: boolean;
};

export default component$(({ isActive, ...restProps }: ButtonProps) => {
  let classname = "badge b-radius-10";

  if (isActive) {
    classname += " badge--invert";
  }
  return (
    <button class={classname} {...restProps}>
      <Slot />
    </button>
  );
});
