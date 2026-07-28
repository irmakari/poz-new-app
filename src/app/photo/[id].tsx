import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PhotoDetailHeader } from '@/components/PhotoDetailHeader';
import { PhotoDateHeader } from '@/components/PhotoDateHeader';
import { FlippablePhotoPrint } from '@/components/FlippablePhotoPrint';
import { PhotoMetadataTickets } from '@/components/PhotoMetadataTickets';
import { PhotoSongLabel } from '@/components/PhotoSongLabel';
import { PhotoFilmLink } from '@/components/PhotoFilmLink';
import { PhotoActionArea } from '@/components/PhotoActionArea';
import { FullNoteModal } from '@/components/FullNoteModal';
import { LockedPhotoCard } from '@/components/LockedPhotoCard';
import { PozIcon } from '@/components/PozIcon';
import { getPhotoById } from '@/utils/photoDetailData';

import { useApp } from '@/context/AppContext';

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isFullNoteModalVisible, setIsFullNoteModalVisible] = useState(false);

  const { photos, deletePhotoFrame } = useApp();

  const photo = photos.find((p) => p.id === id) || photos[0];

  const handleDeletePhoto = async () => {
    if (photo) {
      await deletePhotoFrame(photo.id);
      router.back();
    }
  };

  // Invalid Photo State
  if (!photo) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.invalidContainer}>
          <PozIcon name="photo" size={48} color={Colors.textMuted} />
          <Text style={styles.invalidTitleText}>bu kareyi bulamadık</Text>
          <Text style={styles.invalidDescText}>
            film arşivine dönüp başka bir kare seçebilirsin.
          </Text>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(tabs)/films')}
            style={styles.returnFilmsButton}
          >
            <Text style={styles.returnFilmsText}>filmlere dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Locked/Developing Photo State
  if (photo.status === 'locked') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <PhotoDetailHeader />
          <LockedPhotoCard photo={photo} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Normal Developed Photo State
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <PhotoDetailHeader />

        {/* Photo Date & Stamp Header */}
        <PhotoDateHeader photo={photo} />

        {/* Main 3D Flippable Analog Photo Print */}
        <FlippablePhotoPrint
          photo={photo}
          onOpenFullNote={() => setIsFullNoteModalVisible(true)}
        />

        {/* Quick Info Tags */}
        <PhotoMetadataTickets photo={photo} />

        {/* Cassette Tape Song Label */}
        {photo.song && <PhotoSongLabel song={photo.song} />}

        {/* Film Details Link Card or Day Link */}
        {photo.captureMode === 'daily' ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push({ pathname: '/day/[date]', params: { date: '2026-07-27' } })}
            style={{
              backgroundColor: '#FFFDF9',
              padding: 14,
              borderRadius: BorderRadius.md,
              borderWidth: 1,
              borderColor: Colors.border,
              marginVertical: Spacing.sm,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <PozIcon name="calendar" size={18} color={Colors.yellowDark} />
              <View>
                <Text style={{ fontSize: 13, fontFamily: Fonts.sansExtraBold, color: Colors.text }}>
                  GÜNLÜK BASKI • ANILARA GİT
                </Text>
                <Text style={{ fontSize: 11, fontFamily: Fonts.mono, color: Colors.textSecondary }}>
                  {photo.date} • {photo.time || '14:20'}
                </Text>
              </View>
            </View>
            <PozIcon name="arrow-right" size={16} color={Colors.text} />
          </TouchableOpacity>
        ) : (
          <PhotoFilmLink filmTitle={photo.filmTitle || 'summer glow'} filmId={photo.filmId || 'summer-glow-july-2026'} />
        )}

        {/* Edit / Share / Delete Action Area */}
        <PhotoActionArea onDelete={handleDeletePhoto} />

        {/* Full Journal Note Reader Modal */}
        <FullNoteModal
          visible={isFullNoteModalVisible}
          onClose={() => setIsFullNoteModalVisible(false)}
          note={photo.note}
          dateStr={photo.date}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl + 20,
  },
  invalidContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  invalidTitleText: {
    fontSize: 22,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
  },
  invalidDescText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  returnFilmsButton: {
    backgroundColor: '#181520',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
  },
  returnFilmsText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
});
