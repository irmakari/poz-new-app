import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ArchiveFilmCard } from '@/components/ArchiveFilmCard';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { useApp } from '@/context/AppContext';
import { FilmItem } from '@/utils/filmData';

type SortOption = 'newest' | 'oldest' | 'alphabetical';
type FilterStatus = 'all' | 'completed' | 'archived';

export default function FullFilmArchiveScreen() {
  const router = useRouter();
  const { films } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  // Filter & Sort Logic
  const processedFilms = useMemo(() => {
    // Only completed or archived films belong to full archive
    let list = films.filter((f) => f.status === 'completed' || f.status === 'archived');

    // Filter status
    if (filterStatus === 'completed') {
      list = list.filter((f) => f.status === 'completed');
    } else if (filterStatus === 'archived') {
      list = list.filter((f) => f.status === 'archived');
    }

    // Search query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (f) =>
          (f.name || f.title || '').toLowerCase().includes(q) ||
          (f.filmTypeName || '').toLowerCase().includes(q) ||
          (f.serial || '').toLowerCase().includes(q)
      );
    }

    // Sorting
    return [...list].sort((a, b) => {
      if (sortOption === 'alphabetical') {
        return (a.name || a.title || '').localeCompare(b.name || b.title || '');
      }
      const timeA = new Date(a.developedAt || a.completedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.developedAt || b.completedAt || b.createdAt || 0).getTime();

      if (sortOption === 'newest') {
        return timeB - timeA;
      }
      return timeA - timeB;
    });
  }, [films, filterStatus, searchQuery, sortOption]);

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
        {/* Header Bar */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.ink, marginTop: -2 }}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>tüm film arşivi</Text>

          <View style={styles.badgeCount}>
            <Text style={styles.badgeCountText}>{processedFilms.length} RULO</Text>
          </View>
        </View>

        {/* Section Title */}
        <SectionTitle
          title="35mm film tonozu"
          categoryLabel="FULL VAULT ARCHIVE"
          code={`TOTAL: ${processedFilms.length}`}
          stamp="VAULT"
        />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <PozIcon name="search" size={16} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Film adı, preset veya seri no ara..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: 4 }}>
              <Text style={{ fontSize: 12, color: Colors.textMuted, fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Sort & Filter Controls Row */}
        <View style={styles.controlsSection}>
          {/* Status Filter Tabs */}
          <View style={styles.statusPillsRow}>
            {(['all', 'completed', 'archived'] as FilterStatus[]).map((st) => (
              <TouchableOpacity
                key={st}
                activeOpacity={0.8}
                onPress={() => setFilterStatus(st)}
                style={[
                  styles.filterPill,
                  filterStatus === st && styles.filterPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    filterStatus === st && styles.filterPillTextActive,
                  ]}
                >
                  {st === 'all' ? 'Tümü' : st === 'completed' ? 'Tamamlanan' : 'Arşivlenen'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sort Buttons */}
          <View style={styles.sortButtonsRow}>
            <Text style={styles.sortLabel}>Sırala:</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSortOption('newest')}
              style={[styles.sortBtn, sortOption === 'newest' && styles.sortBtnActive]}
            >
              <Text style={[styles.sortBtnText, sortOption === 'newest' && styles.sortBtnTextActive]}>
                En Yeni
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSortOption('oldest')}
              style={[styles.sortBtn, sortOption === 'oldest' && styles.sortBtnActive]}
            >
              <Text style={[styles.sortBtnText, sortOption === 'oldest' && styles.sortBtnTextActive]}>
                En Eski
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSortOption('alphabetical')}
              style={[styles.sortBtn, sortOption === 'alphabetical' && styles.sortBtnActive]}
            >
              <Text style={[styles.sortBtnText, sortOption === 'alphabetical' && styles.sortBtnTextActive]}>
                A-Z
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2-Column Grid Area */}
        {processedFilms.length > 0 ? (
          <View style={styles.archiveGridContainer}>
            {processedFilms.map((film, idx) => (
              <View key={`full-arch-${film.id}-${idx}`} style={styles.gridCell}>
                <ArchiveFilmCard film={film} onPressFilm={handlePressFilm} />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <PozIcon name="films" size={36} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>Arşivde film bulunamadı</Text>
            <Text style={styles.emptyDesc}>
              Arama kriterini değiştirebilir veya yeni bir film çekimi başlatabilirsin.
            </Text>
          </View>
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
    paddingBottom: Spacing.xxl + 40,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFDF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.sansBlack,
    color: Colors.ink,
  },
  badgeCount: {
    backgroundColor: '#181520',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
  },
  badgeCountText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: '#FFF1B0',
    fontWeight: '800',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: Spacing.xs,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.ink,
  },
  controlsSection: {
    marginVertical: Spacing.sm,
    gap: 10,
  },
  statusPillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: BorderRadius.full || 20,
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillActive: {
    backgroundColor: '#181520',
    borderColor: '#181520',
  },
  filterPillText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.textSecondary,
  },
  filterPillTextActive: {
    color: '#FFFDF9',
  },
  sortButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortLabel: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    marginRight: 4,
  },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(28, 26, 36, 0.04)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sortBtnActive: {
    backgroundColor: Colors.yellow,
    borderColor: 'rgba(230, 168, 0, 0.3)',
  },
  sortBtnText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
  },
  sortBtnTextActive: {
    color: '#181520',
    fontWeight: '800',
  },
  archiveGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  gridCell: {
    width: '48.5%',
    marginVertical: 4,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: Fonts.sansBold,
    color: Colors.ink,
  },
  emptyDesc: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
