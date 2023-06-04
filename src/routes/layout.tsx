import {
  component$,
  Slot,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";

import Aside from "~/components/aside/aside";
import Filters from "~/components/filters/filters";
import Roadmap from "~/components/roadmap/roadmap";
import { FilterContextId } from "~/context/filter-context";

export default component$(() => {
  const filterSignal = useSignal("All");

  useContextProvider(FilterContextId, {
    filterSignal,
  });

  return (
    <div class="container">
      <div class="grid grid-layout-2">
        <Aside>
          <Filters />
          <Roadmap />
        </Aside>
        <main>
          <Slot />
        </main>
      </div>
    </div>
  );
});
