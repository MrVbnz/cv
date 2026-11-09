import { Box, ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { ResumeSection } from './components/ResumeSection';
import { ScrollGradient } from './components/ScrollGradient';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Education } from './components/sections/Education';
import { Interests } from './components/sections/Interests';
import { LocaleProvider } from './i18n/LocaleProvider';
import type { Locale } from './i18n/locale';
import { system } from './theme';

export function App({
  initialLocale,
  localized,
  prerendered,
}: {
  initialLocale: Locale;
  localized: boolean;
  prerendered: boolean;
}) {
  return (
    <ChakraProvider value={system}>
      <LocaleProvider initialLocale={initialLocale} localized={localized}>
        <Resume prerendered={prerendered} />
      </LocaleProvider>
    </ChakraProvider>
  );
}

function Resume({ prerendered }: { prerendered: boolean }) {
  const [interactive, setInteractive] = useState(!prerendered);

  useEffect(() => setInteractive(true), []);

  return (
    <>
      <Navigation interactive={interactive} />
      {interactive && <ScrollGradient />}
      <Box
        as="main"
        id="main-content"
        position="relative"
        zIndex="1"
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
          <ResumeSection id="education">
            <Education />
          </ResumeSection>
          <ResumeSection id="interests">
            <Interests />
          </ResumeSection>
        </Box>
      </Box>
    </>
  );
}
