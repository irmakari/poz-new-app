import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';

interface ProfileStatsGridProps {
  stats: {
    filmCount: number;
    frameCount: number;
    songCount: number;
    memoryDayCount: number;
  };
}

export const ProfileStatsGrid: React.FC<ProfileStatsGridProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="küçük istatistikler" stamp="ARCHIVE STATS" />

      {/* 2-Column Organic Grid */}
      <View style={styles.gridRow}>
        {/* 1. Film Rolls Label */}
        <ScrapbookCard
          bgColor={Colors.yellow}
          rotation="-2deg"
          hasTape="top-left"
          tapeColor={Colors.tapeDefault}
          padding={Spacing.sm}
          style={styles.statCell}
        >
          <View style={styles.cellHeader}>
            <PozIcon name="films" size={16} color={Colors.yellowDark} />
            <Text style={[styles.cellCode, { color: Colors.yellowDark }]}>FILMS</Text>
          </View>
          <Text style={styles.statValueText}>{stats.filmCount}</Text>
          <Text style={styles.statLabelText}>FİLM KUTUSU</Text>
        </ScrapbookCard>

        {/* 2. Negative Frames Ticket */}
        <ScrapbookCard
          bgColor={Colors.blue}
          rotation="1.8deg"
          hasTape="top-right"
          tapeColor={Colors.tapePink}
          padding={Spacing.sm}
          style={styles.statCell}
        >
          <View style={styles.cellHeader}>
            <PozIcon name="photo" size={16} color={Colors.blueDark} />
            <Text style={[styles.cellCode, { color: Colors.blueDark }]}>FRAMES</Text>
          </View>
          <Text style={styles.statValueText}>{stats.frameCount}</Text>
          <Text style={styles.statLabelText}>ÇEKİLEN KARE</Text>
        </ScrapbookCard>

        {/* 3. Cassette Songs Tag */}
        <ScrapbookCard
          bgColor={Colors.pink}
          rotation="1.5deg"
          hasTape="top-left"
          tapeColor={Colors.tapeDefault}
          padding={Spacing.sm}
          style={styles.statCell}
        >
          <View style={styles.cellHeader}>
            <PozIcon name="music" size={16} color={Colors.pinkDark} />
            <Text style={[styles.cellCode, { color: Colors.pinkDark }]}>AUDIO</Text>
          </View>
          <Text style={styles.statValueText}>{stats.songCount}</Text>
          <Text style={styles.statLabelText}>EKLENEN ŞARKI</Text>
        </ScrapbookCard>

        {/* 4. Date Stamp Memories */}
        <ScrapbookCard
          bgColor={Colors.green}
          rotation="-1.5deg"
          hasTape="top-right"
          tapeColor={Colors.tapeLavender}
          padding={Spacing.sm}
          style={styles.statCell}
        >
          <View style={styles.cellHeader}>
            <PozIcon name="calendar" size={16} color={Colors.greenDark} />
            <Text style={[styles.cellCode, { color: Colors.greenDark }]}>DAYS</Text>
          </View>
          <Text style={styles.statValueText}>{stats.memoryDayCount}</Text>
          <Text style={styles.statLabelText}>ANI GÜNÜ</Text>
        </ScrapbookCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 4,
  },
  statCell: {
    width: '48%',
    padding: Spacing.sm,
  },
  cellHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cellCode: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
  },
  statValueText: {
    fontSize: 28,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  statLabelText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    marginTop: 1,
    letterSpacing: 0.5,
  },
});
