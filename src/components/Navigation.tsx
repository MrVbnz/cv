import { useRef, useState } from 'react';
import { Box, Button, Flex, Image, Link, Stack } from '@chakra-ui/react';
import { sectionIds } from '../data/types';
import { useLocale } from '../i18n/LocaleProvider';
import { useActiveSection } from '../hooks/useActiveSection';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Hamburger } from './Hamburger';

export function Navigation() {
  const { data } = useLocale();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection();
  return (
    <>
    <Box data-testid="menu-backdrop" aria-hidden="true" position="fixed" inset="0" zIndex="9"
      bg="blackAlpha.600" display={{ base: 'block', lg: 'none' }} opacity={open ? 1 : 0}
      visibility={open ? 'visible' : 'hidden'} pointerEvents={open ? 'auto' : 'none'}
      transition={`opacity 160ms ease, visibility 0ms linear ${open ? '0ms' : '160ms'}`}
      _motionReduce={{ transition: 'none' }} onClick={() => setOpen(false)} />
    <Box as="nav" aria-label={data.ui.navigation} position="fixed" zIndex="10" top="0" left="0"
      w={{ base: 'full', lg: '17rem' }} h={{ base: 'var(--header-height)', lg: '100dvh' }} bg="sidebar"
      onKeyDown={event => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}>
      <Flex direction="column" justify={{ lg: 'center' }} align={{ lg: 'center' }} h="full"
        p={{ base: '0', lg: '5' }} gap={{ base: '0', lg: '6' }}>
        <Flex direction="row" w="full" h="var(--header-height)" flexShrink="0" px="5"
          position="relative" zIndex="1" bg="sidebar"
          align="center" justify="space-between" display={{ base: 'flex', lg: 'none' }}
          borderBottomWidth="1px" borderColor="line">
          <Button ref={toggleRef} variant="plain" boxSize="11" p="0" color="gray.400" aria-label={data.ui.toggleNavigation}
            aria-expanded={open} aria-controls="resume-navigation" onClick={() => setOpen(!open)}>
            <Hamburger open={open} />
          </Button>
          <LanguageSwitcher />
        </Flex>
        <Link href="#about" display={{ base: 'none', lg: 'block' }} borderRadius="full">
          <Image src={`${import.meta.env.BASE_URL}assets/img/profile.jpg`} alt={data.ui.portraitAlt}
            boxSize="36" objectFit="cover" borderRadius="full" borderWidth="6px" borderColor="line" />
        </Link>
        <Box position={{ base: 'absolute', lg: 'static' }} top="var(--header-height)" left="0" w="full" overflow="hidden"
          visibility={{ base: open ? 'visible' : 'hidden', lg: 'visible' }}
          pointerEvents={{ base: open ? 'auto' : 'none', lg: 'auto' }}
          transition={{ base: `visibility 0ms linear ${open ? '0ms' : '160ms'}`, lg: 'none' }} _motionReduce={{ transition: 'none' }}>
        <Stack id="resume-navigation" bg="sidebar"
          transform={{ base: open ? 'translateY(0)' : 'translateY(-100%)', lg: 'none' }}
          transition={{ base: 'transform 160ms cubic-bezier(.22,1,.36,1)', lg: 'none' }} _motionReduce={{ transition: 'none' }}
          align={{ base: 'start', lg: 'center' }} gap="4" w="full" p={{ base: '5', lg: '0' }}
          maxH={{ base: 'calc(100dvh - var(--header-height))', lg: 'none' }} overflowY="auto">
          {sectionIds.map(id => (
            <Link key={id} href={`#${id}`} color={active === id ? 'accent' : 'muted'} fontWeight="bold"
              aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>
              {data.ui.sections[id]}
            </Link>
          ))}
        </Stack>
        </Box>
        <Flex display={{ base: 'none', lg: 'flex' }}
          position={{ lg: 'absolute' }} bottom={{ lg: '5' }} left={{ lg: '0' }}
          w="full" justify={{ base: 'start', lg: 'center' }}>
          <LanguageSwitcher />
        </Flex>
      </Flex>
    </Box>
    </>
  );
}
