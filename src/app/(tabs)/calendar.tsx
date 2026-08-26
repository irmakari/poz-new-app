import { CalendarDayCellComponent } from '@/components/CalendarDayCellComponent';
import { CalendarHeader } from '@/components/CalendarHeader';
import { MonthlyFilmStrip } from '@/components/MonthlyFilmStrip';
import { SectionTitle } from '@/components/SectionTitle';
import { SelectedDayCard } from '@/components/SelectedDayCard';
import { WeekdayHeader } from '@/components/WeekdayHeader';
import { Colors, Spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { DayMemory, generateCalendarGrid, MOCK_MEMORIES } from '@/utils/calendarUtils';
import { getTodayKey } from '@/utils/dateUtils';
import { getDailyPhotoForDate } from '@/utils/dailyMemory.utils';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarScreen() {
  const { dailyNotes, photos } = useApp();
  const todayKeyStr = getTodayKey(); // e.g. "2026-08-10"

  // Dinamik olarak bugünün ayını hesapla (0 = Haziran 2026, 1 = Temmuz 2026, 2 = Ağustos 2026)
  const getInitialMonthIndex = () => {
    const d = new Date();
    const m = d.getMonth() + 1; // 1-12 (8 = Ağustos)
    if (m >= 6 && m <= 8) return m - 6;
    return 2; // Varsayılan Ağustos 2026
  };

  const [monthIndex, setMonthIndex] = useState<number>(getInitialMonthIndex());
  const [selectedDate, setSelectedDate] = useState<string>(todayKeyStr);

  const { monthTitle, days } = generateCalendarGrid(monthIndex);

  const handlePrevMonth = () => {
    if (monthIndex > 0) {
      const nextIdx = monthIndex - 1;
      setMonthIndex(nextIdx);
      const mNum = nextIdx + 6;
      const targetMonthStr = `2026-${String(mNum).padStart(2, '0')}`;
      if (todayKeyStr.startsWith(targetMonthStr)) {
        setSelectedDate(todayKeyStr);
      } else {
        setSelectedDate(`${targetMonthStr}-01`);
      }
    }
  };

  const handleNextMonth = () => {
    if (monthIndex < 2) {
      const nextIdx = monthIndex + 1;
      setMonthIndex(nextIdx);
      const mNum = nextIdx + 6;
      const targetMonthStr = `2026-${String(mNum).padStart(2, '0')}`;
      if (todayKeyStr.startsWith(targetMonthStr)) {
        setSelectedDate(todayKeyStr);
      } else {
        setSelectedDate(`${targetMonthStr}-01`);
      }
    }
  };

  const getMemoryForDate = (dateStr: string): DayMemory | undefined => {
    const mock = MOCK_MEMORIES[dateStr];
    const userNote = dailyNotes[dateStr];
    const canonicalDailyPhoto = getDailyPhotoForDate(photos, dateStr);
    const userFilmPhotos = photos.filter((p) => p.captureMode !== 'daily' && p.date && p.date.includes(dateStr));

    const dailyPhotosCount = canonicalDailyPhoto ? 1 : 0;
    const filmPhotosCount = (mock?.photos || 0) + userFilmPhotos.length;
    const photosCount = dailyPhotosCount + filmPhotosCount;

    const notesCount = (mock?.notes || 0) + (userNote?.note ? 1 : 0);
    const songsCount = (mock?.songs || 0) + (userNote?.song ? 1 : 0);
    const mood = userNote?.mood || mock?.mood;
    const noteText = userNote?.note || mock?.noteText;
    const songText = userNote?.song ? `${userNote.song.title} • ${userNote.song.artist}` : mock?.songText;

    if (!photosCount && !notesCount && !songsCount && !mood) {
      return undefined;
    }

    return {
      dailyPhotos: dailyPhotosCount || undefined,
      filmPhotos: filmPhotosCount || undefined,
      photos: photosCount || undefined,
      notes: notesCount || undefined,
      songs: songsCount || undefined,
      mood,
      noteText,
      songText,
    };
  };

  const selectedMemory = getMemoryForDate(selectedDate);

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
              cell={{ ...cell, memory: getMemoryForDate(cell.fullDateString) }}
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
    paddingBottom: 150, // Bottom Tab Bar clearance
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 4,
  },
});
