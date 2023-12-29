import type { FontDefinition } from "./types";

export const SUPPORTED_FONT_STYLES: FontDefinition[] = [
  {
    id: "firaCode",
    label: "Fira Code",
    variable: "var(--font-fira-code)",
  },

  {
    id: "jetBrainsMono",
    label: "JetBrains Mono",
    variable: "var(--font-jetbrains-mono)",
  },

  {
    id: "inconsolata",
    label: "Inconsolata",
    variable: "var(--font-inconsolata)",
  },

  {
    id: "sourceCodePro",
    label: "Source Code Pro",
    variable: "var(--font-source-code-pro)",
  },

  {
    id: "ibmPlexMono",
    label: "IBM Plex Mono",
    variable: "var(--font-ibm-plex-mono)",
  },
];
