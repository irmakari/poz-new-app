import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { FilmTypeOption, FilmPurposeOption, FrameOption } from '@/utils/newFilmData';
import { addNewFilm, FilmItem } from '@/utils/filmData';

import { useApp } from '@/context/AppContext';

interface CreateFilmButtonProps {
  filmType: FilmTypeOption;
  displayName: string;
  purpose: FilmPurposeOption;
  frameCount: FrameOption;
  startDateStr: string;
  serialNumber: string;
}

export const CreateFilmButton: React.FC<CreateFilmButtonProps> = ({
  filmType,
  displayName,
  purpose,
  frameCount,
  startDateStr,
  serialNumber,
}) => {
  const router = useRouter();
  const { createNewFilm } = useApp();
  const [isCreating, setIsCreating] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const handleCreatePress = async () => {
    if (isCreating) return;
    setIsCreating(true);

    // 1. Button Scale Animation
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

    // 2. Success Banner Animation
    Animated.timing(overlayAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // 3. Create new FilmItem in AsyncStorage AppContext
    await createNewFilm({
      title: displayName,
      iso: `ISO ${filmType.iso}`,
      totalFrames: frameCount.count,
      description: `${purpose.label} için oluşturulan ${frameCount.count} pozluk film.`,
      coverColor: filmType.primaryColor,
    });

    // 4. Redirect to Films Screen after 900ms
    setTimeout(() => {
      setIsCreating(false);
      router.replace('/(tabs)/films');
    }, 900);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Success Overlay Banner */}
      <Animated.View
        pointerEvents="none"
        style={[styles.successBanner, { opacity: overlayAnim }]}
      >
        <PozIcon name="films" size={18} color={Colors.yellow} />
        <View>
          <Text style={styles.successTitleText}>yeni filmin hazır!</Text>
          <Text style={styles.successSubText}>
            {frameCount.count} pozluk {filmType.name} filmin çekime başladı.
          </Text>
        </View>
      </Animated.View>

      {/* Primary Action Button */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
        <TouchableOpacity
          activeOpacity={0.88}
          accessibilityLabel="filmi başlat"
          accessibilityHint="Yeni film rulosunu oluşturur ve çekime başlatır"
          disabled={isCreating}
          onPress={handleCreatePress}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>filmi başlat</Text>
          <PozIcon name="arrow-right" size={18} color="#FFFDF9" />
        </TouchableOpacity>
      </Animated.View>

      {/* Secondary Cancel Link */}
      <TouchableOpacity
        activeOpacity={0.7}
        accessibilityLabel="şimdilik vazgeç"
        onPress={handleCancel}
        style={styles.cancelLinkButton}
      >
        <Text style={styles.cancelLinkText}>şimdilik vazgeç</Text>
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
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181520',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 6,
    width: '100%',
  },
  successTitleText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF6',
  },
  successSubText: {
    fontSize: 11,
    fontFamily: Fonts.sans,
    color: Colors.yellow,
    marginTop: 1,
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
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
});
