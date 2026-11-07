import { Box } from '@chakra-ui/react';

export function Hamburger({ open }: { open: boolean }) {
  const line = {
    position: 'absolute',
    left: '0',
    w: '6',
    h: '2px',
    bg: 'currentColor',
    borderRadius: 'full',
    transition:
      'transform var(--navigation-duration) ease, opacity var(--navigation-duration) ease',
    _motionReduce: { transition: 'none' },
  } as const;

  return (
    <Box aria-hidden="true" position="relative" boxSize="6">
      <Box
        as="span"
        {...line}
        top="5px"
        transform={open ? 'translateY(6px) rotate(45deg)' : 'none'}
      />
      <Box as="span" {...line} top="11px" opacity={open ? 0 : 1} />
      <Box
        as="span"
        {...line}
        top="17px"
        transform={open ? 'translateY(-6px) rotate(-45deg)' : 'none'}
      />
    </Box>
  );
}
