import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

export type ButtonProps = QwikIntrinsicElements["button"] & {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  type?: "button" | "submit" | "reset";
};

export default component$(
  ({ variant = "primary", type = "button", ...restProps }: ButtonProps) => {
    return (
      <button type={type} class={`button button-${variant}`} {...restProps}>
        <Slot />
      </button>
    );
  }
);
