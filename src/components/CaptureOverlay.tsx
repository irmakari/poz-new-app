import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';

interface CaptureOverlayProps {
  visible: boolean;
  frameNumber: number;
  opacityAnim: Animated.Value;
}

export const CaptureOverlay: React.FC<CaptureOverlayProps> = ({
  visible,
  frameNumber,
  opacityAnim,
}) => {
  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlayBox, { opacity: opacityAnim }]}>
      <PozIcon name="photo" size={16} color={Colors.yellow} />
      <Text style={styles.overlayText}>{frameNumber}. kare filme eklendi</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlayBox: {
    position: 'absolute',
    top: 18,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181520',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 999,
  },
  overlayText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF6',
  },
});
