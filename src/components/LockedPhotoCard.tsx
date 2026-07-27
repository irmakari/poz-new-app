import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';
import { PhotoEntry } from '@/utils/photoDetailData';

interface LockedPhotoCardProps {
  photo: PhotoEntry;
}

export const LockedPhotoCard: React.FC<LockedPhotoCardProps> = ({ photo }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Dark Negative Frame Box */}
      <View style={styles.darkFrameBox}>
        {/* Sprocket Holes Row */}
        <View style={styles.sprocketRow}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={`t-${i}`} style={styles.sprocketHole} />
          ))}
        </View>

        <View style={styles.negativeCenterContent}>
          <View style={styles.lockCircle}>
            <PozIcon name="lock" size={32} color={Colors.yellow} />
          </View>

          <PaperStamp label="DARKROOM LOCK" color={Colors.stampRed} rotation="-2deg" />

          <Text style={styles.titleText}>bu kare henüz açılmadı</Text>
          <Text style={styles.descText}>
            film karanlık odadan çıktığında bu kareyi görebileceksin.
          </Text>

          <View style={styles.infoBadgeRow}>
            <Text style={styles.badgeText}>{photo.filmTitle.toUpperCase()}</Text>
            <Text style={styles.badgeText}>KARE #{photo.frameNumber}</Text>
          </View>
        </View>

        {/* Sprocket Holes Row */}
        <View style={styles.sprocketRow}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={`b-${i}`} style={styles.sprocketHole} />
          ))}
        </View>
      </View>

      {/* Return to Film Action */}
      <TouchableOpacity
        activeOpacity={0.88}
        accessibilityLabel="filme dön"
        onPress={() => router.back()}
        style={styles.returnButton}
      >
        <PozIcon name="arrow-right" size={16} color="#FFFDF9" />
        <Text style={styles.returnButtonText}>filme dön</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
    gap: Spacing.md,
  },
  darkFrameBox: {
    backgroundColor: '#16141D',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  sprocketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginVertical: 4,
  },
  sprocketHole: {
    width: 8,
    height: 5,
    backgroundColor: 'rgba(250, 246, 238, 0.75)',
    borderRadius: 1.5,
  },
  negativeCenterContent: {
    backgroundColor: '#201C2B',
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
    alignItems: 'center',
    marginVertical: Spacing.xs,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  lockCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 20,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: '#FFFDF6',
    marginTop: 4,
    textAlign: 'center',
  },
  descText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.lavender,
    textAlign: 'center',
    lineHeight: 18,
  },
  infoBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  badgeText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 52,
    borderRadius: BorderRadius.md,
    gap: 8,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  returnButtonText: {
    fontSize: 15,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
});
