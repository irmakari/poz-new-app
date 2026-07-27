import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { FilmPhoto, FilmStatus } from '@/utils/filmData';

interface ContactSheetProps {
  photos: FilmPhoto[];
  status: FilmStatus;
}

export const ContactSheet: React.FC<ContactSheetProps> = ({ photos, status }) => {
  const router = useRouter();

  const handlePhotoPress = (photo: FilmPhoto) => {
    if (!photo.isExposed || status !== 'completed') {
      router.push({
        pathname: '/photo/[id]',
        params: { id: 'locked-frame-demo' },
      });
      return;
    }

    // Map photo frame numbers to mock photo IDs
    const photoIdMap: Record<number, string> = {
      12: 'summer-glow-13',
      13: 'summer-glow-13',
      8: 'summer-glow-08',
      7: 'summer-glow-08',
      10: 'golden-hour-21',
      4: 'midnight-04',
    };

    const targetId = photoIdMap[photo.frameNumber] || photo.id || 'summer-glow-13';

    router.push({
      pathname: '/photo/[id]',
      params: { id: targetId },
    });
  };

  return (
    <View style={styles.sheetContainer}>
      {/* Dark Negative Contact Sheet Paper Background */}
      <View style={styles.headerInfoRow}>
        <Text style={styles.sheetHeaderLabel}>CONTACT SHEET • 35MM</Text>
        <Text style={styles.sheetHeaderLabel}>LAB NO. 0726</Text>
      </View>

      {/* 3-Column Grid */}
      <View style={styles.gridRow}>
        {photos.map((photo) => {
          const isOpen = status === 'completed' && photo.isExposed;
          return (
            <TouchableOpacity
              key={photo.id}
              activeOpacity={0.85}
              accessibilityLabel={`Kare ${photo.code}`}
              onPress={() => handlePhotoPress(photo)}
              style={styles.photoCell}
            >
              {/* Photo Frame Box */}
              <View style={[styles.photoFrame, !isOpen && styles.closedFrame]}>
                {isOpen ? (
                  <View style={[styles.photoVisual, { backgroundColor: photo.bgColors[0] }]}>
                    <View style={[styles.visualAccent, { backgroundColor: photo.bgColors[1] }]} />
                    <PozIcon name={photo.iconName} size={22} color="#FFFDF6" />
                  </View>
                ) : (
                  <View style={styles.closedVisual}>
                    <PozIcon name="lock" size={16} color="rgba(255, 255, 255, 0.4)" />
                    <Text style={styles.closedText}>açılmadı</Text>
                  </View>
                )}
              </View>

              {/* Negative Frame Code */}
              <Text style={styles.frameCodeText}>{photo.code}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: '#16141D',
    borderRadius: BorderRadius.md,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  headerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sheetHeaderLabel: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 1,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
  },
  photoCell: {
    width: '31.5%',
    alignItems: 'center',
    marginBottom: 6,
  },
  photoFrame: {
    width: '100%',
    height: 84,
    backgroundColor: '#FFFDF9',
    borderRadius: 4,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  closedFrame: {
    backgroundColor: '#201C2B',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  photoVisual: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  visualAccent: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    top: -10,
    right: -10,
    opacity: 0.6,
  },
  closedVisual: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#16141D',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  closedText: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  frameCodeText: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    fontWeight: '800',
    color: Colors.lavender,
    marginTop: 3,
    letterSpacing: 0.5,
  },
});
