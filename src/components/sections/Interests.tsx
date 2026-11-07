import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';

export function Interests() {
  const { data } = useLocale();
  return <Stack gap="7">{data.interests.map(interest => (
    <Box key={interest.id}>
      <Heading as="h3" size="xl" mb="3">{interest.title}</Heading>
      <Text color="muted" lineHeight="1.8">{interest.description}</Text>
    </Box>
  ))}</Stack>;
}
