import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { createScrollGradient } from '../utils/createScrollGradient';

export function ScrollGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const surface = canvasRef.current;
    if (!surface) return;
    let renderer = createScrollGradient(surface);
    if (!renderer) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let contextLost = false;

    const draw = () => {
      frame = 0;
      if (document.hidden || contextLost || !renderer) return;
      // Blend the horizontal footprint between portrait 9:16 and landscape 16:9.
      const aspectRatio = window.innerWidth / Math.max(1, window.innerHeight);
      const landscapeWeight = Math.max(0, Math.min(1, (aspectRatio - 9 / 16) / (16 / 9 - 9 / 16)));
      surface.style.width = `${70 - 28 * landscapeWeight}%`;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = motion.matches || distance <= 0 ? 0 : window.scrollY / distance;
      renderer.draw(Math.max(0, Math.min(1, progress)));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      surface.style.visibility = 'hidden';
    };
    const onContextRestored = () => {
      renderer = createScrollGradient(surface);
      contextLost = false;
      schedule();
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(surface);
    observer.observe(document.documentElement);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', schedule);
    surface.addEventListener('webglcontextlost', onContextLost);
    surface.addEventListener('webglcontextrestored', onContextRestored);
    schedule();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      motion.removeEventListener('change', schedule);
      surface.removeEventListener('webglcontextlost', onContextLost);
      surface.removeEventListener('webglcontextrestored', onContextRestored);
      renderer?.dispose();
    };
  }, []);

  return (
    <Box
      aria-hidden="true"
      position="fixed"
      top="var(--header-height)"
      bottom="0"
      left={{ base: '0', lg: 'var(--sidebar-width)' }}
      right="0"
      zIndex="0"
      pointerEvents="none"
      overflow="hidden"
      css={{ '@media print': { display: 'none' } }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '42%',
          height: '100%',
          visibility: 'hidden',
          display: 'block',
        }}
      />
    </Box>
  );
}
