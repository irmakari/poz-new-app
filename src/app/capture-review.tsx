import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { CaptureReviewHeader } from '@/components/CaptureReviewHeader';
import { HiddenFrameCard } from '@/components/HiddenFrameCard';
import { JournalNoteInput } from '@/components/JournalNoteInput';
import { SongSelectorCard } from '@/components/SongSelectorCard';
import { SongPickerModal } from '@/components/SongPickerModal';
import { MoodStickerSelector } from '@/components/MoodStickerSelector';
import { LocationSelector } from '@/components/LocationSelector';
import { PozIcon } from '@/components/PozIcon';
import { MockSongItem } from '@/utils/captureReviewData';
import { useApp } from '@/context/AppContext';
import { getFormattedTodayFull, getFormattedTime } from '@/utils/dateUtils';

export default function CaptureReviewScreen() {
  const router = useRouter();
  const { photoUri, frame = '1', filmId = 'summer-glow-july-2026', viewfinderMode = 'compact', selectedFilter = 'dazz-green', isDreamyGlow: paramGlow = '1' } =
    useLocalSearchParams<{ photoUri?: string; frame: string; filmId: string; viewfinderMode?: string; selectedFilter?: string; isDreamyGlow?: string }>();

  const { addPhotoFrame } = useApp();

  // Local Form States
  const [note, setNote] = useState('');
  const [selectedSong, setSelectedSong] = useState<MockSongItem | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>('huzurlu');
  const [customMood, setCustomMood] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // UI state for optional details
  const [showDetails, setShowDetails] = useState(false);
  const [isSongModalVisible, setIsSongModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePhotoFrame = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const result = await addPhotoFrame({
        photoUri,
        note: note.trim(),
        song: selectedSong ? { title: selectedSong.title, artist: selectedSong.artist } : null,
        mood: customMood.trim() || selectedMood,
        location: selectedLocation,
      });

      if (result.isFilmComplete && result.filmId) {
        // Film doldu! → Doğrudan film detay ekranına git (banyo butonu orada)
        router.replace(`/film/${result.filmId}` as any);
      } else {
        // Devam et → Kameraya dön
        router.replace('/(tabs)/camera');
      }
    } catch (error) {
      setIsSaving(false);
      Alert.alert('Hata', 'Kare kaydedilirken bir sorun oluştu.');
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
          {/* Top Navigation with Prominent KAYDET Button */}
          <CaptureReviewHeader
            title={`${frame}. kare alındı`}
            onSave={handleSavePhotoFrame}
            isSaving={isSaving}
          />

          {/* Film Frame Preview */}
          <HiddenFrameCard
            frameNumber={frame}
            filmName={filmId.includes('summer') ? 'summer glow' : filmId}
            serialNumber={`SG-0726-0${frame}`}
            dateStr={getFormattedTodayFull()}
            timeStr={getFormattedTime()}
            photoUri={photoUri}
            viewfinderMode={viewfinderMode}
            selectedFilter={selectedFilter}
            isDreamyGlow={paramGlow !== '0'}
          />

          {/* Quick Primary Save Action Button (1-Tap Save) */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleSavePhotoFrame}
            disabled={isSaving}
            style={styles.quickSaveButton}
          >
            <Text style={styles.quickSaveText}>
              {isSaving ? 'FİLME EKLENİYOR...' : 'KAREYİ FİLME EKLE & DEVAM ET ✓'}
            </Text>
          </TouchableOpacity>

          {/* Optional Details Toggle Accordion */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowDetails((prev) => !prev)}
            style={styles.toggleDetailsButton}
          >
            <PozIcon name="sparkle" size={16} color={Colors.filmBlue} />
            <Text style={styles.toggleDetailsText}>
              {showDetails ? '— Not / Şarkı / His Seçeneklerini Gizle' : '+ Not, Şarkı veya His Ekle'}
            </Text>
          </TouchableOpacity>

          {/* Optional Form Section */}
          {showDetails && (
            <View style={styles.optionalSection}>
              {/* Daily Journal Note Input */}
              <JournalNoteInput value={note} onChangeText={setNote} />

              {/* Song Selector Card */}
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
  quickSaveButton: {
    backgroundColor: Colors.burgundy,
    paddingVertical: 16,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.md,
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
  toggleDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F7F2EA',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  toggleDetailsText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.ink,
  },
  optionalSection: {
    marginTop: Spacing.xs,
  },
});
