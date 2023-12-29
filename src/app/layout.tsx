import type { Metadata } from "next";
import {
  Fira_Code,
  IBM_Plex_Mono,
  Inconsolata,
  Inter,
  JetBrains_Mono,
  Source_Code_Pro,
} from "next/font/google";
import clsx from "clsx";

import "./globals.css";
import { SettingsProvider } from "@/contexts/SettingsContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-mono",
});
export const metadata: Metadata = {
  title: "Shm-codebox",
  description: "Code snippet editor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          id="main"
          className={clsx(
            "h-screen flex flex-col items-center justify-center",
            inter.variable,
            firaCode.variable,
            jetBrainsMono.variable,
            inconsolata.variable,
            sourceCodePro.variable,
            ibmPlexMono.variable,
            "font-sans"
          )}
        >
          <SettingsProvider>{children}</SettingsProvider>
        </main>
      </body>
    </html>
  );
}
