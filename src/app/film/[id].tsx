import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '@/constants/theme';
import { FilmDetailHeader } from '@/components/FilmDetailHeader';
import { FilmHero } from '@/components/FilmHero';
import { FilmStatusStamp } from '@/components/FilmStatusStamp';
import { FilmSummaryTickets } from '@/components/FilmSummaryTickets';
import { ViewModeSelector, ViewMode } from '@/components/ViewModeSelector';
import { ContactSheet } from '@/components/ContactSheet';
import { FilmStripViewer } from '@/components/FilmStripViewer';
import { MonthNotesSection } from '@/components/MonthNotesSection';
import { MonthSongsSection } from '@/components/MonthSongsSection';
import { MoodStickerGroup } from '@/components/MoodStickerGroup';
import { FilmDetailsReceipt } from '@/components/FilmDetailsReceipt';
import { FilmActionArea } from '@/components/FilmActionArea';
import { EmptyFilmView } from '@/components/EmptyFilmView';
import { SectionTitle } from '@/components/SectionTitle';
import { getFilmById } from '@/utils/filmData';

export default function FilmDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const film = getFilmById(id);

  const [viewMode, setViewMode] = useState<ViewMode>('contact');

  if (!film) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <FilmDetailHeader />
        <EmptyFilmView />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Navigation */}
        <FilmDetailHeader />

        {/* Film Envelope Hero Section */}
        <FilmHero film={film} />

        {/* Film Status Process Stamp */}
        <FilmStatusStamp
          status={film.status}
          frameCount={film.frameCount}
          totalFrames={film.totalFrames}
          remainingTime={film.remainingTime}
        />

        {/* Film Summary Statistics & Note */}
        <FilmSummaryTickets
          stats={film.stats}
          totalFrames={film.totalFrames}
          summaryMessage={film.summaryMessage}
        />

        {/* Frames View Mode Selector (Kontakt Baskı vs Film Şeridi) */}
        <View style={styles.sectionContainer}>
          <SectionTitle title="filmin kareleri" stamp={`${film.totalFrames} EXP`} />
          <ViewModeSelector currentMode={viewMode} onSelectMode={setViewMode} />

          {/* Contact Sheet vs Film Strip Viewer */}
          {film.photos && film.photos.length > 0 ? (
            viewMode === 'contact' ? (
              <ContactSheet photos={film.photos} status={film.status} />
            ) : (
              <FilmStripViewer photos={film.photos} status={film.status} />
            )
          ) : null}
        </View>

        {/* Month Notes Section */}
        <MonthNotesSection notes={film.notes} />

        {/* Month Songs Section */}
        <MonthSongsSection songs={film.songs} />

        {/* Month Moods Section */}
        <MoodStickerGroup moods={film.moods} monthName={film.dateLabel.split(' ')[0]} />

        {/* Photo Lab Receipt Specs */}
        <FilmDetailsReceipt film={film} />

        {/* Actions Area */}
        <FilmActionArea />
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
  sectionContainer: {
    marginVertical: Spacing.xs,
  },
});
