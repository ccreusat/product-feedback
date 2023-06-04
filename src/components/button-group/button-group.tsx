import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="button-group">
      <Slot />
    </div>
  );
});
