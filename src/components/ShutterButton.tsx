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
    width: 78,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFDF9',
    padding: 5,
    borderWidth: 2,
    borderColor: '#110E17',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  middleRim: {
    flex: 1,
    borderRadius: 33,
    backgroundColor: '#E8E1F0',
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.2)',
  },
  innerPinkButton: {
    flex: 1,
    borderRadius: 27,
    backgroundColor: Colors.pinkDark,
    shadowColor: Colors.pinkDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
