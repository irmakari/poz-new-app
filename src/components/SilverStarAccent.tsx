import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface SilverStarAccentProps {
  size?: number;
  opacity?: number;
  style?: ViewStyle | TextStyle;
  symbol?: '✦' | '✧' | '✴' | '★';
}

export const SilverStarAccent: React.FC<SilverStarAccentProps> = ({
  size = 14,
  opacity = 0.85,
  style,
  symbol = '✦',
}) => {
  return (
    <Text style={[styles.star, { fontSize: size, opacity }, style]}>
      {symbol}
    </Text>
  );
};

const styles = StyleSheet.create({
  star: {
    color: '#94A3B8', // Silver Metallic
    textShadowColor: 'rgba(203, 213, 225, 0.75)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    marginHorizontal: 3,
  },
});
