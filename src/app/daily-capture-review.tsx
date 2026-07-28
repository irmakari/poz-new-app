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

      Alert.alert(
        'Bugüne Eklendi! 📸',
        'Fotoğrafın anında bugünün kayıtlarına ve fotoğraf baskılarına eklendi.',
        [
          {
            text: 'Tamam',
            onPress: () => {
              router.replace('/(tabs)');
            },
          },
        ]
      );
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
          {/* Top Header */}
          <CaptureReviewHeader title="günlük çekim" />

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

          {/* Retake Photo Action Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleRetake}
            style={styles.retakeButton}
          >
            <PozIcon name="camera" size={16} color={Colors.text} />
            <Text style={styles.retakeButtonText}>yeniden çek</Text>
          </TouchableOpacity>

          {/* Optional Note Input */}
          <JournalNoteInput value={note} onChangeText={setNote} />

          {/* Song Selector */}
          <SongSelectorCard
            selectedSong={selectedSong}
            onOpenPicker={() => setIsSongModalVisible(true)}
            onRemoveSong={() => setSelectedSong(null)}
          />

          <SongPickerModal
            visible={isSongModalVisible}
            onClose={() => setIsSongModalVisible(false)}
            onSelectSong={setSelectedSong}
          />

          {/* Mood Selector */}
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

          {/* Primary CTA Button: Add to Today */}
          <TouchableOpacity
            activeOpacity={0.88}
            disabled={isSaving}
            onPress={handleAddToday}
            style={styles.primaryAddButton}
          >
            <Text style={styles.primaryAddButtonText}>bugüne ekle</Text>
            <PozIcon name="arrow-right" size={18} color="#FFFDF9" />
          </TouchableOpacity>
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
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  photoContainer: {
    width: '100%',
    aspectRatio: 1.2,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1C1A24',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  dateStampBadge: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  dateStampText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: Colors.stampRed,
    fontWeight: '800',
    letterSpacing: 1,
  },
  printFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 4,
  },
  printTitleText: {
    fontSize: 14,
    fontFamily: Fonts.sansExtraBold,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  printDateText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDF9',
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
    marginBottom: Spacing.md,
  },
  retakeButtonText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  primaryAddButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 54,
    borderRadius: BorderRadius.md,
    gap: 8,
    marginTop: Spacing.lg,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryAddButtonText: {
    fontSize: 16,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
});
