import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';

export function Projects() {
  const { data } = useLocale();
  return (
    <Stack gap="12">
      {data.projects.map((group) => (
        <Box key={group.id}>
          <Heading as="h3" size="2xl" mb="7">
            {group.title}
          </Heading>
          <Stack gap="8">
            {group.items.map((project) => (
              <Box
                as="article"
                key={project.id}
                borderLeftWidth="2px"
                borderColor="line"
                pl={{ base: '4', md: '6' }}
              >
                <Heading as="h4" size="xl" mb="4">
                  {project.title}
                </Heading>
                <Stack gap="2" mb="4">
                  {project.technologies.map((tech) => (
                    <Text key={tech.label} color="muted">
                      <Text as="strong" color="ink">
                        {tech.label}:{' '}
                      </Text>
                      {tech.value}
                    </Text>
                  ))}
                </Stack>
                <Stack gap="3">
                  {project.paragraphs.map((paragraph, index) => (
                    <Text key={index} lineHeight="1.8" color="muted">
                      {paragraph}
                    </Text>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
