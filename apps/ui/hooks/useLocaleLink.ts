import { useRouter } from "next/router"

export const useLocaleLink = () => {
  const {locale} = useRouter();
  return (link: TemplateStringsArray) => {
    if (!locale.startsWith('en')) {
      return `${locale}/${link.join('')}`.replace('//', '/');
    }
    return link.join('');
  }
}
