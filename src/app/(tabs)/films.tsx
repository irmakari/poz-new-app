import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '@/constants/theme';
import { FilmsHeader } from '@/components/FilmsHeader';
import { ActiveFilmCard } from '@/components/ActiveFilmCard';
import { FilmFilter, FilterCategory } from '@/components/FilmFilter';
import { CompletedFilmBox } from '@/components/CompletedFilmBox';
import { DevelopingFilmCard } from '@/components/DevelopingFilmCard';
import { ArchiveFilmCard } from '@/components/ArchiveFilmCard';
import { NewFilmCard } from '@/components/NewFilmCard';
import { EmptyFilterView } from '@/components/EmptyFilterView';
import { SectionTitle } from '@/components/SectionTitle';
import { FilmItem } from '@/utils/filmData';
import { useApp } from '@/context/AppContext';

export default function FilmsScreen() {
  const router = useRouter();
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const { films, activeFilm: contextActiveFilm } = useApp();

  const activeFilm = contextActiveFilm || films.find((f) => f.status === 'active') || films[0];
  const developingFilm = films.find((f) => f.status === 'developing');
  const completedFilms = films.filter((f) => f.status === 'completed');
  const archiveFilms = films.filter((f) => f.id.startsWith('film-arch') || f.status === 'completed');

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
        <ActiveFilmCard film={activeFilm} />

        {/* Film View Filter Tabs */}
        <FilmFilter
          activeFilter={filterCategory}
          onSelectFilter={setFilterCategory}
        />

        {/* Main Content Areas according to active filter */}
        {filterCategory === 'all' && (
          <>
            {/* Completed Films Horizontal Scroll Carousel */}
            <View style={styles.sectionMargin}>
              <SectionTitle title="tamamlanan filmler" stamp="ROLLS" />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                {completedFilms.map((film) => (
                  <CompletedFilmBox
                    key={film.id}
                    film={film}
                    onPressFilm={handlePressFilm}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Developing Film Section (Karanlık Odada) */}
            {developingFilm && (
              <View style={styles.sectionMargin}>
                <SectionTitle title="karanlık odada" stamp="DARKROOM" />
                <DevelopingFilmCard
                  film={developingFilm}
                  onPressFilm={handlePressFilm}
                />
              </View>
            )}

            {/* Archive 2-Column Grid */}
            <View style={styles.sectionMargin}>
              <SectionTitle title="arşiv" stamp="35MM VAULT" />
              <View style={styles.archiveGridContainer}>
                {archiveFilms.map((film) => (
                  <View key={film.id} style={styles.gridCell}>
                    <ArchiveFilmCard film={film} onPressFilm={handlePressFilm} />
                  </View>
                ))}
              </View>
            </View>

            {/* Start New Film Action Card */}
            <NewFilmCard />
          </>
        )}

        {filterCategory === 'completed' && (
          <>
            <View style={styles.sectionMargin}>
              <SectionTitle title="tamamlanan filmler" stamp="ARCHIVED" />
              <View style={styles.archiveGridContainer}>
                {[...completedFilms, ...archiveFilms].map((film) => (
                  <View key={film.id} style={styles.gridCell}>
                    <ArchiveFilmCard film={film} onPressFilm={handlePressFilm} />
                  </View>
                ))}
              </View>
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
    paddingBottom: 130, // Bottom Tab Bar clearance
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
});
