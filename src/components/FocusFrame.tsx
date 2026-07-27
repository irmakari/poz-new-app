import React from 'react';
import { View, StyleSheet } from 'react-native';

export const FocusFrame: React.FC = () => {
  return (
    <View style={styles.focusContainer} pointerEvents="none">
      {/* Top Left Corner */}
      <View style={[styles.corner, styles.topLeft]} />
      {/* Top Right Corner */}
      <View style={[styles.corner, styles.topRight]} />
      {/* Bottom Left Corner */}
      <View style={[styles.corner, styles.bottomLeft]} />
      {/* Bottom Right Corner */}
      <View style={[styles.corner, styles.bottomRight]} />

      {/* Center Reticle Dot */}
      <View style={styles.centerDot} />
    </View>
  );
};

const styles = StyleSheet.create({
  focusContainer: {
    width: 90,
    height: 70,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.55,
  },
  corner: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderColor: '#FFFDF9',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  centerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFDF9',
  },
});
