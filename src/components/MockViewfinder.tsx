import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Animated } from 'react-native';
import { CameraView } from 'expo-camera';
import { Fonts, BorderRadius } from '@/constants/theme';
import { FocusFrame } from '@/components/FocusFrame';
import { GrainOverlay } from '@/components/GrainOverlay';
import { PozIcon } from '@/components/PozIcon';
import { getFormattedTodayStamp } from '@/utils/dateUtils';
import { FILTERS, FilterType } from '@/constants/filmFilters';

export type FlashState = 'auto' | 'on' | 'off';
export type CameraFacing = 'back' | 'front';
export type ViewfinderMode = 'compact' | 'cinematic' | 'expanded';

interface MockViewfinderProps {
  flashState: FlashState;
  facing: CameraFacing;
  flashAnimOpacity?: Animated.Value;
  cameraRef?: React.RefObject<CameraView | null>;
  isFocused?: boolean;
  viewfinderMode?: ViewfinderMode;
  isMirrored?: boolean;
  selectedFilter?: FilterType;
  isDreamyGlow?: boolean;
}

export const MockViewfinder: React.FC<MockViewfinderProps> = ({
  flashState,
  facing,
  flashAnimOpacity,
  cameraRef,
  isFocused = true,
  viewfinderMode = 'compact',
  isMirrored = false,
  selectedFilter = 'dazz-green',
  isDreamyGlow = true,
}) => {
  const { width } = useWindowDimensions();
  const currentFilterObj = FILTERS.find((f) => f.id === selectedFilter) || FILTERS[0];

  // 3 Frame Size Aspect Ratios:
  // 1. Compact (35mm wide): 1.4 ratio
  // 2. Cinematic (Ultra-wide, height even smaller): 1.85 ratio
  // 3. Expanded (Dazz portrait): 3:4 ratio
  const viewfinderWidth = Math.min(width - 32, 380);
  let viewfinderHeight = Math.round(viewfinderWidth / 1.4);
  if (viewfinderMode === 'expanded') {
    viewfinderHeight = Math.round(viewfinderWidth * 1.333);
  } else if (viewfinderMode === 'cinematic') {
    viewfinderHeight = Math.round(viewfinderWidth / 1.85);
  }

  const getFlashText = () => {
    if (flashState === 'auto') return '⚡ AUTO';
    if (flashState === 'on') return '⚡ AÇIK';
    return '⚡ KAPALI';
  };

  // Ön kamera için ayna varsayılanı true (gördüğün gibi kalsın, çektikten sonra dönmesin!)
  const isFrontFrontMirror = facing === 'front' ? !isMirrored : isMirrored;

  return (
    <View style={[styles.outerFrame, { width: viewfinderWidth, height: viewfinderHeight }]}>
      {/* Inner Screen Visual */}
      <View style={styles.screenContainer}>
        {/* Real CameraView when focused, otherwise mock dark background */}
        {isFocused ? (
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing={facing}
            flash={flashState}
            mirror={isFrontFrontMirror}
          />
        ) : (
          <View style={[styles.sceneBackground, isFrontFrontMirror && { transform: [{ scaleX: -1 }] }]}>
            {/* Sky Gradient Layer */}
            <View style={styles.skyUpper} />
            <View style={styles.skyLower} />

            {/* Sun Circle */}
            <View style={[styles.sunCircle, facing === 'front' && styles.frontSunCircle]} />

            {/* Sea / Coastline Horizon */}
            <View style={styles.seaHorizon}>
              <View style={styles.seaLightGlow} />
            </View>
          </View>
        )}

        {/* Live Selected Dazz Cam Color Filter Overlay over Viewfinder */}
        <View
          style={[styles.colorGradeOverlay, { backgroundColor: currentFilterObj.overlayColor }]}
          pointerEvents="none"
        />

        {/* Dreamy Bloom / Soft Digicam Glow Overlays */}
        {isDreamyGlow && (
          <>
            <View style={styles.dreamyBloomOverlay} pointerEvents="none" />
            <View style={styles.softFocusOverlay} pointerEvents="none" />
          </>
        )}

        {/* Focus Frame Reticle */}
        <View style={styles.reticleWrapper}>
          <FocusFrame />
        </View>

        {/* Analog Grain Texture Overlay */}
        <GrainOverlay />


        {/* Viewfinder Text Overlays */}
        <View style={styles.overlayTopRow}>
          <View style={styles.badgeLabel}>
            <Text style={styles.badgeText}>AUTO</Text>
          </View>

          <View style={styles.badgeLabel}>
            <Text style={styles.badgeText}>{getFlashText()}</Text>
          </View>
        </View>

        <View style={styles.overlayBottomRow}>
          <View style={styles.facingBadge}>
            <PozIcon name="camera" size={10} color="#FFFDF6" />
            <Text style={styles.facingText}>
              {facing === 'back' ? 'ARKA' : 'ÖN'}
            </Text>
          </View>

          {/* Bright Silver Camera Date Stamp with 5-Pointed Star Accent */}
          <Text style={styles.dateStampOverlay}>{getFormattedTodayStamp()} ★</Text>
        </View>

        {/* White Flash Effect Overlay on Shutter Press */}
        {flashAnimOpacity ? (
          <Animated.View
            pointerEvents="none"
            style={[styles.flashOverlay, { opacity: flashAnimOpacity }]}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerFrame: {
    alignSelf: 'center',
    backgroundColor: '#110E17',
    borderRadius: BorderRadius.md,
    padding: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    marginVertical: 10,
  },
  screenContainer: {
    flex: 1,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#1F1A2A',
    overflow: 'hidden',
    position: 'relative',
  },
  sceneBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  skyUpper: {
    height: '55%',
    backgroundColor: '#E3D7FF',
  },
  skyLower: {
    height: '25%',
    backgroundColor: '#FFD7EC',
  },
  sunCircle: {
    position: 'absolute',
    top: '30%',
    right: '25%',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF1B0',
    shadowColor: '#FFF1B0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  frontSunCircle: {
    left: '25%',
    backgroundColor: '#CBEBFC',
    shadowColor: '#CBEBFC',
  },
  seaHorizon: {
    height: '20%',
    backgroundColor: '#231F33',
    position: 'relative',
    justifyContent: 'center',
  },
  seaLightGlow: {
    height: 3,
    backgroundColor: '#CBEBFC',
    opacity: 0.6,
  },
  reticleWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayTopRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFDF6',
  },
  overlayBottomRow: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateStampOverlay: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
    color: '#E2E8F0',
    letterSpacing: 0.8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  facingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    gap: 4,
  },
  facingText: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFDF6',
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFDF6',
  },
  colorGradeOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  vignetteOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 16,
    borderRadius: BorderRadius.sm,
  },
  dreamyBloomOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 245, 225, 0.08)',
  },
  dreamyLightLeak: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(255, 235, 190, 0.15)',
    shadowColor: '#FFFDF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 28,
  },
  softFocusOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
});

