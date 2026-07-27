import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
import { FRAME_OPTIONS, FrameOption } from '@/utils/newFilmData';

interface FrameCountSelectorProps {
  selectedFrame: FrameOption;
  onSelectFrame: (option: FrameOption) => void;
}

export const FrameCountSelector: React.FC<FrameCountSelectorProps> = ({
  selectedFrame,
  onSelectFrame,
}) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="kaç poz olsun?" stamp="EXPOSURES" />

      <View style={styles.framesRow}>
        {FRAME_OPTIONS.map((item, index) => {
          const isSelected = selectedFrame.count === item.count;
          const rotation = index === 0 ? '-1.5deg' : index === 1 ? '1.5deg' : '-1deg';
          const cardColors = [Colors.yellow, Colors.lavender, Colors.pink];
          const color = cardColors[index % cardColors.length];

          return (
            <ScrapbookCard
              key={item.count}
              bgColor={color}
              rotation={isSelected ? '0deg' : rotation}
              hasTape="top-center"
              tapeColor={Colors.tapeDefault}
              padding={10}
              onPress={() => onSelectFrame(item)}
              style={[
                styles.frameCell,
                isSelected && styles.selectedCell,
              ]}
            >
              <View style={styles.cellHeader}>
                <PaperStamp
                  label={isSelected ? 'SELECTED' : `${item.count} POZ`}
                  color={Colors.text}
                  rotation="2deg"
                />
              </View>

              <Text style={styles.countText}>{item.count}</Text>
              <Text style={styles.labelTitleText}>{item.label}</Text>
              <Text style={styles.subLabelText}>{item.subLabel}</Text>
            </ScrapbookCard>
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
  framesRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  frameCell: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  selectedCell: {
    borderWidth: 2,
    borderColor: '#181520',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cellHeader: {
    marginBottom: 4,
  },
  countText: {
    fontSize: 26,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  labelTitleText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 1,
  },
  subLabelText: {
    fontSize: 9,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 12,
  },
});
