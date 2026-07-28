import React from 'react';
import { View, StyleSheet } from 'react-native';

export const GrainOverlay: React.FC = () => {
  return (
    <View style={styles.overlayContainer} pointerEvents="none">
      {/* Light vignetting edges */}
      <View style={styles.vignetteTop} />
      <View style={styles.vignetteBottom} />

      {/* Grain Dots */}
      {Array.from({ length: 16 }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.grainDot,
            {
              top: `${(i * 19) % 92}%` as any,
              left: `${(i * 23) % 94}%` as any,
              opacity: 0.15 + (i % 3) * 0.08,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  vignetteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  vignetteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  grainDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFF',
  },
});
