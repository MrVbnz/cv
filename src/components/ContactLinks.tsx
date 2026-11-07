import { HStack, Link } from '@chakra-ui/react';
import { AssetIcon, type AssetIconName } from './AssetIcon';
import type { ContactKind } from '../data/types';
import { useLocale } from '../i18n/LocaleProvider';

const contactIcons: Record<ContactKind, AssetIconName> = {
  telegram: 'telegram',
  github: 'github',
  linkedin: 'linked-in',
};

export function ContactLinks() {
  const { data: { profile, ui } } = useLocale();

  return (
    <HStack role="group" aria-label={ui.contacts} flexWrap="wrap" gap="3">
      {profile.social.map(contact => (
        <Link key={contact.kind} href={contact.href} display="inline-flex" gap="2.5"
          minH="11" px="4" py="2" color="gray.400" borderWidth="1px" borderColor="line"
          borderRadius="full" textDecoration="none"
          _hover={{ bg: 'sidebar', color: 'gray.100', borderColor: 'gray.500' }}>
          <AssetIcon name={contactIcons[contact.kind]} />
          {contact.label}
        </Link>
      ))}
    </HStack>
  );
}
