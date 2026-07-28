import { en } from "./dictionaries/en";
import { pt, type Dictionary } from "./dictionaries/pt";

export type Locale = "pt" | "en";

export const defaultLocale: Locale = "pt";

export const dictionaries: Record<Locale, Dictionary> = {
  pt,
  en,
};

export type { Dictionary };
