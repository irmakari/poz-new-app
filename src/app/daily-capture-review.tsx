import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { CaptureReviewHeader } from '@/components/CaptureReviewHeader';
import { JournalNoteInput } from '@/components/JournalNoteInput';
import { SongSelectorCard } from '@/components/SongSelectorCard';
import { SongPickerModal } from '@/components/SongPickerModal';
import { MoodStickerSelector } from '@/components/MoodStickerSelector';
import { LocationSelector } from '@/components/LocationSelector';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';
import { GrainOverlay } from '@/components/GrainOverlay';
import { MockAnalogScene } from '@/components/MockAnalogScene';
import { FILTERS, FilterType } from '@/constants/filmFilters';
import { MockSongItem } from '@/utils/captureReviewData';
import { useApp } from '@/context/AppContext';
import { getFormattedTodayFull, getFormattedTodayStamp } from '@/utils/dateUtils';

export default function DailyCaptureReviewScreen() {
  const router = useRouter();
  const {
    photoUri,
    viewfinderMode = 'compact',
    selectedFilter: paramFilter = 'dazz-green',
    isDreamyGlow: paramGlow = '1',
  } = useLocalSearchParams<{
    photoUri?: string;
    viewfinderMode?: string;
    selectedFilter?: string;
    isDreamyGlow?: string;
  }>();
  const { addDailyPhoto } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<FilterType>((paramFilter as FilterType) || 'dazz-green');
  const [isDreamyGlow, setIsDreamyGlow] = useState(paramGlow !== '0');

  useEffect(() => {
    if (paramFilter) {
      setSelectedFilter(paramFilter as FilterType);
    }
  }, [paramFilter]);

  const currentFilterObj = FILTERS.find((f) => f.id === selectedFilter) || FILTERS[0];

  let containerAspectRatio = 1.4;
  if (viewfinderMode === 'expanded') {
    containerAspectRatio = 3 / 4;
  } else if (viewfinderMode === 'cinematic') {
    containerAspectRatio = 1.85;
  }

  // Form states
  const [note, setNote] = useState('');
  const [selectedSong, setSelectedSong] = useState<MockSongItem | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>('huzurlu');
  const [customMood, setCustomMood] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // UI State
  const [showDetails, setShowDetails] = useState(false);
  const [isSongModalVisible, setIsSongModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGallerySaving, setIsGallerySaving] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  const handleRetake = () => {
    router.back();
  };

  const handleSaveToGallery = async () => {
    setIsGallerySaving(true);
    try {
      let imageToSave = photoUri;

      if (viewShotRef.current && (viewShotRef.current as any).capture) {
        try {
          imageToSave = await (viewShotRef.current as any).capture();
        } catch (err) {
          console.warn('ViewShot capture failed, falling back to photoUri', err);
        }
      }

      if (!imageToSave) {
        Alert.alert('Fotoğraf Bulunamadı', 'Galeriye kaydedilecek fotoğraf bulunamadı.');
        return;
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.createAssetAsync(imageToSave);
        Alert.alert('Galerine İndirildi! 📸', 'Fotoğraf (35mm efekt ve tarih damgasıyla) galerine kaydedildi!');
      } else {
        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
          await Sharing.shareAsync(imageToSave);
        } else {
          Alert.alert('İzin Gerekli', 'Fotoğrafı galeriye kaydetmek için izin vermelisiniz.');
        }
      }
    } catch (e) {
      if (photoUri) {
        await MediaLibrary.createAssetAsync(photoUri).catch(() => {});
      }
      Alert.alert('Fotoğraf Kaydedildi 📸', 'Fotoğraf galeriye aktarıldı.');
    } finally {
      setIsGallerySaving(false);
    }
  };

  const handleAddToday = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      await addDailyPhoto({
        photoUri,
        note: note.trim(),
        song: selectedSong ? { title: selectedSong.title, artist: selectedSong.artist } : null,
        mood: customMood.trim() || selectedMood,
        location: selectedLocation,
      });

      // Navigate back to camera or home immediately
      router.replace('/(tabs)/camera');
    } catch (e) {
      setIsSaving(false);
      Alert.alert('Hata', 'Fotoğraf kaydedilirken bir sorun oluştu.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Header with Prominent KAYDET Button */}
          <CaptureReviewHeader
            title="günlük çekim"
            onSave={handleAddToday}
            isSaving={isSaving}
          />

          {/* Large Visible Analog Polaroid Photo Print Card */}
          <View style={styles.photoPrintCard}>
            <TapeDecoration position="top-left" width={42} height={12} color={Colors.tapePink} />

            <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.95 }} style={{ width: '100%', overflow: 'hidden', borderRadius: 0, backgroundColor: '#000000' }}>
              <View style={[styles.photoContainer, { aspectRatio: containerAspectRatio }]}>
                {photoUri ? (
                  <Image source={{ uri: photoUri }} style={styles.photoImage} resizeMode="cover" />
                ) : (
                  <MockAnalogScene sceneType="sunset-seaside" />
                )}

                {/* Selected Dazz Cam Color Filter Overlay */}
                <View
                  style={[styles.amberFilmOverlay, { backgroundColor: currentFilterObj.overlayColor }]}
                  pointerEvents="none"
                />

                {/* Digicam Soft Dreamy Bloom Glow Overlay */}
                {isDreamyGlow && (
                  <View style={styles.dreamyBloomOverlay} pointerEvents="none" />
                )}

                <GrainOverlay />

                {/* Bright Silver Camera Date Stamp with 5-Pointed Star Accent */}
                <View style={styles.dateStampBadge}>
                  <Text style={styles.dateStampText}>{getFormattedTodayStamp()} ★</Text>
                </View>
              </View>
            </ViewShot>

            {/* Interactive Dazz Cam Film Selector Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
              <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 2 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setIsDreamyGlow((prev) => !prev)}
                  style={[styles.filterPill, isDreamyGlow && styles.filterPillActive]}
                >
                  <Text style={[styles.filterPillText, isDreamyGlow && styles.filterPillTextActive]}>
                    {isDreamyGlow ? '✨ RÜYA BLOOM: AÇIK ✓' : '✨ RÜYA BLOOM: KAPALI'}
                  </Text>
                </TouchableOpacity>

                {FILTERS.map((f) => {
                  const isActive = selectedFilter === f.id;
                  return (
                    <TouchableOpacity
                      key={f.id}
                      activeOpacity={0.8}
                      onPress={() => setSelectedFilter(f.id)}
                      style={[styles.filterPill, isActive && styles.filterPillActive]}
                    >
                      <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                        {f.badge}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Bottom Polaroid Border Info */}
            <View style={styles.printFooterRow}>
              <View>
                <Text style={styles.printTitleText}>{currentFilterObj.badge} • 35MM BASKI</Text>
                <Text style={styles.printDateText}>{getFormattedTodayFull()}</Text>
              </View>

              <PaperStamp label="DAILY PRINT" color={Colors.yellowDark} rotation="-3deg" />
            </View>
          </View>

          {/* Quick Primary Save Action Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleAddToday}
            disabled={isSaving}
            style={styles.quickSaveButton}
          >
            <Text style={styles.quickSaveText}>
              {isSaving ? 'KAYDEDİLİYOR...' : 'BUGÜNE EKLE & DEVAM ET ✓'}
            </Text>
          </TouchableOpacity>

          {/* Download / Save to Gallery Action Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSaveToGallery}
            disabled={isGallerySaving}
            style={styles.gallerySaveButton}
          >
            <PozIcon name="photo" size={16} color={Colors.yellowDark} />
            <Text style={styles.gallerySaveText}>
              {isGallerySaving ? 'GALERİYE KAYDEDİLİYOR...' : '📥 FOTOĞRAFI GALERİYE İNDİR / KAYDET'}
            </Text>
          </TouchableOpacity>


          {/* Retake & Optional Details Actions */}
          <View style={styles.secondaryActionsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleRetake}
              style={styles.retakeButton}
            >
              <PozIcon name="camera" size={16} color={Colors.ink} />
              <Text style={styles.retakeButtonText}>yeniden çek</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowDetails((prev) => !prev)}
              style={styles.toggleDetailsButton}
            >
              <Text style={styles.toggleDetailsText}>
                {showDetails ? '— Detayları Gizle' : '+ Not / His Ekle'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Optional Form Section */}
          {showDetails && (
            <View style={styles.optionalSection}>
              {/* Optional Note Input */}
              <JournalNoteInput value={note} onChangeText={setNote} />

              {/* Song Selector */}
              <SongSelectorCard
                selectedSong={selectedSong}
                onOpenPicker={() => setIsSongModalVisible(true)}
                onRemoveSong={() => setSelectedSong(null)}
              />

              {/* Mood Sticker Selector */}
              <MoodStickerSelector
                selectedMood={selectedMood}
                onSelectMood={setSelectedMood}
                customMood={customMood}
                onChangeCustomMood={setCustomMood}
              />

              {/* Location Selector */}
              <LocationSelector
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
              />
            </View>
          )}

          {/* Song Selection Sheet Modal */}
          <SongPickerModal
            visible={isSongModalVisible}
            onClose={() => setIsSongModalVisible(false)}
            onSelectSong={setSelectedSong}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl + 20,
  },
  photoPrintCard: {
    backgroundColor: '#F7F2EA',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    position: 'relative',
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  photoContainer: {
    width: '100%',
    aspectRatio: 1.4,
    borderRadius: 0,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#111827',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  dateStampBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  dateStampText: {
    color: '#E2E8F0',
    fontSize: 9.5,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    letterSpacing: 0.8,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  vignetteOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 16,
    borderRadius: BorderRadius.md,
  },
  dreamyBloomOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 245, 225, 0.08)',
  },
  dreamyLightLeak: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(255, 235, 190, 0.15)',
    shadowColor: '#FFFDF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 28,
  },
  softFocusOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  filterPill: {
    backgroundColor: '#EBE3D5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillActive: {
    backgroundColor: Colors.brandPrimary,
    borderColor: Colors.brandPrimary,
  },
  filterPillText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.ink,
    fontWeight: '700',
  },
  filterPillTextActive: {
    color: '#FFFDF6',
    fontWeight: '900',
  },
  printFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingHorizontal: 4,
  },
  printTitleText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: Colors.ink,
    fontWeight: '800',
  },
  printDateText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    marginTop: 2,
  },
  quickSaveButton: {
    backgroundColor: Colors.burgundy,
    paddingVertical: 16,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    shadowColor: Colors.burgundy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(244, 236, 226, 0.3)',
  },
  quickSaveText: {
    fontSize: 14,
    fontFamily: Fonts.sansBlack,
    color: '#F4ECE2',
    letterSpacing: 0.5,
  },
  amberFilmOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 180, 80, 0.12)',
  },
  gallerySaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.yellow,
    borderRadius: BorderRadius.md,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.yellowDark,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  gallerySaveText: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    fontWeight: '800',
    color: Colors.yellowDark,
    letterSpacing: 0.5,
  },
  secondaryActionsRow: {

    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: Spacing.sm,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F7F2EA',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  retakeButtonText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.ink,
  },
  toggleDetailsButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F7F2EA',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  toggleDetailsText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.ink,
  },
  optionalSection: {
    marginTop: Spacing.xs,
  },
});
