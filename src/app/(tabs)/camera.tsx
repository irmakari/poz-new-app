import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { CameraHeader } from '@/components/CameraHeader';
import { MockViewfinder, FlashState, CameraFacing } from '@/components/MockViewfinder';
import { FilmInfoLabel } from '@/components/FilmInfoLabel';
import { ShutterButton } from '@/components/ShutterButton';
import { CaptureOverlay } from '@/components/CaptureOverlay';
import { PozIcon } from '@/components/PozIcon';

export default function CameraScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  // Local Camera States
  const [flashState, setFlashState] = useState<FlashState>('auto');
  const [facing, setFacing] = useState<CameraFacing>('back');
  const [remainingFrames, setRemainingFrames] = useState(24);
  const [capturedFrameNum, setCapturedFrameNum] = useState(13);
  const [isCapturing, setIsCapturing] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  // Animated Values
  const flashAnimOpacity = useRef(new Animated.Value(0)).current;
  const toastAnimOpacity = useRef(new Animated.Value(0)).current;

  // Flash Toggle Handler
  const handleToggleFlash = () => {
    setFlashState((prev) => {
      if (prev === 'auto') return 'on';
      if (prev === 'on') return 'off';
      return 'auto';
    });
  };

  // Camera Flip Handler
  const handleFlipCamera = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  // Shutter Press Handler
  const handleShutterPress = async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    try {
      // 1. Take picture using real camera view
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
      if (!photo?.uri) {
        throw new Error('Fotoğraf çekilemedi');
      }

      // 2. Decrement Frame Counter
      const nextFrames = Math.max(0, remainingFrames - 1);
      setRemainingFrames(nextFrames);

      // 3. Viewfinder White Flash Animation
      Animated.sequence([
        Animated.timing(flashAnimOpacity, {
          toValue: 0.9,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(flashAnimOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();

      // 4. Show Capture Toast Feedback
      setOverlayVisible(true);
      Animated.sequence([
        Animated.timing(toastAnimOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.delay(500),
        Animated.timing(toastAnimOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setOverlayVisible(false);
      });

      // 5. Navigate to Capture Review Screen with local URI and params
      setTimeout(() => {
        setIsCapturing(false);
        router.push({
          pathname: '/capture-review',
          params: {
            photoUri: photo.uri,
            frame: String(capturedFrameNum),
            filmId: 'summer-glow-july-2026',
          },
        });
        setCapturedFrameNum((prev) => prev + 1);
      }, 400);
    } catch (error) {
      setIsCapturing(false);
      Alert.alert(
        'Fotoğraf Çekilemedi',
        'Fotoğraf çekilirken bir sorun oluştu. Lütfen tekrar deneyin.'
      );
    }
  };

  // 1. Loading State while permissions are being checked
  if (!permission) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centeredContainer]}>
        <ActivityIndicator size="large" color={Colors.yellow} />
        <Text style={styles.loadingText}>Kamera izni kontrol ediliyor...</Text>
      </SafeAreaView>
    );
  }

  // 2. Permission Not Granted State
  if (!permission.granted) {
    const canAskAgain = permission.canAskAgain;

    return (
      <SafeAreaView style={[styles.safeArea, styles.centeredContainer]}>
        <View style={styles.permissionCard}>
          <View style={styles.permissionIconCircle}>
            <PozIcon name="camera" size={32} color={Colors.yellow} />
          </View>
          <Text style={styles.permissionTitle}>kameraya erişmemiz gerekiyor</Text>
          <Text style={styles.permissionDescription}>
            {canAskAgain
              ? 'analog karelerini çekebilmek için kamera izni vermelisin.'
              : 'Kamera izni reddedildi. Analog karelerini çekebilmek için cihaz ayarlarından kameraya izin vermelisin.'}
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.permissionButton}
            onPress={canAskAgain ? requestPermission : () => Linking.openSettings()}
          >
            <Text style={styles.permissionButtonText}>
              {canAskAgain ? 'kamera izni ver' : 'ayarlara git'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 3. Main Camera Screen
  return (
    <SafeAreaView style={styles.safeArea}>
      <CaptureOverlay
        visible={overlayVisible}
        frameNumber={capturedFrameNum}
        opacityAnim={toastAnimOpacity}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Dark Analog Camera Body Container */}
        <View style={styles.cameraBodyCasing}>
          {/* Top Screw Accents */}
          <View style={styles.screwRow}>
            <Text style={styles.screwText}>+</Text>
            <Text style={styles.serialText}>POZ-35MM-OPTICS</Text>
            <Text style={styles.screwText}>+</Text>
          </View>

          {/* Header Film & Frame Counter Bar */}
          <CameraHeader remainingFrames={remainingFrames} />

          {/* Viewfinder Window with Real CameraView when focused */}
          <MockViewfinder
            cameraRef={cameraRef}
            isFocused={isFocused}
            flashState={flashState}
            facing={facing}
            flashAnimOpacity={flashAnimOpacity}
          />

          {/* Film Info Label Under Viewfinder */}
          <FilmInfoLabel frameCount={36 - remainingFrames} remainingFrames={remainingFrames} />

          {/* Camera Controls Bar */}
          <View style={styles.controlsRow}>
            {/* Flash Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityLabel="flaşı değiştir"
              accessibilityHint="Otomatik, açık veya kapalı flaş modları arasında geçiş yapar"
              onPress={handleToggleFlash}
              style={[
                styles.controlButton,
                { backgroundColor: flashState === 'off' ? '#2A2436' : Colors.yellow },
              ]}
            >
              <PozIcon
                name="star"
                size={18}
                color={flashState === 'off' ? 'rgba(255, 255, 255, 0.5)' : Colors.yellowDark}
              />
              <Text
                style={[
                  styles.controlButtonText,
                  { color: flashState === 'off' ? '#FFFDF6' : Colors.yellowDark },
                ]}
              >
                {flashState.toUpperCase()}
              </Text>
            </TouchableOpacity>

            {/* Shutter Button (Center) */}
            <ShutterButton onPress={handleShutterPress} disabled={isCapturing} />

            {/* Flip Camera Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityLabel="kamerayı çevir"
              accessibilityHint="Ön ve arka kamera arasında geçiş yapar"
              onPress={handleFlipCamera}
              style={[styles.controlButton, { backgroundColor: Colors.lavender }]}
            >
              <PozIcon name="camera" size={18} color={Colors.lavenderDark} />
              <Text style={[styles.controlButtonText, { color: Colors.lavenderDark }]}>
                {facing === 'back' ? 'ARKA' : 'ÖN'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Information Subtext */}
          <View style={styles.bottomInfoGroup}>
            <Text style={styles.analogNoticeText}>
              çektiğin kareyi film açılana kadar göremeyeceksin.
            </Text>

            <Text style={styles.remainingCounterSubtext}>
              {remainingFrames} kare kaldı.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#16131F', // Dark plum camera body theme
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  loadingText: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 12,
  },
  permissionCard: {
    width: '100%',
    backgroundColor: '#1F1A2A',
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  permissionIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2A2436',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  permissionTitle: {
    fontFamily: Fonts.sans,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFDF6',
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  permissionDescription: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: Spacing.xs,
    textAlign: 'center',
    lineHeight: 18,
  },
  permissionButton: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.yellow,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    width: '100%',
  },
  permissionButtonText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.yellowDark,
  },
  scrollContainer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: 130, // Clearance for floating bottom tab bar
  },
  cameraBodyCasing: {
    backgroundColor: '#1F1A2A',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  screwRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  screwText: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.25)',
    fontWeight: '800',
  },
  serialText: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.35)',
    letterSpacing: 1,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: Spacing.md,
  },
  controlButton: {
    width: 68,
    height: 52,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  controlButtonText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bottomInfoGroup: {
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  analogNoticeText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: 'rgba(255, 255, 255, 0.65)',
    textAlign: 'center',
  },
  remainingCounterSubtext: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.yellow,
    fontWeight: '700',
  },
});
