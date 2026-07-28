import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';
import { FilmItem } from '@/utils/filmData';

interface CompletedFilmBoxProps {
  film: FilmItem;
  onPressFilm?: (film: FilmItem) => void;
}

export const CompletedFilmBox: React.FC<CompletedFilmBoxProps> = ({
  film,
  onPressFilm,
}) => {
  const handlePress = () => {
    if (onPressFilm) {
      onPressFilm(film);
    } else {
      Alert.alert(
        'POZ Film',
        'Film detay sayfası yakında eklenecek.',
        [{ text: 'Tamam', style: 'default' }]
      );
    }
  };

  const isDark = !film.color || film.color.startsWith('#1') || film.color.startsWith('#2') || film.color.startsWith('#3') || film.color.startsWith('#5') || film.color === Colors.deepNavy || film.color === Colors.plum || film.color === Colors.burgundy || film.color === Colors.brown;

  return (
    <ScrapbookCard
      bgColor={film.color}
      rotation={film.rotation}
      hasTape="top-left"
      tapeColor={Colors.tapeDefault}
      padding={12}
      onPress={handlePress}
      style={styles.containerCard}
    >
      <View style={styles.topRow}>
        <PaperStamp label={film.stampText || 'AÇILDI'} color={isDark ? Colors.stampRed : Colors.burgundy} rotation="2deg" />
        <Text style={[styles.frameCountText, { color: isDark ? '#F4ECE2' : Colors.ink }]}>
          {film.totalFrames} KARE
        </Text>
      </View>

      {/* Cover Photo Placeholder */}
      <View style={styles.coverBox}>
        <View style={[styles.coverVisual, { backgroundColor: isDark ? '#111827' : '#18131D' }]}>
          <PozIcon name={film.coverIcon} size={28} color="#FFFDF6" />
        </View>
      </View>

      <Text style={[styles.titleText, { color: isDark ? '#F4ECE2' : Colors.ink }]} numberOfLines={1}>
        {film.title}
      </Text>

      <Text style={[styles.dateText, { color: isDark ? '#8FA8B8' : Colors.textSecondary }]}>{film.dateLabel}</Text>
      <Text style={[styles.serialText, { color: isDark ? Colors.mustard : Colors.mustard }]}>{film.serial}</Text>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    width: 175,
    marginRight: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  frameCountText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    fontWeight: '800',
  },
  coverBox: {
    width: '100%',
    height: 105,
    backgroundColor: '#F7F2EA',
    borderRadius: BorderRadius.sm,
    padding: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 4,
  },
  coverVisual: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 15,
    fontFamily: Fonts.sansBlack,
    letterSpacing: -0.3,
  },
  dateText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    marginTop: 2,
  },
  serialText: {
    fontSize: 8.5,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: 0.5,
  },
});
