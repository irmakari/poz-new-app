import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors, Fonts, BorderRadius, Spacing } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { CaptureMode } from '@/utils/photoDetailData';

interface CaptureModeSelectorProps {
  currentMode: CaptureMode;
  onSelectMode: (mode: CaptureMode) => void;
}

export const CaptureModeSelector: React.FC<CaptureModeSelectorProps> = ({
  currentMode,
  onSelectMode,
}) => {
  const dailyScaleAnim = useRef(new Animated.Value(currentMode === 'daily' ? 1.04 : 0.96)).current;
  const filmScaleAnim = useRef(new Animated.Value(currentMode === 'film' ? 1.04 : 0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(dailyScaleAnim, {
        toValue: currentMode === 'daily' ? 1.04 : 0.96,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }),
      Animated.spring(filmScaleAnim, {
        toValue: currentMode === 'film' ? 1.04 : 0.96,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }),
    ]).start();
  }, [currentMode]);

  return (
    <View style={styles.container}>
      {/* Daily Mode Physical Tag Button */}
      <Animated.View style={{ flex: 1, transform: [{ scale: dailyScaleAnim }] }}>
        <TouchableOpacity
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="günlük mod: çek, hemen gör ve bugüne ekle"
          accessibilityState={{ selected: currentMode === 'daily' }}
          onPress={() => onSelectMode('daily')}
          style={[
            styles.modeCard,
            styles.dailyCard,
            currentMode === 'daily' && styles.dailySelectedBorder,
          ]}
        >
          <View style={styles.modeIconRow}>
            <View
              style={[
                styles.iconBadge,
                currentMode === 'daily' ? styles.dailyIconBadgeActive : styles.dailyIconBadgeInactive,
              ]}
            >
              <PozIcon name="photo" size={13} color={currentMode === 'daily' ? '#181520' : Colors.textSecondary} />
            </View>

            <Text
              style={[
                styles.modeTitleText,
                currentMode === 'daily' ? styles.dailyTitleActive : styles.titleInactive,
              ]}
            >
              günlük
            </Text>

            {currentMode === 'daily' && (
              <View style={styles.stampBadgeDaily}>
                <Text style={styles.stampBadgeTextDaily}>ANLIK</Text>
              </View>
            )}
          </View>

          <Text
            style={[
              styles.modeSubText,
              currentMode === 'daily' ? styles.dailySubActive : styles.subInactive,
            ]}
          >
            hemen gör
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Film Mode Physical Tag Button */}
      <Animated.View style={{ flex: 1, transform: [{ scale: filmScaleAnim }] }}>
        <TouchableOpacity
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="film modu: çek, biriktir ve film tamamlandığında gör"
          accessibilityState={{ selected: currentMode === 'film' }}
          onPress={() => onSelectMode('film')}
          style={[
            styles.modeCard,
            styles.filmCard,
            currentMode === 'film' && styles.filmSelectedBorder,
          ]}
        >
          <View style={styles.modeIconRow}>
            <View
              style={[
                styles.iconBadge,
                currentMode === 'film' ? styles.filmIconBadgeActive : styles.filmIconBadgeInactive,
              ]}
            >
              <PozIcon name="films" size={13} color={currentMode === 'film' ? '#FFFDF9' : Colors.textSecondary} />
            </View>

            <Text
              style={[
                styles.modeTitleText,
                currentMode === 'film' ? styles.filmTitleActive : styles.titleInactive,
              ]}
            >
              film
            </Text>

            {currentMode === 'film' && (
              <View style={styles.stampBadgeFilm}>
                <Text style={styles.stampBadgeTextFilm}>35MM</Text>
              </View>
            )}
          </View>

          <Text
            style={[
              styles.modeSubText,
              currentMode === 'film' ? styles.filmSubActive : styles.subInactive,
            ]}
          >
            sonra gör
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 8,
    paddingHorizontal: 2,
  },
  modeCard: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  dailyCard: {
    backgroundColor: '#FFF1B0', // Pastel yellow paper tag
    borderWidth: 1.5,
    borderColor: 'rgba(230, 168, 0, 0.3)',
  },
  dailySelectedBorder: {
    borderColor: '#181520',
    borderWidth: 2,
    shadowOpacity: 0.18,
    elevation: 4,
  },
  filmCard: {
    backgroundColor: '#231F33', // Deep mürdüm physical tag
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  filmSelectedBorder: {
    borderColor: Colors.lavender,
    borderWidth: 2,
    shadowOpacity: 0.22,
    elevation: 4,
  },
  modeIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyIconBadgeActive: {
    backgroundColor: '#FFFDF9',
  },
  dailyIconBadgeInactive: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  filmIconBadgeActive: {
    backgroundColor: '#8F66E3',
  },
  filmIconBadgeInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modeTitleText: {
    fontSize: 14,
    fontFamily: Fonts.sansExtraBold,
  },
  dailyTitleActive: {
    color: '#181520',
  },
  filmTitleActive: {
    color: '#FFFDF9',
  },
  titleInactive: {
    color: Colors.textSecondary,
  },
  modeSubText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    marginTop: 2,
  },
  dailySubActive: {
    color: '#5C4A00',
  },
  filmSubActive: {
    color: Colors.lavender,
  },
  subInactive: {
    color: Colors.textMuted,
  },
  stampBadgeDaily: {
    marginLeft: 'auto',
    backgroundColor: '#181520',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  stampBadgeTextDaily: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    color: '#FFF1B0',
  },
  stampBadgeFilm: {
    marginLeft: 'auto',
    backgroundColor: '#8F66E3',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  stampBadgeTextFilm: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    color: '#FFFDF9',
  },
});
