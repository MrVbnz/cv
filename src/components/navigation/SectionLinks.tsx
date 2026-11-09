import { Box, Link, Stack } from '@chakra-ui/react';
import { useLayoutEffect, useRef } from 'react';
import { sectionIds } from '../../data/types';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useLocale } from '../../i18n/LocaleProvider';

const minPanelHeight = '3.5rem';
const panelRadius = '1.5rem';
const indicatorWidth = '2px';

export function SectionLinks({
  proportional = false,
  onSelect,
}: {
  proportional?: boolean;
  onSelect?: () => void;
}) {
  const { data } = useLocale();
  const { active, heights } = useActiveSection(proportional);
  const gridTemplateRows = heights
    ?.map((height) => `minmax(${minPanelHeight}, ${height}fr)`)
    .join(' ');
  const listRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    const highlight = highlightRef.current;
    const link = list?.querySelector('a[aria-current="location"]');
    if (!list || !highlight || !link) return;

    const positionHighlight = () => {
      const { top, height } = link.getBoundingClientRect();
      highlight.style.transform = `translateY(${top - list.getBoundingClientRect().top}px)`;
      highlight.style.height = `calc(${height}px - 2 * ${panelRadius})`;
      highlight.style.visibility = 'visible';
    };

    positionHighlight();
    const observer = new ResizeObserver(positionHighlight);
    observer.observe(list);
    observer.observe(link);
    return () => observer.disconnect();
  }, [active, gridTemplateRows, proportional]);

  return (
    <Stack
      ref={listRef}
      align={proportional ? 'stretch' : 'start'}
      gap={proportional ? '1.5' : '4'}
      display={proportional ? 'grid' : 'flex'}
      h={proportional ? 'full' : undefined}
      position={proportional ? 'relative' : undefined}
      ps={proportional ? `calc(var(--chakra-spacing-3) + ${indicatorWidth})` : undefined}
      gridAutoRows={proportional ? `minmax(${minPanelHeight}, 1fr)` : undefined}
      style={proportional ? { gridTemplateRows } : undefined}
    >
      {proportional && heights && (
        <Box
          ref={highlightRef}
          data-testid="sidebar-section-highlight"
          aria-hidden="true"
          position="absolute"
          top={panelRadius}
          insetInlineStart="0"
          w={indicatorWidth}
          visibility="hidden"
          pointerEvents="none"
          bg="accent"
          transitionProperty="transform, height"
          transitionDuration="var(--sidebar-indicator-duration)"
          transitionTimingFunction="ease-in-out"
          _motionReduce={{ transitionDuration: '0ms' }}
        />
      )}
      {sectionIds.map((id) => (
        <Link
          key={id}
          href={`#${id}`}
          draggable={false}
          fontWeight={proportional ? 'normal' : 'bold'}
          color={active === id ? 'accent' : 'muted'}
          aria-current={active === id ? 'location' : undefined}
          onClick={onSelect}
          position={proportional ? 'relative' : undefined}
          minH={proportional ? minPanelHeight : undefined}
          px={proportional ? '4' : undefined}
          alignItems={proportional ? 'flex-start' : undefined}
          pt={proportional ? '3' : undefined}
          pb={proportional ? '2' : undefined}
          zIndex={proportional ? '1' : undefined}
          bg={proportional ? (active === id ? 'accent/12' : 'whiteAlpha.50') : undefined}
          borderRadius={proportional ? panelRadius : undefined}
          transitionProperty={proportional ? 'background-color, color' : undefined}
          transitionDuration={proportional ? 'var(--navigation-duration)' : undefined}
          transitionTimingFunction={proportional ? 'ease-out' : undefined}
          _motionReduce={proportional ? { transitionDuration: '0ms' } : undefined}
          _hover={
            proportional
              ? {
                  bg: active === id ? 'accent/18' : 'whiteAlpha.100',
                  color: active === id ? 'accent' : 'ink',
                  textDecoration: 'none',
                }
              : undefined
          }
          _focusVisible={proportional ? { outlineOffset: '-2px' } : undefined}
        >
          {data.ui.sections[id]}
        </Link>
      ))}
    </Stack>
  );
}
