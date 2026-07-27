import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';

export const NewFilmCard: React.FC = () => {
  const router = useRouter();

  const handleCreateFilm = () => {
    router.push('/film/new');
  };

  return (
    <ScrapbookCard
      bgColor="#FFFDF9"
      rotation="-1deg"
      hasTape="top-center"
      tapeColor={Colors.tapeLavender}
      hasTornEdge="bottom"
      padding={Spacing.lg}
      style={styles.containerCard}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.titleText}>yeni bir film başlat</Text>
          <Text style={styles.subtitleText}>
            yeni bir ay, gezi veya özel an için ayrı bir rulo oluştur.
          </Text>
        </View>

        <PaperStamp label="UNOPENED" color={Colors.stampRed} rotation="4deg" />
      </View>

      {/* Unopened Roll Package Illustration Box */}
      <View style={styles.packageBox}>
        <TapeDecoration position="top-right" width={32} height={10} color={Colors.tapeDefault} />
        
        <View style={styles.packageInnerRow}>
          <View style={styles.filmRollIconCircle}>
            <PozIcon name="films" size={26} color={Colors.lavenderDark} />
          </View>
          <View style={styles.packageInfo}>
            <Text style={styles.packageTitle}>POZ 35MM ROLL</Text>
            <Text style={styles.packageMeta}>36 EXPOSURES • FRESH EMULSION</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.88}
        accessibilityLabel="yeni film oluştur"
        onPress={handleCreateFilm}
        style={styles.createButton}
      >
        <Text style={styles.createButtonText}>yeni film oluştur</Text>
        <PozIcon name="arrow-right" size={18} color="#FFFDF6" />
      </TouchableOpacity>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    marginVertical: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  titleGroup: {
    flex: 1,
    paddingRight: 8,
  },
  titleText: {
    fontSize: 22,
    fontFamily: Fonts.serif,
    color: Colors.text,
    fontWeight: '800',
  },
  subtitleText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  packageBox: {
    backgroundColor: 'rgba(28, 26, 36, 0.03)',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    position: 'relative',
  },
  packageInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filmRollIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  packageInfo: {
    flex: 1,
  },
  packageTitle: {
    fontSize: 13,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    color: Colors.text,
  },
  packageMeta: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 52,
    borderRadius: BorderRadius.md,
    gap: 8,
    marginTop: 4,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    fontSize: 15,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF6',
  },
});
