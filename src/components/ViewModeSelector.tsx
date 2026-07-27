import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';

export type ViewMode = 'contact' | 'strip';

interface ViewModeSelectorProps {
  currentMode: ViewMode;
  onSelectMode: (mode: ViewMode) => void;
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({
  currentMode,
  onSelectMode,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.82}
        onPress={() => onSelectMode('contact')}
        style={[
          styles.tabTicket,
          { transform: [{ rotate: currentMode === 'contact' ? '0deg' : '-1deg' }] },
          currentMode === 'contact' ? styles.selectedTicket : styles.unselectedTicket,
        ]}
      >
        <Text
          style={[
            styles.tabText,
            currentMode === 'contact' ? styles.selectedText : styles.unselectedText,
          ]}
        >
          kontakt baskı
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.82}
        onPress={() => onSelectMode('strip')}
        style={[
          styles.tabTicket,
          { transform: [{ rotate: currentMode === 'strip' ? '0deg' : '1.5deg' }] },
          currentMode === 'strip' ? styles.selectedTicket : styles.unselectedTicket,
        ]}
      >
        <Text
          style={[
            styles.tabText,
            currentMode === 'strip' ? styles.selectedText : styles.unselectedText,
          ]}
        >
          film şeridi
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 12,
  },
  tabTicket: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.sm,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedTicket: {
    backgroundColor: '#181520',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  unselectedTicket: {
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
  },
  selectedText: {
    color: '#FFFDF6',
  },
  unselectedText: {
    color: Colors.textSecondary,
  },
});
