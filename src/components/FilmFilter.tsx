import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';

export type FilterCategory = 'all' | 'completed' | 'developing';

interface FilmFilterProps {
  activeFilter: FilterCategory;
  onSelectFilter: (cat: FilterCategory) => void;
}

const FILTER_ITEMS: { id: FilterCategory; label: string; rotation: string }[] = [
  { id: 'all', label: 'tümü', rotation: '-1deg' },
  { id: 'completed', label: 'tamamlanan', rotation: '1.5deg' },
  { id: 'developing', label: 'bekleyen', rotation: '-1.5deg' },
];

export const FilmFilter: React.FC<FilmFilterProps> = ({
  activeFilter,
  onSelectFilter,
}) => {
  return (
    <View style={styles.container}>
      {FILTER_ITEMS.map((item) => {
        const isSelected = activeFilter === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.82}
            onPress={() => onSelectFilter(item.id)}
            style={[
              styles.filterTicket,
              { transform: [{ rotate: isSelected ? '0deg' : item.rotation }] },
              isSelected ? styles.selectedTicket : styles.unselectedTicket,
            ]}
          >
            <Text
              style={[
                styles.ticketText,
                isSelected ? styles.selectedText : styles.unselectedText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 14,
  },
  filterTicket: {
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
  ticketText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    textTransform: 'lowercase',
  },
  selectedText: {
    color: '#FFFDF6',
  },
  unselectedText: {
    color: Colors.textSecondary,
  },
});
