import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import CreateComment from "~/components/create-comment/create-comment";
import type { FeedbackProps } from "~/components/feedback/feedback";
import Feedback from "~/components/feedback/feedback";
import GoBack from "~/components/go-back/go-back";

export const useFeedback = routeLoader$(async ({ params }) => {
  const abortController = new AbortController();
  const response = await fetch(
    `http://127.0.0.1:5173/api/feedbacks/${params.id}`,
    {
      signal: abortController.signal,
    }
  );
  const feedback = await response.json();
  return feedback as FeedbackProps;
});

export default component$(() => {
  const navigate = useNavigate();
  const feedback = useFeedback();
  const textareaCount = useSignal("0");
  const maxTextareaSignal = useSignal(250);
  const maxTextareaCount = 250;

  const onInput = $((event: Event) => {
    textareaCount.value = (event.target as HTMLTextAreaElement).value;
    maxTextareaSignal.value = maxTextareaCount - textareaCount.value.length;

    if (textareaCount.value.length >= maxTextareaCount) {
      maxTextareaSignal.value = 0;
    }
  });

  console.log(feedback.value);

  return (
    <div class="form-container form-container-lg">
      <div class="d-flex align-items-center justify-content-space-between">
        <GoBack />
        <Button
          variant="tertiary"
          onClick$={() => navigate(`/feedback/${feedback.value.id}/edit`)}
        >
          Edit Feedback
        </Button>
      </div>
      <Feedback {...feedback.value} />
      <div class="feedback box">
        <div class="feedback-content">
          <h3 class="c-pointer">Comments</h3>
          {feedback.value.comments.map((comment) => {
            return (
              <div key={comment.id}>
                {comment.id}
                {comment.content}
                {JSON.stringify(comment.user)}
              </div>
            );
          })}
        </div>
      </div>
      <CreateComment
        maxLength={maxTextareaCount}
        maxTextareaSignal={maxTextareaSignal}
        onInput={onInput}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Feedback",
  meta: [
    {
      name: "description",
      content: "Feedback",
    },
  ],
};
