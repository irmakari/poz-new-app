import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { FilmDetailHeader } from '@/components/FilmDetailHeader';
import { FilmStatusStamp } from '@/components/FilmStatusStamp';
import { MonthNotesSection } from '@/components/MonthNotesSection';
import { MonthSongsSection } from '@/components/MonthSongsSection';
import { MoodStickerGroup } from '@/components/MoodStickerGroup';
import { FilmDetailsReceipt } from '@/components/FilmDetailsReceipt';
import { FilmStripViewer } from '@/components/FilmStripViewer';
import { EmptyFilmView } from '@/components/EmptyFilmView';
import { SectionTitle } from '@/components/SectionTitle';
import { DarkroomWashModal } from '@/components/DarkroomWashModal';
import { PozIcon } from '@/components/PozIcon';
import { useApp } from '@/context/AppContext';
import { FilmItem, FilmStatus } from '@/utils/filmData';
import { PhotoEntry } from '@/utils/photoDetailData';

export default function FilmDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { films, photos, developFilm, deleteFilm, finishFilmEarly, sendFilmToDevelop } = useApp();

  const film = films.find((f: FilmItem) => f.id === id) || films[0];

  // Get real PhotoEntry objects belonging to this film from context
  const filmPhotos: PhotoEntry[] = photos.filter((p) => p.filmId === (film?.id ?? ''));

  const [isWashModalOpen, setIsWashModalOpen] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const [gridY, setGridY] = useState(0);

  if (!film) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <FilmDetailHeader />
        <EmptyFilmView />
      </SafeAreaView>
    );
  }

  const captured = film.capturedFrames ?? film.currentFrames ?? film.frameCount ?? 0;
  const total = film.totalFrames;
  const progress = total > 0 ? captured / total : 0;

  const handleDevelop = () => {
    setIsWashModalOpen(true);
  };

  const handleCompleteWash = async () => {
    await developFilm(film.id);
    setIsWashModalOpen(false);
  };

  const handleDelete = async () => {
    Alert.alert('Filmi Sil', 'Bu film rulosunu ve içindeki tüm fotoğrafları silmek istediğine emin misin?', [
      { text: 'vazgeç', style: 'cancel' },
      {
        text: 'sil',
        style: 'destructive',
        onPress: async () => {
          await deleteFilm(film.id);
          router.back();
        },
      },
    ]);
  };

  const handleFinishEarly = () => {
    Alert.alert(
      'Filmi Erken Bitir',
      `Bu filmde ${captured} / ${total} kare var. Çekimi bitirip karanlık odaya göndermek istiyor musun?`,
      [
        { text: 'vazgeç', style: 'cancel' },
        {
          text: 'evet, bitir',
          style: 'destructive',
          onPress: async () => {
            await finishFilmEarly(film.id);
          },
        },
      ]
    );
  };

  const handleSendToDevelop = () => {
    Alert.alert(
      'Karanlık Odaya Gönder',
      `"${film.name || film.title}" yıkama işlemi için sıraya eklenecektir.`,
      [
        { text: 'vazgeç', style: 'cancel' },
        {
          text: 'yıkamayı başlat',
          onPress: async () => {
            await sendFilmToDevelop(film.id);
          },
        },
      ]
    );
  };

  const handlePhotoPress = (photo: PhotoEntry) => {
    if (photo.status !== 'developed') return;
    router.push({
      pathname: '/photo/[id]',
      params: { id: photo.id },
    });
  };

  const scrollToGrid = () => {
    scrollRef.current?.scrollTo({ y: gridY - 20, animated: true });
  };

  // Status mapping
  const statusLabels: Record<FilmStatus, string> = {
    draft: 'taslak',
    active: 'çekim devam ediyor',
    readyToDevelop: 'yıkanmaya hazır',
    developing: 'banyoda',
    completed: 'tamamlandı',
    archived: 'arşivlendi',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FilmDetailHeader />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Hero Card ─────────────────────────────────────────── */}
        <View style={[styles.heroCard, { backgroundColor: film.colorToken || film.color || '#111827' }]}>
          <Text style={styles.heroLabel}>FİLM DETAYI</Text>
          <Text style={styles.heroTitle} numberOfLines={2}>{film.name || film.title}</Text>
          
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>{statusLabels[film.status] || film.status}</Text>
            <Text style={styles.statusDot}>·</Text>
            <Text style={styles.statusCount}>{captured} / {total} kare</Text>
          </View>

          {/* Progress bar */}
          <View style={styles.heroProgressTrack}>
            <View style={[styles.heroProgressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>

          {/* Status-based CTA */}
          <View style={styles.heroActions}>
            {film.status === 'active' && (
              <>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => router.push('/(tabs)/camera')}
                  style={styles.heroCtaPrimary}
                >
                  <PozIcon name="camera" size={16} color="#111827" />
                  <Text style={styles.heroCtaPrimaryText}>filme devam et</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleFinishEarly}
                  style={styles.heroCtaSecondary}
                >
                  <Text style={styles.heroCtaSecondaryText}>filmi erken bitir</Text>
                </TouchableOpacity>
              </>
            )}

            {film.status === 'readyToDevelop' && (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSendToDevelop}
                style={styles.heroCtaPrimary}
              >
                <PozIcon name="films" size={16} color="#111827" />
                <Text style={styles.heroCtaPrimaryText}>karanlık odaya gönder</Text>
              </TouchableOpacity>
            )}

            {film.status === 'developing' && (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleDevelop}
                style={[styles.heroCtaPrimary, { backgroundColor: Colors.stampRed }]}
              >
                <PozIcon name="films" size={16} color="#FFF" />
                <Text style={[styles.heroCtaPrimaryText, { color: '#FFF' }]}>banyoyu tamamla ve aç</Text>
              </TouchableOpacity>
            )}

            {(film.status === 'completed' || film.status === 'archived') && (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={scrollToGrid}
                style={styles.heroCtaPrimary}
              >
                <PozIcon name="photo" size={16} color="#111827" />
                <Text style={styles.heroCtaPrimaryText}>fotoğrafları gör</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ─── Frames Section (35mm Film Negative Reel Strip) ─────── */}
        <View
          style={styles.sectionContainer}
          onLayout={(e) => setGridY(e.nativeEvent.layout.y)}
        >
          <SectionTitle title="filmin kareleri" stamp={`${total} EXP`} />

          {filmPhotos.length > 0 ? (
            <FilmStripViewer
              photos={filmPhotos.map((p) => ({
                id: p.id,
                frameNumber: Number(p.frameNumber) || 1,
                code: p.code || `${String(p.frameNumber || 1).padStart(2, '0')}A`,
                sceneTitle: p.note || 'film karesi',
                dateStr: p.date || '27.07',
                isExposed: p.status === 'developed',
                bgColors: p.bgColors || ['#FFB88C', '#DE6262'],
                iconName: 'photo',
              }))}
              status={film.status}
            />
          ) : (
            <View style={styles.emptyFrames}>
              <PozIcon name="camera" size={28} color={Colors.textMuted} />
              <Text style={styles.emptyFramesText}>henüz kare yok — kamera ile çekime başla!</Text>
            </View>
          )}
        </View>

        {/* ─── Notes & Songs & Moods ─────────────────────────────── */}
        {film.notes && film.notes.length > 0 && <MonthNotesSection notes={film.notes} />}
        {film.songs && film.songs.length > 0 && <MonthSongsSection songs={film.songs} />}
        {film.moods && film.moods.length > 0 && (
          <MoodStickerGroup moods={film.moods} monthName={film.dateLabel ? film.dateLabel.split(' ')[0] : 'temmuz'} />
        )}

        {/* ─── Film Bilgileri (Lab Receipt Card UI) ─────────────────── */}
        <FilmDetailsReceipt film={film} />

        {/* ─── Delete Actions ─────────────────────────────────────── */}
        <View style={styles.deleteArea}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleDelete} style={styles.deleteBtn}>
            <Text style={styles.deleteText}>filmi arşivden sil</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Darkroom Wash Development Animation Modal */}
      <DarkroomWashModal
        visible={isWashModalOpen}
        filmTitle={film.name || film.title}
        onComplete={handleCompleteWash}
        onClose={() => setIsWashModalOpen(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
  sectionContainer: { marginVertical: Spacing.md },

  // Hero Card
  heroCard: {
    borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.md,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.18, shadowRadius: 8, elevation: 4,
  },
  heroLabel: { fontSize: 10, fontFamily: Fonts.mono, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginBottom: 6 },
  heroTitle: { fontSize: 24, fontFamily: Fonts.sansBlack, color: '#FFF', marginBottom: 6 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
  statusText: { fontSize: 12, fontFamily: Fonts.sansBold, color: Colors.filmBlue, textTransform: 'uppercase' },
  statusDot: { fontSize: 12, color: 'rgba(255,255,255,0.4)' },
  statusCount: { fontSize: 12, fontFamily: Fonts.mono, color: 'rgba(255,255,255,0.6)' },
  heroProgressTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 16, overflow: 'hidden' },
  heroProgressFill: { height: '100%', backgroundColor: Colors.filmBlue, borderRadius: 2 },
  
  heroActions: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  heroCtaPrimary: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#F4ECE2', borderRadius: BorderRadius.full,
    paddingHorizontal: 16, paddingVertical: 10,
  },
  heroCtaPrimaryText: { fontSize: 13, fontFamily: Fonts.sansBlack, color: '#111827' },
  heroCtaSecondary: {
    paddingHorizontal: 12, paddingVertical: 10, justifyContent: 'center',
  },
  heroCtaSecondaryText: { fontSize: 12, fontFamily: Fonts.sansBold, color: 'rgba(255,255,255,0.6)' },

  // Photo grid
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: Spacing.sm },
  photoCell: { width: '31%', alignItems: 'center', marginBottom: 8 },
  photoFrame: {
    width: '100%', aspectRatio: 1, borderRadius: 6, overflow: 'hidden',
    backgroundColor: '#1C1B2A', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  closedFrame: { backgroundColor: '#0D0C14' },
  openVisual: { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  closedVisual: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  closedText: { fontSize: 8, fontFamily: Fonts.mono, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' },
  visualAccent: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', opacity: 0.5 },
  frameCode: { fontSize: 9, fontFamily: Fonts.mono, color: Colors.textMuted, marginTop: 4 },
  realImage: { width: '100%', height: '100%' },

  emptyFrames: {
    alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 32,
    backgroundColor: '#F7F2EA', borderRadius: 10, borderWidth: 1, borderColor: Colors.border, borderStyle: 'dashed',
    marginTop: Spacing.sm,
  },
  emptyFramesText: { fontSize: 13, fontFamily: Fonts.sans, color: Colors.textMuted, textAlign: 'center', paddingHorizontal: 24 },

  // Info Card
  infoCard: {
    backgroundColor: Colors.paper, borderRadius: BorderRadius.lg, padding: Spacing.md,
    borderWidth: 1, borderColor: Colors.border, marginVertical: Spacing.md,
  },
  infoCardTitle: { fontSize: 12, fontFamily: Fonts.mono, color: Colors.textMuted, textTransform: 'uppercase', marginBottom: Spacing.sm, letterSpacing: 0.5 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  infoLabel: { fontSize: 13, fontFamily: Fonts.sans, color: Colors.textMuted },
  infoValue: { fontSize: 13, fontFamily: Fonts.mono, color: Colors.ink, fontWeight: '700' },

  // Delete Actions
  deleteArea: { alignItems: 'center', marginVertical: Spacing.md },
  deleteBtn: { paddingVertical: 8, paddingHorizontal: 16 },
  deleteText: { fontSize: 13, fontFamily: Fonts.sansBold, color: Colors.stampRed, textDecorationLine: 'underline' },
});
