import { useEffect, useState } from 'react';
import { sectionIds, type SectionId } from '../data/types';
import { getActiveSection } from '../utils/getActiveSection';

export function useActiveSection(measureHeights: boolean) {
  const [active, setActive] = useState<SectionId>('about');
  const [heights, setHeights] = useState<number[]>();

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id));
    const updateActive = () => setActive(getActiveSection());
    const updateLayout = () => {
      updateActive();
      if (!measureHeights) return;
      const next = sections.map((section) => section?.getBoundingClientRect().height || 1);
      setHeights((previous) =>
        previous?.every((height, i) => height === next[i]) ? previous : next,
      );
    };
    updateLayout();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    const observer = new ResizeObserver(updateLayout);
    for (const section of sections) {
      if (section) observer.observe(section);
    }
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
      observer.disconnect();
    };
  }, [measureHeights]);

  return { active, heights };
}
