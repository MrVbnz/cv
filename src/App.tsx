import { Box, Link } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ResumeSection } from './components/ResumeSection';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Interests } from './components/sections/Interests';
import { useLocale } from './i18n/LocaleProvider';
import { sectionIds } from './data/types';
import { scrollToElement } from './utils/scrollToElement';

export function App() {
  const { data } = useLocale();
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (sectionIds.some(section => section === id) || id === 'main-content') {
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
      scrollToElement(id);
    }
  }, []);

  return <>
    <Link href="#main-content" position="fixed" top="-20" left="4" zIndex="20" bg="sidebar" p="3"
      color="accent" _focus={{ top: '4' }} onClick={event => {
        event.preventDefault();
        document.getElementById('main-content')?.focus({ preventScroll: true });
        scrollToElement('main-content');
      }}>{data.ui.skipToContent}</Link>
    <Navigation />
    <Box as="main" id="main-content" tabIndex={-1} pt="var(--header-height)"
      ml={{ lg: '17rem' }} px={{ base: '6', md: '12', xl: '20' }}>
      <Box maxW="70rem">
        <ResumeSection id="about"><About /></ResumeSection>
        <ResumeSection id="skills"><Skills /></ResumeSection>
        <ResumeSection id="experience"><Experience /></ResumeSection>
        <ResumeSection id="projects"><Projects /></ResumeSection>
        <ResumeSection id="interests"><Interests /></ResumeSection>
      </Box>
    </Box>
  </>;
}
