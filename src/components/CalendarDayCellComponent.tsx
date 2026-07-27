import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { CalendarDayCell } from '@/utils/calendarUtils';

interface CalendarDayCellProps {
  cell: CalendarDayCell;
  isSelected: boolean;
  onSelect: (fullDate: string) => void;
}

export const CalendarDayCellComponent: React.FC<CalendarDayCellProps> = ({
  cell,
  isSelected,
  onSelect,
}) => {
  const { dateNumber, fullDateString, isCurrentMonth, isToday, memory } = cell;

  if (!isCurrentMonth) {
    return (
      <View style={[styles.cellWrapper, styles.inactiveCell]}>
        <Text style={styles.inactiveDateText}>{dateNumber}</Text>
      </View>
    );
  }

  // Count total memory items
  const totalCount =
    (memory?.photos || 0) +
    (memory?.notes || 0) +
    (memory?.songs || 0) +
    (memory?.mood ? 1 : 0);

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={() => onSelect(fullDateString)}
      style={[
        styles.cellWrapper,
        isSelected ? styles.selectedCell : styles.normalCell,
        isToday && !isSelected && styles.todayCellBorder,
      ]}
    >
      {/* Date Number */}
      <Text
        style={[
          styles.dateNumberText,
          isSelected ? styles.selectedDateText : styles.normalDateText,
        ]}
      >
        {dateNumber}
      </Text>

      {/* Memory Indicators Row */}
      {memory && totalCount > 0 && (
        <View style={styles.indicatorsRow}>
          {memory.photos ? (
            <View
              style={[
                styles.indicatorItem,
                styles.photoIndicator,
                isSelected && styles.selectedIndicatorBorder,
              ]}
            />
          ) : null}

          {memory.notes ? (
            <View
              style={[
                styles.indicatorItem,
                styles.noteIndicator,
                isSelected && styles.selectedIndicatorBorder,
              ]}
            />
          ) : null}

          {memory.songs ? (
            <View
              style={[
                styles.indicatorItem,
                styles.songIndicator,
                isSelected && styles.selectedIndicatorBorder,
              ]}
            />
          ) : null}

          {memory.mood ? (
            <View
              style={[
                styles.indicatorItem,
                styles.moodIndicator,
                isSelected && styles.selectedIndicatorBorder,
              ]}
            />
          ) : null}

          {totalCount > 3 && (
            <Text style={[styles.moreCountText, isSelected && styles.selectedDateText]}>
              +{totalCount - 3}
            </Text>
          )}
        </View>
      )}

      {/* Stamp Accent for Today */}
      {isToday && <View style={styles.todayStampDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cellWrapper: {
    width: '14.28%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    marginVertical: 3,
    position: 'relative',
  },
  inactiveCell: {
    opacity: 0.25,
  },
  normalCell: {
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.07)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCell: {
    backgroundColor: '#181520', // Dark ink stamp
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    transform: [{ scale: 1.04 }],
  },
  todayCellBorder: {
    borderColor: Colors.stampRed,
    borderWidth: 1.5,
  },
  dateNumberText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
  },
  normalDateText: {
    color: Colors.text,
  },
  selectedDateText: {
    color: '#FFFDF6',
  },
  inactiveDateText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.textMuted,
  },
  indicatorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  indicatorItem: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  photoIndicator: {
    backgroundColor: Colors.lavenderDark,
  },
  noteIndicator: {
    backgroundColor: Colors.yellowDark,
  },
  songIndicator: {
    backgroundColor: Colors.pinkDark,
  },
  moodIndicator: {
    backgroundColor: Colors.greenDark,
  },
  selectedIndicatorBorder: {
    borderWidth: 0.5,
    borderColor: '#FFFDF6',
  },
  moreCountText: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
  },
  todayStampDot: {
    position: 'absolute',
    top: 3,
    right: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.stampRed,
  },
});
