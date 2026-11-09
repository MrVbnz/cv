import { Heading, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { ContactLinks } from '../ContactLinks';
import { useLocale } from '../../i18n/LocaleProvider';

export function About() {
  const {
    data: { profile },
  } = useLocale();
  const givenName = (
    <Text as="span" color="accent">
      {profile.givenName}
    </Text>
  );
  return (
    <Stack gap="7">
      <Heading
        id="about-heading"
        as="h1"
        fontSize={{ base: '4xl', md: '6xl' }}
        fontWeight="500"
        textTransform="uppercase"
        lineHeight="1.15"
        letterSpacing="tight"
      >
        {profile.givenNameFirst ? (
          <>
            {givenName} {profile.surname}
          </>
        ) : (
          <>
            {profile.surname} {givenName}
          </>
        )}
      </Heading>
      <HStack flexWrap="wrap" columnGap="2" rowGap="1">
        <Text color="muted">{profile.location}</Text>
        <Text as="span" color="muted" aria-hidden="true">
          ·
        </Text>
        <Link href={`mailto:${profile.email}`} color="accent" w="fit-content">
          {profile.email}
        </Link>
      </HStack>
      <Stack gap="3" maxW="55rem">
        {profile.summary.map((paragraph) => (
          <Text key={paragraph} fontSize="lg" lineHeight="1.8">
            {paragraph}
          </Text>
        ))}
      </Stack>
      <ContactLinks />
    </Stack>
  );
}
