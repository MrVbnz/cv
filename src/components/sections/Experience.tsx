import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';

export function Experience() {
  const { data } = useLocale();
  return (
    <Stack gap="9">
      {data.experience.map((job) => (
        <Flex
          key={job.id}
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          gap="3"
        >
          <Box>
            <Heading as="h3" size="xl">
              {job.role}
            </Heading>
            <Text color="muted" mt="2">
              {job.company}
            </Text>
          </Box>
          <Text color="accent" flexShrink="0">
            {job.period}
          </Text>
        </Flex>
      ))}
    </Stack>
  );
}
