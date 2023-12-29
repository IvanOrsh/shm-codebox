import type { FontDefinition } from "./types";

export const SUPPORTED_FONT_STYLES: FontDefinition[] = [
  {
    id: "firaCode",
    label: "Fira Code",
    value: "var(--font-fira-code)",
  },

  {
    id: "jetBrainsMono",
    label: "JetBrains Mono",
    value: "var(--font-jetbrains-mono)",
  },

  {
    id: "inconsolata",
    label: "Inconsolata",
    value: "var(--font-inconsolata)",
  },

  {
    id: "sourceCodePro",
    label: "Source Code Pro",
    value: "var(--font-source-code-pro)",
  },

  {
    id: "ibmPlexMono",
    label: "IBM Plex Mono",
    value: "var(--font-ibm-plex-mono)",
  },
];
