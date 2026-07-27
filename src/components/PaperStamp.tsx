import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

interface PaperStampProps {
  label: string;
  color?: string;
  rotation?: string;
  style?: ViewStyle;
}

export const PaperStamp: React.FC<PaperStampProps> = ({
  label,
  color = Colors.stampRed,
  rotation = '-3.5deg',
  style,
}) => {
  return (
    <View
      style={[
        styles.stampContainer,
        { borderColor: color, transform: [{ rotate: rotation }] },
        style,
      ]}
    >
      <View style={[styles.innerFrame, { borderColor: color }]}>
        <Text style={[styles.stampText, { color }]}>{label.toUpperCase()}</Text>
      </View>

      {/* Ink imperfection spot */}
      <View style={[styles.inkSpot, { backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  stampContainer: {
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 2,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    opacity: 0.9,
  },
  innerFrame: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  stampText: {
    fontFamily: Fonts.mono,
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 1.4,
    opacity: 0.88,
  },
  inkSpot: {
    position: 'absolute',
    top: 2,
    right: 3,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    opacity: 0.4,
  },
});
