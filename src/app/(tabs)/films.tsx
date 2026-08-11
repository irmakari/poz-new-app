import { ActiveFilmCard } from '@/components/ActiveFilmCard';
import { ArchiveFilmCard } from '@/components/ArchiveFilmCard';
import { CompletedFilmBox } from '@/components/CompletedFilmBox';
import { DevelopingFilmCard } from '@/components/DevelopingFilmCard';
import { EmptyFilterView } from '@/components/EmptyFilterView';
import { FilmFilter, FilterCategory } from '@/components/FilmFilter';
import { FilmsHeader } from '@/components/FilmsHeader';
import { NewFilmCard } from '@/components/NewFilmCard';
import { SectionTitle } from '@/components/SectionTitle';
import { Colors, Spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { FilmItem } from '@/utils/filmData';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FilmsScreen() {
  const router = useRouter();
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const { films, activeFilm: contextActiveFilm } = useApp();

  // 1. Active Film (Current roll in camera)
  const activeFilm = contextActiveFilm || films.find((f) => f.status === 'active') || films[0];

  // 2. Developing / Ready to develop films (In Darkroom or waiting for wash)
  const developingFilm = films.find((f) => f.status === 'developing' || f.status === 'readyToDevelop');

  // 3. Completed Films (Developed and ready to view)
  const completedFilms = films.filter((f) => f.status === 'completed');

  // 4. Archived Films (Unique list for Vault Grid - archived or completed, deduplicated)
  const archiveFilms = films.filter((f) => f.status === 'archived' || f.status === 'completed');

  const handlePressFilm = (film: FilmItem) => {
    router.push({
      pathname: '/film/[id]',
      params: { id: film.id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <FilmsHeader />

        {/* Active Film Section (Cardstock Envelope) */}
        {activeFilm ? <ActiveFilmCard film={activeFilm} /> : null}

        {/* Film View Filter Tabs */}
        <FilmFilter
          activeFilter={filterCategory}
          onSelectFilter={setFilterCategory}
        />

        {/* Main Content Areas according to active filter */}
        {filterCategory === 'all' && (
          <>
            {/* Completed Films Horizontal Scroll Carousel */}
            {completedFilms.length > 0 && (
              <View style={styles.sectionMargin}>
                <SectionTitle title="tamamlanan filmler" categoryLabel="FILM ROLLS" code="ROLL-35MM" stamp="COMPLETED" />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalScrollContent}
                >
                  {completedFilms.map((film, idx) => (
                    <CompletedFilmBox
                      key={`comp-${film.id}-${idx}`}
                      film={film}
                      onPressFilm={handlePressFilm}
                    />
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Developing Film Section (Karanlık Odada) */}
            {developingFilm && (
              <View style={styles.sectionMargin}>
                <SectionTitle title="karanlık odada" categoryLabel="DARKROOM" code="LAB-PROCESS" stamp="DEVELOPING" />
                <DevelopingFilmCard
                  film={developingFilm}
                  onPressFilm={handlePressFilm}
                />
              </View>
            )}

            {/* Archive Horizontal Scroll Section with See-All Button */}
            <View style={styles.sectionMargin}>
              <SectionTitle
                title="arşiv"
                categoryLabel="35MM VAULT"
                stamp="ARCHIVED"
                actionLabel="tümünü gör ›"
                onPressAction={() => router.push('/film/archive')}
              />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {archiveFilms.map((film, idx) => (
                  <View key={`arch-h-${film.id}-${idx}`} style={styles.horizontalCardCell}>
                    <ArchiveFilmCard film={film} onPressFilm={handlePressFilm} />
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Start New Film Action Card */}
            <NewFilmCard />
          </>
        )}

        {filterCategory === 'completed' && (
          <>
            <View style={styles.sectionMargin}>
              <SectionTitle
                title="tamamlanan filmler"
                stamp="COMPLETED"
                actionLabel="tümünü gör ›"
                onPressAction={() => router.push('/film/archive')}
              />
              {completedFilms.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalScrollContent}
                >
                  {completedFilms.map((film, idx) => (
                    <View key={`tab-comp-h-${film.id}-${idx}`} style={styles.horizontalCardCell}>
                      <ArchiveFilmCard film={film} onPressFilm={handlePressFilm} />
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <EmptyFilterView />
              )}
            </View>
            <NewFilmCard />
          </>
        )}

        {filterCategory === 'developing' && (
          <>
            {developingFilm ? (
              <View style={styles.sectionMargin}>
                <SectionTitle title="karanlık odada" stamp="PROCESSING" />
                <DevelopingFilmCard
                  film={developingFilm}
                  onPressFilm={handlePressFilm}
                />
              </View>
            ) : (
              <EmptyFilterView />
            )}
            <NewFilmCard />
          </>
        )}
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
    paddingBottom: 150, // Bottom Tab Bar clearance
  },
  sectionMargin: {
    marginVertical: Spacing.xs,
  },
  horizontalScrollContent: {
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  archiveGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  gridCell: {
    width: '48.5%',
    marginVertical: 4,
  },
  horizontalCardCell: {
    width: 175,
    marginRight: 10,
    marginVertical: 4,
  },
});
