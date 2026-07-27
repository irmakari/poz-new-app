import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { FilmProgress } from '@/components/FilmProgress';
import { PozIcon } from '@/components/PozIcon';
import { FilmItem } from '@/utils/filmData';

interface ActiveFilmCardProps {
  film: FilmItem;
}

export const ActiveFilmCard: React.FC<ActiveFilmCardProps> = ({ film }) => {
  const router = useRouter();

  const handleCardPress = () => {
    router.push({
      pathname: '/film/[id]',
      params: { id: film.id },
    });
  };

  const handleContinueFilm = () => {
    router.push('/(tabs)/camera');
  };

  return (
    <ScrapbookCard
      bgColor={film.color}
      rotation="-1.2deg"
      hasTape="top-right"
      tapeColor={Colors.tapeDefault}
      tapeRotation="12deg"
      padding={Spacing.lg}
      onPress={handleCardPress}
      style={styles.envelopeCard}
    >
      {/* Top Envelope Flap Cut Line */}
      <View style={styles.envelopeFlapLine} pointerEvents="none" />

      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <PaperStamp label={film.stampText} color={film.darkColor || Colors.lavenderDark} rotation="-3deg" />
          <Text style={styles.statusText}>çekime devam ediyor</Text>
        </View>

        {/* 3D Physical Film Canister Graphic */}
        <View style={styles.filmCanisterGraphic}>
          <View style={styles.canisterSpool} />
          <View style={styles.canisterBody}>
            <View style={styles.canisterRing} />
            <PozIcon name="films" size={22} color="#FFFDF6" />
          </View>
        </View>
      </View>

      {/* Main Title & Type */}
      <View style={styles.titleArea}>
        <Text style={styles.filmTitleText}>{film.title}</Text>
        <Text style={styles.metaBadge}>{film.dateLabel} • {film.type}</Text>
      </View>

      {/* Physical 35mm Negative Film Strip */}
      <FilmProgress currentFrames={film.frameCount} totalFrames={film.totalFrames} />

      {/* Footer Info & Serial */}
      <View style={styles.footerRow}>
        <Text style={styles.frameCounterText}>
          {film.frameCount} / {film.totalFrames} kare çektin
        </Text>

        <Text style={styles.serialTagText}>{film.serial}</Text>
      </View>

      {/* Primary CTA Button */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handleContinueFilm}
        style={styles.continueButton}
      >
        <Text style={styles.continueButtonText}>filme devam et</Text>
        <PozIcon name="camera" size={18} color="#FFFDF6" />
      </TouchableOpacity>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  envelopeCard: {
    marginVertical: Spacing.xs,
    position: 'relative',
  },
  envelopeFlapLine: {
    position: 'absolute',
    top: 0,
    left: 36,
    right: 36,
    height: 1,
    backgroundColor: 'rgba(143, 102, 227, 0.3)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleGroup: {
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.lavenderDark,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  filmCanisterGraphic: {
    alignItems: 'center',
    transform: [{ rotate: '6deg' }],
  },
  canisterSpool: {
    width: 14,
    height: 6,
    backgroundColor: '#16141D',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  canisterBody: {
    width: 38,
    height: 42,
    backgroundColor: '#16141D',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 4,
  },
  canisterRing: {
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.yellow,
  },
  titleArea: {
    marginVertical: 4,
  },
  filmTitleText: {
    fontSize: 30,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  metaBadge: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: Spacing.sm,
  },
  frameCounterText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
  },
  serialTagText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.lavenderDark,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 52,
    borderRadius: BorderRadius.md,
    gap: 8,
    marginTop: 4,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 15,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF6',
  },
});
