import { component$, useComputed$ } from "@builder.io/qwik";
import { useFeedbacksList } from "~/routes";

export default component$(() => {
  const feedbacks = useFeedbacksList();
  const feedbacksList = feedbacks.value;

  const plannedFeedbacks = useComputed$(() => {
    return feedbacksList.filter((feedback) => feedback.status === "planned");
  });

  const inProgressFeedbacks = feedbacksList.filter(
    (feedback) => feedback.status === "in-progress"
  );

  const liveFeedbacks = feedbacksList.filter(
    (feedback) => feedback.status === "live"
  );

  return (
    <div class="roadmap box py-24 px-24">
      <h3>Roadmap</h3>
      <ul class="roadmap-list pt-24">
        <li class="roadmap-item planned">
          <span class="text">Planned</span>
          <strong class="count">{plannedFeedbacks.value.length}</strong>
        </li>
        <li class="roadmap-item progress">
          <span class="text">In-Progress</span>
          <strong class="count">{inProgressFeedbacks.length}</strong>
        </li>
        <li class="roadmap-item live">
          <span class="text">Live</span>{" "}
          <strong class="count">{liveFeedbacks.length}</strong>
        </li>
      </ul>
    </div>
  );
});
