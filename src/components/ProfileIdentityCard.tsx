import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { ProfilePhotoPrint } from '@/components/ProfilePhotoPrint';
import { PozIcon } from '@/components/PozIcon';
import { ProfileData } from '@/utils/profileData';

interface ProfileIdentityCardProps {
  profile: ProfileData;
}

export const ProfileIdentityCard: React.FC<ProfileIdentityCardProps> = ({ profile }) => {
  const handleEditProfile = () => {
    Alert.alert(
      'Profili Düzenle',
      'Profil düzenleme özelliği yakında eklenecek.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  return (
    <ScrapbookCard
      bgColor={Colors.blue}
      rotation="-1deg"
      hasTape="top-left"
      tapeColor={Colors.tapeDefault}
      padding={Spacing.lg}
      style={styles.cardContainer}
    >
      <View style={styles.topCutLine} pointerEvents="none" />

      {/* Header Stamp & Serial Row */}
      <View style={styles.headerRow}>
        <PaperStamp label="MEMBER PASS" color={Colors.blueDark} rotation="2deg" />
        <Text style={styles.serialText}>{profile.serial}</Text>
      </View>

      {/* Identity Body Content */}
      <View style={styles.identityRow}>
        {/* Photo Print Avatar */}
        <ProfilePhotoPrint name={profile.name} />

        {/* User Info Details */}
        <View style={styles.infoColumn}>
          <Text style={styles.nameText}>{profile.name}</Text>
          <Text style={styles.usernameText}>{profile.username}</Text>

          <Text style={styles.bioText} numberOfLines={2}>
            “{profile.bio}”
          </Text>

          <View style={styles.metaBadgeRow}>
            <View style={styles.metaTag}>
              <Text style={styles.metaTagText}>📍 {profile.city}</Text>
            </View>
            <View style={styles.metaDaysTag}>
              <Text style={styles.metaTagText}>ÜYE: {profile.memberSince}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Edit Profile Action Link */}
      <TouchableOpacity
        activeOpacity={0.8}
        accessibilityLabel="profili düzenle"
        onPress={handleEditProfile}
        style={styles.editButton}
      >
        <PozIcon name="sparkle" size={14} color="#FFFDF9" />
        <Text style={styles.editButtonText}>profili düzenle</Text>
      </TouchableOpacity>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: Spacing.xs,
    position: 'relative',
  },
  topCutLine: {
    position: 'absolute',
    top: 0,
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: 'rgba(43, 131, 186, 0.25)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  serialText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.blueDark,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: Spacing.md,
  },
  infoColumn: {
    flex: 1,
    gap: 3,
  },
  nameText: {
    fontSize: 26,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  usernameText: {
    fontSize: 13,
    fontFamily: Fonts.mono,
    color: Colors.blueDark,
    fontWeight: '700',
  },
  bioText: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
    lineHeight: 16,
  },
  metaBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  metaText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
  },
  metaDaysTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  metaTextTag: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.blueDark,
    fontWeight: '700',
  },
  metaTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  metaTagText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.blueDark,
    fontWeight: '800',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 44,
    borderRadius: BorderRadius.md,
    gap: 6,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  editButtonText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
});
