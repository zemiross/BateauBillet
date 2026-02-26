import type { Country } from "@/data/routes";

export type CountryTheme = {
  label: string;
  gradient: string;
  gradientLight: string;
  accent: string;
  emoji: string;
};

export const countryThemes: Record<Country, CountryTheme> = {
  france: {
    label: "Depuis la France",
    gradient: "from-[#0f2342] to-[#2058b0]",
    gradientLight: "from-[#dce8f8] to-[#eef3fb]",
    accent: "text-blue-600",
    emoji: "\uD83C\uDDEB\uD83C\uDDF7",
  },
  maroc: {
    label: "Depuis le Maroc",
    gradient: "from-[#7c2d12] to-[#e05a3a]",
    gradientLight: "from-[#fde8e0] to-[#fef3ee]",
    accent: "text-orange-600",
    emoji: "\uD83C\uDDF2\uD83C\uDDE6",
  },
  espagne: {
    label: "Depuis l'Espagne",
    gradient: "from-[#92400e] to-[#f59e0b]",
    gradientLight: "from-[#fef3c7] to-[#fffbeb]",
    accent: "text-amber-600",
    emoji: "\uD83C\uDDEA\uD83C\uDDF8",
  },
  algerie: {
    label: "Depuis l'Algerie",
    gradient: "from-[#065f46] to-[#14b8a6]",
    gradientLight: "from-[#d1fae5] to-[#ecfdf5]",
    accent: "text-teal-600",
    emoji: "\uD83C\uDDE9\uD83C\uDDFF",
  },
};

export function getCountryTheme(country: Country): CountryTheme {
  return countryThemes[country];
}

export const countryOrder: Country[] = ["france", "maroc", "espagne", "algerie"];
