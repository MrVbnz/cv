import { Box, Link } from '@chakra-ui/react';
import { Navigation } from './components/Navigation';
import { ResumeSection } from './components/ResumeSection';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Interests } from './components/sections/Interests';
import { useLocale } from './i18n/LocaleProvider';
import { scrollToElement } from './utils/scrollToElement';

export function App() {
  const { data } = useLocale();
  return (
    <>
      <Link
        as="button"
        type="button"
        position="fixed"
        top="-20"
        left="4"
        zIndex="20"
        bg="sidebar"
        p="3"
        color="accent"
        _focus={{ top: '4' }}
        onClick={() => scrollToElement('main-content', { focus: true })}
      >
        {data.ui.skipToContent}
      </Link>
      <Navigation />
      <Box
        as="main"
        id="main-content"
        tabIndex={-1}
        pt="var(--header-height)"
        ml={{ lg: 'var(--sidebar-width)' }}
        px={{ base: '6', md: '12', xl: '20' }}
      >
        <Box maxW="70rem">
          <ResumeSection id="about">
            <About />
          </ResumeSection>
          <ResumeSection id="skills">
            <Skills />
          </ResumeSection>
          <ResumeSection id="experience">
            <Experience />
          </ResumeSection>
          <ResumeSection id="projects">
            <Projects />
          </ResumeSection>
          <ResumeSection id="interests">
            <Interests />
          </ResumeSection>
        </Box>
      </Box>
    </>
  );
}
