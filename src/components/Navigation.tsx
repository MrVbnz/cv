import { useBreakpointValue } from '@chakra-ui/react';
import { DesktopNavigation } from './navigation/DesktopNavigation';
import { MobileNavigation } from './navigation/MobileNavigation';

export function Navigation() {
  const isDesktop = useBreakpointValue({ base: false, lg: true }, { ssr: false });
  return isDesktop ? <DesktopNavigation /> : <MobileNavigation />;
}
