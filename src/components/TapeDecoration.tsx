import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';

export type TapePosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'custom';

interface TapeDecorationProps {
  position?: TapePosition;
  color?: string;
  rotation?: string; // e.g. '-12deg', '8deg'
  width?: number;
  height?: number;
  style?: ViewStyle;
}

export const TapeDecoration: React.FC<TapeDecorationProps> = ({
  position = 'top-left',
  color = Colors.tapeDefault,
  rotation,
  width = 64,
  height = 18,
  style,
}) => {
  let defaultRotation = '-8deg';
  let positionStyles: ViewStyle = {};

  switch (position) {
    case 'top-left':
      positionStyles = { top: -9, left: 16 };
      defaultRotation = '-12deg';
      break;
    case 'top-right':
      positionStyles = { top: -9, right: 16 };
      defaultRotation = '14deg';
      break;
    case 'top-center':
      positionStyles = { top: -9, alignSelf: 'center' };
      defaultRotation = '-2deg';
      break;
    case 'bottom-left':
      positionStyles = { bottom: -9, left: 16 };
      defaultRotation = '10deg';
      break;
    case 'bottom-right':
      positionStyles = { bottom: -9, right: 16 };
      defaultRotation = '-10deg';
      break;
    case 'custom':
      positionStyles = {};
      break;
  }

  const activeRotation = rotation ?? defaultRotation;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.tape,
        {
          width,
          height,
          backgroundColor: color,
          transform: [{ rotate: activeRotation }],
        },
        positionStyles,
        style,
      ]}
    >
      <View style={styles.tapeInnerLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  tape: {
    position: 'absolute',
    zIndex: 10,
    borderRadius: 2,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  tapeInnerLine: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    marginVertical: 2,
  },
});
