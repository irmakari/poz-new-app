import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';
import { FilmItem } from '@/utils/filmData';

interface DevelopingFilmCardProps {
  film: FilmItem;
  onPressFilm?: (film: FilmItem) => void;
}

export const DevelopingFilmCard: React.FC<DevelopingFilmCardProps> = ({
  film,
  onPressFilm,
}) => {
  const handlePress = () => {
    if (onPressFilm) {
      onPressFilm(film);
    } else {
      Alert.alert(
        'Karanlık Oda',
        'Bu film banyoda (banyo süresi: 2 sa 14 dk). Banyodan sonra tüm kareler açılacaktır.',
        [{ text: 'Tamam', style: 'default' }]
      );
    }
  };

  return (
    <ScrapbookCard
      bgColor="#211728"
      rotation="1.8deg"
      hasTape="top-left"
      tapeColor={Colors.tapePink}
      padding={Spacing.lg}
      onPress={handlePress}
      style={styles.darkroomCard}
    >
      {/* Darkroom Red Light Accent Indicator */}
      <View style={styles.redLightGlow} />

      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <PaperStamp label={film.stampText} color={Colors.stampRed} rotation="-2deg" />
          <Text style={styles.darkroomSubText}>BANYODA • LAB-02</Text>
        </View>

        {/* Timer Label Badge */}
        <View style={styles.timerBadge}>
          <PozIcon name="bell" size={12} color={Colors.stampRed} />
          <Text style={styles.timerBadgeText}>{film.remainingTime || '2 sa 14 dk'}</Text>
        </View>
      </View>

      {/* Main Title */}
      <View style={styles.titleArea}>
        <Text style={styles.filmTitleText}>{film.title}</Text>
        <Text style={styles.metaText}>{film.dateLabel} • {film.frameCount} KARE • {film.type}</Text>
      </View>

      {/* Negative Film Strip Progress Bar */}
      <View style={styles.negativeStripContainer}>
        <View style={styles.sprocketRow}>
          {Array.from({ length: 8 }).map((_, i) => (
            <View key={i} style={styles.sprocketHole} />
          ))}
        </View>
        <View style={styles.filmTrackArea}>
          <View style={styles.progressFill} />
          <Text style={styles.trackCodeText}>DEVELOPING IN PROGRESS • 75%</Text>
        </View>
        <View style={styles.sprocketRow}>
          {Array.from({ length: 8 }).map((_, i) => (
            <View key={i} style={styles.sprocketHole} />
          ))}
        </View>
      </View>

      {/* Footer serial */}
      <View style={styles.footerRow}>
        <Text style={styles.serialText}>{film.serial}</Text>
        <Text style={styles.tapDetailHint}>detaylar için dokun ›</Text>
      </View>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  darkroomCard: {
    marginVertical: Spacing.xs,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(229, 72, 72, 0.25)',
  },
  redLightGlow: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.stampRed,
    shadowColor: Colors.stampRed,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleGroup: {
    gap: 4,
  },
  darkroomSubText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.stampRed,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 72, 72, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(229, 72, 72, 0.3)',
  },
  timerBadgeText: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.stampRed,
  },
  titleArea: {
    marginVertical: Spacing.xs,
  },
  filmTitleText: {
    fontSize: 24,
    fontFamily: Fonts.serif,
    color: '#FFFDF9',
    fontWeight: '800',
  },
  metaText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: 'rgba(255, 255, 255, 0.65)',
    marginTop: 2,
  },
  negativeStripContainer: {
    backgroundColor: '#110D16',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sprocketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginVertical: 2,
  },
  sprocketHole: {
    width: 6,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1,
  },
  filmTrackArea: {
    height: 18,
    backgroundColor: '#1B1423',
    borderRadius: 3,
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 6,
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '75%',
    backgroundColor: 'rgba(229, 72, 72, 0.5)',
  },
  trackCodeText: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFDF9',
    letterSpacing: 0.5,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  serialText: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  tapDetailHint: {
    fontSize: 11,
    fontFamily: Fonts.sansSemiBold,
    color: Colors.stampRed,
  },
});
