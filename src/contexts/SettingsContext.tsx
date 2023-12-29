"use client";

import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useCallback,
} from "react";

import type {
  ChoiceDefinition,
  FontDefinition,
  LanguageDefinition,
  ThemeDefinition,
} from "@/lib/types";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { SUPPORTED_PADDING_CHOICES, SUPPORTED_THEMES } from "@/lib/themes";
import { SUPPORTED_FONTS } from "@/lib/fonts";

interface SettingsContextProps {
  language: LanguageDefinition;
  setLanguage: (_: LanguageDefinition) => void;

  theme: ThemeDefinition;
  setTheme: (_: ThemeDefinition) => void;

  lineNumbers: boolean;
  setLineNumbers: (_: boolean) => void;

  padding: ChoiceDefinition;
  setPadding: (_: ChoiceDefinition) => void;

  fontStyle: FontDefinition;
  setFontStyle: (_: FontDefinition) => void;
}

const SettingsContext = createContext<SettingsContextProps>(
  {} as SettingsContextProps
);

const useSettingsContext = () => useContext(SettingsContext);

const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<LanguageDefinition>(
    SUPPORTED_LANGUAGES[0]
  );
  const [theme, setTheme] = useState<ThemeDefinition>(SUPPORTED_THEMES[4]);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [padding, setPadding] = useState<ChoiceDefinition>(
    SUPPORTED_PADDING_CHOICES[0]
  );
  const [fontStyle, setFontStyle] = useState<FontDefinition>(
    SUPPORTED_FONTS.at(0)!
  );

  const value = useCallback(() => {
    return {
      language,
      setLanguage,
      theme,
      setTheme,
      lineNumbers,
      setLineNumbers,
      padding,
      setPadding,
      fontStyle,
      setFontStyle,
    };
  }, [language, theme, lineNumbers, padding, fontStyle]);

  return (
    <SettingsContext.Provider value={value()}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, useSettingsContext };
