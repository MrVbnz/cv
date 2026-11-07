import { useEffect, useState } from 'react';
import { sectionIds, type SectionId } from '../data/types';
import { getActiveSection } from '../utils/getActiveSection';

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('about');
  useEffect(() => {
    const update = () => {
      setActive(getActiveSection());
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const observer = new ResizeObserver(update);
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, []);
  return active;
}
