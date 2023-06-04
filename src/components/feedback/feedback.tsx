import { $, component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export interface FeedbackProps {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: [];
}

export default component$((props: FeedbackProps) => {
  const navigate = useNavigate();
  const goToFeedback = $(() => navigate(`/feedback/${props.id}`));
  return (
    <div class="feedback box d-flex align-items-center">
      <div class="feedback-counter">
        <img
          width={10}
          height={7}
          src="/assets/shared/icon-arrow-up.svg"
          alt="arrow up"
        />
        {props.upvotes}
      </div>
      <div class="feedback-content">
        <h3 class="c-pointer" onClick$={goToFeedback}>
          {props.title}
        </h3>
        <p>{props.description}</p>
        <div class="badge b-radius-10">{props.category}</div>
      </div>
    </div>
  );
});
