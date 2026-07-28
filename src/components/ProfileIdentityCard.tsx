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
      bgColor={Colors.deepNavy}
      rotation="-1deg"
      hasTape="top-left"
      tapeColor={Colors.tapeBlue}
      padding={Spacing.lg}
      style={styles.cardContainer}
    >
      <View style={styles.topCutLine} pointerEvents="none" />

      {/* Header Stamp & Serial Row */}
      <View style={styles.headerRow}>
        <PaperStamp label="MEMBER PASS" color={Colors.stampRed} rotation="2deg" />
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
        <PozIcon name="sparkle" size={14} color="#F4ECE2" />
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
    backgroundColor: 'rgba(143, 168, 184, 0.25)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  serialText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: '#A8A0AD',
    fontWeight: '800',
    letterSpacing: 1,
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
    fontSize: 24,
    fontFamily: Fonts.sansBlack,
    color: '#F4ECE2',
    letterSpacing: -0.6,
  },
  usernameText: {
    fontSize: 13,
    fontFamily: Fonts.mono,
    color: '#8FA8B8',
    fontWeight: '700',
  },
  bioText: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: '#A8A0AD',
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
  metaTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  metaDaysTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  metaTagText: {
    fontSize: 9.5,
    fontFamily: Fonts.mono,
    color: '#F4ECE2',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.burgundy,
    height: 44,
    borderRadius: BorderRadius.md,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  editButtonText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: '#F4ECE2',
    letterSpacing: 0.3,
  },
});
