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
import { useApp } from '@/context/AppContext';
import { DAY_ENTRIES } from '@/utils/dayData';

export default function DayDetailScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const dateStr = date || '2026-07-27';

  const { dailyNotes, photos, deleteDailyNote } = useApp();

  const dateMatchStr = dateStr.includes('-') ? dateStr : '2026-07-27';
  const dayDailyPhotos = photos.filter((p) => p.captureMode === 'daily' && p.date && (p.date.includes(dateStr) || p.date.includes('27 temmuz')));
  const dayFilmPhotos = photos.filter((p) => p.captureMode !== 'daily' && p.date && (p.date.includes(dateStr) || p.date.includes('27 temmuz')));

  const mockEntry = DAY_ENTRIES[dateStr];
  const storedDailyNote = dailyNotes[dateStr];

  const hasAnyContent = Boolean(
    storedDailyNote?.note ||
    dayDailyPhotos.length > 0 ||
    dayFilmPhotos.length > 0 ||
    mockEntry
  );

  const entry = storedDailyNote || mockEntry
    ? {
        dayTitle: dateMatchStr === '2026-07-27' ? '27 temmuz' : 'bugün',
        daySubTitle: dateMatchStr === '2026-07-27' ? 'pazartesi · 2026' : '2026',
        stampText: dateMatchStr === '2026-07-27' ? '27 JUL 2026' : 'TODAY',
        summaryText: storedDailyNote?.note || mockEntry?.summaryText || 'bugüne ait anılar ve kareler.',
        note: storedDailyNote?.note
          ? { text: storedDailyNote.note, metaText: storedDailyNote.timestamp || '22:45 • ev' }
          : mockEntry?.note,
        song: storedDailyNote?.song
          ? { title: storedDailyNote.song.title, artist: storedDailyNote.song.artist, duration: '3:42' }
          : mockEntry?.song,
        mood: storedDailyNote?.mood || mockEntry?.mood,
      }
    : null;

  const handleEditAll = () => {
    Alert.alert(
      'Anılarını Düzenle',
      'Ana sayfadaki not kartına basarak günün notunu hızlıca güncelleyebilirsin.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Anıyı Sil',
      'Bu güne ait notu silmek istediğine emin misin?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Anıyı Sil',
          style: 'destructive',
          onPress: async () => {
            await deleteDailyNote(dateStr);
            Alert.alert('Silindi', 'Günün anısı silindi.');
          },
        },
      ]
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
                {dayDailyPhotos.length > 0 ? (
                  <View style={[styles.ticketChip, { backgroundColor: Colors.yellow, transform: [{ rotate: '-1.5deg' }] }]}>
                    <PozIcon name="photo" size={13} color={Colors.yellowDark} />
                    <Text style={[styles.chipText, { color: Colors.yellowDark }]}>
                      {dayDailyPhotos.length} FOTOĞRAF
                    </Text>
                  </View>
                ) : null}

                {dayFilmPhotos.length > 0 ? (
                  <View style={[styles.ticketChip, { backgroundColor: Colors.lavender, transform: [{ rotate: '1deg' }] }]}>
                    <PozIcon name="films" size={13} color={Colors.lavenderDark} />
                    <Text style={[styles.chipText, { color: Colors.lavenderDark }]}>
                      {dayFilmPhotos.length} FİLM KARESI
                    </Text>
                  </View>
                ) : null}

                {entry.note ? (
                  <View style={[styles.ticketChip, { backgroundColor: '#FFFDF9', transform: [{ rotate: '1deg' }] }]}>
                    <PozIcon name="mail" size={13} color={Colors.text} />
                    <Text style={[styles.chipText, { color: Colors.text }]}>1 NOT</Text>
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

        {/* If no entry or content for this date, show EmptyDayView */}
        {!hasAnyContent ? (
          <EmptyDayView dateString={dateStr} />
        ) : (
          <>
            {/* 1. BUGÜNÜN FOTOĞRAFLARI (DAILY PHOTOS) SECTION */}
            <View style={styles.sectionContainer}>
              <SectionTitle title="bugünün fotoğrafları" stamp={`${dayDailyPhotos.length} BASKI`} />

              {dayDailyPhotos.length > 0 ? (
                <View style={styles.photosRow}>
                  {dayDailyPhotos.map((item) => (
                    <PhotoPrint key={item.id} item={item} />
                  ))}
                </View>
              ) : (
                <View style={styles.emptySectionBox}>
                  <Text style={styles.emptySectionText}>bugün hemen açılan bir fotoğraf eklemedin.</Text>
                </View>
              )}
            </View>

            {/* 2. BUGÜNÜN FİLM KARELERİ (FILM FRAMES) SECTION */}
            <View style={styles.sectionContainer}>
              <SectionTitle title="bugünün film kareleri" stamp={`${dayFilmPhotos.length} KARE`} />

              {dayFilmPhotos.length > 0 ? (
                <View style={styles.filmStripCard}>
                  {/* Sprocket Perforations Top */}
                  <View style={styles.sprocketRow}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <View key={`t-${i}`} style={styles.sprocketHole} />
                    ))}
                  </View>

                  <View style={styles.filmFramesGrid}>
                    {dayFilmPhotos.map((photoItem) => (
                      <View key={photoItem.id} style={styles.filmNegativeCell}>
                        <View style={styles.negativeHeader}>
                          <Text style={styles.filmNameTag}>{photoItem.filmTitle || 'SUMMER GLOW'}</Text>
                          <Text style={styles.frameCodeTag}>{photoItem.code || `${photoItem.frameNumber || 13}A`}</Text>
                        </View>

                        {photoItem.status === 'locked' ? (
                          <View style={styles.lockedCellBox}>
                            <PozIcon name="lock" size={20} color="rgba(255, 255, 255, 0.5)" />
                            <Text style={styles.lockedCellText}>LOCKED</Text>
                          </View>
                        ) : (
                          <View style={styles.developedCellBox}>
                            <PozIcon name="photo" size={20} color={Colors.lavender} />
                            <Text style={styles.developedCellText}>DEVELOPED</Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>

                  {/* Sprocket Perforations Bottom */}
                  <View style={styles.sprocketRow}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <View key={`b-${i}`} style={styles.sprocketHole} />
                    ))}
                  </View>
                </View>
              ) : (
                <View style={styles.emptySectionBox}>
                  <Text style={styles.emptySectionText}>bugün filme kare eklemedin.</Text>
                </View>
              )}
            </View>

            {/* Journal Note Section */}
            {entry?.note ? (
              <View style={styles.sectionContainer}>
                <JournalNoteCard
                  text={entry.note.text}
                  metaText={entry.note.metaText}
                />
              </View>
            ) : null}

            {/* Song Section */}
            {entry?.song ? (
              <View style={styles.sectionContainer}>
                <SongTicket
                  title={entry.song.title}
                  artist={entry.song.artist}
                  duration={entry.song.duration}
                />
              </View>
            ) : null}

            {/* Mood Section */}
            {entry?.mood ? (
              <View style={styles.sectionContainer}>
                <MoodSticker
                  mood={entry.mood}
                  moodSubtext={(entry as any).moodSubtext || '★ GOOD VIBES'}
                />
              </View>
            ) : null}

            {/* Day Details Receipt Section */}
            {entry && (entry as any).details ? (
              <View style={styles.sectionContainer}>
                <DayDetailsReceipt
                  timeRange={(entry as any).details.timeRange}
                  location={(entry as any).details.location}
                  film={(entry as any).details.film}
                  frames={(entry as any).details.frames}
                  weather={(entry as any).details.weather}
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
    borderColor: Colors.border,
  },
  emptySectionBox: {
    backgroundColor: '#FFFDF9',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.xs,
  },
  emptySectionText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  filmStripCard: {
    backgroundColor: '#1C1A24',
    borderRadius: BorderRadius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: Spacing.xs,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  sprocketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  sprocketHole: {
    width: 10,
    height: 7,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  filmFramesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 6,
    justifyContent: 'flex-start',
  },
  filmNegativeCell: {
    width: '48%',
    height: 100,
    backgroundColor: '#252132',
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    padding: 8,
    justifyContent: 'space-between',
  },
  negativeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filmNameTag: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.lavender,
    fontWeight: '700',
  },
  frameCodeTag: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.stampRed,
    fontWeight: '800',
  },
  lockedCellBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  lockedCellText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '800',
    letterSpacing: 1,
  },
  developedCellBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  developedCellText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.lavender,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
