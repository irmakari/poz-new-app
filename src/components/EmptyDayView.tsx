import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';

interface EmptyDayViewProps {
  dateString: string;
}

export const EmptyDayView: React.FC<EmptyDayViewProps> = ({ dateString }) => {
  const handleAddMemory = () => {
    Alert.alert(
      'Anı Ekle',
      'Anı ekleme özelliği yakında eklenecek.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrapbookCard
        bgColor="#FFFDF9"
        rotation="-1.5deg"
        hasTape="top-center"
        tapeColor={Colors.tapeDefault}
        padding={Spacing.xl}
        style={styles.emptyCard}
      >
        {/* Blank Photo Print Mock */}
        <View style={styles.blankPhotoFrame}>
          <TapeDecoration position="top-right" width={32} height={10} color={Colors.tapePink} />
          <View style={styles.blankInnerVisual}>
            <PozIcon name="films" size={34} color={Colors.textMuted} />
          </View>
          <Text style={styles.blankCaptionText}>UNEXPOSED FRAME</Text>
        </View>

        <View style={styles.textGroup}>
          <Text style={styles.emptyTitle}>bu gün henüz boş</Text>
          <Text style={styles.emptyDescription}>
            bu tarihe bir fotoğraf, not veya şarkı eklemedin.
          </Text>
        </View>

        <PaperStamp label="NO ENTRY" color={Colors.textMuted} rotation="3deg" />

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleAddMemory}
          style={styles.addMemoryButton}
        >
          <Text style={styles.addMemoryButtonText}>anı ekle</Text>
          <PozIcon name="arrow-right" size={16} color="#FFFDF9" />
        </TouchableOpacity>
      </ScrapbookCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
    alignItems: 'center',
  },
  emptyCard: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  blankPhotoFrame: {
    width: 140,
    height: 140,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  blankInnerVisual: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(28, 26, 36, 0.05)',
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
    borderStyle: 'dashed',
  },
  blankCaptionText: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  textGroup: {
    alignItems: 'center',
    gap: 4,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: Fonts.serif,
    color: Colors.text,
    fontWeight: '800',
  },
  emptyDescription: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  addMemoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 48,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.md,
    gap: 8,
    marginTop: 6,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  addMemoryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
});
