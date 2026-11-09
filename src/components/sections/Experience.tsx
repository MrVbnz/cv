import { Box, Flex, Heading, Link, List, Stack, Text } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';

export function Experience() {
  const { data } = useLocale();
  return (
    <Stack gap="9">
      {data.experience.map((job) => (
        <Box key={job.id}>
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" gap="3">
            <Box>
              <Heading as="h3" size="xl">
                {job.role}
              </Heading>
              <Text color="muted" mt="2">
                <Link href={job.companyUrl} color="inherit" _hover={{ color: 'accent' }}>
                  {job.company}
                </Link>
              </Text>
            </Box>
            <Text color="accent" flexShrink="0">
              {job.period}
            </Text>
          </Flex>
          <List.Root ps="5" mt="3" gap="1" color="muted">
            {data.projects
              .find((group) => group.id === job.id)
              ?.items.map(
                (project) =>
                  project.experienceSummary && (
                    <List.Item key={project.id}>
                      <Link href={`#${project.id}`} color="accent" textDecoration="underline">
                        {project.experienceSummary.title ?? project.title}
                      </Link>
                      {' · '}
                      {project.experienceSummary.contribution}
                    </List.Item>
                  ),
              )}
          </List.Root>
        </Box>
      ))}
    </Stack>
  );
}
