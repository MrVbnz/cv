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
      userSelect="none"
      display="grid"
      gridTemplateRows="minmax(0, 1fr) auto"
      gap="2"
      px="3"
      pt="7"
      pb="5"
    >
      <Box overflowY="auto" scrollbarWidth="none">
        <SectionLinks proportional />
      </Box>
      <Flex pt="3" justify="center">
        <LanguageSwitcher />
      </Flex>
    </Box>
  );
}
