import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <legend class="h4">
      <Slot />
    </legend>
  );
});
