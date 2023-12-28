"use client";

import { useEffect, useState } from "react";
import { useDragControls, useAnimationControls, motion } from "framer-motion";
import clsx from "clsx";

import { useSettingsContext } from "@/contexts/SettingsContext";
import { DragHandleDots1Icon } from "@radix-ui/react-icons";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { SUPPORTED_PADDING_CHOICES, SUPPORTED_THEMES } from "@/lib/themes";
import Select from "./Select";
import Toggle from "./Toggle";
import Choices from "./Choices";

export default function Settings() {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    lineNumbers,
    setLineNumbers,
    padding,
    setPadding,
  } = useSettingsContext();

  const [mainDimensions, setMainDimensions] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });

  const [constraints, setConstraints] = useState<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const dragControls = useDragControls();
  const animationControls = useAnimationControls();

  useEffect(() => {
    const main = document.getElementById("main");
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMainDimensions({
          height: main!.offsetHeight,
          width: main!.offsetWidth,
        });

        animationControls.start({
          x: 0,
          y: 0,
        });
      }, 500);
    };

    setMainDimensions({
      height: main!.offsetHeight,
      width: main!.offsetWidth,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [animationControls]);

  useEffect(() => {
    const settings = document.getElementById("settings");

    setConstraints({
      top: -settings!.offsetTop + 24,
      left:
        -mainDimensions.width +
        settings!.offsetWidth +
        settings!.offsetLeft +
        24,
      right:
        mainDimensions.width -
        settings!.offsetWidth -
        settings!.offsetLeft -
        24,
      bottom:
        mainDimensions.height -
        settings!.offsetHeight -
        settings!.offsetTop -
        24,
    });
  }, [mainDimensions.height, mainDimensions.width]);

  return (
    <motion.section
      id="settings"
      drag
      dragListener={false}
      dragMomentum={false}
      dragControls={dragControls}
      dragConstraints={constraints}
      animate={animationControls}
      className={clsx(
        "fixed bottom-32 z-10 rounded-xl p-5 text-sm",
        "transition-opacity duration-200 ease-in-out will-change-transform",
        "border-[1px] border-white/20 bg-black text-white/70 opacity-50 shadow-xl",
        "focus-within:opacity-100 hover:opacity-100"
      )}
    >
      <motion.div
        onPointerDown={(e) => dragControls.start(e, { snapToCursor: false })}
        whileTap={{ cursor: "grabbing" }}
        className={clsx(
          "absolute -top-[10px] left-1/2 py-[1px] px-[6px]",
          "rounded-md border-[1px] border-white/20 bg-black",
          "transition-all duration-200 ease-in-out will-change-transform",
          "hover:scale-150 hover:cursor-grab hover:bg-gray-800 focus:outline-none"
        )}
      >
        <DragHandleDots1Icon className="rotate-90" />
      </motion.div>

      <div className={clsx("flex gap-8")}>
        <div>
          <label htmlFor="language">Language</label>
          <Select
            type="language"
            initialValue={language}
            setValue={setLanguage}
            options={SUPPORTED_LANGUAGES}
          />
        </div>

        <div>
          <label htmlFor="theme">Theme</label>
          <Select
            type="theme"
            initialValue={theme}
            setValue={setTheme}
            options={SUPPORTED_THEMES}
          />
        </div>

        <div>
          <label htmlFor="line-numbers">Line Numbers</label>
          <Toggle initialValue={lineNumbers} setValue={setLineNumbers} />
        </div>

        <div>
          <label htmlFor="padding">Padding</label>
          <Choices
            initialValue={padding}
            setValue={setPadding}
            choices={SUPPORTED_PADDING_CHOICES}
          />
        </div>
      </div>
    </motion.section>
  );
}
