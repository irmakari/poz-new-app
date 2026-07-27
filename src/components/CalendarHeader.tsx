import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';

interface CalendarHeaderProps {
  monthTitle: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  monthTitle,
  onPrevMonth,
  onNextMonth,
  canPrev,
  canNext,
}) => {
  return (
    <View style={styles.container}>
      <TapeDecoration position="top-right" width={46} height={12} color={Colors.tapeDefault} />

      <View style={styles.topLabelRow}>
        <Text style={styles.subHeaderLabel}>anı takvimi</Text>
        <PaperStamp label="POZ ARCHIVE" color={Colors.stampRed} rotation="-2deg" />
      </View>

      <View style={styles.mainNavRow}>
        <Text style={styles.monthTitleText}>{monthTitle}</Text>

        <View style={styles.arrowButtonsGroup}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPrevMonth}
            disabled={!canPrev}
            style={[styles.arrowButton, !canPrev && styles.disabledButton]}
          >
            <Text style={styles.arrowIconText}>‹</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onNextMonth}
            disabled={!canNext}
            style={[styles.arrowButton, !canNext && styles.disabledButton]}
          >
            <Text style={styles.arrowIconText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    position: 'relative',
    paddingTop: 4,
  },
  topLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  subHeaderLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  mainNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthTitleText: {
    fontSize: 28,
    color: Colors.text,
    fontFamily: Fonts.serif,
    letterSpacing: -0.5,
  },
  arrowButtonsGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  arrowButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFDF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  disabledButton: {
    opacity: 0.35,
  },
  arrowIconText: {
    fontSize: 22,
    lineHeight: 24,
    color: Colors.text,
    fontFamily: Fonts.sansBold,
  },
});
