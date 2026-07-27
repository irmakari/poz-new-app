import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';

interface FullNoteModalProps {
  visible: boolean;
  onClose: () => void;
  note?: string;
  dateStr?: string;
}

export const FullNoteModal: React.FC<FullNoteModalProps> = ({
  visible,
  onClose,
  note,
  dateStr = '27 temmuz 2026',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdropOverlay}>
        <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.backdropTouch} />

        <View style={styles.noteSheetCard}>
          <TapeDecoration position="top-center" width={48} height={12} color={Colors.tapePink} />

          <View style={styles.headerRow}>
            <View style={styles.titleGroup}>
              <Text style={styles.sheetTitle}>günlük notu</Text>
              <Text style={styles.dateText}>{dateStr}</Text>
            </View>

            <PaperStamp label="NOTE" color={Colors.stampRed} rotation="2deg" />
          </View>

          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            <Text style={styles.fullNoteText}>
              “{note || 'bu kareye ait not bulunmuyor.'}”
            </Text>
          </ScrollView>

          <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdropOverlay: {
    flex: 1,
    backgroundColor: 'rgba(22, 19, 31, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  backdropTouch: {
    ...StyleSheet.absoluteFill,
  },
  noteSheetCard: {
    width: '100%',
    maxHeight: '70%',
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  titleGroup: {
    gap: 2,
  },
  sheetTitle: {
    fontSize: 22,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
  },
  dateText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
  },
  scrollArea: {
    marginVertical: Spacing.xs,
  },
  fullNoteText: {
    fontSize: 15,
    fontFamily: Fonts.sansMedium,
    color: Colors.text,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: Spacing.md,
    backgroundColor: '#181520',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
  },
  closeButtonText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
});
