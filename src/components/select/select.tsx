import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export type SelectProps<T> = QwikIntrinsicElements["select"] & {
  selectId: string;
  list: T[];
  selected?: string;
};

export default component$(
  ({
    selectId,
    list,
    selected,
    ...restProps
  }: SelectProps<Record<string, string>>) => {
    return (
      <select name={selectId} id={selectId} {...restProps}>
        <option value="" disabled>
          Select a category
        </option>
        {list.map((item) => {
          return (
            <option
              key={item.value}
              value={item.value}
              selected={selected === item.value}
            >
              {item.name}
            </option>
          );
        })}
      </select>
    );
  }
);
