import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';

interface BackupEnvelopeProps {
  onOpenExportModal: () => void;
}

export const BackupEnvelope: React.FC<BackupEnvelopeProps> = ({ onOpenExportModal }) => {
  const handleBackup = () => {
    Alert.alert(
      'Anılarını Yedekle',
      'Bulut yedekleme özelliği yakında eklenecek.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="anılarını sakla" stamp="VAULT COPY" />

      <ScrapbookCard
        bgColor={Colors.lavender}
        rotation="1.2deg"
        hasTape="top-right"
        tapeColor={Colors.tapeDefault}
        padding={Spacing.md}
        style={styles.card}
      >
        {/* Header Stamp & Serial */}
        <View style={styles.headerRow}>
          <PaperStamp label="ARCHIVE COPY" color={Colors.lavenderDark} rotation="-2deg" />
          <Text style={styles.serialText}>POZ-BACKUP-0726</Text>
        </View>

        <Text style={styles.titleText}>tüm anılarını tek bir güvenli kopyada sakla</Text>
        <Text style={styles.subtitleText}>
          fotoğraflarını, notlarını ve filmlerini kaybetmeden dışa aktar.
        </Text>

        {/* Buttons Row */}
        <View style={styles.buttonsColumn}>
          <TouchableOpacity
            activeOpacity={0.88}
            accessibilityLabel="anılarını yedekle"
            onPress={handleBackup}
            style={styles.primaryButton}
          >
            <PozIcon name="films" size={16} color="#FFFDF9" />
            <Text style={styles.primaryButtonText}>anılarını yedekle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            accessibilityLabel="albüm olarak dışa aktar"
            onPress={onOpenExportModal}
            style={styles.secondaryButton}
          >
            <PozIcon name="photo" size={16} color={Colors.text} />
            <Text style={styles.secondaryButtonText}>albüm olarak dışa aktar</Text>
          </TouchableOpacity>
        </View>
      </ScrapbookCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  card: {
    marginTop: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  serialText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.lavenderDark,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  titleText: {
    fontSize: 16,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 4,
  },
  subtitleText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: Spacing.md,
  },
  buttonsColumn: {
    gap: 8,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181520',
    height: 48,
    borderRadius: BorderRadius.md,
    gap: 8,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDF9',
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 13,
    fontFamily: Fonts.sansSemiBold,
    color: Colors.text,
  },
});
