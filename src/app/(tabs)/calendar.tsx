import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '@/constants/theme';
import { CalendarHeader } from '@/components/CalendarHeader';
import { WeekdayHeader } from '@/components/WeekdayHeader';
import { CalendarDayCellComponent } from '@/components/CalendarDayCellComponent';
import { MonthlyFilmStrip } from '@/components/MonthlyFilmStrip';
import { SelectedDayCard } from '@/components/SelectedDayCard';
import { SectionTitle } from '@/components/SectionTitle';
import { generateCalendarGrid, MOCK_MEMORIES } from '@/utils/calendarUtils';

export default function CalendarScreen() {
  // 0 = Haziran 2026, 1 = Temmuz 2026, 2 = Ağustos 2026
  const [monthIndex, setMonthIndex] = useState<number>(1); // Default July (1)
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-27'); // Default 27 July 2026

  const { monthTitle, days } = generateCalendarGrid(monthIndex);

  const handlePrevMonth = () => {
    if (monthIndex > 0) {
      const nextIdx = monthIndex - 1;
      setMonthIndex(nextIdx);
      // Default select 15th of that month
      const mNum = nextIdx + 6;
      setSelectedDate(`2026-${String(mNum).padStart(2, '0')}-15`);
    }
  };

  const handleNextMonth = () => {
    if (monthIndex < 2) {
      const nextIdx = monthIndex + 1;
      setMonthIndex(nextIdx);
      // Default select 15th of that month
      const mNum = nextIdx + 6;
      setSelectedDate(`2026-${String(mNum).padStart(2, '0')}-15`);
    }
  };

  const selectedMemory = MOCK_MEMORIES[selectedDate];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Month Navigation */}
        <CalendarHeader
          monthTitle={monthTitle}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          canPrev={monthIndex > 0}
          canNext={monthIndex < 2}
        />

        {/* Weekday Header Labels (PZT - PAZ) */}
        <WeekdayHeader />

        {/* 7-Column Calendar Days Grid */}
        <View style={styles.gridContainer}>
          {days.map((cell, idx) => (
            <CalendarDayCellComponent
              key={`${cell.fullDateString}-${idx}`}
              cell={cell}
              isSelected={cell.fullDateString === selectedDate}
              onSelect={setSelectedDate}
            />
          ))}
        </View>

        {/* Monthly Statistics Film Strip */}
        <MonthlyFilmStrip />

        {/* Section Divider */}
        <SectionTitle title="seçilen gün" stamp="MEMORY LOG" />

        {/* Selected Day Summary Card */}
        <SelectedDayCard
          fullDateString={selectedDate}
          memory={selectedMemory}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: 130, // Bottom Tab Bar clearance
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 4,
  },
});
