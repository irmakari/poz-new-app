import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { DayHeader } from '@/components/DayHeader';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
import { PhotoPrint } from '@/components/PhotoPrint';
import { JournalNoteCard } from '@/components/JournalNoteCard';
import { SongTicket } from '@/components/SongTicket';
import { MoodSticker } from '@/components/MoodSticker';
import { DayDetailsReceipt } from '@/components/DayDetailsReceipt';
import { EmptyDayView } from '@/components/EmptyDayView';
import { PozIcon } from '@/components/PozIcon';
import { DAY_ENTRIES } from '@/utils/dayData';

export default function DayDetailScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const dateStr = date || '2026-07-27';
  const entry = DAY_ENTRIES[dateStr];

  const handleEditAll = () => {
    Alert.alert(
      'Anılarını Düzenle',
      'Düzenleme özelliği yakında eklenecek.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Anıyı Sil',
      'Silme özelliği henüz aktif değil.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  // Helper to format date if no entry exists
  const formatFallbackTitle = (dStr: string) => {
    const parts = dStr.split('-');
    if (parts.length < 3) return { title: dStr, sub: '2026', stamp: dStr };
    const monthNames = [
      'ocak', 'şubat', 'mart', 'nisan', 'mayıs', 'haziran',
      'temmuz', 'ağustos', 'eylül', 'ekim', 'kasım', 'aralık',
    ];
    const mIdx = parseInt(parts[1], 10) - 1;
    const dayNum = parseInt(parts[2], 10);
    const jsDate = new Date(parseInt(parts[0], 10), mIdx, dayNum);
    const dayNames = ['pazar', 'pazartesi', 'salı', 'çarşamba', 'perşembe', 'cuma', 'cumartesi'];

    return {
      title: `${dayNum} ${monthNames[mIdx] || ''}`,
      sub: `${dayNames[jsDate.getDay()] || ''} · ${parts[0]}`,
      stamp: `${String(dayNum).padStart(2, '0')} ${monthNames[mIdx]?.slice(0, 3).toUpperCase()} ${parts[0]}`,
    };
  };

  const fallbackData = formatFallbackTitle(dateStr);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Navigation Bar */}
        <DayHeader />

        {/* Date Hero Section */}
        <View style={styles.dateHeroCard}>
          <View style={styles.dateTitleRow}>
            <View>
              <Text style={styles.mainDateTitle}>
                {entry ? entry.dayTitle : fallbackData.title}
              </Text>

              <Text style={styles.subDateText}>
                {entry ? entry.daySubTitle : fallbackData.sub}
              </Text>
            </View>

            <PaperStamp
              label={entry ? entry.stampText : fallbackData.stamp}
              color={Colors.stampRed}
              rotation="3deg"
            />
          </View>

          {entry ? (
            <>
              <Text style={styles.summaryText}>{entry.summaryText}</Text>

              {/* Day Summary Ticket Chips */}
              <View style={styles.chipsRow}>
                {entry.photos ? (
                  <View style={[styles.ticketChip, { backgroundColor: Colors.lavender, transform: [{ rotate: '-1.5deg' }] }]}>
                    <PozIcon name="photo" size={13} color={Colors.lavenderDark} />
                    <Text style={[styles.chipText, { color: Colors.lavenderDark }]}>
                      {entry.photos.length} KARE
                    </Text>
                  </View>
                ) : null}

                {entry.note ? (
                  <View style={[styles.ticketChip, { backgroundColor: Colors.yellow, transform: [{ rotate: '1deg' }] }]}>
                    <PozIcon name="mail" size={13} color={Colors.yellowDark} />
                    <Text style={[styles.chipText, { color: Colors.yellowDark }]}>1 NOT</Text>
                  </View>
                ) : null}

                {entry.song ? (
                  <View style={[styles.ticketChip, { backgroundColor: Colors.pink, transform: [{ rotate: '-1deg' }] }]}>
                    <PozIcon name="music" size={13} color={Colors.pinkDark} />
                    <Text style={[styles.chipText, { color: Colors.pinkDark }]}>1 ŞARKI</Text>
                  </View>
                ) : null}

                {entry.mood ? (
                  <View style={[styles.ticketChip, { backgroundColor: Colors.green, transform: [{ rotate: '2deg' }] }]}>
                    <PozIcon name="sparkle" size={13} color={Colors.greenDark} />
                    <Text style={[styles.chipText, { color: Colors.greenDark }]}>
                      {entry.mood.toUpperCase()}
                    </Text>
                  </View>
                ) : null}
              </View>
            </>
          ) : null}
        </View>

        {/* If no mock entry for this date, show EmptyDayView */}
        {!entry ? (
          <EmptyDayView dateString={dateStr} />
        ) : (
          <>
            {/* Photo Prints Section */}
            {entry.photos && entry.photos.length > 0 ? (
              <View style={styles.sectionContainer}>
                <SectionTitle title="bugünün kareleri" stamp={`${entry.photos.length} EXP`} />

                <View style={styles.photosRow}>
                  {entry.photos.map((item) => (
                    <PhotoPrint key={item.id} item={item} />
                  ))}
                </View>
              </View>
            ) : null}

            {/* Journal Note Section */}
            {entry.note ? (
              <View style={styles.sectionContainer}>
                <JournalNoteCard
                  text={entry.note.text}
                  metaText={entry.note.metaText}
                />
              </View>
            ) : null}

            {/* Song Section */}
            {entry.song ? (
              <View style={styles.sectionContainer}>
                <SongTicket
                  title={entry.song.title}
                  artist={entry.song.artist}
                  duration={entry.song.duration}
                />
              </View>
            ) : null}

            {/* Mood Section */}
            {entry.mood ? (
              <View style={styles.sectionContainer}>
                <MoodSticker
                  mood={entry.mood}
                  moodSubtext={entry.moodSubtext}
                />
              </View>
            ) : null}

            {/* Day Details Receipt Section */}
            {entry.details ? (
              <View style={styles.sectionContainer}>
                <DayDetailsReceipt
                  timeRange={entry.details.timeRange}
                  location={entry.details.location}
                  film={entry.details.film}
                  frames={entry.details.frames}
                  weather={entry.details.weather}
                />
              </View>
            ) : null}

            {/* Action Bar */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={handleEditAll}
                style={styles.primaryActionButton}
              >
                <Text style={styles.primaryActionText}>anılarını düzenle</Text>
                <PozIcon name="arrow-right" size={18} color="#FFFDF9" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleDelete}
                style={styles.deleteIconButton}
              >
                <PozIcon name="bell" size={20} color={Colors.stampRed} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl + 20,
  },
  dateHeroCard: {
    marginBottom: Spacing.md,
  },
  dateTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mainDateTitle: {
    fontSize: 34,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
    letterSpacing: -0.8,
  },
  subDateText: {
    fontSize: 14,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  summaryText: {
    fontSize: 14,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: 4,
    marginBottom: Spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
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
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  chipText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionContainer: {
    marginVertical: Spacing.xs,
  },
  photosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  primaryActionButton: {
    flex: 1,
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
  primaryActionText: {
    fontSize: 15,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
  deleteIconButton: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    backgroundColor: '#FFFDF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(229, 72, 72, 0.25)',
  },
});
