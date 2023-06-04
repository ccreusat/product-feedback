import { component$, useContext } from "@builder.io/qwik";
import type { FeedbackProps } from "../feedback/feedback";
import Feedback from "../feedback/feedback";
import EmptyScreen from "../empty-screen/empty-screen";
import { useFeedbacksList } from "~/routes";
import { FilterContextId } from "~/context/filter-context";

export default component$((): any => {
  const feedbacks = useFeedbacksList();
  const { filterSignal } = useContext(FilterContextId);

  const filteredList =
    filterSignal.value !== "All"
      ? feedbacks.value.filter(
          (f) => f.category === filterSignal.value.toLowerCase()
        )
      : feedbacks.value;

  const feedbacksLength = filteredList.length;

  return feedbacksLength > 0 ? (
    filteredList.map((feedback: FeedbackProps) => {
      return <Feedback key={feedback.id} {...feedback} />;
    })
  ) : (
    <EmptyScreen />
  );
});
