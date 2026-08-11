import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';

interface DayItem {
  dayName: string; // e.g. "Pzt", "Sal"
  dayNumber: number; // e.g. 27
  rotation: string;
  isToday?: boolean;
}

import { getWeekDays } from '@/utils/dateUtils';

export const WeekSelector: React.FC = () => {
  const weekDays = React.useMemo(() => getWeekDays(), []);
  const todayNum = new Date().getDate();
  const [selectedDay, setSelectedDay] = React.useState<number>(todayNum);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {weekDays.map((item) => {
          const isSelected = item.dayNumber === selectedDay;
          return (
            <TouchableOpacity
              key={`${item.dayName}-${item.dayNumber}`}
              activeOpacity={0.82}
              onPress={() => setSelectedDay(item.dayNumber)}
              style={[
                styles.dayTicket,
                { transform: [{ rotate: isSelected ? '0deg' : item.rotation }] },
                isSelected ? styles.selectedTicket : styles.unselectedTicket,
              ]}
            >
              {/* Top Perforation Hole / Pin Notch */}
              <View
                style={[
                  styles.pinHole,
                  isSelected ? styles.pinHoleSelected : styles.pinHoleUnselected,
                ]}
              />

              <Text
                style={[
                  styles.dayNameText,
                  isSelected ? styles.selectedText : styles.unselectedText,
                ]}
              >
                {item.dayName}
              </Text>
              <Text
                style={[
                  styles.dayNumberText,
                  isSelected ? styles.selectedNumberText : styles.unselectedNumberText,
                ]}
              >
                {item.dayNumber}
              </Text>
              {item.isToday && (
                <View
                  style={[
                    styles.todayTag,
                    { backgroundColor: isSelected ? Colors.yellow : Colors.stampRed },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 10,
    alignItems: 'center',
  },
  dayTicket: {
    width: 50,
    height: 68,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    position: 'relative',
    paddingTop: 4,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedTicket: {
    backgroundColor: '#181520', // Dark ink stamp receipt
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  unselectedTicket: {
    backgroundColor: '#FFFDF9', // Paper tag
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pinHole: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    position: 'absolute',
    top: 5,
  },
  pinHoleSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  pinHoleUnselected: {
    backgroundColor: Colors.border,
  },
  dayNameText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dayNumberText: {
    fontSize: 17,
    fontFamily: Fonts.mono,
  },
  selectedText: {
    color: '#93C5FD',
    fontFamily: Fonts.mono,
    fontWeight: '800',
  },
  unselectedText: {
    color: Colors.textSecondary,
  },
  selectedNumberText: {
    color: '#FFFDF6',
    fontWeight: '800',
  },
  unselectedNumberText: {
    color: Colors.text,
    fontWeight: '700',
  },
  todayTag: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    position: 'absolute',
    bottom: 5,
  },
});
