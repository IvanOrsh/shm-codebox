import type { LanguageName } from "@uiw/codemirror-extensions-langs";
import { Listbox } from "@headlessui/react";

import { GradientBackground } from "@/lib/types";
import clsx from "clsx";

function ThemeBubble({ color }: { color: string }) {
  return (
    <span
      className={clsx("block h-4 w-4 rounded-full bg-gradient-to-r", color)}
    />
  );
}

type SelectProps<T> = {
  type: "language" | "theme";
  initialValue: T;
  setValue: (_: T) => void;
  options: T[];
};

export default function Select<T extends GradientBackground | LanguageName>(
  props: SelectProps<T>
) {
  const { type, initialValue, setValue, options } = props;

  return (
    <Listbox value={initialValue} onChange={setValue}>
      <div className="relative">
        <Listbox.Button
          className={clsx(
            "flex items-center, justify-between gap-3 select-none rounded-lg p-2 text-sm",
            "border-[1px] border-white/20 bg-black",
            "transition-colors duration-200 ease-in-out",
            "hover:cursor-pointer hover:bg-white/20 focus:outline-none"
          )}
        >
          {type === "language" ? (
            <span>{initialValue as LanguageName}</span>
          ) : (
            <ThemeBubble color={(initialValue as GradientBackground).value} />
          )}
        </Listbox.Button>
      </div>
    </Listbox>
  );
}
