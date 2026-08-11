import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { TapeDecoration } from '@/components/TapeDecoration';

interface FilmInfoLabelProps {
  filmName?: string;
  frameCount?: number;
  totalFrames?: number;
  dateLabel?: string;
  serial?: string;
  remainingFrames?: number;
}

export const FilmInfoLabel: React.FC<FilmInfoLabelProps> = ({
  filmName = 'film rulosu',
  frameCount = 12,
  totalFrames = 36,
  dateLabel = 'temmuz 2026',
  serial = 'POZ-35MM',
}) => {
  return (
    <View style={styles.container}>
      <TapeDecoration position="top-right" width={32} height={10} color={Colors.tapePink} />

      <View style={styles.labelRow}>
        <View style={styles.leftGroup}>
          <Text style={styles.filmTitleText}>{filmName}</Text>
          <Text style={styles.subText}>{dateLabel} • {serial}</Text>
        </View>

        <View style={styles.frameBadge}>
          <Text style={styles.frameText}>{frameCount} / {totalFrames} KARE</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
    transform: [{ rotate: '-0.8deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    gap: 1,
  },
  filmTitleText: {
    fontSize: 14,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
  },
  subText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
  },
  frameBadge: {
    backgroundColor: Colors.lavender,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
  },
  frameText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
    color: Colors.lavenderDark,
  },
});
