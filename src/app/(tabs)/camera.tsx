import { CameraHeader } from '@/components/CameraHeader';
import { CaptureModeSelector } from '@/components/CaptureModeSelector';
import { CaptureOverlay } from '@/components/CaptureOverlay';
import { FilmInfoLabel } from '@/components/FilmInfoLabel';
import { CameraFacing, FlashState, MockViewfinder, ViewfinderMode } from '@/components/MockViewfinder';
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
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FILTERS, FilterType } from '@/constants/filmFilters';
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
  const [viewfinderMode, setViewfinderMode] = useState<ViewfinderMode>('compact');
  const [isMirrored, setIsMirrored] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('dazz-green');
  const [isDreamyGlow, setIsDreamyGlow] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  // Modal State for Settings
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Animated Values
  const flashAnimOpacity = useRef(new Animated.Value(0)).current;
  const toastAnimOpacity = useRef(new Animated.Value(0)).current;

  // Handlers
  const handleToggleFlash = () => {
    setFlashState((prev) => {
      if (prev === 'auto') return 'on';
      if (prev === 'on') return 'off';
      return 'auto';
    });
  };

  const handleFlipCamera = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const handleToggleMirror = () => {
    setIsMirrored((prev) => !prev);
  };

  const handleToggleDreamyGlow = () => {
    setIsDreamyGlow((prev) => !prev);
  };

  const handleToggleViewfinderMode = (mode: ViewfinderMode) => {
    setViewfinderMode(mode);
  };

  const triggerFlashAnimation = () => {
    flashAnimOpacity.setValue(1);
    Animated.timing(flashAnimOpacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const triggerToastAnimation = () => {
    toastAnimOpacity.setValue(1);
    Animated.timing(toastAnimOpacity, {
      toValue: 0,
      duration: 2200,
      useNativeDriver: true,
    }).start();
  };

  const handleShutterPress = async () => {
    if (isCapturing) return;

    if (currentCaptureMode === 'film' && remainingFrames <= 0) {
      Alert.alert(
        'Film Rulosu Doldu! 🎞️',
        'Bu filmdeki tüm pozları çektin! Banyoya gönderebilir ya da yeni bir film rulosu takabilirsin.',
        [
          { text: 'Tamam', style: 'cancel' },
          {
            text: 'Rulolara Git',
            onPress: () => router.push('/(tabs)/films'),
          },
        ]
      );
      return;
    }

    try {
      setIsCapturing(true);

      if (flashState !== 'off') {
        triggerFlashAnimation();
      }

      let photoUri = '';
      if (cameraRef.current) {
        const shouldMirror = facing === 'front' ? !isMirrored : isMirrored;
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.85,
          skipProcessing: false,
          mirror: shouldMirror,
        });

        if (photo?.uri) {
          photoUri = photo.uri;
        }
      }

      triggerToastAnimation();

      if (currentCaptureMode === 'daily') {
        setTimeout(() => {
          setIsCapturing(false);
          router.push({
            pathname: '/daily-capture-review',
            params: {
              photoUri: photoUri || undefined,
              viewfinderMode,
              selectedFilter,
              isDreamyGlow: isDreamyGlow ? '1' : '0',
            },
          });
        }, 400);
      } else {
        setTimeout(() => {
          setIsCapturing(false);
          router.push({
            pathname: '/capture-review',
            params: {
              photoUri: photoUri || undefined,
              viewfinderMode,
              selectedFilter,
              isDreamyGlow: isDreamyGlow ? '1' : '0',
              capturedFrameNum: capturedFrameNum.toString(),
            },
          });
        }, 400);
      }
    } catch (err) {
      console.warn('Error taking photo:', err);
      setIsCapturing(false);
      Alert.alert('Çekim Hata', 'Fotoğraf çekilirken bir sorun oluştu. Lütfen tekrar deneyin.');
    }
  };

  const currentFilterObj = FILTERS.find((f) => f.id === selectedFilter) || FILTERS[0];

  if (!permission) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centeredContainer]}>
        <ActivityIndicator size="large" color={Colors.yellow} />
        <Text style={styles.loadingText}>kamera izni kontrol ediliyor...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centeredContainer]}>
        <View style={styles.permissionCard}>
          <View style={styles.permissionIconCircle}>
            <PozIcon name="camera" size={32} color={Colors.yellow} />
          </View>
          <Text style={styles.permissionTitle}>Kamera İzni Gerekli</Text>
          <Text style={styles.permissionDescription}>
            Analog film deneyimi ve fotoğraf çekebilmek için uygulamanın kameraya erişmesine izin vermelisin.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={async () => {
              if (permission.canAskAgain) {
                await requestPermission();
              } else {
                Linking.openSettings().catch(() => {
                  Alert.alert('Hata', 'Ayarlar açılamadı. Lütfen Cihaz Ayarları > Gizlilik > Kamera menüsünden izin verin.');
                });
              }
            }}
            style={styles.permissionButton}
          >
            <Text style={styles.permissionButtonText}>İzin Ver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CaptureOverlay
        visible={overlayVisible}
        frameNumber={capturedFrameNum}
        onAnimationComplete={() => setOverlayVisible(false)}
        flashAnimOpacity={flashAnimOpacity}
        toastAnimOpacity={toastAnimOpacity}
      />

      {/* FIXED DAZZ CAM NON-SCROLLING VIEWPORT */}
      <View style={styles.fixedScreenContainer}>
        {/* Top Header Control Bar */}
        <View style={styles.topControlHeader}>
          <CaptureModeSelector
            currentMode={currentCaptureMode}
            onSelectMode={selectCaptureMode}
          />

          <View style={styles.topQuickButtons}>
            <TouchableOpacity onPress={() => setIsSettingsModalOpen(true)} style={styles.quickSettingsPill}>
              <Text style={styles.quickSettingsText}>
                {viewfinderMode === 'compact' ? '🎞️ 1.4' : viewfinderMode === 'cinematic' ? '🎬 1.85' : '🔍 3:4'} ▾
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleToggleMirror} style={[styles.quickIconBtn, isMirrored && styles.quickIconBtnActive]}>
              <Text style={{ fontSize: 11, color: isMirrored ? Colors.yellowDark : '#FFFDF6' }}>🪞</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Center Viewfinder Container */}
        <View style={styles.viewfinderCenterWrapper}>
          <MockViewfinder
            cameraRef={cameraRef}
            isFocused={isFocused}
            flashState={flashState}
            facing={facing}
            flashAnimOpacity={flashAnimOpacity}
            viewfinderMode={viewfinderMode}
            isMirrored={isMirrored}
            selectedFilter={selectedFilter}
            isDreamyGlow={isDreamyGlow}
          />

        {/* Mode Info Badge Under Viewfinder */}
        <View style={styles.infoBannerRow}>
          <Text style={styles.infoBannerText}>
            {currentCaptureMode === 'film'
              ? `${activeFilm ? (activeFilm.name || activeFilm.title) : 'summer glow 400'} • ${remainingFrames} poz kaldı`
              : 'günlük mod • çek, albüme kaydet'}
          </Text>
        </View>
      </View>

        {/* Prominent Kadraj Boyutu (35mm / Sinematik / 3:4) & Bloom Toolbar Bar */}
        <View style={styles.aspectRatioToolBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setViewfinderMode((prev) => {
                if (prev === 'compact') return 'cinematic';
                if (prev === 'cinematic') return 'expanded';
                return 'compact';
              });
            }}
            style={styles.aspectRatioPillBtn}
          >
            <Text style={styles.aspectRatioPillText}>
              BOYUT: {viewfinderMode === 'compact' ? '🎞️ 35MM (1.4)' : viewfinderMode === 'cinematic' ? '🎬 SİNEMATİK (1.85)' : '🔍 DAZZ PORTRE (3:4)'} 🔄
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggleDreamyGlow}
            style={[styles.bloomPillBtn, isDreamyGlow && styles.bloomPillBtnActive]}
          >
            <Text style={[styles.bloomPillText, isDreamyGlow && styles.bloomPillTextActive]}>
              {isDreamyGlow ? '✨ BLOOM ✓' : '✨ BLOOM'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Fixed Dazz Cam Bottom Controls Deck */}
        <View style={styles.cameraBottomDeck}>
          {/* Main Shutter & Controls Row (Flash, Shutter, Front/Back Camera Flip) */}
          <View style={styles.shutterControlsRow}>
            {/* Flash Button */}
            <TouchableOpacity onPress={handleToggleFlash} style={styles.deckControlSquare}>
              <PozIcon name="star" size={18} color={flashState === 'off' ? 'rgba(255, 255, 255, 0.4)' : Colors.yellow} />
              <Text style={styles.deckControlLabel}>{flashState.toUpperCase()}</Text>
            </TouchableOpacity>

            {/* BIG CENTER SHUTTER BUTTON */}
            <View style={styles.shutterCenterWrapper}>
              <ShutterButton onPress={handleShutterPress} disabled={isCapturing} />
            </View>

            {/* PROMINENT FRONT / BACK CAMERA FLIP BUTTON */}
            <TouchableOpacity
              onPress={handleFlipCamera}
              style={[styles.deckControlSquare, facing === 'front' && styles.deckControlSquareActive]}
            >
              <PozIcon name="rotate" size={20} color={facing === 'front' ? Colors.yellowDark : '#FFFDF6'} />
              <Text style={[styles.deckControlLabel, facing === 'front' && { color: Colors.yellowDark, fontWeight: '900' }]}>
                {facing === 'front' ? 'ÖN' : 'ARKA'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* COLORFUL DAZZ CAM CAMERAS SCROLL ROW UNDER SHUTTER BUTTON */}
          <View style={styles.cameraModelsSection}>
            <Text style={styles.cameraModelSectionTitle}>DAZZ CAM KAFASI / FİLM MODELLERİ</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 4 }}>
              {FILTERS.map((f) => {
                const isSelected = selectedFilter === f.id;
                return (
                  <TouchableOpacity
                    key={f.id}
                    activeOpacity={0.8}
                    onPress={() => setSelectedFilter(f.id)}
                    style={[
                      styles.cameraModelCard,
                      isSelected && styles.cameraModelCardActive,
                    ]}
                  >
                    <View style={[styles.cameraIconBox, { backgroundColor: f.color || '#0E4A3B' }]}>
                      <Text style={{ fontSize: 13 }}>📷</Text>
                    </View>
                    <Text style={[styles.cameraModelName, isSelected && styles.cameraModelNameActive]}>
                      {f.badge}
                    </Text>
                    {isSelected && <View style={styles.activeDot} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Kadraj & Bloom Settings Modal Sheet */}
      <Modal visible={isSettingsModalOpen} transparent animationType="slide">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsSettingsModalOpen(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContentSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.modalTitleText}>KADRAJ BOYUTU & RÜYA BLOOM</Text>

            <Text style={styles.sectionSubTitle}>1. Kadraj Oranı Seçimi:</Text>
            <View style={styles.modeOptionRow}>
              <TouchableOpacity
                onPress={() => handleToggleViewfinderMode('compact')}
                style={[styles.modeOptionBtn, viewfinderMode === 'compact' && styles.modeOptionBtnActive]}
              >
                <Text style={[styles.modeOptionText, viewfinderMode === 'compact' && styles.modeOptionTextActive]}>
                  🎞️ 35MM YAYVAN (1.4)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleToggleViewfinderMode('cinematic')}
                style={[styles.modeOptionBtn, viewfinderMode === 'cinematic' && styles.modeOptionBtnActive]}
              >
                <Text style={[styles.modeOptionText, viewfinderMode === 'cinematic' && styles.modeOptionTextActive]}>
                  🎬 ULTRA GENİŞ (1.85)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleToggleViewfinderMode('expanded')}
                style={[styles.modeOptionBtn, viewfinderMode === 'expanded' && styles.modeOptionBtnActive]}
              >
                <Text style={[styles.modeOptionText, viewfinderMode === 'expanded' && styles.modeOptionTextActive]}>
                  🔍 DAZZ PORTRE (3:4)
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionSubTitle, { marginTop: 16 }]}>2. Digicam Rüya Bloom:</Text>
            <TouchableOpacity
              onPress={handleToggleDreamyGlow}
              style={[styles.bloomToggleBtn, isDreamyGlow && styles.bloomToggleBtnActive]}
            >
              <Text style={[styles.bloomToggleText, isDreamyGlow && styles.bloomToggleTextActive]}>
                {isDreamyGlow ? '✨ Rüya Bloom (AÇIK ✓)' : '✨ Rüya Bloom (KAPALI)'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsSettingsModalOpen(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#16131F',
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
  },
  permissionDescription: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  permissionButton: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.yellow,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.md,
    width: '100%',
    alignItems: 'center',
  },
  permissionButtonText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.yellowDark,
  },

  // Fixed Non-Scrolling Layout
  fixedScreenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: 95, // Clearance for tab bar
  },
  topControlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 4,
  },
  topQuickButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quickSettingsPill: {
    backgroundColor: '#2A2436',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  quickSettingsText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    fontWeight: '700',
  },
  quickIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A2436',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  quickIconBtnActive: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellowDark,
  },

  // Center Viewfinder Wrapper
  viewfinderCenterWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBannerRow: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  infoBannerText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    fontWeight: '700',
  },
  aspectRatioToolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 4,
  },
  aspectRatioPillBtn: {
    backgroundColor: '#2A2436',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  aspectRatioPillText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    fontWeight: '800',
  },
  bloomPillBtn: {
    backgroundColor: '#2A2436',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  bloomPillBtnActive: {
    backgroundColor: Colors.lavender,
    borderColor: Colors.lavenderDark,
  },
  bloomPillText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    fontWeight: '800',
  },
  bloomPillTextActive: {
    color: '#FFFDF6',
  },

  // Camera Bottom Deck
  cameraBottomDeck: {
    backgroundColor: '#1E1928',
    borderRadius: BorderRadius.lg,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    gap: 10,
  },
  shutterControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  deckControlSquare: {
    width: 58,
    height: 52,
    borderRadius: BorderRadius.md,
    backgroundColor: '#2A2436',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  deckControlSquareActive: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellowDark,
  },
  deckControlLabel: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '700',
  },
  shutterCenterWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Camera Models Scroll Section (Under Shutter)
  cameraModelsSection: {
    marginTop: 2,
  },
  cameraModelSectionTitle: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  cameraModelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2A2436',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  cameraModelCardActive: {
    backgroundColor: '#372E47',
    borderColor: Colors.yellow,
  },
  cameraIconBox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraModelName: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '700',
  },
  cameraModelNameActive: {
    color: '#FFFDF6',
    fontWeight: '900',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.yellow,
  },

  // Modal Sheets
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContentSheet: {
    backgroundColor: '#1F1A2A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitleText: {
    fontFamily: Fonts.mono,
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFDF6',
    letterSpacing: 1,
    marginBottom: 16,
  },
  sectionSubTitle: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
  },
  modeOptionRow: {
    gap: 8,
  },
  modeOptionBtn: {
    backgroundColor: '#2A2436',
    padding: 12,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modeOptionBtnActive: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellowDark,
  },
  modeOptionText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    fontWeight: '700',
  },
  modeOptionTextActive: {
    color: Colors.yellowDark,
    fontWeight: '900',
  },
  bloomToggleBtn: {
    backgroundColor: '#2A2436',
    padding: 12,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  bloomToggleBtnActive: {
    backgroundColor: Colors.lavender,
    borderColor: Colors.lavenderDark,
  },
  bloomToggleText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    fontWeight: '700',
  },
  bloomToggleTextActive: {
    color: '#FFFDF6',
    fontWeight: '900',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#2A2436',
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    fontWeight: '700',
  },
});
