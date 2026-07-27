import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface TornEdgeProps {
  position?: 'top' | 'bottom' | 'right';
  color?: string;
  count?: number;
  style?: ViewStyle;
}

export const TornEdge: React.FC<TornEdgeProps> = ({
  position = 'bottom',
  color = '#FFFDF9',
  count = 12,
  style,
}) => {
  const isVertical = position === 'right';

  return (
    <View
      pointerEvents="none"
      style={[
        styles.container,
        isVertical ? styles.verticalContainer : styles.horizontalContainer,
        position === 'top' && styles.topPosition,
        position === 'bottom' && styles.bottomPosition,
        position === 'right' && styles.rightPosition,
        style,
      ]}
    >
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.tooth,
            { backgroundColor: color },
            isVertical ? styles.verticalTooth : styles.horizontalTooth,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 5,
    overflow: 'hidden',
  },
  horizontalContainer: {
    left: 0,
    right: 0,
    height: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  verticalContainer: {
    top: 0,
    bottom: 0,
    width: 8,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  topPosition: {
    top: -4,
  },
  bottomPosition: {
    bottom: -4,
  },
  rightPosition: {
    right: -4,
  },
  tooth: {
    transform: [{ rotate: '45deg' }],
  },
  horizontalTooth: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  verticalTooth: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});
