import { Slot, component$ } from "@builder.io/qwik";

export default component$(({ labelId }: { labelId: string }) => {
  return (
    <label for={labelId} class="text">
      <Slot />
    </label>
  );
});
