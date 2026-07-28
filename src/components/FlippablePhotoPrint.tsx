import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { PhotoFront } from '@/components/PhotoFront';
import { PhotoBack } from '@/components/PhotoBack';
import { PhotoEntry } from '@/utils/photoDetailData';

interface FlippablePhotoPrintProps {
  photo: PhotoEntry;
  onOpenFullNote: () => void;
}

export const FlippablePhotoPrint: React.FC<FlippablePhotoPrintProps> = ({
  photo,
  onOpenFullNote,
}) => {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - Spacing.lg * 2, 340);
  const cardHeight = Math.round(cardWidth * 1.5);

  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleFlip = () => {
    if (isFlipped) {
      // Flip back to Front (0deg)
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setIsFlipped(false));
    } else {
      // Flip to Back (180deg)
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setIsFlipped(true));
    }
  };

  // Interpolations for Front & Back Rotation
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.95}
        accessibilityRole="button"
        accessibilityLabel={
          isFlipped
            ? 'fotoğrafın ön yüzünü görmek için dokun'
            : 'fotoğrafın arka yüzünü görmek için dokun'
        }
        onPress={handleFlip}
        style={[styles.touchCardWrapper, { width: cardWidth, height: cardHeight }]}
      >
        {/* Front Face Card */}
        <Animated.View
          style={[styles.flipCard, frontAnimatedStyle, { width: cardWidth, height: cardHeight }]}
        >
          <PhotoFront photo={photo} cardWidth={cardWidth} />
        </Animated.View>

        {/* Back Face Card */}
        <Animated.View
          style={[
            styles.flipCard,
            styles.flipCardBack,
            backAnimatedStyle,
            { width: cardWidth, height: cardHeight },
          ]}
        >
          <PhotoBack photo={photo} cardWidth={cardWidth} onOpenFullNote={onOpenFullNote} />
        </Animated.View>
      </TouchableOpacity>

      {/* Helper Flip Subtext */}
      <TouchableOpacity activeOpacity={0.7} onPress={handleFlip} style={styles.helperRow}>
        <PozIcon name="sparkle" size={14} color={Colors.textSecondary} />
        <Text style={styles.helperText}>
          {isFlipped
            ? 'fotoğrafa dönmek için tekrar dokun ↺'
            : 'notlarını görmek için fotoğrafı çevir ↻'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  touchCardWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backfaceVisibility: 'hidden',
  },
  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  helperText: {
    fontSize: 12,
    fontFamily: Fonts.sansSemiBold,
    color: Colors.textSecondary,
  },
});
