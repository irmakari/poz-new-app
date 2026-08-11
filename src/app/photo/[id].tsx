import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PhotoDetailHeader } from '@/components/PhotoDetailHeader';
import { PhotoDateHeader } from '@/components/PhotoDateHeader';
import { FlippablePhotoPrint } from '@/components/FlippablePhotoPrint';
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
  const [isEditSheetVisible, setIsEditSheetVisible] = useState(false);

  const { photos, deletePhotoFrame, updatePhotoFrame } = useApp();

  const photo = photos.find((p) => p.id === id) || photos[0];

  const [editNote, setEditNote] = useState(photo?.note || '');
  const [editLocation, setEditLocation] = useState(photo?.location || '');
  const [editMood, setEditMood] = useState(photo?.mood || 'sakin');

  const handleOpenEdit = () => {
    setEditNote(photo?.note || '');
    setEditLocation(photo?.location || '');
    setEditMood(photo?.mood || 'sakin');
    setIsEditSheetVisible(true);
  };

  const handleSaveEdits = async () => {
    if (photo) {
      await updatePhotoFrame(photo.id, {
        note: editNote,
        location: editLocation,
        mood: editMood,
      });
    }
    setIsEditSheetVisible(false);
  };

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

        {/* Edit / Share / Delete Action Area */}
        <PhotoActionArea onEdit={handleOpenEdit} onDelete={handleDeletePhoto} />

        {/* Full Journal Note Reader Modal */}
        <FullNoteModal
          visible={isFullNoteModalVisible}
          onClose={() => setIsFullNoteModalVisible(false)}
          note={photo.note}
          dateStr={photo.date}
        />
      </ScrollView>

      {/* Edit Frame Bottom Sheet Modal */}
      <Modal
        visible={isEditSheetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditSheetVisible(false)}
      >
        <TouchableOpacity
          style={styles.sheetOverlay}
          activeOpacity={1}
          onPress={() => setIsEditSheetVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ width: '100%' }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={styles.bottomSheetCard}
            >
              <View style={styles.sheetHandle} />

              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitleText}>kareyi düzenle</Text>
                <TouchableOpacity onPress={() => setIsEditSheetVisible(false)} style={{ padding: 4 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.ink }}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 380 }} keyboardShouldPersistTaps="handled">
                <Text style={styles.inputLabelText}>KARE NOTU</Text>
                <TextInput
                  style={styles.sheetTextInput}
                  multiline={true}
                  placeholder="Bu kareye bir not ekle..."
                  placeholderTextColor={Colors.textMuted}
                  value={editNote}
                  onChangeText={setEditNote}
                />

                <Text style={[styles.inputLabelText, { marginTop: 12 }]}>KONUM</Text>
                <TextInput
                  style={styles.sheetSingleInput}
                  placeholder="Örn: Kadıköy, Ev, Moda..."
                  placeholderTextColor={Colors.textMuted}
                  value={editLocation}
                  onChangeText={setEditLocation}
                />

                <Text style={[styles.inputLabelText, { marginTop: 12, marginBottom: 6 }]}>HİS HALE / MOOD</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {['huzurlu', 'mutlu', 'sakin', 'taze', 'yorgun', 'özlemli', 'coşkulu'].map((m) => (
                    <TouchableOpacity
                      key={m}
                      activeOpacity={0.8}
                      onPress={() => setEditMood(m)}
                      style={{
                        backgroundColor: editMood === m ? Colors.olive : Colors.paper,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: BorderRadius.md,
                        borderWidth: 1,
                        borderColor: Colors.border,
                      }}
                    >
                      <Text style={{
                        fontFamily: Fonts.sansBold,
                        fontSize: 12,
                        color: editMood === m ? '#F4ECE2' : Colors.ink
                      }}>
                        {m}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <View style={styles.sheetActionRow}>
                <TouchableOpacity style={styles.sheetCancelBtn} onPress={() => setIsEditSheetVisible(false)}>
                  <Text style={styles.sheetCancelText}>Vazgeç</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sheetSaveBtn} onPress={handleSaveEdits}>
                  <Text style={styles.sheetSaveText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
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
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheetCard: {
    backgroundColor: '#F7F2EA',
    borderTopLeftRadius: BorderRadius.xl || 20,
    borderTopRightRadius: BorderRadius.xl || 20,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(28, 26, 36, 0.2)',
    alignSelf: 'center',
    marginBottom: Spacing.sm,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sheetTitleText: {
    fontSize: 18,
    fontFamily: Fonts.sansBlack,
    color: Colors.ink,
  },
  inputLabelText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  sheetTextInput: {
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 75,
    textAlignVertical: 'top',
    fontSize: 14,
    fontFamily: Fonts.sans,
    color: Colors.ink,
  },
  sheetSingleInput: {
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 14,
    fontFamily: Fonts.sans,
    color: Colors.ink,
  },
  sheetActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: Spacing.md,
  },
  sheetCancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(28, 26, 36, 0.06)',
  },
  sheetCancelText: {
    color: Colors.textSecondary,
    fontFamily: Fonts.sansBold,
    fontSize: 13,
  },
  sheetSaveBtn: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.burgundy,
  },
  sheetSaveText: {
    color: '#F4ECE2',
    fontFamily: Fonts.sansBold,
    fontSize: 13,
  },
});
