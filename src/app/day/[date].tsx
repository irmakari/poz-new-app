import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
import { getDailyPhotoForDate } from '@/utils/dailyMemory.utils';
import { DAY_ENTRIES } from '@/utils/dayData';

export default function DayDetailScreen() {
  const router = useRouter();
  const { date } = useLocalSearchParams<{ date: string }>();
  const dateStr = date || '2026-07-27';

  const { dailyNotes, photos, deleteDailyNote, selectCaptureMode } = useApp();

  const dateMatchStr = dateStr.includes('-') ? dateStr : '2026-07-27';
  const canonicalDailyPhoto = getDailyPhotoForDate(photos, dateStr);
  const dayDailyPhotos = canonicalDailyPhoto ? [canonicalDailyPhoto] : [];
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

  // Local Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [noteInputText, setNoteInputText] = React.useState(storedDailyNote?.note || mockEntry?.summaryText || '');
  const [selectedMood, setSelectedMood] = React.useState(storedDailyNote?.mood || mockEntry?.mood || 'huzurlu');

  const { saveDailyNote } = useApp();

  const handleEditAll = () => {
    setNoteInputText(storedDailyNote?.note || mockEntry?.summaryText || '');
    setSelectedMood(storedDailyNote?.mood || mockEntry?.mood || 'huzurlu');
    setIsEditModalOpen(true);
  };

  const handleSaveDayEdits = async () => {
    await saveDailyNote(dateStr, {
      note: noteInputText,
      mood: selectedMood,
    });
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Günün Anısını Sil',
      'Bu güne ait not ve anıları silmek istediğine emin misin?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            await deleteDailyNote(dateStr);
            setNoteInputText('');
            setIsEditModalOpen(false);
            Alert.alert('Silindi', 'Günün anısı başarıyla silindi.');
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
                  
                  <View style={styles.emptyActionRow}>
                    <TouchableOpacity
                      activeOpacity={0.82}
                      onPress={() => {
                        selectCaptureMode('daily');
                        router.push('/(tabs)/camera');
                      }}
                      style={styles.dailyPhotoButton}
                    >
                      <PozIcon name="photo" size={13} color="#181520" />
                      <Text style={styles.dailyPhotoButtonText}>günlük çek</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.82}
                      onPress={() => {
                        selectCaptureMode('film');
                        router.push('/(tabs)/camera');
                      }}
                      style={styles.filmPhotoButton}
                    >
                      <PozIcon name="films" size={13} color="#FFFDF9" />
                      <Text style={styles.filmPhotoButtonText}>film çek</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>

            {/* 2. BUGÜNÜN FİLM KARELERİ (FILM FRAMES) SECTION - Hide completely if no film photos */}
            {dayFilmPhotos.length > 0 && (
              <View style={styles.sectionContainer}>
                <SectionTitle title="bugünün film kareleri" stamp={`${dayFilmPhotos.length} KARE`} />

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
                          <Text style={styles.filmNameTag}>{photoItem.filmTitle || (photoItem as any).filmName || 'FİLM KARESI'}</Text>
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
              </View>
            )}

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
                <PozIcon name="arrow-right" size={18} color="#F4ECE2" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleDelete}
                style={styles.deleteIconButton}
                accessibilityLabel="Günün anısını sil"
              >
                <Text style={{ fontSize: 18 }}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* Direct Edit Day Bottom Sheet */}
      <Modal
        visible={isEditModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.sheetOverlay}
          activeOpacity={1}
          onPress={() => setIsEditModalOpen(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ width: '100%' }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={styles.bottomSheetCard}
            >
              <View style={styles.sheetHandle} />

              <View style={styles.modalHeader}>
                <Text style={styles.modalTitleText}>günün anılarını düzenle</Text>
                <TouchableOpacity
                  onPress={() => setIsEditModalOpen(false)}
                  style={styles.closeButton}
                >
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.ink }}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <Text style={{ fontSize: 12, fontFamily: Fonts.mono, color: Colors.textMuted, marginBottom: 4 }}>
                  GÜNÜN NOTU
                </Text>
                <TextInput
                  style={styles.modalTextInput}
                  multiline={true}
                  placeholder="Bugün neler yaşadın? Notunu yaz..."
                  placeholderTextColor={Colors.textMuted}
                  value={noteInputText}
                  onChangeText={setNoteInputText}
                />

                <Text style={{ fontSize: 12, fontFamily: Fonts.mono, color: Colors.textMuted, marginTop: 12, marginBottom: 6 }}>
                  HIS HALE / MOOD
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {['huzurlu', 'mutlu', 'coşkulu', 'sakin', 'taze', 'yorgun', 'özlemli', 'heyecanlı'].map((m) => (
                    <TouchableOpacity
                      key={m}
                      activeOpacity={0.8}
                      onPress={() => setSelectedMood(m)}
                      style={{
                        backgroundColor: selectedMood === m ? Colors.olive : Colors.paper,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: BorderRadius.md,
                        borderWidth: 1,
                        borderColor: Colors.border,
                      }}
                    >
                      <Text style={{
                        fontFamily: Fonts.sansBold,
                        fontSize: 12,
                        color: selectedMood === m ? '#F4ECE2' : Colors.ink
                      }}>
                        {m}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.modalActionRow}>
                  <TouchableOpacity
                    style={styles.modalDeleteButton}
                    onPress={handleDelete}
                  >
                    <Text style={styles.modalDeleteText}>Anıyı Sil</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalSaveButton}
                    onPress={handleSaveDayEdits}
                  >
                    <Text style={styles.modalSaveText}>Kaydet</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
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
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.xs,
    gap: 12,
  },
  emptySectionText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  emptyActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  dailyPhotoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1B0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(230, 168, 0, 0.3)',
    gap: 6,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  dailyPhotoButtonText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: '#181520',
  },
  filmPhotoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#231F33',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 6,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filmPhotoButtonText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
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
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  bottomSheetCard: {
    width: '100%',
    backgroundColor: '#F7F2EA',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl + 10,
    borderWidth: 1,
    borderColor: Colors.border,
    maxHeight: '85%',
  },
  sheetHandle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(28, 26, 36, 0.2)',
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modalTitleText: {
    fontSize: 16,
    fontFamily: Fonts.sansBlack,
    color: Colors.ink,
  },
  closeButton: {
    padding: 4,
  },
  modalTextInput: {
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 14,
    fontFamily: Fonts.sans,
    color: Colors.ink,
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: Spacing.md,
  },
  modalDeleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(201, 74, 74, 0.1)',
  },
  modalDeleteText: {
    color: Colors.dangerLab,
    fontFamily: Fonts.sansBold,
    fontSize: 13,
  },
  modalSaveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.burgundy,
  },
  modalSaveText: {
    color: '#F4ECE2',
    fontFamily: Fonts.sansBold,
    fontSize: 13,
  },
});
