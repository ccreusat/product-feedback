import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <Link class="text link" href="/">
      <img
        width={7}
        height={10}
        src="/assets/shared/icon-arrow-left.svg"
        alt="go back link"
      />
      <strong>Go Back</strong>
    </Link>
  );
});
