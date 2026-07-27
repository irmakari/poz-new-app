import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';

interface ExportOptionsModalProps {
  visible: boolean;
  onClose: () => void;
}

const EXPORT_OPTIONS = [
  { id: 'exp-pdf', title: 'PDF Albüm Kitabı', format: '.pdf', icon: 'photo' as const },
  { id: 'exp-zip', title: 'Tüm Filmler ZIP Arşivi', format: '.zip', icon: 'films' as const },
  { id: 'exp-strip', title: 'Film Şeridi Görseli', format: '.jpg', icon: 'camera' as const },
];

export const ExportOptionsModal: React.FC<ExportOptionsModalProps> = ({
  visible,
  onClose,
}) => {
  const handleSelectFormat = (title: string) => {
    onClose();
    Alert.alert(
      'Dışa Aktarma',
      `"${title}" dışa aktarma işlemi yakında eklenecek.`,
      [{ text: 'Tamam', style: 'default' }]
    );
  };

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
              <PozIcon name="films" size={18} color={Colors.text} />
              <Text style={styles.titleText}>albüm dışa aktar</Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subText}>
            fotoğraflarını ve notlarını tercih ettiğin formatta dışa aktar.
          </Text>

          <View style={styles.optionsList}>
            {EXPORT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                activeOpacity={0.82}
                onPress={() => handleSelectFormat(opt.title)}
                style={styles.optionCard}
              >
                <View style={styles.iconCircle}>
                  <PozIcon name={opt.icon} size={18} color={Colors.text} />
                </View>

                <View style={styles.optTextGroup}>
                  <Text style={styles.optTitleText}>{opt.title}</Text>
                  <Text style={styles.optFormatText}>{opt.format}</Text>
                </View>

                <Text style={styles.actionArrow}>›</Text>
              </TouchableOpacity>
            ))}
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
    marginBottom: 4,
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
  subText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
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
  optionsList: {
    gap: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lavender,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFDF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optTextGroup: {
    flex: 1,
  },
  optTitleText: {
    fontSize: 14,
    fontFamily: Fonts.sansExtraBold,
    color: Colors.text,
  },
  optFormatText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.lavenderDark,
    fontWeight: '700',
  },
  actionArrow: {
    fontSize: 18,
    fontFamily: Fonts.sansBold,
    color: Colors.textSecondary,
  },
});
