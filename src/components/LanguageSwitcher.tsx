import { Box, Button, HStack } from '@chakra-ui/react';
import { useLocale } from '../i18n/LocaleProvider';

export function LanguageSwitcher() {
  const { locale, setLocale, data } = useLocale();
  const selectedIndex = data.languages.findIndex(language => language.code === locale);

  return (
    <HStack role="group" aria-label={data.ui.language}
      position="relative" isolation="isolate" gap="1" p="1" borderWidth="1px" borderColor="line" borderRadius="full">
      <Box data-testid="language-highlight" aria-hidden="true" position="absolute" top="1" bottom="1"
        left="1" w="12" transform={`translateX(calc(${selectedIndex} * 3.25rem))`}
        bg="accent" borderRadius="full" pointerEvents="none"
        transition="transform 80ms ease-in-out"
        _motionReduce={{ transition: 'none' }} />
        {data.languages.map(({ code, label }) => (
          <Button key={code} size="sm" w="12" minW="12" position="relative" variant="plain" borderRadius="full"
            bg="transparent" color={locale === code ? 'sidebar' : 'muted'}
            _hover={{ color: locale === code ? 'sidebar' : 'ink' }}
            aria-pressed={locale === code} lang={code} onClick={() => setLocale(code)}>
            {label}
          </Button>
        ))}
    </HStack>
  );
}
