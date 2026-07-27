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

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isFullNoteModalVisible, setIsFullNoteModalVisible] = useState(false);

  const photo = getPhotoById(id);

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
        <PhotoSongLabel song={photo.song} />

        {/* Film Details Link Card */}
        <PhotoFilmLink filmTitle={photo.filmTitle} filmId={photo.filmId} />

        {/* Edit / Share / Delete Action Area */}
        <PhotoActionArea />

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
