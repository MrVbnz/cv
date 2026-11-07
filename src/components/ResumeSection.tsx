import { Box, Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import type { SectionId } from '../data/types';
import { useLocale } from '../i18n/LocaleProvider';

export function ResumeSection({ id, children }: { id: SectionId; children: ReactNode }) {
  const { data } = useLocale();
  return (
    <Box as="section" id={id} aria-labelledby={`${id}-heading`} minH="calc(100dvh - var(--header-height))"
      position="relative" display="flex" alignItems="center"
      _after={{ content: '""', position: 'absolute', bottom: '0', insetInline: '0', h: '1px', bg: 'line', pointerEvents: 'none' }}>
      <Box w="full" py={{ base: '8', lg: '10' }}>
        {id !== 'about' && <Heading id={`${id}-heading`} as="h2" size="3xl" mb="10">{data.ui.sections[id]}</Heading>}
        {children}
      </Box>
    </Box>
  );
}
