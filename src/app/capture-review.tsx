import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '@/constants/theme';
import { CaptureReviewHeader } from '@/components/CaptureReviewHeader';
import { HiddenFrameCard } from '@/components/HiddenFrameCard';
import { JournalNoteInput } from '@/components/JournalNoteInput';
import { SongSelectorCard } from '@/components/SongSelectorCard';
import { SongPickerModal } from '@/components/SongPickerModal';
import { MoodStickerSelector } from '@/components/MoodStickerSelector';
import { LocationSelector } from '@/components/LocationSelector';
import { FrameBackPreview } from '@/components/FrameBackPreview';
import { SaveFrameButton } from '@/components/SaveFrameButton';
import { MockSongItem } from '@/utils/captureReviewData';

export default function CaptureReviewScreen() {
  const { photoUri, frame = '13', filmId = 'summer-glow-july-2026' } =
    useLocalSearchParams<{ photoUri?: string; frame: string; filmId: string }>();

  // Local Form States
  const [note, setNote] = useState('');
  const [selectedSong, setSelectedSong] = useState<MockSongItem | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>('huzurlu');
  const [customMood, setCustomMood] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Modal State
  const [isSongModalVisible, setIsSongModalVisible] = useState(false);

  const isFormEmpty =
    !note.trim() && !selectedSong && !selectedLocation && selectedMood === 'huzurlu';

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
          {/* Top Navigation */}
          <CaptureReviewHeader />

          {/* Unexposed Closed Frame Hero Section */}
          <HiddenFrameCard
            frameNumber={frame}
            filmName={filmId.includes('summer') ? 'summer glow' : filmId}
            serialNumber={`SG-0726-0${frame}`}
            dateStr="27 temmuz 2026"
            timeStr="18:42"
          />

          {/* Daily Journal Note Input */}
          <JournalNoteInput value={note} onChangeText={setNote} />

          {/* Song Selector Card */}
          <SongSelectorCard
            selectedSong={selectedSong}
            onOpenPicker={() => setIsSongModalVisible(true)}
            onRemoveSong={() => setSelectedSong(null)}
          />

          {/* Song Selection Sheet Modal */}
          <SongPickerModal
            visible={isSongModalVisible}
            onClose={() => setIsSongModalVisible(false)}
            onSelectSong={setSelectedSong}
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

          {/* Live Dynamic Photo Back Summary Preview */}
          <FrameBackPreview
            frameNumber={frame}
            dateStr="27 temmuz 2026"
            timeStr="18:42"
            note={note.trim()}
            song={selectedSong}
            mood={customMood || selectedMood}
            location={selectedLocation}
          />

          {/* Save & Cancel Flow Action */}
          <SaveFrameButton frameNumber={frame} isFormEmpty={isFormEmpty} />
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
});
