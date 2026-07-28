import { ActiveFilmNotice } from '@/components/ActiveFilmNotice';
import { CreateFilmButton } from '@/components/CreateFilmButton';
import { DatePickerModal } from '@/components/DatePickerModal';
import { FilmBoxPreview } from '@/components/FilmBoxPreview';
import { FilmNameLabel } from '@/components/FilmNameLabel';
import { FilmPurposeSelector } from '@/components/FilmPurposeSelector';
import { FilmSummaryReceipt } from '@/components/FilmSummaryReceipt';
import { FilmTypeSelector } from '@/components/FilmTypeSelector';
import { FrameCountSelector } from '@/components/FrameCountSelector';
import { NewFilmHeader } from '@/components/NewFilmHeader';
import { PaperStamp } from '@/components/PaperStamp';
import { StartMode, StartModeSelector } from '@/components/StartModeSelector';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import {
  FILM_PURPOSES,
  FILM_TYPE_OPTIONS,
  FRAME_OPTIONS,
  FilmPurposeOption,
  FilmTypeOption,
  FrameOption,
} from '@/utils/newFilmData';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewFilmScreen() {
  // Selection States
  const [selectedFilmType, setSelectedFilmType] = useState<FilmTypeOption>(
    FILM_TYPE_OPTIONS[0]
  );
  const [filmName, setFilmName] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState<FilmPurposeOption>(
    FILM_PURPOSES[0]
  );
  const [selectedFrameCount, setSelectedFrameCount] = useState<FrameOption>(
    FRAME_OPTIONS[0]
  );
  const [selectedStartMode, setSelectedStartMode] = useState<StartMode>('now');
  const [selectedCustomDate, setSelectedCustomDate] = useState('1 ağustos 2026');

  // Modal State
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

  // Derived Values
  const displayName = filmName.trim() || selectedFilmType.name;
  const serialNumber = `POZ-${selectedFilmType.serialPrefix}0726-${selectedFrameCount.count}`;

  const startDateStr =
    selectedStartMode === 'now'
      ? '27 temmuz 2026'
      : selectedStartMode === 'tomorrow'
        ? '28 temmuz 2026'
        : selectedCustomDate;

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
          {/* Top Header Navigation */}
          <NewFilmHeader />

          {/* Main Title Hero Area */}
          <View style={styles.mainTitleCard}>
            <View style={styles.titleRow}>
              <View style={styles.textGroup}>
                <Text style={styles.mainTitleText}>yeni bir rulo seç</Text>
                <Text style={styles.subtitleText}>
                  bu film, yeni anılarının saklanacağı küçük bir kutu olacak.
                </Text>
              </View>

              <PaperStamp label="FRESH ROLL" color={Colors.stampRed} rotation="4deg" />
            </View>
          </View>

          {/* 1. Film Type Selection (Summer Glow, Golden Hour, Soft Sunday, etc.) */}
          <FilmTypeSelector
            selectedType={selectedFilmType}
            onSelectType={setSelectedFilmType}
          />

          {/* 2. Film Custom Name Label */}
          <FilmNameLabel
            value={filmName}
            onChangeText={setFilmName}
            defaultTitle={selectedFilmType.name}
          />

          {/* 3. Film Purpose Selector */}
          <FilmPurposeSelector
            selectedPurpose={selectedPurpose}
            onSelectPurpose={setSelectedPurpose}
          />

          {/* 4. Frame Count Selector (36 EXP, 24 EXP, 12 EXP) */}
          <FrameCountSelector
            selectedFrame={selectedFrameCount}
            onSelectFrame={setSelectedFrameCount}
          />

          {/* 5. Start Mode Selector */}
          <StartModeSelector
            currentMode={selectedStartMode}
            onSelectMode={setSelectedStartMode}
            selectedDateStr={selectedCustomDate}
            onOpenDatePicker={() => setIsDateModalVisible(true)}
          />

          {/* Custom Date Picker Modal */}
          <DatePickerModal
            visible={isDateModalVisible}
            onClose={() => setIsDateModalVisible(false)}
            selectedDate={selectedCustomDate}
            onSelectDate={setSelectedCustomDate}
          />

          {/* Active Film Notice Warning */}
          <ActiveFilmNotice />

          {/* 6. Dynamic 3D Film Box Preview */}
          <FilmBoxPreview
            filmType={selectedFilmType}
            displayName={displayName}
            purpose={selectedPurpose}
            frameCount={selectedFrameCount}
            startDateStr={startDateStr}
            serialNumber={serialNumber}
          />

          {/* 7. Order Summary Receipt */}
          <FilmSummaryReceipt
            displayName={displayName}
            typeName={selectedFilmType.name}
            iso={selectedFilmType.iso}
            frameCount={selectedFrameCount.count}
            purposeLabel={selectedPurpose.label}
            startDateStr={startDateStr}
            serialNumber={serialNumber}
          />

          {/* Primary CTA & Cancel Action */}
          <CreateFilmButton
            filmType={selectedFilmType}
            displayName={displayName}
            purpose={selectedPurpose}
            frameCount={selectedFrameCount}
            startDateStr={startDateStr}
            serialNumber={serialNumber}
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
  mainTitleCard: {
    marginBottom: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textGroup: {
    flex: 1,
    paddingRight: 8,
  },
  mainTitleText: {
    fontSize: 32,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
    letterSpacing: -0.8,
  },
  subtitleText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
});
