import { Box, Flex, Image, Link, Stack } from '@chakra-ui/react';
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
      {/* Balanced flexible rows center the profile; the footer keeps its own space on short screens. */}
      <Stack gridRow="2" align="center" gap="6" px="5">
        <Link href="#about" borderRadius="full">
          <Image
            src={`${import.meta.env.BASE_URL}assets/img/profile.jpg`}
            alt={data.ui.portraitAlt}
            boxSize="36"
            objectFit="cover"
            borderRadius="full"
            borderWidth="6px"
            borderColor="line"
          />
        </Link>
        <SectionLinks />
      </Stack>
      <Flex gridRow="3" alignSelf="end" justify="center" p="5">
        <LanguageSwitcher />
      </Flex>
    </Box>
  );
}
