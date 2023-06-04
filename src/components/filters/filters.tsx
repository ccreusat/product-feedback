import { component$, useContext, useStore } from "@builder.io/qwik";
import Badge from "../badge/badge";
import { FilterContextId } from "~/context/filter-context";

export default component$(() => {
  const filtersList = useStore([
    "All",
    "UI",
    "UX",
    "Enhancement",
    "Bug",
    "Feature",
  ]);

  const { filterSignal } = useContext(FilterContextId);

  return (
    <div class="filters box">
      {filtersList.map((item) => (
        <Badge
          key={item}
          isActive={item === filterSignal.value ? true : false}
          onClick$={() => (filterSignal.value = item)}
        >
          {item}
        </Badge>
      ))}
    </div>
  );
});
