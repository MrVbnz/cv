import { useRef, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';
import { Hamburger } from '../Hamburger';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { SectionLinks } from './SectionLinks';

export function MobileNavigation() {
  const { data } = useLocale();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }

  // Keep the panel mounted so closing can animate before it becomes hidden.
  const hideDelay = open ? '0ms' : 'var(--navigation-duration)';

  return (
    <>
      <Box
        data-testid="menu-backdrop"
        aria-hidden="true"
        position="fixed"
        inset="0"
        zIndex="9"
        bg="blackAlpha.600"
        opacity={open ? 1 : 0}
        visibility={open ? 'visible' : 'hidden'}
        pointerEvents={open ? 'auto' : 'none'}
        onClick={closeMenu}
        transition={`opacity var(--navigation-duration) ease, visibility 0ms linear ${hideDelay}`}
        _motionReduce={{ transition: 'none' }}
      />
      <Box
        as="nav"
        aria-label={data.ui.navigation}
        position="fixed"
        zIndex="10"
        top="0"
        left="0"
        w="full"
        h="var(--header-height)"
        bg="sidebar"
        userSelect="none"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && open) closeMenu();
        }}
      >
        <Flex
          h="full"
          px="5"
          align="center"
          justify="space-between"
          position="relative"
          zIndex="1"
          bg="sidebar"
          borderBottomWidth="1px"
          borderColor="line"
        >
          <Button
            ref={toggleRef}
            variant="plain"
            boxSize="11"
            p="0"
            color="gray.400"
            aria-label={data.ui.toggleNavigation}
            aria-expanded={open}
            aria-controls="resume-navigation"
            onClick={() => setOpen(!open)}
          >
            <Hamburger open={open} />
          </Button>
          <LanguageSwitcher />
        </Flex>
        <Box
          position="absolute"
          top="full"
          left="0"
          w="full"
          overflow="hidden"
          visibility={open ? 'visible' : 'hidden'}
          pointerEvents={open ? 'auto' : 'none'}
          transition={`visibility 0ms linear ${hideDelay}`}
          _motionReduce={{ transition: 'none' }}
        >
          <Box
            id="resume-navigation"
            bg="sidebar"
            p="5"
            overflowY="auto"
            maxH="calc(100dvh - var(--header-height))"
            transform={open ? 'translateY(0)' : 'translateY(-100%)'}
            transition="transform var(--navigation-duration) cubic-bezier(.22,1,.36,1)"
            _motionReduce={{ transition: 'none' }}
          >
            <SectionLinks onSelect={() => setOpen(false)} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
