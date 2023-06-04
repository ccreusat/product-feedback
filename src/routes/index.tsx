import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import FeedbackList from "~/components/feedback-list/feedback-list";
import type { FeedbackProps } from "~/components/feedback/feedback";
import Topbar from "~/components/topbar/topbar";

export const useFeedbacksList = routeLoader$(async () => {
  const abortController = new AbortController();
  const response = await fetch("http://127.0.0.1:5173/api/feedbacks", {
    signal: abortController.signal,
  });
  const feedbacks = await response.json();
  return feedbacks as FeedbackProps[];
});

export default component$(() => {
  return (
    <>
      <Topbar />
      <FeedbackList />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
