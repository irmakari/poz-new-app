import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';

interface CaptureReviewHeaderProps {
  title?: string;
  onSave?: () => void;
  isSaving?: boolean;
}

export const CaptureReviewHeader: React.FC<CaptureReviewHeaderProps> = ({
  title = 'kareyi tamamla',
  onSave,
  isSaving = false,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        accessibilityLabel="kameraya geri dön"
        onPress={() => router.back()}
        style={styles.circleButton}
      >
        <Text style={styles.backArrowText}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.headerTitleText}>{title}</Text>

      {onSave ? (
        <TouchableOpacity
          activeOpacity={0.85}
          accessibilityLabel="kareyi kaydet"
          onPress={onSave}
          disabled={isSaving}
          style={styles.savePillButton}
        >
          <Text style={styles.savePillText}>{isSaving ? 'KAYDEDİLİYOR...' : 'KAYDET ✓'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    paddingHorizontal: 2,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F2EA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  backArrowText: {
    fontSize: 24,
    lineHeight: 26,
    color: Colors.ink,
    fontFamily: Fonts.sansBold,
    marginTop: -2,
  },
  headerTitleText: {
    fontSize: 16,
    fontFamily: Fonts.sansBlack,
    color: Colors.ink,
  },
  savePillButton: {
    backgroundColor: Colors.burgundy,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(244, 236, 226, 0.3)',
    shadowColor: Colors.burgundy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  savePillText: {
    fontSize: 12,
    fontFamily: Fonts.sansBlack,
    color: '#F4ECE2',
    letterSpacing: 0.5,
  },
});
