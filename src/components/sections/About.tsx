import { Heading, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { useLocale } from '../../i18n/LocaleProvider';

export function About() {
  const { data: { profile } } = useLocale();
  return (
    <Stack gap="7" py={{ lg: '12' }}>
      <Heading id="about-heading" as="h1" fontSize={{ base: '4xl', md: '6xl' }} lineHeight="1.15" letterSpacing="tight">
        {profile.surname} <Text as="span" color="accent">{profile.givenName}</Text>
      </Heading>
      <Link href={`mailto:${profile.email}`} color="accent" w="fit-content">{profile.email}</Link>
      <Text color="muted">{profile.location}</Text>
      <Text fontSize="lg" lineHeight="1.8" maxW="55rem">{profile.summary}</Text>
      <HStack flexWrap="wrap" gap="5">
        {profile.social.map(link => <Link key={link.href} href={link.href} color="accent">{link.label}</Link>)}
      </HStack>
    </Stack>
  );
}
