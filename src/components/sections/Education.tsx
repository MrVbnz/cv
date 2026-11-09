import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';

export function Education() {
  const { data } = useLocale();
  return (
    <Stack gap="7">
      {data.education.map((entry) => (
        <Box key={entry.title}>
          <Heading as="h3" size="xl" mb="3">
            {entry.title}
          </Heading>
          <Text color="muted" lineHeight="1.8">
            {entry.description}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}
