import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { FilmSong } from '@/utils/filmData';

interface MonthSongsSectionProps {
  songs?: FilmSong[];
}

export const MonthSongsSection: React.FC<MonthSongsSectionProps> = ({ songs }) => {
  if (!songs || songs.length === 0) return null;

  const handleSongPress = (song: FilmSong) => {
    Alert.alert(
      `POZ Müzik: ${song.title}`,
      `"${song.title} - ${song.artist}" şarkı entegrasyonu yakında eklenecek.`,
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="bu filmin şarkıları" stamp="AUDIO TRACKS" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {songs.map((song, index) => {
          const cardColors = ['#FF5AB3', '#8C9BF6', '#FFBE55', '#C6A5FF'];
          const color = cardColors[index % cardColors.length];
          const isLight = color === '#FFBE55' || color === '#C6A5FF';

          return (
            <TouchableOpacity
              key={song.id}
              activeOpacity={0.86}
              onPress={() => handleSongPress(song)}
              style={[styles.songCard, { backgroundColor: color }]}
            >
              <Text style={[styles.backdropText, isLight && styles.darkBackdropText]}>SOUND</Text>

              <View style={styles.topRow}>
                <View style={styles.iconBubble}>
                  <PozIcon name="music" size={15} color={Colors.text} />
                </View>
                <Text style={[styles.dateLabel, !isLight && styles.lightText]}>{song.dateStr}</Text>
              </View>

              <Text style={[styles.typeLabel, !isLight && styles.lightText]}>Track</Text>
              <Text style={[styles.titleText, !isLight && styles.lightText]} numberOfLines={2}>
                {song.title}
              </Text>
              <Text style={[styles.artistText, !isLight && styles.lightMutedText]} numberOfLines={1}>
                {song.artist}
              </Text>

              <View style={styles.bottomRow}>
                <View style={styles.stackAvatars}>
                  <View style={[styles.miniDisc, styles.discDark]} />
                  <View style={[styles.miniDisc, styles.discLight]} />
                  <View style={[styles.miniDisc, styles.discWhite]} />
                </View>
                <View style={styles.playBubble}>
                  <PozIcon name="arrow-right" size={15} color={Colors.text} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: 2,
    paddingVertical: 6,
    gap: 12,
  },
  songCard: {
    width: 168,
    minHeight: 174,
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  iconBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
  },
  dateLabel: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    color: Colors.text,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  typeLabel: {
    fontSize: 11,
    fontFamily: Fonts.sansMedium,
    color: Colors.text,
    marginBottom: 4,
  },
  titleText: {
    fontSize: 22,
    lineHeight: 25,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
  },
  artistText: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  stackAvatars: {
    flexDirection: 'row',
  },
  miniDisc: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: -7,
  },
  discDark: {
    backgroundColor: Colors.text,
  },
  discLight: {
    backgroundColor: '#C6A5FF',
  },
  discWhite: {
    backgroundColor: '#FFFFFF',
  },
  playBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  backdropText: {
    position: 'absolute',
    right: -10,
    bottom: -9,
    fontSize: 45,
    lineHeight: 48,
    fontFamily: Fonts.sansBlack,
    color: 'rgba(255, 255, 255, 0.14)',
  },
  darkBackdropText: {
    color: 'rgba(15, 23, 42, 0.08)',
  },
  lightText: {
    color: '#FFFFFF',
  },
  lightMutedText: {
    color: 'rgba(255, 255, 255, 0.78)',
  },
});
