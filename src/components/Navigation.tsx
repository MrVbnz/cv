import { useState } from 'react';
import { Box, Button, Flex, Image, Link, Stack, Text } from '@chakra-ui/react';
import { sectionIds } from '../data/types';
import { useLocale } from '../i18n/LocaleProvider';
import { useActiveSection } from '../hooks/useActiveSection';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const { data } = useLocale();
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  return (
    <Box as="nav" aria-label={data.ui.navigation} position="fixed" zIndex="10" top="0" left="0"
      w={{ base: 'full', lg: '17rem' }} h={{ lg: '100dvh' }} bg="sidebar" borderBottomWidth={{ base: '1px', lg: '0' }} borderColor="line">
      <Flex direction="column" justify={{ lg: 'center' }} align={{ lg: 'center' }} h="full" p="5" gap="6">
        <Flex direction="row" w="full" align="center" justify="space-between" display={{ base: 'flex', lg: 'none' }}>
          <Text fontWeight="bold">{data.profile.surname} {data.profile.givenName}</Text>
          <Button variant="outline" size="sm" color="ink" borderColor="line" aria-label={data.ui.toggleNavigation}
            aria-expanded={open} aria-controls="resume-navigation" onClick={() => setOpen(!open)}>
            <Box aria-hidden="true">☰</Box>
          </Button>
        </Flex>
        <Link href="#about" display={{ base: 'none', lg: 'block' }} borderRadius="full">
          <Image src={`${import.meta.env.BASE_URL}assets/img/profile.jpg`} alt={data.ui.portraitAlt}
            boxSize="36" objectFit="cover" borderRadius="full" borderWidth="6px" borderColor="line" />
        </Link>
        <Stack id="resume-navigation" display={{ base: open ? 'flex' : 'none', lg: 'flex' }}
          align={{ base: 'start', lg: 'center' }} gap="4" w="full">
          {sectionIds.map(id => (
            <Link key={id} href={`#${id}`} color={active === id ? 'accent' : 'muted'} fontWeight="bold"
              aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>
              {data.ui.sections[id]}
            </Link>
          ))}
          <LanguageSwitcher />
        </Stack>
      </Flex>
    </Box>
  );
}
