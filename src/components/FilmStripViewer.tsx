import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { FilmPhoto, FilmStatus } from '@/utils/filmData';

interface FilmStripViewerProps {
  photos: FilmPhoto[];
  status: FilmStatus;
}

export const FilmStripViewer: React.FC<FilmStripViewerProps> = ({ photos, status }) => {
  const router = useRouter();

  const handlePhotoPress = (photo: FilmPhoto) => {
    if (!photo.isExposed || status !== 'completed') {
      router.push({
        pathname: '/photo/[id]',
        params: { id: 'locked-frame-demo' },
      });
      return;
    }

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
    <View style={styles.viewerContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stripScrollContent}
      >
        <View style={styles.filmBody}>
          {/* Upper Sprocket Holes */}
          <View style={styles.sprocketRow}>
            {photos.map((_, i) => (
              <View key={`top-sp-${i}`} style={styles.sprocketGroup}>
                <View style={styles.sprocketHole} />
                <View style={styles.sprocketHole} />
              </View>
            ))}
          </View>

          {/* Frames Row */}
          <View style={styles.framesRow}>
            {photos.map((photo) => {
              const isOpen = status === 'completed' && photo.isExposed;
              return (
                <TouchableOpacity
                  key={photo.id}
                  activeOpacity={0.85}
                  accessibilityLabel={`Kare ${photo.code}`}
                  onPress={() => handlePhotoPress(photo)}
                  style={styles.frameBox}
                >
                  {isOpen ? (
                    <View style={[styles.visualFill, { backgroundColor: photo.bgColors[0] }]}>
                      <View style={[styles.visualAccentCircle, { backgroundColor: photo.bgColors[1] }]} />
                      <PozIcon name={photo.iconName} size={28} color="#FFFDF6" />
                    </View>
                  ) : (
                    <View style={styles.closedFill}>
                      <PozIcon name="lock" size={18} color="rgba(255, 255, 255, 0.4)" />
                      <Text style={styles.closedCode}>{photo.code}</Text>
                    </View>
                  )}
                  <Text style={styles.frameNumLabel}>{photo.code}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Lower Sprocket Holes */}
          <View style={styles.sprocketRow}>
            {photos.map((_, i) => (
              <View key={`bot-sp-${i}`} style={styles.sprocketGroup}>
                <View style={styles.sprocketHole} />
                <View style={styles.sprocketHole} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewerContainer: {
    marginVertical: 8,
  },
  stripScrollContent: {
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  filmBody: {
    backgroundColor: '#111017',
    borderRadius: BorderRadius.md,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  sprocketRow: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  sprocketGroup: {
    flexDirection: 'row',
    gap: 8,
    width: 105,
    justifyContent: 'space-between',
  },
  sprocketHole: {
    width: 7,
    height: 4.5,
    backgroundColor: 'rgba(250, 246, 238, 0.85)',
    borderRadius: 1,
  },
  framesRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 4,
  },
  frameBox: {
    width: 105,
    height: 110,
    backgroundColor: '#1E1B26',
    borderRadius: 4,
    padding: 4,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  visualFill: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  visualAccentCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    top: -10,
    right: -10,
    opacity: 0.6,
  },
  closedFill: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#16141D',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  closedCode: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  frameNumLabel: {
    position: 'absolute',
    bottom: 4,
    left: 6,
    fontFamily: Fonts.mono,
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFDF6',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 4,
    borderRadius: 2,
  },
});
