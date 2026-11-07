import { Link, Stack } from '@chakra-ui/react';
import { sectionIds, type SectionId } from '../../data/types';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useLocale } from '../../i18n/LocaleProvider';

export function SectionLinks({ onSelect }: { onSelect: (id: SectionId) => void }) {
  const { data } = useLocale();
  const active = useActiveSection();

  return (
    <Stack align={{ base: 'start', lg: 'center' }} gap="4">
      {sectionIds.map((id) => (
        <Link
          as="button"
          type="button"
          key={id}
          fontWeight="bold"
          color={active === id ? 'accent' : 'muted'}
          aria-current={active === id ? 'location' : undefined}
          onClick={() => onSelect(id)}
        >
          {data.ui.sections[id]}
        </Link>
      ))}
    </Stack>
  );
}
