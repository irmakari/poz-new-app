import React, { useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/theme';

interface ShutterButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const ShutterButton: React.FC<ShutterButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.88,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      accessibilityLabel="fotoğraf çek"
      accessibilityHint="Analog deklanşöre basarak filme yeni bir kare ekler"
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={styles.touchableArea}
    >
      <Animated.View
        style={[
          styles.outerRing,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.middleRim}>
          <View style={styles.innerPinkButton} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableArea: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#D1D5DB',
    padding: 4,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  middleRim: {
    flex: 1,
    borderRadius: 35,
    backgroundColor: '#1E1B29',
    padding: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  innerPinkButton: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#9F1239',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#9F1239',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
});
