import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

const WEEKDAYS = ['PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT', 'PAZ'];

export const WeekdayHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      {WEEKDAYS.map((day, index) => (
        <View key={day} style={styles.dayCell}>
          <View style={styles.tagBackground}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagBackground: {
    backgroundColor: 'rgba(28, 26, 36, 0.05)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  dayText: {
    fontSize: 10,
    fontFamily: Fonts.sansBold,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
