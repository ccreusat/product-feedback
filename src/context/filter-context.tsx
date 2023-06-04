import type { Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";

export const FilterContextId = createContextId<{
  filterSignal: Signal<string>;
}>("filter-context");
