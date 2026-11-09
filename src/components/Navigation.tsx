import { Box, useBreakpointValue } from '@chakra-ui/react';
import { DesktopNavigation } from './navigation/DesktopNavigation';
import { MobileNavigation } from './navigation/MobileNavigation';

export function Navigation({ interactive }: { interactive: boolean }) {
  if (interactive) return <InteractiveNavigation />;

  return (
    <>
      <Box hideFrom="lg">
        <MobileNavigation />
      </Box>
      <Box hideBelow="lg">
        <DesktopNavigation />
      </Box>
    </>
  );
}

function InteractiveNavigation() {
  const isDesktop = useBreakpointValue({ base: false, lg: true }, { ssr: false });
  return isDesktop ? <DesktopNavigation /> : <MobileNavigation />;
}
