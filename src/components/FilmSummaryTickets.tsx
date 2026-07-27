import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PozIcon } from '@/components/PozIcon';

interface FilmSummaryTicketsProps {
  stats?: {
    memoryDays: number;
    songCount: number;
    topMood: string;
    locationCount: number;
    topDay: string;
  };
  totalFrames?: number;
  summaryMessage?: string;
}

export const FilmSummaryTickets: React.FC<FilmSummaryTicketsProps> = ({
  stats = {
    memoryDays: 17,
    songCount: 9,
    topMood: 'huzurlu',
    locationCount: 6,
    topDay: 'cumartesi',
  },
  totalFrames = 36,
  summaryMessage = 'temmuz filmin en çok akşam saatlerinde, sahile yakın yerlerde ve huzurlu hissettiğin günlerde doldu.',
}) => {
  return (
    <View style={styles.container}>
      {/* Paper Ticket Chips Row */}
      <View style={styles.ticketsRow}>
        <View style={[styles.ticketChip, { backgroundColor: Colors.yellow, transform: [{ rotate: '-1.8deg' }] }]}>
          <PozIcon name="films" size={13} color={Colors.yellowDark} />
          <Text style={[styles.chipText, { color: Colors.yellowDark }]}>{totalFrames} KARE</Text>
        </View>

        <View style={[styles.ticketChip, { backgroundColor: Colors.blue, transform: [{ rotate: '1.2deg' }] }]}>
          <PozIcon name="calendar" size={13} color={Colors.blueDark} />
          <Text style={[styles.chipText, { color: Colors.blueDark }]}>{stats.memoryDays} ANI GÜNÜ</Text>
        </View>

        <View style={[styles.ticketChip, { backgroundColor: Colors.pink, transform: [{ rotate: '-1deg' }] }]}>
          <PozIcon name="music" size={13} color={Colors.pinkDark} />
          <Text style={[styles.chipText, { color: Colors.pinkDark }]}>{stats.songCount} ŞARKI</Text>
        </View>

        <View style={[styles.ticketChip, { backgroundColor: Colors.green, transform: [{ rotate: '2deg' }] }]}>
          <PozIcon name="sparkle" size={13} color={Colors.greenDark} />
          <Text style={[styles.chipText, { color: Colors.greenDark }]}>{stats.topMood.toUpperCase()}</Text>
        </View>
      </View>

      {/* Torn Paper Summary Note */}
      {summaryMessage ? (
        <ScrapbookCard
          bgColor="#FFFDF9"
          rotation="-0.8deg"
          hasTape="top-left"
          tapeColor={Colors.tapePink}
          hasTornEdge="bottom"
          padding={Spacing.md}
          style={styles.summaryNoteCard}
        >
          <Text style={styles.summaryNoteText}>
            “{summaryMessage}”
          </Text>
        </ScrapbookCard>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  ticketsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: Spacing.xs,
  },
  ticketChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chipText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  summaryNoteCard: {
    marginTop: Spacing.sm,
  },
  summaryNoteText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: Fonts.serif,
    fontStyle: 'italic',
    color: Colors.text,
  },
});
