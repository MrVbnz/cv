import { Link, Stack } from '@chakra-ui/react';
import { sectionIds } from '../../data/types';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useLocale } from '../../i18n/LocaleProvider';

export function SectionLinks({ onSelect }: { onSelect?: () => void }) {
  const { data } = useLocale();
  const active = useActiveSection();

  return (
    <Stack align={{ base: 'start', lg: 'center' }} gap="4">
      {sectionIds.map((id) => (
        <Link
          key={id}
          href={`#${id}`}
          fontWeight="bold"
          color={active === id ? 'accent' : 'muted'}
          aria-current={active === id ? 'location' : undefined}
          onClick={onSelect}
        >
          {data.ui.sections[id]}
        </Link>
      ))}
    </Stack>
  );
}
