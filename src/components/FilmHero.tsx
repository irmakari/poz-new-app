import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { FilmProgress } from '@/components/FilmProgress';
import { PozIcon } from '@/components/PozIcon';
import { FilmItem } from '@/utils/filmData';

interface FilmHeroProps {
  film: FilmItem;
  onScrollToGrid?: () => void;
}

export const FilmHero: React.FC<FilmHeroProps> = ({ film, onScrollToGrid }) => {
  const router = useRouter();

  const handleCtaPress = () => {
    if (film.status === 'active') {
      router.push('/(tabs)/camera');
    } else if (film.status === 'developing') {
      Alert.alert('Karanlık Oda', 'Filmin hazırlanıyor. Banyodan sonra tüm kareler açılacaktır.');
    } else if (onScrollToGrid) {
      onScrollToGrid();
    } else {
      Alert.alert('POZ Film', 'Kareleri incelemek için aşağıya kaydırabilirsiniz.');
    }
  };

  const getCtaText = () => {
    if (film.status === 'active') return 'filme devam et';
    if (film.status === 'developing') return 'banyo devam ediyor';
    return 'filmi yeniden izle';
  };

  return (
    <ScrapbookCard
      bgColor={film.color}
      rotation="-1deg"
      hasTape="top-right"
      tapeColor={Colors.tapeDefault}
      tapeRotation="12deg"
      padding={Spacing.lg}
      style={styles.heroContainer}
    >
      <View style={styles.topCutLine} pointerEvents="none" />

      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <PaperStamp
            label={film.stampText}
            color={film.darkColor || Colors.lavenderDark}
            rotation="-3deg"
          />
          <Text style={[styles.serialText, { color: film.darkColor || Colors.textSecondary }]}>
            {film.serial}
          </Text>
        </View>

        {/* 3D Film Canister Graphic */}
        <View style={styles.filmCanisterGraphic}>
          <View style={styles.canisterSpool} />
          <View style={styles.canisterBody}>
            <View style={styles.canisterRing} />
            <PozIcon name="films" size={22} color="#FFFDF6" />
          </View>
        </View>
      </View>

      {/* Film Title & Date */}
      <View style={styles.titleSection}>
        <Text style={styles.filmTitleText}>{film.title}</Text>
        <Text style={styles.metaSubtitle}>
          {film.dateLabel} • {film.type} • {film.frameCount}/{film.totalFrames} KARE
        </Text>
      </View>

      {/* Film Negative Progress Strip */}
      <FilmProgress currentFrames={film.frameCount} totalFrames={film.totalFrames} />

      {/* Dates Row */}
      <View style={styles.datesRow}>
        <Text style={styles.dateLabelText}>
          {film.startDate ? `Başlangıç: ${film.startDate}` : ''}
          {film.developedDate ? ` • Banyo: ${film.developedDate}` : ''}
        </Text>
      </View>

      {/* Primary CTA Button */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handleCtaPress}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>{getCtaText()}</Text>
        <PozIcon
          name={film.status === 'active' ? 'camera' : 'arrow-right'}
          size={18}
          color="#FFFDF6"
        />
      </TouchableOpacity>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    marginVertical: Spacing.xs,
    position: 'relative',
  },
  topCutLine: {
    position: 'absolute',
    top: 0,
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: 'rgba(28, 26, 36, 0.15)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleGroup: {
    gap: 4,
  },
  serialText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  filmCanisterGraphic: {
    alignItems: 'center',
    transform: [{ rotate: '5deg' }],
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
    shadowOpacity: 0.2,
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
  titleSection: {
    marginVertical: Spacing.xs,
  },
  filmTitleText: {
    fontSize: 32,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.8,
  },
  metaSubtitle: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  datesRow: {
    marginVertical: 4,
  },
  dateLabelText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 52,
    borderRadius: BorderRadius.md,
    gap: 8,
    marginTop: Spacing.sm,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    fontSize: 15,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF6',
  },
});
