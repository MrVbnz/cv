import { Box, Heading, List, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';

export function Skills() {
  const { data } = useLocale();
  const skills = data.skills.map((skill, order) => ({ ...skill, order }));

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="10">
      {[0, 1].map((column) => (
        <Stack key={column} display={{ base: 'contents', md: 'flex' }} gap="6">
          {skills
            .filter(({ order }) => order % 2 === column)
            .map((skill) => (
              <Box key={skill.id} order={{ base: skill.order, md: 0 }}>
                <Heading as="h3" size="xl" mb={{ base: '5', md: '3' }}>
                  {skill.title}
                </Heading>
                <Stack gap={{ base: '5', md: '3' }}>
                  {skill.groups.map((group, index) => (
                    <Box key={index}>
                      {group.title && (
                        <Text fontSize="sm" fontWeight="medium" color="muted" mb="2">
                          {group.title}
                        </Text>
                      )}
                      {'items' in group ? (
                        <List.Root ps="5" gap={{ base: '1', md: '0' }} color="muted">
                          {group.items.map((item) => (
                            <List.Item key={item}>{item}</List.Item>
                          ))}
                        </List.Root>
                      ) : (
                        <Text color="muted">{group.text}</Text>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))}
        </Stack>
      ))}
    </SimpleGrid>
  );
}
