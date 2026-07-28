import { CameraHeader } from '@/components/CameraHeader';
import { CaptureModeSelector } from '@/components/CaptureModeSelector';
import { CaptureOverlay } from '@/components/CaptureOverlay';
import { FilmInfoLabel } from '@/components/FilmInfoLabel';
import { CameraFacing, FlashState, MockViewfinder } from '@/components/MockViewfinder';
import { PozIcon } from '@/components/PozIcon';
import { ShutterButton } from '@/components/ShutterButton';
import { BorderRadius, Colors, Fonts, Spacing } from '@/constants/theme';
import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '@/context/AppContext';

export default function CameraScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const { activeFilm, films, setActiveFilm, currentCaptureMode, selectCaptureMode } = useApp();

  const remainingFrames = activeFilm ? (activeFilm.remainingFrames ?? 24) : 24;
  const currentFrames = activeFilm ? (activeFilm.currentFrames ?? activeFilm.frameCount ?? 12) : 12;
  const capturedFrameNum = currentFrames + 1;
  const activeFilmsList = films.filter((f) => f.status === 'active');

  // Local Camera States
  const [flashState, setFlashState] = useState<FlashState>('auto');
  const [facing, setFacing] = useState<CameraFacing>('back');
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

  // Shutter Press Handler (Dual Mode)
  const handleShutterPress = async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    try {
      // 1. Take picture using real camera view
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
      if (!photo?.uri) {
        throw new Error('Fotoğraf çekilemedi');
      }

      // 2. Viewfinder White Flash Animation
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

      // 3. Show Capture Toast Feedback
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

      // 4. Navigate according to current capture mode
      setTimeout(() => {
        setIsCapturing(false);
        if (currentCaptureMode === 'daily') {
          router.push({
            pathname: '/daily-capture-review',
            params: {
              photoUri: photo.uri,
              capturedAt: new Date().toISOString(),
              mode: 'daily',
            },
          });
        } else {
          router.push({
            pathname: '/capture-review',
            params: {
              photoUri: photo.uri,
              frame: String(capturedFrameNum),
              filmId: activeFilm ? activeFilm.id : 'summer-glow-july-2026',
              mode: 'film',
            },
          });
        }
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

          {/* Mode Selector Toggle: Günlük vs Film */}
          <CaptureModeSelector
            currentMode={currentCaptureMode}
            onSelectMode={selectCaptureMode}
          />

          {/* Header Film & Frame Counter Bar */}
          {currentCaptureMode === 'film' ? (
            <CameraHeader remainingFrames={remainingFrames} />
          ) : (
            <View style={styles.dailyHeaderBar}>
              <PozIcon name="photo" size={14} color={Colors.yellow} />
              <Text style={styles.dailyHeaderText}>bugünün fotoğrafı • çek, hemen gör</Text>
            </View>
          )}

          {/* Viewfinder Window with Real CameraView when focused */}
          <MockViewfinder
            cameraRef={cameraRef}
            isFocused={isFocused}
            flashState={flashState}
            facing={facing}
            flashAnimOpacity={flashAnimOpacity}
          />

          {/* Mode Info Label Under Viewfinder */}
          {currentCaptureMode === 'film' ? (
            <>
              <FilmInfoLabel frameCount={(activeFilm?.totalFrames || 36) - remainingFrames} remainingFrames={remainingFrames} />

              {/* Active Film Roll Selector if multiple films */}
              {activeFilmsList.length > 1 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 6 }}>
                  <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 4 }}>
                    {activeFilmsList.map((f) => (
                      <TouchableOpacity
                        key={f.id}
                        onPress={() => setActiveFilm(f.id)}
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 4,
                          backgroundColor: f.id === activeFilm?.id ? Colors.lavender : '#2A2436',
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: Fonts.mono,
                            color: f.id === activeFilm?.id ? '#181520' : '#FFFDF6',
                            fontWeight: '700',
                          }}
                        >
                          {f.title} ({f.totalFrames - (f.currentFrames || 0)})
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              )}
            </>
          ) : (
            <View style={styles.dailyInfoBox}>
              <Text style={styles.dailyInfoText}>günlük mod • fotoğraf anında fotoğraf albümüne eklenir</Text>
            </View>
          )}

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
              çektiğin kareyi banyo kilitlidir.
            </Text>
            <Text style={styles.testHintBadgeText}>
              ✨ Fotoğrafı çektikten sonra karttaki "Efekt Testi" sekmesinden 35mm filtre sonuçlarını canlı deneyebilirsin!
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
  testHintBadgeText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.yellow,
    opacity: 0.85,
    marginTop: 2,
  },
  dailyHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2436',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.sm,
    marginVertical: Spacing.xs,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dailyHeaderText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: '#FFF1B0',
    fontWeight: '700',
  },
  dailyInfoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginVertical: 4,
  },
  dailyInfoText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  remainingCounterSubtext: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.yellow,
    fontWeight: '700',
  },
});
