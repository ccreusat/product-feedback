import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import Button from "../button/button";
import Textarea from "../textarea/textarea";

export default component$(
  ({
    maxLength,
    onInput,
    maxTextareaSignal,
  }: {
    maxLength: number;
    maxTextareaSignal: Signal<number>;
    onInput: any;
  }) => {
    return (
      <div class="feedback box">
        <div class="feedback-content">
          <h3 class="c-pointer">Add Comment</h3>
          <Textarea
            textareaId="add-comment"
            maxLength={maxLength}
            onInput$={onInput}
          />
          <div class="d-flex justify-content-space-between">
            <p>{maxTextareaSignal.value} characters left</p>
            <Button onClick$={() => console.log("click")}>Post Comment</Button>
          </div>
        </div>
      </div>
    );
  }
);
