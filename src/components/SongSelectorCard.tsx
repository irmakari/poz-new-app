import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { MockSongItem } from '@/utils/captureReviewData';

interface SongSelectorCardProps {
  selectedSong: MockSongItem | null;
  onOpenPicker: () => void;
  onRemoveSong: () => void;
}

export const SongSelectorCard: React.FC<SongSelectorCardProps> = ({
  selectedSong,
  onOpenPicker,
  onRemoveSong,
}) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="o anın şarkısı" stamp="AUDIO" />

      {selectedSong ? (
        <ScrapbookCard
          bgColor={selectedSong.color || Colors.pink}
          rotation="1.2deg"
          hasTape="top-right"
          tapeColor={Colors.tapeDefault}
          padding={Spacing.md}
          style={styles.selectedCard}
        >
          <View style={styles.headerRow}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagBadgeText}>NOW PLAYING</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onOpenPicker}
              style={styles.changeLinkButton}
            >
              <Text style={styles.changeLinkText}>değiştir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.songContentRow}>
            <View style={styles.albumCircle}>
              <PozIcon name="music" size={22} color={Colors.text} />
            </View>

            <View style={styles.songTextGroup}>
              <Text style={styles.songTitleText}>{selectedSong.title}</Text>
              <Text style={styles.songArtistText}>{selectedSong.artist}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onRemoveSong}
              style={styles.removeIconButton}
            >
              <Text style={styles.removeIconText}>✕</Text>
            </TouchableOpacity>
          </View>
        </ScrapbookCard>
      ) : (
        <ScrapbookCard
          bgColor="#FFFDF9"
          rotation="-0.8deg"
          hasTape="top-left"
          tapeColor={Colors.tapePink}
          padding={Spacing.md}
          style={styles.emptyCard}
        >
          <View style={styles.emptyContentRow}>
            <View style={styles.emptyIconCircle}>
              <PozIcon name="music" size={20} color={Colors.textMuted} />
            </View>

            <View style={styles.emptyTextGroup}>
              <Text style={styles.emptyTitleText}>henüz şarkı eklenmedi</Text>
              <Text style={styles.emptySubText}>o anı anlatan bir müzik seç</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onOpenPicker}
              style={styles.selectButton}
            >
              <Text style={styles.selectButtonText}>şarkı seç</Text>
            </TouchableOpacity>
          </View>
        </ScrapbookCard>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  selectedCard: {
    marginTop: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tagBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
  },
  tagBadgeText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
    color: Colors.pinkDark,
  },
  changeLinkButton: {
    paddingHorizontal: 4,
  },
  changeLinkText: {
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    color: Colors.pinkDark,
    textDecorationLine: 'underline',
  },
  songContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  albumCircle: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFDF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
  },
  songTextGroup: {
    flex: 1,
  },
  songTitleText: {
    fontSize: 16,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
  },
  songArtistText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  removeIconButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(28, 26, 36, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIconText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.textSecondary,
  },
  emptyCard: {
    marginTop: 4,
  },
  emptyContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emptyIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(28, 26, 36, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTextGroup: {
    flex: 1,
  },
  emptyTitleText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  emptySubText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  selectButton: {
    backgroundColor: '#181520',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
  },
  selectButtonText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF6',
  },
});
