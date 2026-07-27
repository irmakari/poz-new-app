import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';

interface FilmSummaryReceiptProps {
  displayName: string;
  typeName: string;
  iso: number;
  frameCount: number;
  purposeLabel: string;
  startDateStr: string;
  serialNumber: string;
}

export const FilmSummaryReceipt: React.FC<FilmSummaryReceiptProps> = ({
  displayName,
  typeName,
  iso,
  frameCount,
  purposeLabel,
  startDateStr,
  serialNumber,
}) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="film özeti" stamp="ORDER SUMMARY" />

      <ScrapbookCard
        bgColor="#FFFDF9"
        rotation="0.8deg"
        hasTape="top-left"
        tapeColor={Colors.tapeLavender}
        hasTornEdge="bottom"
        padding={Spacing.md}
        style={styles.card}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.receiptTitle}>FOTOĞRAF LABORATUVARI SİPARİŞİ</Text>
          <PaperStamp label="READY" color={Colors.textSecondary} rotation="-2deg" />
        </View>

        {/* 2-Column Summary Grid */}
        <View style={styles.specsGrid}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>FİLM ADI</Text>
            <Text style={styles.specValue}>{displayName}</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>FİLM TÜRÜ</Text>
            <Text style={styles.specValue}>{typeName}</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>ISO DEĞERİ</Text>
            <Text style={styles.specValue}>{iso}</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>POZ KARELERİ</Text>
            <Text style={styles.specValue}>{frameCount} KARE</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>KULLANIM AMACI</Text>
            <Text style={styles.specValue}>{purposeLabel}</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>BAŞLANGIÇ</Text>
            <Text style={styles.specValue}>{startDateStr}</Text>
          </View>

          <View style={styles.specRowFull}>
            <Text style={styles.specLabel}>DURUM</Text>
            <Text style={styles.specValue}>çekime hazır • yeni rulo</Text>
          </View>

          <View style={styles.specRowFull}>
            <Text style={styles.specLabel}>SERİ NUMARASI</Text>
            <Text style={styles.specValue}>{serialNumber}</Text>
          </View>
        </View>

        {/* Barcode Lines */}
        <View style={styles.barcodeBox}>
          <View style={styles.barcodeLines} pointerEvents="none">
            {Array.from({ length: 26 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.barcodeBar,
                  { width: i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2 },
                ]}
              />
            ))}
          </View>
          <Text style={styles.barcodeText}>{serialNumber}</Text>
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
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  receiptTitle: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    letterSpacing: 0.8,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    backgroundColor: 'rgba(28, 26, 36, 0.03)',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
  },
  specRow: {
    width: '46%',
    gap: 2,
  },
  specRowFull: {
    width: '100%',
    gap: 2,
    paddingTop: 4,
    borderTopWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
  },
  specLabel: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  specValue: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  barcodeBox: {
    alignItems: 'center',
    marginTop: Spacing.md,
    gap: 4,
  },
  barcodeLines: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 18,
  },
  barcodeBar: {
    height: '100%',
    backgroundColor: Colors.text,
    opacity: 0.85,
  },
  barcodeText: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
});
