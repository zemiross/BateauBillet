import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "ar", "es"],
  defaultLocale: "fr",
  localePrefix: "always",
});
