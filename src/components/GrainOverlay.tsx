import React from 'react';
import { View, StyleSheet } from 'react-native';

export const GrainOverlay: React.FC = () => {
  return (
    <View style={styles.overlayContainer} pointerEvents="none">
      {/* Soft Silk Warm Film Mist */}
      <View style={styles.softMistGlow} />
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
  softMistGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 248, 235, 0.05)',
  },
});
