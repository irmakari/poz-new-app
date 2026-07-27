import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';

interface FilmCounterProps {
  remainingFrames: number;
}

export const FilmCounter: React.FC<FilmCounterProps> = ({ remainingFrames }) => {
  return (
    <View style={styles.counterContainer}>
      <Text style={styles.labelCode}>EXP COUNTER</Text>

      <View style={styles.counterBox}>
        <View style={styles.innerShadowBox}>
          <Text style={styles.counterValueText}>
            {String(remainingFrames).padStart(2, '0')}
          </Text>
        </View>

        <View style={styles.expBadge}>
          <Text style={styles.expBadgeText}>EXP</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    alignItems: 'flex-end',
    gap: 2,
  },
  labelCode: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 0.8,
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF6',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 4,
    borderWidth: 1.5,
    borderColor: '#110E17',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  innerShadowBox: {
    backgroundColor: '#FFF1B0',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.15)',
  },
  counterValueText: {
    fontFamily: Fonts.sansBlack,
    fontSize: 16,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  expBadge: {
    backgroundColor: '#181520',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  expBadgeText: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    fontWeight: '800',
    color: Colors.yellow,
  },
});
