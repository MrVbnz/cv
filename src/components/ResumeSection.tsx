import { Box, Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import type { SectionId } from '../data/types';
import { useLocale } from '../i18n/LocaleProvider';

export function ResumeSection({ id, children }: { id: SectionId; children: ReactNode }) {
  const { data } = useLocale();
  return (
    <Box as="section" id={id} aria-labelledby={`${id}-heading`} py={{ base: '12', lg: '20' }} borderBottomWidth="1px" borderColor="line">
      {id !== 'about' && <Heading id={`${id}-heading`} as="h2" size="3xl" mb="10">{data.ui.sections[id]}</Heading>}
      {children}
    </Box>
  );
}
