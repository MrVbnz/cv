import { Box, Heading, List, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';

export function Skills() {
  const { data } = useLocale();
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="10">
      {data.skills.map((skill) => (
        <Box key={skill.id}>
          <Heading as="h3" size="xl" mb="5">
            {skill.title}
          </Heading>
          <Stack gap="5">
            {skill.groups.map((group, index) => (
              <Box key={index}>
                {group.title && (
                  <Text fontSize="sm" fontWeight="medium" color="muted" mb="2">
                    {group.title}
                  </Text>
                )}
                <List.Root ps="5" gap="1" color="muted">
                  {group.items.map((item) => (
                    <List.Item key={item}>{item}</List.Item>
                  ))}
                </List.Root>
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  );
}
