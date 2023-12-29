"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import ReactCodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { createTheme } from "@uiw/codemirror-themes";
import { tags } from "@lezer/highlight";

import { useSettingsContext } from "@/contexts/SettingsContext";
import { hslToHsla } from "@/lib/colors";

type CodeProps = {
  placeholder: string;
  initialValue?: string;
};

export default function Code(props: CodeProps) {
  const { placeholder, initialValue } = props;

  const { language, theme, lineNumbers, padding } = useSettingsContext();

  const [selectedLanguage, setSelectedLanguage] = useState<any>(null); // TODO: fix any
  const [code, setCode] = useState(`interface Props {
    item1: string;
  }`);

  const onChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  useEffect(() => {
    async function loadLanguage() {
      const lang = await language.extension();

      setSelectedLanguage(lang);
    }

    loadLanguage();
  }, [language]);

  const styleTheme = EditorView.baseTheme({
    "&.cm-editor": {
      fontSize: "0.9375rem",
    },
    "&.cm-editor.cm-focused": {
      outline: "none",
    },
    "&.cm-gutterElement": {
      display: "flex",
      justifyContent: "flex-end",
      lineHeight: "1.5rem",
      letterSpacing: "0.1px",
    },
    "&.cm-content": {
      padding: "1rem",
      lineHeight: "1.5rem",
      letterSpacing: "0.1px",
    },
  });

  const c = theme.generatedColors;

  const myTheme = createTheme({
    theme: "dark",
    settings: {
      background: "transparent",
      foreground: "white",
      caret: c.at(0),
      selection: hslToHsla(c.at(0)!, 0.1),
      selectionMatch: hslToHsla(c.at(1)!, 0.2),
      lineHighlight: "transparent",
      gutterBackground: "transparent",
      gutterForeground: hslToHsla(c.at(0)!, 0.4),
      gutterBorder: "transparent",
    },
    styles: [
      {
        tag: [tags.emphasis],
        fontStyle: "italic",
      },
      {
        tag: [tags.strong],
        fontStyle: "bold",
      },
      {
        tag: [tags.link],
        color: c.at(1),
      },
      {
        tag: [
          tags.comment,
          tags.lineComment,
          tags.blockComment,
          tags.docComment,
        ],
        fontStyle: "italic",
        color: hslToHsla(c.at(0)!, 0.4),
      },
      {
        tag: [
          tags.bracket,
          tags.squareBracket,
          tags.paren,
          tags.punctuation,
          tags.angleBracket,
        ],
        color: c.at(0),
      },
      {
        tag: tags.variableName,
        color: c.at(5),
        fontStyle: "italic",
      },
      {
        tag: tags.propertyName,
        color: c.at(5),
        fontStyle: "italic",
      },
      {
        tag: tags.definition(tags.variableName),
        color: c.at(5),
      },
      {
        tag: tags.definition(tags.propertyName),
        color: c.at(5),
      },
      {
        tag: [
          tags.moduleKeyword,
          tags.keyword,
          tags.changed,
          tags.annotation,
          tags.modifier,
          tags.namespace,
          tags.self,
          tags.meta,
        ],
        color: c.at(1),
      },
      {
        tag: [tags.typeName, tags.typeOperator],
        color: c.at(13),
      },
      {
        tag: [tags.operator, tags.special(tags.string)],
        color: c.at(0),
      },
      {
        tag: [
          tags.number,
          tags.bool,
          tags.string,
          tags.processingInstruction,
          tags.inserted,
        ],
        color: c.at(2),
      },
      {
        tag: [
          tags.color,
          tags.className,
          tags.constant(tags.name),
          tags.standard(tags.name),
          tags.function(tags.variableName),
          tags.function(tags.propertyName),
        ],
        color: c.at(0),
      },
      {
        tag: [tags.regexp],
        color: c.at(12),
      },
      {
        tag: [tags.tagName],
        color: c.at(11),
      },
      {
        tag: [tags.attributeValue],
        color: c.at(2),
      },
      {
        tag: [tags.attributeName],
        color: c.at(6),
      },
      {
        tag: [tags.heading],
        color: c.at(1),
        fontWeight: "bold",
      },
      {
        tag: [tags.quote],
        color: c.at(6),
      },
    ],
  });

  return (
    <motion.div
      layout
      className={clsx(
        "relative z-0 w-auto min-w-[512px] max-w-5xl",
        padding.class,
        "bg-gradient-to-br",
        theme.class,
        "transition-all duration-200 ease-in-out"
      )}
    >
      <motion.div
        layout
        className="relative z-[1] h-full w-full min-w-[480px] max-w-2xl rounded-xl"
      >
        <div
          className={clsx(
            "absolute inset-0 rounded-xl",
            "after:absolute after:inset-0 after:z-[2] after:translate-y-6 after:rounded-xl after:bg-black/60 after:blur-xl"
          )}
        >
          <div
            className={clsx(
              "absolute inset-0 z-[3] rounded-xl",
              "bg-gradient-to-br",
              theme.class
            )}
          >
            {/*  */}
          </div>
        </div>

        <div className="relative z-[4] rounded-xl bg-black/70 p-4">
          {selectedLanguage && (
            <ReactCodeMirror
              value={code}
              onChange={onChange}
              extensions={[
                selectedLanguage,
                styleTheme,
                EditorView.lineWrapping,
              ]}
              basicSetup={{
                lineNumbers: lineNumbers,
                foldGutter: false,
                autocompletion: false,
                indentOnInput: false,
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
                dropCursor: false,
                searchKeymap: false,
                lintKeymap: false,
                completionKeymap: false,
                foldKeymap: false,
              }}
              theme={myTheme}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
