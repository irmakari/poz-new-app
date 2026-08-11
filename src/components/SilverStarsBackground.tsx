import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';

interface StarPoint {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  size?: number;
  opacity?: number;
  char?: '✦' | '✧' | '✴' | '★';
}

const DEFAULT_STARS: StarPoint[] = [
  { top: '4%', right: '8%', size: 18, opacity: 0.45, char: '✦' },
  { top: '12%', left: '6%', size: 14, opacity: 0.35, char: '✧' },
  { top: '22%', right: '14%', size: 12, opacity: 0.3, char: '✦' },
  { top: '35%', left: '10%', size: 20, opacity: 0.4, char: '✴' },
  { top: '48%', right: '7%', size: 15, opacity: 0.35, char: '✧' },
  { top: '62%', left: '8%', size: 18, opacity: 0.4, char: '✦' },
  { top: '75%', right: '12%', size: 14, opacity: 0.35, char: '✴' },
  { top: '88%', left: '15%', size: 16, opacity: 0.3, char: '✧' },
];

interface SilverStarsBackgroundProps {
  style?: ViewStyle;
  stars?: StarPoint[];
}

export const SilverStarsBackground: React.FC<SilverStarsBackgroundProps> = ({
  style,
  stars = DEFAULT_STARS,
}) => {
  return (
    <View style={[styles.container, style]} pointerEvents="none">
      {stars.map((star, index) => (
        <Text
          key={index}
          style={[
            styles.starText,
            {
              top: star.top,
              bottom: star.bottom,
              left: star.left,
              right: star.right,
              fontSize: star.size || 16,
              opacity: star.opacity || 0.35,
            },
          ]}
        >
          {star.char || '✦'}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  starText: {
    position: 'absolute',
    color: '#94A3B8', // Silver Metallic Gray
    textShadowColor: 'rgba(203, 213, 225, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});
