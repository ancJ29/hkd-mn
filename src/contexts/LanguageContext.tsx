import { dictionaryList } from "@/services/i18n";
import { LANGUAGE } from "@/utils/constant";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";

interface LanguageProviderProps {
  children: ReactNode;
}

export interface LanguageContextType {
  language: string;
  dictionary: Record<string, string>;
  onChangeLanguage?: (selected: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: localStorage.getItem(LANGUAGE) || "vi",
  dictionary: dictionaryList.vi,
});

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState("vi");

  useEffect(() => {
    const language = localStorage.getItem(LANGUAGE) || "vi";
    if (language in dictionaryList) {
      setLanguage(language);
    }
  }, []);

  const onChangeLanguage = useCallback((selected: string) => {
    if (selected in dictionaryList) {
      localStorage.setItem(LANGUAGE, selected);
      setLanguage(selected);
    }
  }, []);

  const provider: LanguageContextType = {
    language,
    dictionary: dictionaryList[language],
    onChangeLanguage,
  };

  return <LanguageContext.Provider value={provider}>{children}</LanguageContext.Provider>;
}
