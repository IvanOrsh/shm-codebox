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
  LanguageDefinition,
  ThemeDefinition,
} from "@/lib/types";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { SUPPORTED_PADDING_CHOICES, SUPPORTED_THEMES } from "@/lib/themes";

interface SettingsContextProps {
  language: LanguageDefinition;
  setLanguage: (_: LanguageDefinition) => void;

  theme: ThemeDefinition;
  setTheme: (_: ThemeDefinition) => void;

  lineNumbers: boolean;
  setLineNumbers: (_: boolean) => void;

  padding: ChoiceDefinition;
  setPadding: (_: ChoiceDefinition) => void;
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
    };
  }, [language, theme, lineNumbers, padding]);

  return (
    <SettingsContext.Provider value={value()}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, useSettingsContext };
