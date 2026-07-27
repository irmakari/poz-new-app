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

  return (
    <View style={styles.container}>
      <SectionTitle title={`${monthName} nasıl hissettirdi?`} stamp="MOOD TEST" />

      {/* Sticker Tags Group */}
      <View style={styles.stickersContainer}>
        {moods.map((item, index) => {
          const rotation = index % 2 === 0 ? '-2deg' : '2.2deg';
          const isTop = index === 0;
          return (
            <View
              key={item.mood}
              style={[
                styles.stickerTag,
                { backgroundColor: item.color, transform: [{ rotate: rotation }] },
                isTop && styles.topStickerTag,
              ]}
            >
              <PozIcon name="sparkle" size={isTop ? 18 : 14} color={Colors.text} />
              <Text style={[styles.stickerMoodText, isTop && styles.topStickerMoodText]}>
                {item.mood}
              </Text>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{item.count} GÜN</Text>
              </View>
            </View>
          );
        })}
      </View>

      <Text style={styles.dominantSummaryText}>
        bu filmin baskın hissi <Text style={styles.boldText}>{topMood}</Text>.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  stickersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
    marginBottom: Spacing.sm,
  },
  stickerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.sm,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  topStickerTag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  stickerMoodText: {
    fontSize: 13,
    fontFamily: Fonts.sansExtraBold,
    color: Colors.text,
  },
  topStickerMoodText: {
    fontSize: 17,
  },
  countBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  countBadgeText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    color: Colors.text,
  },
  dominantSummaryText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  boldText: {
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
});
