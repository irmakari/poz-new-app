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
import { PozIcon } from '@/components/PozIcon';

interface DefaultFilmModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFilm: string;
  onSelectFilm: (film: string) => void;
}

const FILM_OPTIONS = [
  { id: 'f1', title: 'summer glow', type: '35mm · iso 400', color: Colors.lavender },
  { id: 'f2', title: 'golden hour', type: '35mm · iso 400', color: Colors.yellow },
  { id: 'f3', title: 'soft sunday', type: '35mm · iso 200', color: Colors.green },
  { id: 'f4', title: 'midnight flash', type: '35mm · iso 800', color: Colors.blue },
  { id: 'f5', title: 'black & white', type: '35mm · iso 400', color: '#FFFDF9' },
];

export const DefaultFilmModal: React.FC<DefaultFilmModalProps> = ({
  visible,
  onClose,
  selectedFilm,
  onSelectFilm,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdropOverlay}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={styles.backdropTouch}
        />

        {/* Bottom Cream Panel */}
        <View style={styles.sheetPanel}>
          <View style={styles.grabHandle} />

          <View style={styles.modalHeaderRow}>
            <View style={styles.titleGroup}>
              <PozIcon name="films" size={18} color={Colors.text} />
              <Text style={styles.modalTitleText}>varsayılan film seç</Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filmListScroll} showsVerticalScrollIndicator={false}>
            {FILM_OPTIONS.map((item) => {
              const isSelected = selectedFilm === item.title;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.82}
                  onPress={() => {
                    onSelectFilm(item.title);
                    onClose();
                  }}
                  style={[
                    styles.filmOptionRow,
                    { backgroundColor: item.color },
                    isSelected && styles.selectedRowBorder,
                  ]}
                >
                  <View style={styles.filmInfoGroup}>
                    <Text style={styles.filmTitleText}>{item.title}</Text>
                    <Text style={styles.filmTypeText}>{item.type}</Text>
                  </View>

                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <PozIcon name="star" size={14} color="#FFFDF6" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
    maxHeight: '65%',
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
  modalHeaderRow: {
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
  modalTitleText: {
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
  filmListScroll: {
    marginTop: 4,
  },
  filmOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
  },
  selectedRowBorder: {
    borderWidth: 2,
    borderColor: '#181520',
  },
  filmInfoGroup: {
    gap: 2,
  },
  filmTitleText: {
    fontSize: 15,
    fontFamily: Fonts.sansExtraBold,
    color: Colors.text,
  },
  filmTypeText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
  },
  checkBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#181520',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
