import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';
import { DayMemory } from '@/utils/calendarUtils';

interface SelectedDayCardProps {
  fullDateString: string; // e.g. "2026-07-27"
  memory?: DayMemory;
}

export const SelectedDayCard: React.FC<SelectedDayCardProps> = ({
  fullDateString,
  memory,
}) => {
  const router = useRouter();

  // Format fullDateString to Turkish date (e.g., "27 temmuz, pazartesi")
  const formatDateTitle = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const dayNum = parseInt(parts[2], 10);

    const monthNames = [
      'ocak', 'şubat', 'mart', 'nisan', 'mayıs', 'haziran',
      'temmuz', 'ağustos', 'eylül', 'ekim', 'kasım', 'aralık',
    ];

    const jsDate = new Date(parseInt(year, 10), monthIndex, dayNum);
    const dayNames = ['pazar', 'pazartesi', 'salı', 'çarşamba', 'perşembe', 'cuma', 'cumartesi'];

    return `${dayNum} ${monthNames[monthIndex] || ''}, ${dayNames[jsDate.getDay()] || ''}`;
  };

  const handleOpenDay = () => {
    router.push({
      pathname: '/day/[date]',
      params: { date: fullDateString },
    });
  };

  const hasAnyMemory = memory && (
    (memory.photos || 0) > 0 ||
    (memory.notes || 0) > 0 ||
    (memory.songs || 0) > 0 ||
    !!memory.mood
  );

  return (
    <ScrapbookCard
      bgColor="#FFFDF9"
      rotation="-1deg"
      hasTape="top-left"
      tapeColor={Colors.tapeLavender}
      hasTornEdge="bottom"
      padding={Spacing.lg}
      style={styles.containerCard}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.dayTitleText}>{formatDateTitle(fullDateString)}</Text>
          <Text style={styles.subText}>
            {hasAnyMemory
              ? 'bugün filmine anılar ekledin.'
              : 'bu güne henüz anı eklenmedi.'}
          </Text>
        </View>

        <PaperStamp
          label={fullDateString.replace(/-/g, '.')}
          color={Colors.stampRed}
          rotation="3deg"
        />
      </View>

      {/* Memory Chips Row */}
      {hasAnyMemory ? (
        <View style={styles.chipsContainer}>
          {memory?.photos ? (
            <View style={[styles.memoryTicketChip, { backgroundColor: Colors.lavender }]}>
              <PozIcon name="photo" size={14} color={Colors.lavenderDark} />
              <Text style={[styles.chipText, { color: Colors.lavenderDark }]}>
                {memory.photos} KARE
              </Text>
            </View>
          ) : null}

          {memory?.notes ? (
            <View style={[styles.memoryTicketChip, { backgroundColor: Colors.yellow }]}>
              <PozIcon name="mail" size={14} color={Colors.yellowDark} />
              <Text style={[styles.chipText, { color: Colors.yellowDark }]}>
                {memory.notes} NOT
              </Text>
            </View>
          ) : null}

          {memory?.songs ? (
            <View style={[styles.memoryTicketChip, { backgroundColor: Colors.pink }]}>
              <PozIcon name="music" size={14} color={Colors.pinkDark} />
              <Text style={[styles.chipText, { color: Colors.pinkDark }]}>
                {memory.songs} ŞARKI
              </Text>
            </View>
          ) : null}

          {memory?.mood ? (
            <View style={[styles.memoryTicketChip, { backgroundColor: Colors.green }]}>
              <PozIcon name="sparkle" size={14} color={Colors.greenDark} />
              <Text style={[styles.chipText, { color: Colors.greenDark }]}>
                {memory.mood.toUpperCase()}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {/* Mini Preview Collage */}
      {hasAnyMemory ? (
        <View style={styles.previewCollageBox}>
          <TapeDecoration position="top-right" width={32} height={10} color={Colors.tapeDefault} />
          
          <View style={styles.previewRow}>
            {memory?.noteText ? (
              <View style={styles.yellowNoteSnippet}>
                <Text style={styles.snippetText} numberOfLines={2}>
                  “{memory.noteText}”
                </Text>
              </View>
            ) : null}

            {memory?.songText ? (
              <View style={styles.pinkSongSnippet}>
                <PozIcon name="music" size={14} color={Colors.pinkDark} />
                <Text style={styles.songSnippetText} numberOfLines={1}>
                  {memory.songText}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      ) : null}

      {/* CTA Button */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handleOpenDay}
        style={styles.openDayButton}
      >
        <Text style={styles.openDayButtonText}>günü aç</Text>
        <PozIcon name="arrow-right" size={18} color="#FFFDF6" />
      </TouchableOpacity>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    marginVertical: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  dayTitleText: {
    fontSize: 22,
    color: Colors.text,
    fontFamily: Fonts.serif,
    letterSpacing: -0.3,
  },
  subText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.sans,
    marginTop: 2,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing.md,
  },
  memoryTicketChip: {
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
  previewCollageBox: {
    backgroundColor: 'rgba(28, 26, 36, 0.03)',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
    position: 'relative',
  },
  previewRow: {
    gap: 8,
  },
  yellowNoteSnippet: {
    backgroundColor: Colors.yellow,
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  snippetText: {
    fontSize: 12,
    fontFamily: Fonts.serif,
    fontStyle: 'italic',
    color: Colors.text,
  },
  pinkSongSnippet: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.pink,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  songSnippetText: {
    fontSize: 12,
    fontFamily: Fonts.sansSemiBold,
    color: Colors.pinkDark,
  },
  openDayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520', // Dark mürdüm
    height: 52,
    borderRadius: BorderRadius.md,
    gap: 8,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  openDayButtonText: {
    fontSize: 15,
    color: '#FFFDF6',
    fontFamily: Fonts.sansBold,
  },
});
