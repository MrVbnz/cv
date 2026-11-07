import { useEffect, useState } from 'react';
import { sectionIds, type SectionId } from '../data/types';

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('about');
  useEffect(() => {
    const update = () => {
      const offset = Math.min(window.innerHeight * 0.3, 200);
      let current: SectionId = 'about';
      for (const id of sectionIds) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= offset) current = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = 'interests';
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return active;
}
