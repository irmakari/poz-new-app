import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';

export type StartMode = 'now' | 'tomorrow' | 'custom';

interface StartModeSelectorProps {
  currentMode: StartMode;
  onSelectMode: (mode: StartMode) => void;
  selectedDateStr: string;
  onOpenDatePicker: () => void;
}

export const StartModeSelector: React.FC<StartModeSelectorProps> = ({
  currentMode,
  onSelectMode,
  selectedDateStr,
  onOpenDatePicker,
}) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="ne zaman başlasın?" stamp="TIMING" />

      <View style={styles.modesRow}>
        {/* 1. Şimdi Başlat */}
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => onSelectMode('now')}
          style={[
            styles.modeTicket,
            currentMode === 'now' ? styles.selectedTicket : styles.unselectedTicket,
          ]}
        >
          <PozIcon name="sparkle" size={14} color={currentMode === 'now' ? '#FFFDF6' : Colors.text} />
          <Text style={[styles.ticketText, currentMode === 'now' && styles.selectedText]}>
            Şimdi başlat
          </Text>
        </TouchableOpacity>

        {/* 2. Yarın Başlat */}
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => onSelectMode('tomorrow')}
          style={[
            styles.modeTicket,
            currentMode === 'tomorrow' ? styles.selectedTicket : styles.unselectedTicket,
          ]}
        >
          <PozIcon name="calendar" size={14} color={currentMode === 'tomorrow' ? '#FFFDF6' : Colors.text} />
          <Text style={[styles.ticketText, currentMode === 'tomorrow' && styles.selectedText]}>
            Yarın başlat
          </Text>
        </TouchableOpacity>

        {/* 3. Tarih Seç */}
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => {
            onSelectMode('custom');
            onOpenDatePicker();
          }}
          style={[
            styles.modeTicket,
            currentMode === 'custom' ? styles.selectedTicket : styles.unselectedTicket,
          ]}
        >
          <PozIcon name="search" size={14} color={currentMode === 'custom' ? '#FFFDF6' : Colors.text} />
          <Text style={[styles.ticketText, currentMode === 'custom' && styles.selectedText]}>
            {currentMode === 'custom' ? selectedDateStr : 'Tarih seç'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  modesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  modeTicket: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: BorderRadius.sm,
    gap: 6,
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
  ticketText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  selectedText: {
    color: '#FFFDF6',
  },
});
