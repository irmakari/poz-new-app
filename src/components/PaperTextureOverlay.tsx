import React from 'react';
import { View, StyleSheet } from 'react-native';

export const PaperTextureOverlay: React.FC = () => {
  return (
    <View style={styles.overlay} pointerEvents="none">
      {/* Horizontal subtle paper grain lines */}
      <View style={styles.grainLine1} />
      <View style={styles.grainLine2} />
      <View style={styles.grainLine3} />

      {/* Tiny paper fiber specks */}
      <View style={[styles.speck, { top: '15%', left: '22%' }]} />
      <View style={[styles.speck, { top: '45%', right: '18%' }]} />
      <View style={[styles.speck, { bottom: '20%', left: '55%' }]} />
      <View style={[styles.speck, { top: '75%', left: '12%' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 1,
  },
  grainLine1: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.035)',
  },
  grainLine2: {
    position: 'absolute',
    top: '65%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  grainLine3: {
    position: 'absolute',
    top: '85%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.025)',
  },
  speck: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(28, 26, 36, 0.07)',
  },
});
