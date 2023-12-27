import { Switch } from "@headlessui/react";
import { clsx } from "clsx";

type ToggleProps = {
  initialValue: boolean;
  setValue: (_: boolean) => void;
};

export default function Toggle(props: ToggleProps) {
  const { initialValue, setValue } = props;

  return (
    <div className="flex h-[34px] items-center">
      <Switch
        checked={initialValue}
        onChange={setValue}
        className={clsx(
          "flex h-5 w-9 cursor-pointer rounded-full",
          "transition-colors duration-200 ease-in-out",
          "focus:outline-none"
        )}
      >
        <span
          className={clsx(
            "pointer-events-none h-full w-3 translate-y-0 rounded-full",
            "bg-white",
            "transform transition-transform duration-200 ease-in-out will-change-transform"
          )}
        />
      </Switch>
    </div>
  );
}
