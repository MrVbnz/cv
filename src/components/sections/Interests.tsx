import { Text } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';

export function Interests() {
  const { data } = useLocale();
  return (
    <Text color="muted" lineHeight="1.8">
      {data.interests}
    </Text>
  );
}
