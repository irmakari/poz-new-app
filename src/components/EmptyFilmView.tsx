import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';

export const EmptyFilmView: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrapbookCard
        bgColor="#FFFDF9"
        rotation="-1.5deg"
        hasTape="top-center"
        tapeColor={Colors.tapeDefault}
        padding={Spacing.xl}
        style={styles.card}
      >
        <View style={styles.iconCircle}>
          <TapeDecoration position="top-right" width={32} height={10} color={Colors.tapePink} />
          <PozIcon name="films" size={34} color={Colors.textMuted} />
        </View>

        <Text style={styles.titleText}>bu filmi bulamadık</Text>
        <Text style={styles.descriptionText}>
          film arşivine dönüp başka bir rulo seçebilirsin.
        </Text>

        <PaperStamp label="NOT FOUND" color={Colors.textMuted} rotation="3deg" />

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>filmlere dön</Text>
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
  card: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(28, 26, 36, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    position: 'relative',
  },
  titleText: {
    fontSize: 22,
    fontFamily: Fonts.serif,
    color: Colors.text,
    fontWeight: '800',
  },
  descriptionText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  backButton: {
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
  backButtonText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
});
