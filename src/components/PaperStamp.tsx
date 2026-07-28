import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ViewStyle, Animated } from 'react-native';
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
  const scaleAnim = useRef(new Animated.Value(1.12)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.92,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start();
  }, [label]);

  return (
    <Animated.View
      style={[
        styles.stampContainer,
        {
          borderColor: color,
          opacity: opacityAnim,
          transform: [{ rotate: rotation }, { scale: scaleAnim }],
        },
        style,
      ]}
    >
      <View style={[styles.innerFrame, { borderColor: color }]}>
        <Text style={[styles.stampText, { color }]}>{label.toUpperCase()}</Text>
      </View>

      {/* Ink imperfection spot */}
      <View style={[styles.inkSpot, { backgroundColor: color }]} />
    </Animated.View>
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
  },
  inkSpot: {
    position: 'absolute',
    top: 2,
    right: 3,
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    opacity: 0.4,
  },
});
