import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { TapeDecoration } from '@/components/TapeDecoration';
import { MockAnalogScene } from '@/components/MockAnalogScene';
import { PhotoEntry } from '@/utils/photoDetailData';

interface PhotoFrontProps {
  photo: PhotoEntry;
  cardWidth: number;
}

const formatAnalogDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const parts = dateStr.toLowerCase().split(' ');
  if (parts.length >= 3) {
    const day = String(parseInt(parts[0], 10)).padStart(2, '0');
    const monthName = parts[1];
    const year = parts[2].slice(-2);
    const months = ['ocak', 'şubat', 'mart', 'nisan', 'mayıs', 'haziran', 'temmuz', 'ağustos', 'eylül', 'ekim', 'kasım', 'aralık'];
    const mIdx = months.indexOf(monthName) + 1;
    const month = mIdx > 0 ? String(mIdx).padStart(2, '0') : '07';
    return `${day} ${month} '${year}`;
  }
  return dateStr;
};

export const PhotoFront: React.FC<PhotoFrontProps> = ({ photo, cardWidth }) => {
  // Use standard 3:4 portrait aspect ratios to match captured photo size
  const cardHeight = Math.round(cardWidth * 1.5);
  const visualHeight = Math.round(cardWidth * 1.2);

  const analogDate = formatAnalogDate(photo.date);

  return (
    <View style={[styles.polaroidFront, { width: cardWidth, height: cardHeight }]}>
      <TapeDecoration position="top-right" width={42} height={13} color={Colors.tapeDefault} />

      {/* Main Photo Container with filter & grain layers */}
      <View style={[styles.sceneContainer, { height: visualHeight }]}>
        {photo.photoUri ? (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: photo.photoUri }} style={styles.realPhoto} resizeMode="cover" />

            {/* Warm Analog Amber Tint Overlay */}
            <View style={styles.amberOverlay} pointerEvents="none" />

            {/* Subtle light leak on the right edge */}
            <View style={styles.lightLeak} pointerEvents="none" />

            {/* Grain texture dots */}
            <View style={styles.grainLayer} pointerEvents="none">
              {Array.from({ length: 12 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.grainDot,
                    {
                      top: `${(i * 29) % 90}%`,
                      left: `${(i * 17) % 94}%`,
                      opacity: 0.12 + (i % 3) * 0.06,
                    },
                  ]}
                />
              ))}
            </View>

            {/* Orange-Amber digital stamp burned in the photo */}
            {analogDate ? (
              <View style={styles.amberStampBox}>
                <Text style={styles.dateStampTextAmber}>{analogDate}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <MockAnalogScene sceneType={(photo.sceneType as any) || 'sunset-seaside'} bgColors={photo.bgColors} />
        )}
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
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  realPhoto: {
    width: '100%',
    height: '100%',
  },
  amberOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(242, 133, 0, 0.06)', // warm chemical film filter
  },
  lightLeak: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0,
    width: '25%',
    backgroundColor: 'rgba(255, 60, 0, 0.08)', // subtle analog light leak
  },
  grainLayer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  grainDot: {
    position: 'absolute',
    width: 2, height: 2,
    borderRadius: 1,
    backgroundColor: '#FFF',
  },
  amberStampBox: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  dateStampTextAmber: {
    fontSize: 13,
    fontFamily: Fonts.mono,
    color: '#FF6F00', // Classic amber orange light emission color
    fontWeight: '800',
    letterSpacing: 0.5,
    textShadowColor: '#FF3D00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
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
    fontSize: 14,
    fontFamily: Fonts.sansBold,
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
  realPhotoStyle: {
    width: '100%',
    height: '100%',
  },
});
