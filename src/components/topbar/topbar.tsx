import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useFeedbacksList } from "~/routes";

export default component$(() => {
  const feedbacks = useFeedbacksList();
  const feedbacksLength = feedbacks.value.length;
  return (
    <div class="topbar b-radius-10">
      <div class="d-inline-flex gap-16">
        <img
          height={24}
          width={23}
          src="/assets/suggestions/icon-suggestions.svg"
          alt="suggestion icon"
        />
        <strong>{feedbacksLength} suggestions</strong>
      </div>
      <Link class="button button-primary" href="/create">
        + Add Feedback
      </Link>
    </div>
  );
});
