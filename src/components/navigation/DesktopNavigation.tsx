import { Box, Flex } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { SectionLinks } from './SectionLinks';

export function DesktopNavigation() {
  const { data } = useLocale();

  return (
    <Box
      as="nav"
      aria-label={data.ui.navigation}
      position="fixed"
      zIndex="10"
      top="0"
      left="0"
      w="var(--sidebar-width)"
      h="100dvh"
      bg="sidebar"
      display="grid"
      overflowY="auto"
      gridTemplateRows="minmax(1.25rem, 1fr) auto minmax(max-content, 1fr)"
    >
      {/* Keep the links centered and reserve space for the language switcher. */}
      <Box gridRow="2" px="5">
        <SectionLinks />
      </Box>
      <Flex gridRow="3" alignSelf="end" justify="center" p="5">
        <LanguageSwitcher />
      </Flex>
    </Box>
  );
}
