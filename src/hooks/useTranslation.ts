import { useRouter } from "next/router";
import { Translations } from "../translations";
import { TranslationObj } from "../translations/type";

export function useTranslation<T extends keyof TranslationObj>(key: T): TranslationObj[T] {
  const { locale = 'en-US' } = useRouter();
  return Translations[locale][key];
}
