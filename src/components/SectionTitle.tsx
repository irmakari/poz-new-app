import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { PaperStamp } from './PaperStamp';

interface SectionTitleProps {
  title: string;
  stamp?: string;
  style?: ViewStyle;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  stamp,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{title}</Text>

        {/* Highlighter Streak / Torn Paper Accent */}
        <View style={styles.highlighterStreak} pointerEvents="none" />
      </View>

      {stamp && (
        <PaperStamp
          label={stamp}
          color={Colors.stampRed}
          rotation="3.5deg"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spacing.sm,
    paddingHorizontal: 2,
  },
  titleWrapper: {
    position: 'relative',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
    fontFamily: Fonts.serif,
    letterSpacing: -0.3,
    zIndex: 2,
  },
  highlighterStreak: {
    position: 'absolute',
    bottom: 2,
    left: -4,
    right: -6,
    height: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 3,
    opacity: 0.7,
    transform: [{ rotate: '-1deg' }],
    zIndex: 1,
  },
});
