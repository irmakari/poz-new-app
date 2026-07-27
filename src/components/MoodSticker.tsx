import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PozIcon } from '@/components/PozIcon';

interface MoodStickerProps {
  mood: string;
  moodSubtext?: string;
}

export const MoodSticker: React.FC<MoodStickerProps> = ({
  mood,
  moodSubtext = 'akşam saatlerinde daha sakin hissettin.',
}) => {
  return (
    <ScrapbookCard
      bgColor={Colors.green}
      rotation="-2deg"
      hasTape="top-right"
      tapeColor={Colors.tapeDefault}
      padding={Spacing.md}
      style={styles.containerCard}
    >
      <View style={styles.cardHeaderRow}>
        <View style={styles.tagHeaderGroup}>
          <PozIcon name="sparkle" size={18} color={Colors.greenDark} />
          <Text style={styles.tagTitle}>bugün nasıl hissettin?</Text>
        </View>

        <View style={styles.dashedStickerBadge}>
          <Text style={styles.badgeText}>★ MOOD LOG</Text>
        </View>
      </View>

      <View style={styles.contentBody}>
        <Text style={styles.moodValueText}>{mood}</Text>
        {moodSubtext ? (
          <Text style={styles.moodSubtext}>{moodSubtext}</Text>
        ) : null}
      </View>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    marginVertical: Spacing.xs,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  tagHeaderGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagTitle: {
    fontSize: 12,
    color: Colors.greenDark,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  dashedStickerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.greenDark,
    borderStyle: 'dashed',
  },
  badgeText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
    color: Colors.greenDark,
  },
  contentBody: {
    marginTop: 4,
  },
  moodValueText: {
    fontSize: 26,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  moodSubtext: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
