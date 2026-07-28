import React, { useState } from 'react';
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
import { MockSongItem } from '@/utils/captureReviewData';
import { useApp } from '@/context/AppContext';
import { getFormattedTodayFull, getFormattedTodayStamp } from '@/utils/dateUtils';

export default function DailyCaptureReviewScreen() {
  const router = useRouter();
  const { photoUri } = useLocalSearchParams<{ photoUri?: string }>();
  const { addDailyPhoto } = useApp();

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

  const handleRetake = () => {
    router.back();
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

            <View style={styles.photoContainer}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.photoImage} resizeMode="cover" />
              ) : (
                <MockAnalogScene sceneType="sunset-seaside" />
              )}

              <GrainOverlay />

              {/* Red Camera Date Stamp */}
              <View style={styles.dateStampBadge}>
                <Text style={styles.dateStampText}>{getFormattedTodayStamp()}</Text>
              </View>
            </View>

            {/* Bottom Polaroid Border Info */}
            <View style={styles.printFooterRow}>
              <View>
                <Text style={styles.printTitleText}>GÜNLÜK BASKI</Text>
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
    height: 280,
    borderRadius: BorderRadius.md,
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
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  dateStampText: {
    color: '#FF6F61',
    fontSize: 12,
    fontFamily: Fonts.mono,
    fontWeight: '700',
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
