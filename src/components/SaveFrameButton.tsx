import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';

interface SaveFrameButtonProps {
  frameNumber?: string;
  isFormEmpty?: boolean;
  onSave?: () => Promise<void> | void;
}

export const SaveFrameButton: React.FC<SaveFrameButtonProps> = ({
  frameNumber = '13',
  isFormEmpty = true,
  onSave,
}) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const handleSavePress = async () => {
    if (isSaving) return;
    setIsSaving(true);

    if (onSave) {
      try {
        await onSave();
      } catch (err) {
        console.error('Save failed', err);
      }
    }

    // 1. Button Press Scale Animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Success Overlay Fade In
    Animated.timing(overlayAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // 3. Redirect to Home Screen after ~800ms
    setTimeout(() => {
      setIsSaving(false);
      router.replace('/(tabs)');
    }, 850);
  };

  const handleCancelPress = () => {
    Alert.alert(
      'Kareyi İptal Et',
      'Bu kareyi iptal etmek istediğine emin misin?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Kareyi İptal Et',
          style: 'destructive',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Optional Empty Form Helper Subtext */}
      {isFormEmpty ? (
        <Text style={styles.emptyHelperSubtext}>
          istersen hiçbir şey eklemeden kaydedebilirsin.
        </Text>
      ) : null}

      {/* Success Overlay Banner */}
      <Animated.View
        pointerEvents="none"
        style={[styles.successBanner, { opacity: overlayAnim }]}
      >
        <PozIcon name="photo" size={18} color={Colors.yellow} />
        <Text style={styles.successBannerText}>{frameNumber}. kare filmine eklendi!</Text>
      </Animated.View>

      {/* Primary Dark Button */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
        <TouchableOpacity
          activeOpacity={0.88}
          accessibilityLabel="kareyi filme ekle"
          accessibilityHint="Kare detaylarını kaydeder ve ana sayfaya döner"
          disabled={isSaving}
          onPress={handleSavePress}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>kareyi filme ekle</Text>
          <PozIcon name="arrow-right" size={18} color="#FFFDF9" />
        </TouchableOpacity>
      </Animated.View>

      {/* Secondary Cancel Link */}
      <TouchableOpacity
        activeOpacity={0.7}
        accessibilityLabel="bu kareyi iptal et"
        onPress={handleCancelPress}
        style={styles.cancelLinkButton}
      >
        <Text style={styles.cancelLinkText}>bu kareyi iptal et</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.lg,
    gap: Spacing.xs,
    alignItems: 'center',
  },
  emptyHelperSubtext: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181520',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 6,
    width: '100%',
    justifyContent: 'center',
  },
  successBannerText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF6',
  },
  primaryButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 54,
    borderRadius: BorderRadius.md,
    gap: 8,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
  cancelLinkButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  cancelLinkText: {
    fontSize: 13,
    fontFamily: Fonts.sansSemiBold,
    color: Colors.stampRed,
    textDecorationLine: 'underline',
  },
});
