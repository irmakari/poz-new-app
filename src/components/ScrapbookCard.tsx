import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  StyleProp,
  Animated,
  AccessibilityInfo,
} from 'react-native';
import { Colors, BorderRadius, Spacing } from '@/constants/theme';
import { TapeDecoration, TapePosition } from './TapeDecoration';
import { PaperTextureOverlay } from './PaperTextureOverlay';
import { TornEdge } from './TornEdge';

export interface ScrapbookCardProps {
  children: React.ReactNode;
  bgColor?: string;
  rotation?: string;
  hasTape?: boolean | TapePosition;
  tapeColor?: string;
  tapeRotation?: string;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  hasBorder?: boolean;
  hasTornEdge?: boolean | 'top' | 'bottom' | 'right';
  hasTexture?: boolean;
}

export const ScrapbookCard: React.FC<ScrapbookCardProps> = ({
  children,
  bgColor = Colors.backgroundCard,
  rotation = '0deg',
  hasTape = false,
  tapeColor = Colors.tapeDefault,
  tapeRotation,
  padding = Spacing.lg,
  style,
  onPress,
  hasBorder = true,
  hasTornEdge = false,
  hasTexture = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      setReduceMotion(enabled);
    });
  }, []);

  const handlePressIn = () => {
    if (reduceMotion) return;
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 200,
      friction: 12,
    }).start();
  };

  const handlePressOut = () => {
    if (reduceMotion) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 180,
      friction: 10,
    }).start();
  };

  const tapePosition: TapePosition =
    typeof hasTape === 'string' ? hasTape : 'top-left';

  const tornPosition =
    typeof hasTornEdge === 'string' ? hasTornEdge : 'bottom';

  const containerStyle: ViewStyle = {
    backgroundColor: bgColor,
    padding,
    transform: [{ rotate: rotation }],
    borderColor: hasBorder ? Colors.border : 'transparent',
  };

  const CardContent = (
    <Animated.View style={[styles.card, containerStyle, style, { transform: [{ rotate: rotation }, { scale: scaleAnim }] }]}>
      {/* Paper Grain Overlay */}
      {hasTexture && <PaperTextureOverlay />}

      {/* Torn Edge Effect */}
      {hasTornEdge && (
        <TornEdge
          position={tornPosition}
          color={bgColor}
          count={10}
        />
      )}

      {/* Tape Overlay */}
      {hasTape && (
        <TapeDecoration
          position={tapePosition}
          color={tapeColor}
          rotation={tapeRotation}
        />
      )}

      {/* Subtle paper highlight line */}
      <View style={styles.paperHighlight} pointerEvents="none" />

      {children}
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  card: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',

    // Mechanical Editorial Object Shadow
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  paperHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
