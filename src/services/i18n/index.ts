import en from "@/services/i18n/lang/en.json";
import ja from "@/services/i18n/lang/ja.json";
import vi from "@/services/i18n/lang/vi.json";

type Dictionary = Record<string, string>;

export const dictionaryList: Record<string, Dictionary> = {
  en,
  vi,
  ja,
};

export const flagData = [
  {
    id: "vi",
    active: "/images/flag_icons/vi_active.svg",
    inActive: "/images/flag_icons/vi_inactive.svg",
  },
  {
    id: "en",
    active: "/images/flag_icons/en_active.svg",
    inActive: "/images/flag_icons/en_inactive.svg",
  },
  {
    id: "ja",
    active: "/images/flag_icons/ja_active.svg",
    inActive: "/images/flag_icons/ja_inactive.svg",
  },
];
