import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export type InputProps = QwikIntrinsicElements["input"] & {
  type?: string;
  inputId: string;
};

export default component$(
  ({ type = "text", inputId, ...restProps }: InputProps) => {
    return <input type={type} name={inputId} id={inputId} {...restProps} />;
  }
);
