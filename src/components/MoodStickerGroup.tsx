import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { FilmMood } from '@/utils/filmData';

interface MoodStickerGroupProps {
  moods?: FilmMood[];
  monthName?: string;
}

export const MoodStickerGroup: React.FC<MoodStickerGroupProps> = ({
  moods = [
    { mood: 'huzurlu', count: 8, color: Colors.green },
    { mood: 'mutlu', count: 5, color: Colors.yellow },
    { mood: 'yorgun', count: 3, color: Colors.blue },
    { mood: 'özlemli', count: 1, color: Colors.pink },
  ],
  monthName = 'temmuz',
}) => {
  const topMood = moods[0]?.mood || 'huzurlu';
  const totalDays = moods.reduce((sum, item) => sum + item.count, 0);
  const leadMood = moods[0];

  return (
    <View style={styles.container}>
      <SectionTitle title={`${monthName} nasıl hissettirdi?`} stamp="MOOD TEST" />

      <View style={[styles.moodBoard, { backgroundColor: leadMood?.color || '#8C9BF6' }]}>
        <Text style={styles.backdropText}>HİS</Text>

        <View style={styles.boardHeader}>
          <View style={styles.iconBubble}>
            <PozIcon name="sparkle" size={18} color={Colors.text} />
          </View>
          <View style={styles.summaryPill}>
            <Text style={styles.summaryPillText}>{totalDays} GÜN</Text>
          </View>
        </View>

        <Text style={styles.boardLabel}>Baskın His</Text>
        <Text style={styles.boardTitle} numberOfLines={1}>{topMood}</Text>
        <Text style={styles.boardCopy} numberOfLines={2}>
          bu filmin duygusu en çok burada toplanmış.
        </Text>

        <View style={styles.moodChips}>
          {moods.map((item, index) => (
            <View
              key={item.mood}
              style={[
                styles.moodChip,
                index === 0 && styles.activeMoodChip,
              ]}
            >
              <Text style={[styles.moodChipLabel, index === 0 && styles.activeMoodChipLabel]} numberOfLines={1}>
                {item.mood}
              </Text>
              <Text style={[styles.moodChipCount, index === 0 && styles.activeMoodChipLabel]}>
                {item.count}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  moodBoard: {
    minHeight: 218,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 7,
    elevation: 3,
  },
  boardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  summaryPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  summaryPillText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    fontWeight: '900',
    color: Colors.text,
  },
  boardLabel: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: Colors.text,
    marginBottom: 3,
  },
  boardTitle: {
    fontSize: 31,
    lineHeight: 35,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
  },
  boardCopy: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
    marginTop: 5,
    maxWidth: '78%',
  },
  moodChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
  },
  moodChip: {
    minWidth: 68,
    minHeight: 54,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 9,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  activeMoodChip: {
    backgroundColor: Colors.text,
    borderColor: Colors.text,
  },
  moodChipLabel: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
    textTransform: 'capitalize',
  },
  moodChipCount: {
    fontSize: 17,
    lineHeight: 19,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
  },
  activeMoodChipLabel: {
    color: '#FFFFFF',
  },
  backdropText: {
    position: 'absolute',
    right: 8,
    top: 54,
    fontSize: 78,
    lineHeight: 82,
    fontFamily: Fonts.sansBlack,
    color: 'rgba(255, 255, 255, 0.18)',
  },
});
