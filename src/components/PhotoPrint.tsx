import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts } from '@/constants/theme';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';
import { PhotoDetailItem } from '@/utils/dayData';

interface PhotoPrintProps {
  item: any;
}

export const PhotoPrint: React.FC<PhotoPrintProps> = ({ item }) => {
  const router = useRouter();

  const handlePhotoPress = () => {
    const targetId = item.id || 'summer-glow-13';

    router.push({
      pathname: '/photo/[id]',
      params: { id: targetId },
    });
  };

  const itemCode = item.code || item.frameCode || 'PRINT';
  const itemDate = item.dateStr || item.date || '27 temmuz';
  const itemRotation = item.rotation || '-1.5deg';

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      accessibilityLabel={`Fotoğraf karesi ${itemCode}`}
      onPress={handlePhotoPress}
      style={[
        styles.photoFrameContainer,
        { transform: [{ rotate: itemRotation }] },
      ]}
    >
      <TapeDecoration position="top-right" width={38} height={12} color={Colors.tapeDefault} />

      {/* Mock Visual Area */}
      <View style={[styles.visualArea, { backgroundColor: item.bgGradient?.[0] || '#FFF1B0' }]}>
        <View style={[styles.visualAccentCircle, { backgroundColor: item.bgGradient?.[1] || '#FFD7EC' }]} />
        <PozIcon name={item.iconName || 'photo'} size={36} color="#FFFDF6" />

        <View style={styles.filmBadge}>
          <Text style={styles.filmBadgeText}>{item.captureMode === 'daily' ? 'DAILY' : '35MM'}</Text>
        </View>
      </View>

      {/* White Frame Bottom Label */}
      <View style={styles.frameLabelRow}>
        <Text style={styles.codeText}>{itemCode}</Text>
        <Text style={styles.dateText}>{itemDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  photoFrameContainer: {
    width: 155,
    backgroundColor: '#FFFDF9',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  visualArea: {
    width: '100%',
    height: 125,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  visualAccentCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    top: -20,
    right: -20,
    opacity: 0.7,
  },
  filmBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(24, 21, 32, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  filmBadgeText: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFDF6',
    letterSpacing: 0.5,
  },
  frameLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  codeText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
    color: Colors.text,
  },
  dateText: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    color: Colors.textSecondary,
  },
});
