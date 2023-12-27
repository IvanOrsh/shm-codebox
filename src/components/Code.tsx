"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { clsx } from "clsx";

type CodeProps = {
  placeholder: string;
  initialValue?: string;
};

export default function Code(props: CodeProps) {
  const { placeholder, initialValue } = props;

  const preRef = useRef<HTMLPreElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useState("");
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(true);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (containerRef.current && preRef.current && textAreaRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const preHeight = preRef.current.clientHeight;

      textAreaRef.current.style.height = `${Math.max(
        preHeight,
        containerHeight
      )}px`;
    }

    return () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "";
      }
    };
  }, [containerRef.current?.clientHeight, preRef.current?.clientHeight]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div
      className={clsx(
        isTextAreaFocused ? "border-pink-400" : "border-white/20",
        "h-2/3 w-2/3 max-w-4xl rounded-xl border-[1px] py-4",
        "transition-colors duration-300 ease-in-out"
      )}
    >
      <div ref={containerRef} className="relative h-full w-full overflow-auto">
        <Highlight theme={themes.nightOwl} language="jsx" code={value}>
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <>
              <textarea
                ref={textAreaRef}
                value={value}
                placeholder={placeholder}
                spellCheck={false}
                onChange={handleChange}
                onFocus={() => setIsTextAreaFocused(true)}
                onBlur={() => setIsTextAreaFocused(false)}
                className={clsx(
                  className,
                  "absolute",
                  "w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent pl-16 pr-3",
                  "font-mono text-white placeholder:text-white/60",
                  "caret-pink-500 selection:bg-pink-500/30 focus:outline-none"
                )}
              />
              <pre
                ref={preRef}
                aria-hidden={true}
                className={clsx(
                  className,
                  "pointer-events-none w-full select-none pr-3"
                )}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    className="table-row"
                  >
                    <span className="table-cell w-10 select-none text-right opacity-50">
                      {i + 1}
                    </span>
                    <code className="table-cell whitespace-pre-wrap break-words break-keep pl-6">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </code>
                  </div>
                ))}
              </pre>
            </>
          )}
        </Highlight>
      </div>
    </div>
  );
}
