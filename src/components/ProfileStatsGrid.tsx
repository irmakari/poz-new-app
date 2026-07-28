import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
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
      <SectionTitle title="küçük istatistikler" categoryLabel="ANALOG STATS" code="STAT-35MM" stamp="VERIFIED" />

      {/* 2-Column Organic Grid */}
      <View style={styles.gridRow}>
        {/* 1. Film Rolls Label (Paper Cream Card) */}
        <ScrapbookCard
          bgColor={Colors.paper}
          rotation="-2deg"
          hasTape="top-left"
          tapeColor={Colors.tapeDefault}
          padding={Spacing.sm}
          style={styles.statCell}
        >
          <View style={styles.cellHeader}>
            <PozIcon name="films" size={16} color={Colors.mustard} />
            <Text style={[styles.cellCode, { color: Colors.mustard }]}>FILMS</Text>
          </View>
          <Text style={[styles.statValueText, { color: Colors.ink }]}>{stats.filmCount}</Text>
          <Text style={[styles.statLabelText, { color: Colors.textSecondary }]}>FİLM KUTUSU</Text>
        </ScrapbookCard>

        {/* 2. Negative Frames Ticket (Deep Navy Card) */}
        <ScrapbookCard
          bgColor={Colors.deepNavy}
          rotation="1.8deg"
          hasTape="top-right"
          tapeColor={Colors.tapeBlue}
          padding={Spacing.sm}
          style={styles.statCell}
        >
          <View style={styles.cellHeader}>
            <PozIcon name="photo" size={16} color={Colors.filmBlue} />
            <Text style={[styles.cellCode, { color: Colors.filmBlue }]}>FRAMES</Text>
          </View>
          <Text style={[styles.statValueText, { color: '#F4ECE2' }]}>{stats.frameCount}</Text>
          <Text style={[styles.statLabelText, { color: Colors.filmBlue }]}>ÇEKİLEN KARE</Text>
        </ScrapbookCard>

        {/* 3. Cassette Songs Tag (Burgundy Card) */}
        <ScrapbookCard
          bgColor={Colors.burgundy}
          rotation="1.5deg"
          hasTape="top-left"
          tapeColor={Colors.tapeDefault}
          padding={Spacing.sm}
          style={styles.statCell}
        >
          <View style={styles.cellHeader}>
            <PozIcon name="music" size={16} color="#F4ECE2" />
            <Text style={[styles.cellCode, { color: '#F4ECE2' }]}>AUDIO</Text>
          </View>
          <Text style={[styles.statValueText, { color: '#F4ECE2' }]}>{stats.songCount}</Text>
          <Text style={[styles.statLabelText, { color: 'rgba(244, 236, 226, 0.75)' }]}>EKLENEN ŞARKI</Text>
        </ScrapbookCard>

        {/* 4. Date Stamp Memories (Olive Card) */}
        <ScrapbookCard
          bgColor={Colors.olive}
          rotation="-1.5deg"
          hasTape="top-right"
          tapeColor={Colors.tapeLavender}
          padding={Spacing.sm}
          style={styles.statCell}
        >
          <View style={styles.cellHeader}>
            <PozIcon name="calendar" size={16} color="#F4ECE2" />
            <Text style={[styles.cellCode, { color: '#F4ECE2' }]}>DAYS</Text>
          </View>
          <Text style={[styles.statValueText, { color: '#F4ECE2' }]}>{stats.memoryDayCount}</Text>
          <Text style={[styles.statLabelText, { color: 'rgba(244, 236, 226, 0.75)' }]}>ANI GÜNÜ</Text>
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
    letterSpacing: -0.5,
  },
  statLabelText: {
    fontSize: 9.5,
    fontFamily: Fonts.mono,
    marginTop: 1,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
});
