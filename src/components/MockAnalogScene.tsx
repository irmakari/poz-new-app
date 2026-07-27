import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { SceneType } from '@/utils/photoDetailData';

interface MockAnalogSceneProps {
  sceneType: SceneType;
  bgColors?: [string, string];
}

export const MockAnalogScene: React.FC<MockAnalogSceneProps> = ({
  sceneType = 'sunset-seaside',
  bgColors = ['#E3D7FF', '#CBEBFC'],
}) => {
  if (sceneType === 'coffee-table') {
    return (
      <View style={[styles.sceneCanvas, { backgroundColor: '#FCE7C8' }]}>
        <View style={styles.woodTableBase} />
        <View style={styles.bookCorner} />
        <View style={styles.coffeeCupCircle}>
          <View style={styles.coffeeLiquid} />
        </View>
        <PozIcon name="sparkle" size={24} color="#FFFDF6" />
      </View>
    );
  }

  if (sceneType === 'city-street') {
    return (
      <View style={[styles.sceneCanvas, { backgroundColor: '#FEEBC8' }]}>
        <View style={styles.cityBuilding1} />
        <View style={styles.cityBuilding2} />
        <View style={styles.streetLightGlow} />
        <PozIcon name="sun" size={28} color="#FFFDF6" />
      </View>
    );
  }

  if (sceneType === 'midnight-lights') {
    return (
      <View style={[styles.sceneCanvas, { backgroundColor: '#231F33' }]}>
        <View style={styles.nightLightOrb1} />
        <View style={styles.nightLightOrb2} />
        <PozIcon name="star" size={32} color={Colors.yellow} />
      </View>
    );
  }

  // Default: Sunset Seaside
  return (
    <View style={[styles.sceneCanvas, { backgroundColor: bgColors[0] || '#FFD7EC' }]}>
      {/* Sky Warm Peach Upper Layer */}
      <View style={styles.skyUpperLayer} />

      {/* Sun Orb Disc */}
      <View style={styles.sunDisc} />

      {/* Sea Layer */}
      <View style={[styles.seaLayer, { backgroundColor: bgColors[1] || '#4A6FA5' }]}>
        <View style={styles.waveLine1} />
        <View style={styles.waveLine2} />
      </View>

      {/* Shore Silhouette */}
      <View style={styles.shoreSilhouette} />

      <View style={styles.centerIconWrap}>
        <PozIcon name="photo" size={26} color="#FFFDF6" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sceneCanvas: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skyUpperLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#FFD1DC',
    opacity: 0.65,
  },
  sunDisc: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF1B0',
    top: '25%',
    shadowColor: '#FFF1B0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 16,
    elevation: 4,
  },
  seaLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '45%',
    justifyContent: 'center',
  },
  waveLine1: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  waveLine2: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 40,
  },
  shoreSilhouette: {
    position: 'absolute',
    bottom: -10,
    right: -20,
    width: 120,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#181520',
    opacity: 0.85,
  },
  centerIconWrap: {
    zIndex: 10,
  },
  woodTableBase: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#E2B887',
  },
  bookCorner: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 80,
    height: 100,
    backgroundColor: '#C6F6D5',
    borderRadius: 4,
    transform: [{ rotate: '-12deg' }],
  },
  coffeeCupCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFDF6',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  coffeeLiquid: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5C3A21',
  },
  cityBuilding1: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    width: 50,
    height: 140,
    backgroundColor: '#2D3748',
  },
  cityBuilding2: {
    position: 'absolute',
    bottom: 0,
    right: 30,
    width: 70,
    height: 110,
    backgroundColor: '#1A202C',
  },
  streetLightGlow: {
    position: 'absolute',
    top: 30,
    right: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF1B0',
    opacity: 0.5,
  },
  nightLightOrb1: {
    position: 'absolute',
    top: 20,
    left: 30,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#8F66E3',
    opacity: 0.4,
  },
  nightLightOrb2: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E54848',
    opacity: 0.3,
  },
});
