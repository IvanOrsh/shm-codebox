import type { Extension } from "@codemirror/state";

export type Choice = {
  label: string;
  class: string;
};

export type GradientBackground = {
  name: string;
  class: string;
};

export type LanguageDefinition = {
  id: string;
  label: string;
  extension: () => Promise<Extension>;
};
