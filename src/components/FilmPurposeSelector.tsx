import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { FILM_PURPOSES, FilmPurposeOption } from '@/utils/newFilmData';

interface FilmPurposeSelectorProps {
  selectedPurpose: FilmPurposeOption;
  onSelectPurpose: (option: FilmPurposeOption) => void;
}

export const FilmPurposeSelector: React.FC<FilmPurposeSelectorProps> = ({
  selectedPurpose,
  onSelectPurpose,
}) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="bu filmi ne için başlatıyorsun?" stamp="PURPOSE" />

      {/* Ticket Stubs Grid */}
      <View style={styles.purposesGrid}>
        {FILM_PURPOSES.map((item, index) => {
          const isSelected = selectedPurpose.id === item.id;
          const rotation = index % 2 === 0 ? '-1.8deg' : '1.8deg';

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              accessibilityLabel={`Film amacı: ${item.label}`}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelectPurpose(item)}
              style={[
                styles.purposeTicket,
                { transform: [{ rotate: isSelected ? '0deg' : rotation }] },
                isSelected ? styles.selectedTicket : styles.unselectedTicket,
              ]}
            >
              <PozIcon
                name={isSelected ? 'star' : 'sparkle'}
                size={14}
                color={isSelected ? '#FFFDF6' : Colors.text}
              />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  purposesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  purposeTicket: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
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
    fontSize: 13,
    fontFamily: Fonts.sansBold,
  },
  selectedText: {
    color: '#FFFDF6',
    fontFamily: Fonts.sansExtraBold,
  },
  unselectedText: {
    color: Colors.text,
  },
});
