import { Button, HStack } from '@chakra-ui/react';
import { useLocale } from '../i18n/LocaleProvider';

export function LanguageSwitcher() {
  const { locale, setLocale, data } = useLocale();
  return (
    <HStack role="group" aria-label={data.ui.language} gap="2">
      {data.languages.map(({ code, label }) => (
        <Button key={code} size="sm" variant="plain" color={locale === code ? 'accent' : 'muted'}
          aria-pressed={locale === code} lang={code} onClick={() => setLocale(code)}>
          {label}
        </Button>
      ))}
    </HStack>
  );
}
