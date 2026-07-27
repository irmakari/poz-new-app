import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { FILM_TYPE_OPTIONS, FilmTypeOption } from '@/utils/newFilmData';

interface FilmTypeSelectorProps {
  selectedType: FilmTypeOption;
  onSelectType: (option: FilmTypeOption) => void;
}

export const FilmTypeSelector: React.FC<FilmTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="film türünü seç" stamp="EMULSION" />

      {/* Film Type Cards Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILM_TYPE_OPTIONS.map((item, index) => {
          const isSelected = selectedType.id === item.id;
          const rotation = index % 2 === 0 ? '-1.5deg' : '1.5deg';

          return (
            <ScrapbookCard
              key={item.id}
              bgColor={item.primaryColor}
              rotation={isSelected ? '0deg' : rotation}
              hasTape="top-right"
              tapeColor={Colors.tapeDefault}
              padding={12}
              onPress={() => onSelectType(item)}
              style={[
                styles.filmCard,
                isSelected && styles.selectedFilmCard,
              ]}
            >
              <View style={styles.cardHeaderRow}>
                <PaperStamp
                  label={isSelected ? 'SELECTED' : `ISO ${item.iso}`}
                  color={item.darkColor}
                  rotation="-2deg"
                />

                {/* 3D Film Canister Icon */}
                <View style={styles.canisterIconCircle}>
                  <PozIcon name="films" size={18} color="#FFFDF6" />
                </View>
              </View>

              <Text style={styles.filmTitleText} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.isoBadgeText}>35MM • ISO {item.iso}</Text>
              <Text style={styles.descText} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={styles.serialFooter}>
                <Text style={styles.serialText}>POZ-{item.serialPrefix}-35MM</Text>
              </View>
            </ScrapbookCard>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: 2,
    paddingVertical: 6,
    gap: 12,
  },
  filmCard: {
    width: 170,
  },
  selectedFilmCard: {
    borderWidth: 2,
    borderColor: '#181520',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  canisterIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#16141D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filmTitleText: {
    fontSize: 18,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  isoBadgeText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    fontWeight: '700',
    marginTop: 1,
  },
  descText: {
    fontSize: 11,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 15,
  },
  serialFooter: {
    marginTop: 8,
    paddingTop: 4,
    borderTopWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  serialText: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
  },
});
