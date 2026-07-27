import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { PhotoSong } from '@/utils/photoDetailData';

interface PhotoSongLabelProps {
  song?: PhotoSong;
}

export const PhotoSongLabel: React.FC<PhotoSongLabelProps> = ({ song }) => {
  const handlePlaySong = () => {
    Alert.alert(
      'Şarkı Çal',
      'Şarkı entegrasyonu yakında eklenecek.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  if (!song) {
    return (
      <View style={styles.container}>
        <SectionTitle title="o anın şarkısı" stamp="AUDIO" />

        <View style={styles.emptySongCard}>
          <PozIcon name="music" size={18} color={Colors.textMuted} />
          <Text style={styles.emptyText}>bu kareye şarkı eklenmemiş.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionTitle title="o anın şarkısı" stamp="CASSETTE TAPE" />

      <ScrapbookCard
        bgColor={Colors.pink}
        rotation="1.2deg"
        hasTape="top-right"
        tapeColor={Colors.tapeDefault}
        padding={Spacing.md}
        style={styles.card}
      >
        <View style={styles.cardHeaderRow}>
          <PaperStamp label="TRACK 01" color={Colors.pinkDark} rotation="-2deg" />
          <Text style={styles.cassetteLabelCode}>STEREO • 33 RPM</Text>
        </View>

        {/* Cassette Tape Visual Body */}
        <View style={styles.cassetteBody}>
          <View style={[styles.coverArtBox, { backgroundColor: song.coverColor }]}>
            <PozIcon name="music" size={20} color="#FFFDF6" />
          </View>

          <View style={styles.songInfoGroup}>
            <Text style={styles.songTitleText}>{song.title}</Text>
            <Text style={styles.artistText}>{song.artist}</Text>
            <Text style={styles.durationText}>SÜRE: {song.duration}</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          accessibilityLabel="şarkıyı aç"
          onPress={handlePlaySong}
          style={styles.playButton}
        >
          <PozIcon name="music" size={14} color="#FFFDF9" />
          <Text style={styles.playButtonText}>şarkıyı aç</Text>
        </TouchableOpacity>
      </ScrapbookCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  card: {
    marginTop: 4,
  },
  emptySongCard: {
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  emptyText: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  cassetteLabelCode: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.pinkDark,
    fontWeight: '800',
  },
  cassetteBody: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.sm,
    padding: Spacing.xs,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    marginVertical: Spacing.xs,
  },
  coverArtBox: {
    width: 46,
    height: 46,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songInfoGroup: {
    flex: 1,
    gap: 1,
  },
  songTitleText: {
    fontSize: 15,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
  },
  artistText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.textSecondary,
  },
  durationText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    marginTop: 1,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 40,
    borderRadius: BorderRadius.md,
    gap: 6,
    marginTop: 4,
  },
  playButtonText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
});
