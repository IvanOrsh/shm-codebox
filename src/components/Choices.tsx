import { RadioGroup } from "@headlessui/react";

import { Choice } from "@/lib/types";
import clsx from "clsx";

type ChoicesProps = {
  choices: Choice[];
  initialValue: Choice;
  setValue: (_: Choice) => void;
};

export default function Choices(props: ChoicesProps) {
  const { choices, initialValue, setValue } = props;

  return (
    <RadioGroup value={initialValue} onChange={setValue}>
      <div className="flex gap-3 py-[7px] text-sm">
        {choices.map((choice) => (
          <RadioGroup.Option
            key={choice.label}
            value={choice}
            className={clsx("cursor-pointer select-none rounded-md")}
          >
            <span
              className={clsx(
                "rounded-md py-1 px-2",
                "transition-colors duration-100 ease-in-out"
              )}
            >
              {choice.label}
            </span>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
