import { Image } from '@chakra-ui/react';

export type AssetIconName = 'github' | 'telegram' | 'linked-in';

export function AssetIcon({ name }: { name: AssetIconName }) {
  const path = `${import.meta.env.BASE_URL}assets/icons/${name}`;

  return (
    <Image
      src={`${path}-24px.png`}
      srcSet={`${path}-24px.png 24w, ${path}-48px.png 48w, ${path}-64px.png 64w`}
      sizes="24px"
      width="24"
      height="24"
      boxSize="24px"
      flexShrink="0"
      display="block"
      alt=""
      aria-hidden="true"
    />
  );
}
