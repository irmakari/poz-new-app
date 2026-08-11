import { FilmProgress } from '@/components/FilmProgress';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { SectionTitle } from '@/components/SectionTitle';
import { SongPickerModal } from '@/components/SongPickerModal';
import { TapeDecoration } from '@/components/TapeDecoration';
import { WeekSelector } from '@/components/WeekSelector';
import { BorderRadius, Colors, Fonts, Spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { MockSongItem } from '@/utils/captureReviewData';
import { getFormattedTime, getFormattedTodayHeader, getTodayKey } from '@/utils/dateUtils';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HOME_MOOD_OPTIONS = ['huzurlu', 'mutlu', 'coşkulu', 'sakin', 'taze', 'yorgun', 'özlemli', 'heyecanlı'];

export default function HomeScreen() {
  const router = useRouter();
  const { activeFilm, dailyNotes, photos, saveDailyNote, deleteDailyNote } = useApp();

  const todayKey = getTodayKey();
  const todayNoteObj = dailyNotes[todayKey];

  const hasNote = Boolean(todayNoteObj && todayNoteObj.note && todayNoteObj.note.trim());
  const hasMood = Boolean(todayNoteObj && todayNoteObj.mood && todayNoteObj.mood.trim());
  const hasSong = Boolean(todayNoteObj && todayNoteObj.song && todayNoteObj.song.title && todayNoteObj.song.title.trim());

  const todayDailyPhotos = photos.filter((p) => p.captureMode === 'daily' && p.date && (p.date.includes('28 temmuz') || p.date.includes(todayKey)));
  const todayFilmPhotos = photos.filter((p) => p.captureMode !== 'daily' && p.date && (p.date.includes('28 temmuz') || p.date.includes(todayKey)));

  const dailyCount = todayDailyPhotos.length;
  const filmCount = todayFilmPhotos.length;
  const totalPhotosCount = dailyCount + filmCount;

  // Modal States for Cards
  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);
  const [noteInputText, setNoteInputText] = useState(todayNoteObj?.note || '');
  const [isSongPickerOpen, setIsSongPickerOpen] = useState(false);
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);

  const handleSaveNote = async () => {
    await saveDailyNote(todayKey, { note: noteInputText });
    setIsEditNoteModalOpen(false);
  };

  const handleDeleteNote = async () => {
    Alert.alert('Notu Sil', 'Bugünün notunu silmek istediğine emin misin?', [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: async () => {
          await deleteDailyNote(todayKey);
          setNoteInputText('');
          setIsEditNoteModalOpen(false);
        },
      },
    ]);
  };

  const currentFrames = activeFilm ? activeFilm.currentFrames : 12;
  const totalFrames = activeFilm ? activeFilm.totalFrames : 36;
  const remainingFrames = activeFilm ? activeFilm.remainingFrames : 24;
  const filmTitle = activeFilm ? activeFilm.title : 'summer glow';
  const isoTag = activeFilm ? activeFilm.isoTag : '35MM ISO 400';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Bar */}
        <View style={styles.topBar}>
          <View style={styles.userInfoRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>I</Text>
              <View style={styles.avatarDot} />
            </View>
            <View>
              <Text style={styles.welcomeText}>merhaba, ırmak</Text>
              <Text style={styles.dateText}>{getFormattedTodayHeader()}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
              <PozIcon name="search" size={20} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
              <PozIcon name="bell" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Card: Analog Film Envelope / Photo Sleeve */}
        <ScrapbookCard
          bgColor={Colors.deepNavy}
          rotation="-1.2deg"
          hasTape="top-right"
          tapeColor={Colors.tapeBlue}
          hasTornEdge="bottom"
          padding={Spacing.lg}
          style={styles.heroEnvelope}
        >
          <View style={styles.envelopeFlapLine} />

          <View style={styles.heroHeaderRow}>
            <View style={styles.heroTitleGroup}>
              <PaperStamp label={isoTag || '35MM ISO 400'} color={Colors.stampRed} rotation="-3deg" />
              <Text style={styles.heroSubHeader}>bugünün filmi</Text>
            </View>

            {/* Physical Layered Film Canister Object */}
            <View style={styles.filmCanisterGraphic}>
              <View style={styles.canisterSpool} />
              <View style={styles.canisterBody}>
                <View style={styles.canisterRing} />
                <PozIcon name="films" size={22} color="#FFFDF6" />
              </View>
            </View>
          </View>

          {/* Film Name */}
          <Text style={styles.filmTitle}>{filmTitle}</Text>

          {/* Physical 35mm Negative Film Strip Component */}
          <FilmProgress currentFrames={currentFrames || 0} totalFrames={totalFrames || 36} />

          <View style={styles.heroFooterRow}>
            <Text style={styles.frameCounterText}>{currentFrames} / {totalFrames} kare çektin</Text>
            <Text style={styles.remainingBadge}>{remainingFrames} KARE KALDI</Text>
          </View>
        </ScrapbookCard>

        {/* Dynamic Week Selector */}
        <WeekSelector />

        {/* 2x2 Masonry Scrapbook Collage Grid */}
        <View style={styles.sectionHeaderWithAdd}>
          <SectionTitle title="bugünün anıları" categoryLabel="EDITORIAL LOG" code="LOG-0728" stamp="DAILY" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/camera')}
            style={styles.addMemoryHeaderButton}
          >
            <Text style={styles.addMemoryHeaderButtonText}>+ ANI EKLE</Text>
          </TouchableOpacity>
        </View>

        {/* Organic Scrapbook Collage (Staggered Layout) */}
        <View style={styles.collageContainer}>
          {/* Left Column */}
          <View style={styles.collageColumnLeft}>
            {/* 1. Yellow Memo Sheet Card (Torn Bottom Edge) */}
            <ScrapbookCard
              bgColor={Colors.paper}
              rotation="-2.4deg"
              hasTape="top-left"
              tapeColor={Colors.tapeDefault}
              hasTornEdge="bottom"
              padding={Spacing.md}
              onPress={() => {
                setNoteInputText(todayNoteObj?.note || '');
                setIsEditNoteModalOpen(true);
              }}
              style={styles.yellowMemoCard}
            >
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderTitle}>günün notu</Text>
                <PaperStamp label="MEMO" color={Colors.burgundy} rotation="4deg" />
              </View>

              <Text style={styles.handwrittenNoteText}>
                {hasNote ? todayNoteObj!.note : 'dokunarak bugünün ilk notunu yaz... ✍️'}
              </Text>

              <View style={styles.noteFooter}>
                <Text style={styles.handwrittenTimestamp}>
                  {hasNote ? (todayNoteObj?.timestamp || `${getFormattedTime()} • ev`) : `${getFormattedTime()} • henüz not yok`}
                </Text>
              </View>
            </ScrapbookCard>

            {/* 4. Green Mood Sticker Card */}
            <ScrapbookCard
              bgColor={Colors.green}
              rotation="3deg"
              hasTape="top-right"
              tapeColor={Colors.tapeDefault}
              padding={Spacing.md}
              onPress={() => setIsMoodModalOpen(true)}
              style={styles.greenStickerCard}
            >
              <View style={styles.moodHeaderRow}>
                <PozIcon name="sparkle" size={18} color="#F4ECE2" />
                <Text style={styles.moodTagText}>bugünkü hissin</Text>
              </View>
              <Text style={styles.moodValueText} numberOfLines={1}>
                {hasMood ? todayNoteObj!.mood : 'henüz taze'}
              </Text>

              <View style={styles.stickerBadge}>
                <Text style={styles.stickerText}>{hasMood ? '★ GOOD VIBES' : '★ BUGÜN'}</Text>
              </View>
            </ScrapbookCard>
          </View>

          {/* Right Column */}
          <View style={styles.collageColumnRight}>
            {/* 2. Mat Lavender Cardstock with Stacked Photo Prints */}
            <ScrapbookCard
              bgColor={Colors.navy}
              rotation="1.6deg"
              hasTape="top-right"
              tapeColor={Colors.tapeLavender}
              padding={Spacing.md}
              onPress={() => router.push({ pathname: '/day/[date]', params: { date: todayKey } })}
              style={styles.bluePhotosCard}
            >
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderTitleLight}>bugünün kareleri</Text>
                <View style={styles.photoCountPill}>
                  <Text style={styles.photoCountPillText} numberOfLines={1}>
                    {dailyCount > 0 || filmCount > 0 ? `${dailyCount} BASKI • ${filmCount} FİLM` : '0 KARE'}
                  </Text>
                </View>
              </View>

              {/* Physical Stacked Polaroid Prints */}
              <View style={styles.photoStackContainer}>
                {totalPhotosCount > 0 ? (
                  <>
                    {/* Back Photo Print (Daily or Film) */}
                    <View style={styles.photoPrintBack}>
                      <View style={styles.negativeDarkFill}>
                        <PozIcon name={filmCount > 0 ? 'films' : 'photo'} size={20} color="#8FA8B8" />
                      </View>
                      <Text style={styles.printCodeText}>{dailyCount > 0 ? 'GÜNLÜK BASKI' : 'FİLM KARESI'}</Text>
                    </View>

                    {/* Front Photo Print */}
                    <View style={styles.photoPrintFront}>
                      <TapeDecoration position="top-right" width={30} height={9} color={Colors.tapeDefault} />
                      <View style={styles.negativeDarkFillFront}>
                        <PozIcon name={dailyCount > 0 ? 'photo' : 'camera'} size={22} color="#8FA8B8" />
                      </View>
                      <Text style={styles.printCodeText}>
                        {dailyCount > 0 ? `${dailyCount} GÜNLÜK FOTOĞRAF` : `${filmCount} FİLM KARESI`}
                      </Text>
                    </View>
                  </>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => router.push('/(tabs)/camera')}
                    style={styles.addKareEmptyButton}
                  >
                    <PozIcon name="camera" size={24} color="#93C5FD" />
                    <Text style={styles.addKareEmptyText}>+ KARE ÇEK</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrapbookCard>
          </View>
        </View>
      </ScrollView>

      {/* Edit Daily Note Bottom Sheet */}
      <Modal
        visible={isEditNoteModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditNoteModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.sheetOverlay}
          activeOpacity={1}
          onPress={() => setIsEditNoteModalOpen(false)}
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
                <Text style={styles.modalTitleText}>günün notunu düzenle</Text>
                <TouchableOpacity
                  onPress={() => setIsEditNoteModalOpen(false)}
                  style={styles.closeButton}
                >
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text }}>✕</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.modalTextInput}
                multiline={true}
                placeholder="Bugün nasıl geçti? Birkaç cümle yaz..."
                placeholderTextColor={Colors.textMuted}
                value={noteInputText}
                onChangeText={setNoteInputText}
              />

              <View style={styles.modalActionRow}>
                <TouchableOpacity
                  style={styles.modalDeleteButton}
                  onPress={handleDeleteNote}
                >
                  <Text style={styles.modalDeleteText}>Sil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalSaveButton}
                  onPress={handleSaveNote}
                >
                  <Text style={styles.modalSaveText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>

      {/* Mood Selector Bottom Sheet */}
      <Modal
        visible={isMoodModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsMoodModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.sheetOverlay}
          activeOpacity={1}
          onPress={() => setIsMoodModalOpen(false)}
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
                <Text style={styles.modalTitleText}>bugünkü hissini seç</Text>
                <TouchableOpacity
                  onPress={() => setIsMoodModalOpen(false)}
                  style={styles.closeButton}
                >
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.text }}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 12 }}>
                {HOME_MOOD_OPTIONS.map((m) => (
                  <TouchableOpacity
                    key={m}
                    activeOpacity={0.8}
                    onPress={async () => {
                      await saveDailyNote(todayKey, { mood: m });
                      setIsMoodModalOpen(false);
                    }}
                    style={{
                      backgroundColor: todayNoteObj?.mood === m ? Colors.olive : Colors.paper,
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                      borderRadius: BorderRadius.md,
                      borderWidth: 1,
                      borderColor: Colors.border,
                    }}
                  >
                    <Text style={{
                      fontFamily: Fonts.sansBold,
                      fontSize: 13,
                      color: todayNoteObj?.mood === m ? '#F4ECE2' : Colors.ink
                    }}>
                      {m}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>

      {/* Song Picker Modal */}
      <SongPickerModal
        visible={isSongPickerOpen}
        onClose={() => setIsSongPickerOpen(false)}
        onSelectSong={async (songItem: MockSongItem) => {
          await saveDailyNote(todayKey, {
            song: {
              title: songItem.title,
              artist: songItem.artist,
            },
          });
          setIsSongPickerOpen(false);
        }}
      />
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
    paddingBottom: 150, // Bottom Tab Bar clearance
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lavenderDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFDF6',
    position: 'relative',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: '#FFFDF6',
    fontSize: 18,
    fontFamily: Fonts.sansExtraBold,
  },
  avatarDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.greenDark,
    borderWidth: 2,
    borderColor: '#FFFDF6',
  },
  welcomeText: {
    fontSize: 18,
    color: Colors.text,
    fontFamily: Fonts.sansExtraBold,
  },
  dateText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.mono,
    marginTop: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  /* Hero Envelope Styles */
  heroEnvelope: {
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  envelopeFlapLine: {
    position: 'absolute',
    top: 0,
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: 'rgba(43, 131, 186, 0.3)',
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTitleGroup: {
    gap: 4,
  },
  heroSubHeader: {
    fontSize: 11,
    color: Colors.filmBlue,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontFamily: Fonts.mono,
    marginTop: 4,
  },
  filmCanisterGraphic: {
    alignItems: 'center',
    transform: [{ rotate: '5deg' }],
  },
  canisterSpool: {
    width: 14,
    height: 6,
    backgroundColor: '#16141D',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  canisterBody: {
    width: 38,
    height: 42,
    backgroundColor: '#16141D',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  canisterRing: {
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.mustard,
  },
  filmTitle: {
    fontSize: 28,
    color: '#FFFDF9',
    fontFamily: Fonts.sansBlack,
    marginVertical: 4,
    letterSpacing: -0.8,
  },
  heroFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  frameCounterText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: Fonts.mono,
  },
  remainingBadge: {
    fontSize: 10,
    color: '#FFFDF9',
    fontFamily: Fonts.mono,
    backgroundColor: Colors.burgundy,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    fontWeight: '800',
  },

  /* Collage Staggered Grid */
  collageContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  collageColumnLeft: {
    flex: 1,
    gap: Spacing.md,
  },
  collageColumnRight: {
    flex: 1,
    gap: Spacing.md,
    marginTop: 10, // Staggered offset for organic collage feel
  },

  /* Yellow Memo Card */
  yellowMemoCard: {
    minHeight: 165,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderTitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
  },
  handwrittenNoteText: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: Fonts.serif,
    fontStyle: 'italic',
    lineHeight: 21,
    marginVertical: 4,
  },
  noteFooter: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
  handwrittenTimestamp: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    color: Colors.yellowDark,
  },

  /* Green Mood Card */
  greenStickerCard: {
    minHeight: 125,
    justifyContent: 'space-between',
  },
  moodHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moodTagText: {
    fontSize: 11,
    color: '#F4ECE2',
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  moodValueText: {
    fontSize: 22,
    color: '#F4ECE2',
    fontFamily: Fonts.sansBlack,
    marginVertical: 2,
  },
  stickerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderStyle: 'dashed',
  },
  stickerText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: '#F4ECE2',
    fontWeight: '800',
  },

  /* Blue Photo Prints Card */
  bluePhotosCard: {
    minHeight: 190,
  },
  cardHeaderTitleLight: {
    fontSize: 11.5,
    color: '#F4ECE2',
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  photoCountPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    maxWidth: 110,
  },
  photoCountPillText: {
    fontFamily: Fonts.mono,
    fontSize: 8.5,
    color: '#8FA8B8',
    fontWeight: '800',
  },
  photoStackContainer: {
    height: 125,
    marginTop: 8,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPrintBack: {
    position: 'absolute',
    width: 105,
    height: 95,
    backgroundColor: '#F7F2EA',
    borderRadius: 4,
    padding: 5,
    transform: [{ rotate: '-8deg' }],
    borderWidth: 1,
    borderColor: Colors.border,
    top: 4,
    left: 4,
    alignItems: 'center',
  },
  photoPrintFront: {
    position: 'absolute',
    width: 110,
    height: 102,
    backgroundColor: '#F7F2EA',
    borderRadius: 4,
    padding: 5,
    transform: [{ rotate: '4deg' }],
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 4,
    alignItems: 'center',
  },
  negativeDarkFill: {
    width: '100%',
    height: 64,
    backgroundColor: '#111827',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  negativeDarkFillFront: {
    width: '100%',
    height: 70,
    backgroundColor: '#111827',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  printCodeText: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: Colors.ink,
    marginTop: 3,
    fontWeight: '700',
  },

  /* Pink Song Card */
  pinkSongCard: {
    minHeight: 135,
  },
  songLabelLight: {
    fontSize: 11,
    color: '#F4ECE2',
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cassetteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  albumCoverBox: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  songInfoGroup: {
    flex: 1,
  },
  songTitleTextLight: {
    fontSize: 14,
    color: '#F4ECE2',
    fontFamily: Fonts.sansBlack,
    letterSpacing: -0.3,
  },
  artistNameTextLight: {
    fontSize: 11.5,
    color: '#8FA8B8',
    fontFamily: Fonts.sansMedium,
    marginTop: 1,
  },
  audioWaveformMock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginTop: 10,
    paddingTop: 4,
  },
  waveBar: {
    width: 4,
    backgroundColor: '#F4ECE2',
    borderRadius: 2,
    opacity: 0.85,
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  bottomSheetCard: {
    width: '100%',
    backgroundColor: '#FFFDF9',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl + 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  modalTitleText: {
    fontSize: 18,
    fontFamily: Fonts.serif,
    color: Colors.text,
    fontWeight: '800',
  },
  closeButton: {
    padding: 4,
  },
  modalTextInput: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    color: Colors.text,
    backgroundColor: 'rgba(28, 26, 36, 0.04)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    minHeight: 110,
    textAlignVertical: 'top',
    marginBottom: Spacing.md,
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalDeleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(229, 72, 72, 0.1)',
  },
  modalDeleteText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: Colors.stampRed,
  },
  modalSaveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: BorderRadius.md,
    backgroundColor: '#181520',
  },
  modalSaveText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
  sectionHeaderWithAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 4,
  },
  addMemoryHeaderButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.pill,
  },
  addMemoryHeaderButtonText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF6',
    letterSpacing: 0.5,
  },
  addKareEmptyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    gap: 6,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(147, 197, 253, 0.4)',
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  addKareEmptyText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: '#93C5FD',
    letterSpacing: 1,
  },
});
