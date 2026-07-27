import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
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
          const cardColors = [Colors.pink, Colors.blue, Colors.yellow, Colors.lavender];
          const color = cardColors[index % cardColors.length];
          const rotation = index % 2 === 0 ? '-1.8deg' : '1.5deg';

          return (
            <ScrapbookCard
              key={song.id}
              bgColor={color}
              rotation={rotation}
              hasTape="top-right"
              tapeColor={Colors.tapeDefault}
              padding={Spacing.sm}
              onPress={() => handleSongPress(song)}
              style={styles.songCard}
            >
              <View style={styles.topRow}>
                <PozIcon name="music" size={16} color={Colors.text} />
                <Text style={styles.dateLabel}>{song.dateStr}</Text>
              </View>

              <View style={styles.cassetteMockBox}>
                <View style={styles.albumCircle}>
                  <PozIcon name="music" size={18} color="#FFFDF9" />
                </View>

                <View style={styles.songInfo}>
                  <Text style={styles.titleText} numberOfLines={1}>
                    {song.title}
                  </Text>
                  <Text style={styles.artistText} numberOfLines={1}>
                    {song.artist}
                  </Text>
                </View>
              </View>
            </ScrapbookCard>
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
    paddingVertical: 4,
    gap: 12,
  },
  songCard: {
    width: 185,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  dateLabel: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  cassetteMockBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: BorderRadius.sm,
    padding: 6,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  albumCircle: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: Colors.tabBarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songInfo: {
    flex: 1,
  },
  titleText: {
    fontSize: 13,
    fontFamily: Fonts.sansExtraBold,
    color: Colors.text,
  },
  artistText: {
    fontSize: 11,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
  },
});
