import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';
import { FilmItem } from '@/utils/filmData';

interface ArchiveFilmCardProps {
  film: FilmItem;
  onPressFilm?: (film: FilmItem) => void;
}

export const ArchiveFilmCard: React.FC<ArchiveFilmCardProps> = ({
  film,
  onPressFilm,
}) => {
  const handlePress = () => {
    if (onPressFilm) {
      onPressFilm(film);
    } else {
      Alert.alert(
        'POZ Film Arşivi',
        'Film detay sayfası yakında eklenecek.',
        [{ text: 'Tamam', style: 'default' }]
      );
    }
  };

  return (
    <ScrapbookCard
      bgColor={film.color}
      rotation={film.rotation}
      hasTape="top-right"
      tapeColor={Colors.tapeDefault}
      padding={12}
      onPress={handlePress}
      style={styles.cardContainer}
    >
      <View style={styles.topRow}>
        <PaperStamp label={film.stampText} color={film.darkColor || Colors.text} rotation="-2deg" />
        <Text style={[styles.framesText, { color: film.darkColor || Colors.textSecondary }]}>
          {film.totalFrames} KARE
        </Text>
      </View>

      {/* Cover Visual Placeholder */}
      <View style={styles.coverBox}>
        <View style={[styles.coverVisual, { backgroundColor: film.darkColor || '#181520' }]}>
          <PozIcon name={film.coverIcon} size={26} color="#FFFDF6" />
        </View>
      </View>

      <Text style={styles.titleText} numberOfLines={1}>
        {film.title}
      </Text>
      <Text style={styles.dateText}>{film.dateLabel}</Text>
      <Text style={styles.serialText}>{film.serial}</Text>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginVertical: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  framesText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    fontWeight: '800',
  },
  coverBox: {
    width: '100%',
    height: 95,
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.sm,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.border,
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
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 4,
  },
  dateText: {
    fontSize: 11,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  serialText: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    marginTop: 4,
  },
});
