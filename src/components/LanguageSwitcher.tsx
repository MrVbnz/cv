import { Box, Button, HStack } from '@chakra-ui/react';
import { useLocale } from '../i18n/LocaleProvider';
import { localePath } from '../i18n/locale';

export function LanguageSwitcher() {
  const { locale, localized, setLocale, data } = useLocale();
  const selectedIndex = data.languages.findIndex((language) => language.code === locale);

  return (
    <HStack
      role="group"
      aria-label={data.ui.language}
      position="relative"
      isolation="isolate"
      gap="1"
      p="1"
      borderWidth="1px"
      borderColor="line"
      borderRadius="full"
    >
      {/* Each button is 3rem wide, followed by the 0.25rem stack gap. */}
      <Box
        aria-hidden="true"
        position="absolute"
        top="1"
        bottom="1"
        left="1"
        w="12"
        transform={`translateX(calc(${selectedIndex} * 3.25rem))`}
        bg="accent"
        borderRadius="full"
        pointerEvents="none"
        transition="transform var(--language-duration) ease-in-out"
        _motionReduce={{ transition: 'none' }}
      />
      {data.languages.map(({ code, label }) => (
        <Button
          key={code}
          asChild={localized}
          size="sm"
          w="12"
          minW="12"
          position="relative"
          variant="plain"
          borderRadius="full"
          bg="transparent"
          color={locale === code ? 'sidebar' : 'muted'}
          _hover={{ color: locale === code ? 'sidebar' : 'ink' }}
          aria-pressed={localized ? undefined : locale === code}
          lang={code}
          onClick={localized ? undefined : () => setLocale(code)}
        >
          {localized ? (
            <a
              href={localePath(code)}
              aria-current={locale === code ? 'page' : undefined}
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                )
                  return;
                event.preventDefault();
                setLocale(code);
              }}
            >
              {label}
            </a>
          ) : (
            label
          )}
        </Button>
      ))}
    </HStack>
  );
}
