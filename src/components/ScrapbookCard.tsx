import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  StyleProp,
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
    <View style={[styles.card, containerStyle, style]}>
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
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onPress}
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
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
    position: 'relative',
    overflow: 'visible',
  },
  paperHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
});
