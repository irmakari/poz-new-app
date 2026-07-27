import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { MOCK_START_DATES } from '@/utils/newFilmData';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdropOverlay}>
        <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.backdropTouch} />

        <View style={styles.sheetPanel}>
          <View style={styles.grabHandle} />

          <View style={styles.headerRow}>
            <View style={styles.titleGroup}>
              <PozIcon name="calendar" size={18} color={Colors.text} />
              <Text style={styles.titleText}>başlangıç tarihi seç</Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.datesList}>
            {MOCK_START_DATES.map((dateStr) => {
              const isSelected = selectedDate === dateStr;
              return (
                <TouchableOpacity
                  key={dateStr}
                  activeOpacity={0.82}
                  onPress={() => {
                    onSelectDate(dateStr);
                    onClose();
                  }}
                  style={[
                    styles.dateRow,
                    isSelected && styles.selectedRow,
                  ]}
                >
                  <Text style={styles.dateText}>{dateStr}</Text>
                  {isSelected && (
                    <View style={styles.checkTag}>
                      <Text style={styles.checkTagText}>SEÇİLİ</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdropOverlay: {
    flex: 1,
    backgroundColor: 'rgba(22, 19, 31, 0.65)',
    justifyContent: 'flex-end',
  },
  backdropTouch: {
    flex: 1,
  },
  sheetPanel: {
    backgroundColor: '#FFFDF9',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl + 10,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  grabHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(28, 26, 36, 0.2)',
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontSize: 18,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(28, 26, 36, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: Colors.textSecondary,
  },
  datesList: {
    gap: 10,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lavender,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  selectedRow: {
    borderWidth: 2,
    borderColor: '#181520',
  },
  dateText: {
    fontSize: 14,
    fontFamily: Fonts.sansExtraBold,
    color: Colors.text,
  },
  checkTag: {
    backgroundColor: '#181520',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  checkTagText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    color: Colors.yellow,
  },
});
