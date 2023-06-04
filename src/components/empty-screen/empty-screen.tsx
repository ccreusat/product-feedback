import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="empty-screen box">
      <div class="empty-screen-container">
        <img
          width={102}
          height={108}
          src="/assets/suggestions/illustration-empty.svg"
          alt="empty screen"
        />
        <h1>There is no feedback yet.</h1>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <Link class="button button-primary" href="/create">
          + Add Feedback
        </Link>
      </div>
    </div>
  );
});
