import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

interface FilmProgressProps {
  currentFrames: number;
  totalFrames: number;
}

export const FilmProgress: React.FC<FilmProgressProps> = ({
  currentFrames = 12,
  totalFrames = 36,
}) => {
  const percentage = Math.min(Math.max(currentFrames / totalFrames, 0), 1) * 100;

  const renderSprockets = () => (
    <View style={styles.sprocketRow}>
      {Array.from({ length: 11 }).map((_, index) => (
        <View key={index} style={styles.sprocketHole} />
      ))}
    </View>
  );

  return (
    <View style={styles.outerStripContainer}>
      {/* Film Strip Body (Physical 35mm film strip effect) */}
      <View style={styles.filmStripBody}>
        {/* Upper Perforations */}
        {renderSprockets()}

        {/* Film Negative Frame Area */}
        <View style={styles.framesArea}>
          {/* Progress fill (Amber/Gold film emulsion look) */}
          <View style={[styles.progressEmulsion, { width: `${percentage}%` }]} />

          {/* Individual 35mm Negative Frame Divider Lines & Exposure Codes */}
          <View style={styles.negativeFramesOverlay}>
            <View style={styles.frameBox}>
              <Text style={styles.expCodeText}>01</Text>
            </View>
            <View style={styles.frameBox}>
              <Text style={styles.expCodeText}>02A</Text>
            </View>
            <View style={styles.frameBox}>
              <Text style={styles.expCodeText}>12A</Text>
            </View>
            <View style={styles.frameBox}>
              <Text style={styles.expCodeText}>24</Text>
            </View>
            <View style={styles.frameBox}>
              <Text style={styles.expCodeText}>36</Text>
            </View>
          </View>
        </View>

        {/* Lower Perforations */}
        {renderSprockets()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerStripContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  filmStripBody: {
    flex: 1,
    backgroundColor: '#111017', // Pitch black film base
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  sprocketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginVertical: 2,
  },
  sprocketHole: {
    width: 7,
    height: 4.5,
    backgroundColor: 'rgba(250, 246, 238, 0.85)', // Light cut-through hole
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
  framesArea: {
    height: 24,
    backgroundColor: '#1E1B26',
    borderRadius: 3,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    marginVertical: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  progressEmulsion: {
    height: '100%',
    backgroundColor: Colors.yellow,
    borderRadius: 2,
    opacity: 0.85,
  },
  negativeFramesOverlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  frameBox: {
    borderRightWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    paddingRight: 4,
    height: '100%',
    justifyContent: 'center',
  },
  expCodeText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
    color: '#FAF6EE',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  filmTailNotch: {
    width: 14,
    height: 22,
    backgroundColor: '#111017',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: -1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
