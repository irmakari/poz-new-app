import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';

interface CaptureReviewHeaderProps {
  title?: string;
}

export const CaptureReviewHeader: React.FC<CaptureReviewHeaderProps> = ({ title = 'kareyi tamamla' }) => {
  const router = useRouter();

  const handleInfoPress = () => {
    Alert.alert(
      'Kare Bilgisi',
      'Detayları doldurup aşağıdaki butona basarak kaydedebilirsin.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

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

      <TouchableOpacity
        activeOpacity={0.8}
        accessibilityLabel="bilgi"
        onPress={handleInfoPress}
        style={styles.circleButton}
      >
        <PozIcon name="sparkle" size={18} color={Colors.text} />
      </TouchableOpacity>
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
    backgroundColor: '#FFFDF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  backArrowText: {
    fontSize: 24,
    lineHeight: 26,
    color: Colors.text,
    fontFamily: Fonts.sansBold,
    marginTop: -2,
  },
  headerTitleText: {
    fontSize: 16,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
  },
});
