import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export type TextareaProps = QwikIntrinsicElements["textarea"] & {
  textareaId: string;
};

export default component$(({ textareaId, ...restProps }: TextareaProps) => {
  return <textarea name={textareaId} id={textareaId} {...restProps}></textarea>;
});
