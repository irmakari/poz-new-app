import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';

export interface DailyPhotoExistsModalProps {
  visible: boolean;
  onViewToday: () => void;
  onReplaceToday: () => void;
  onCancel: () => void;
}

export const DailyPhotoExistsModal: React.FC<DailyPhotoExistsModalProps> = ({
  visible,
  onViewToday,
  onReplaceToday,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onCancel}
      >
        <TouchableWithoutFeedback>
          <View style={styles.dialogCard}>
            {/* Top Tape Accent */}
            <TapeDecoration position="top-right" width={38} height={10} color={Colors.tapeYellow} />

            {/* Header / Icon */}
            <View style={styles.headerRow}>
              <View style={styles.iconCircle}>
                <PozIcon name="photo" size={24} color={Colors.yellowDark} />
              </View>
              <PaperStamp label="DAILY LIMIT" color={Colors.stampRed} rotation="-2deg" />
            </View>

            {/* Title & Copy */}
            <Text style={styles.titleText}>Bugünün karesi zaten seçildi.</Text>
            <Text style={styles.bodyText}>
              Bugünü temsil eden tek bir Daily fotoğrafın olabilir.
            </Text>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
              {/* Primary Action 1: View Today's Memory */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onViewToday}
                style={styles.primaryButton}
              >
                <PozIcon name="eye" size={16} color="#FFFDF9" />
                <Text style={styles.primaryButtonText}>Bugünkü kareyi gör</Text>
              </TouchableOpacity>

              {/* Action 2: Replace Photo */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onReplaceToday}
                style={styles.secondaryButton}
              >
                <PozIcon name="rotate" size={16} color={Colors.ink} />
                <Text style={styles.secondaryButtonText}>Kareyi değiştir</Text>
              </TouchableOpacity>

              {/* Action 3: Cancel */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onCancel}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Vazgeç</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 13, 22, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  dialogCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#F7F2EA',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    position: 'relative',
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF1B0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(230, 168, 0, 0.3)',
  },
  titleText: {
    fontSize: 20,
    fontFamily: Fonts.sansBlack,
    color: Colors.ink,
    marginTop: 4,
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  bodyText: {
    fontSize: 13,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  actionsContainer: {
    gap: 8,
    marginTop: 4,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.burgundy,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  primaryButtonText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDF9',
    paddingVertical: 13,
    borderRadius: BorderRadius.md,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.ink,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  cancelButtonText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    fontWeight: '700',
  },
});
