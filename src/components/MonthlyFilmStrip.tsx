import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';

export const MonthlyFilmStrip: React.FC = () => {
  const renderSprockets = () => (
    <View style={styles.sprocketRow}>
      {Array.from({ length: 9 }).map((_, index) => (
        <View key={index} style={styles.sprocketHole} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Outer Film Strip */}
      <View style={styles.filmBody}>
        {renderSprockets()}

        {/* Film Inner Stats Content */}
        <View style={styles.filmInnerContent}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>bu ayın filmi</Text>
            <Text style={styles.statValue}>18 / 36 KARE</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>kayıtlı gün</Text>
            <Text style={styles.statValue}>9 ANI GÜNÜ</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>en sık his</Text>
            <View style={styles.moodValueRow}>
              <PozIcon name="sparkle" size={14} color={Colors.yellow} />
              <Text style={styles.statValue}>HUZURLU</Text>
            </View>
          </View>
        </View>

        {renderSprockets()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    transform: [{ rotate: '-0.8deg' }],
  },
  filmBody: {
    backgroundColor: '#16141D',
    borderRadius: BorderRadius.md,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
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
    backgroundColor: 'rgba(250, 246, 238, 0.75)',
    borderRadius: 1,
  },
  filmInnerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#201C2B',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 2,
  },
  statBox: {
    gap: 2,
  },
  statLabel: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.lavender,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    color: '#FFFDF6',
  },
  moodValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
});
