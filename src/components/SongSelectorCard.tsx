import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
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
        <View style={[styles.songCard, { backgroundColor: selectedSong.color || '#FF5AB3' }]}>
          <Text style={styles.backdropText}>SOUND</Text>

          <View style={styles.topRow}>
            <View style={styles.iconBubble}>
              <PozIcon name="music" size={16} color={Colors.text} />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onOpenPicker}
              style={styles.smallPill}
            >
              <Text style={styles.smallPillText}>DEĞİŞTİR</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.kickerText}>Now Playing</Text>
          <Text style={styles.songTitleText} numberOfLines={2}>{selectedSong.title}</Text>
          <Text style={styles.songArtistText} numberOfLines={1}>{selectedSong.artist}</Text>

          <View style={styles.bottomRow}>
            <View style={styles.stackDiscs}>
              <View style={[styles.miniDisc, styles.discDark]} />
              <View style={[styles.miniDisc, styles.discLavender]} />
              <View style={[styles.miniDisc, styles.discWhite]} />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onRemoveSong}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>kaldır</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.86}
          onPress={onOpenPicker}
          style={styles.emptyCard}
        >
          <Text style={styles.emptyBackdropText}>SOUND</Text>

          <View style={styles.topRow}>
            <View style={styles.iconBubble}>
              <PozIcon name="music" size={16} color={Colors.text} />
            </View>

            <View style={styles.smallPill}>
              <Text style={styles.smallPillText}>AUDIO</Text>
            </View>
          </View>

          <Text style={styles.kickerText}>Track</Text>
          <Text style={styles.emptyTitleText}>Şarkı Seç</Text>
          <Text style={styles.emptySubText}>o anı anlatan müziği ekle</Text>

          <View style={styles.bottomRow}>
            <View style={styles.stackDiscs}>
              <View style={[styles.miniDisc, styles.discDark]} />
              <View style={[styles.miniDisc, styles.discPink]} />
              <View style={[styles.miniDisc, styles.discWhite]} />
            </View>

            <View style={styles.playBubble}>
              <PozIcon name="arrow-right" size={15} color={Colors.text} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  songCard: {
    marginTop: 4,
    minHeight: 184,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 7,
    elevation: 3,
  },
  emptyCard: {
    marginTop: 4,
    minHeight: 184,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    backgroundColor: '#8C9BF6',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 7,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  smallPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  smallPillText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    fontWeight: '900',
    color: Colors.text,
  },
  kickerText: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: Colors.text,
    marginBottom: 2,
  },
  songTitleText: {
    fontSize: 27,
    lineHeight: 30,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
    maxWidth: '88%',
  },
  songArtistText: {
    fontSize: 13,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  emptyTitleText: {
    fontSize: 29,
    lineHeight: 32,
    fontFamily: Fonts.sansBlack,
    color: '#FFFFFF',
  },
  emptySubText: {
    fontSize: 13,
    fontFamily: Fonts.sansMedium,
    color: 'rgba(255, 255, 255, 0.82)',
    marginTop: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  stackDiscs: {
    flexDirection: 'row',
  },
  miniDisc: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: -7,
  },
  discDark: {
    backgroundColor: Colors.text,
  },
  discLavender: {
    backgroundColor: '#C6A5FF',
  },
  discPink: {
    backgroundColor: '#FF5AB3',
  },
  discWhite: {
    backgroundColor: '#FFFFFF',
  },
  removeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  removeButtonText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  playBubble: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  backdropText: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    fontSize: 56,
    lineHeight: 60,
    fontFamily: Fonts.sansBold,
    color: 'rgba(255, 255, 255, 0.22)',
  },
  emptyBackdropText: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    fontSize: 56,
    lineHeight: 60,
    fontFamily: Fonts.sansBold,
    color: 'rgba(255, 255, 255, 0.18)',
  },
});
