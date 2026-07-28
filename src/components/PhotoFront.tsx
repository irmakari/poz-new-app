import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { TapeDecoration } from '@/components/TapeDecoration';
import { MockAnalogScene } from '@/components/MockAnalogScene';
import { PhotoEntry } from '@/utils/photoDetailData';

interface PhotoFrontProps {
  photo: PhotoEntry;
  cardWidth: number;
}

export const PhotoFront: React.FC<PhotoFrontProps> = ({ photo, cardWidth }) => {
  const cardHeight = Math.round(cardWidth * 1.25);
  const visualHeight = Math.round(cardWidth * 0.9);

  return (
    <View style={[styles.polaroidFront, { width: cardWidth, height: cardHeight }]}>
      <TapeDecoration position="top-right" width={42} height={13} color={Colors.tapeDefault} />

      {/* Main Photo Scene Container */}
      <View style={[styles.sceneContainer, { height: visualHeight }]}>
        <MockAnalogScene sceneType={(photo.sceneType as any) || 'sunset-seaside'} bgColors={photo.bgColors} />
      </View>

      {/* Bottom Polaroid Margin Info */}
      <View style={styles.bottomMarginRow}>
        <View style={styles.frameInfoGroup}>
          <Text style={styles.frameTitleText}>
            {photo.captureMode === 'daily' ? 'GÜNLÜK BASKI' : `KARE #${photo.frameNumber || 1}`}
          </Text>
          <Text style={styles.dateStampText}>{photo.date}</Text>
        </View>

        <Text style={styles.serialCodeText}>{photo.serial}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  polaroidFront: {
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    padding: 12,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 6,
    justifyContent: 'space-between',
  },
  sceneContainer: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  bottomMarginRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 4,
  },
  frameInfoGroup: {
    gap: 1,
  },
  frameTitleText: {
    fontSize: 16,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
  },
  dateStampText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
  },
  serialCodeText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    fontWeight: '700',
  },
});
