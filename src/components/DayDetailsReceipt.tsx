import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';

interface DayDetailsReceiptProps {
  timeRange?: string;
  location?: string;
  film?: string;
  frames?: string;
  weather?: string;
}

export const DayDetailsReceipt: React.FC<DayDetailsReceiptProps> = ({
  timeRange = '18:20 – 22:45',
  location = 'bostancı',
  film = 'summer glow',
  frames = '12 ve 13. kare',
  weather = 'ılık akşam',
}) => {
  return (
    <ScrapbookCard
      bgColor="#FFFDF9"
      rotation="1deg"
      hasTape="top-left"
      tapeColor={Colors.tapeLavender}
      hasTornEdge="bottom"
      padding={Spacing.md}
      style={styles.containerCard}
    >
      <View style={styles.cardHeaderRow}>
        <Text style={styles.headerTitle}>günün küçük izleri</Text>
        <PaperStamp label="LAB LOG" color={Colors.textSecondary} rotation="-2deg" />
      </View>

      {/* Receipt 2-column Grid */}
      <View style={styles.receiptGrid}>
        <View style={styles.receiptRow}>
          <Text style={styles.fieldLabel}>SAAT ARALIĞI</Text>
          <Text style={styles.fieldValue}>{timeRange}</Text>
        </View>

        <View style={styles.receiptRow}>
          <Text style={styles.fieldLabel}>KONUM</Text>
          <Text style={styles.fieldValue}>{location}</Text>
        </View>

        <View style={styles.receiptRow}>
          <Text style={styles.fieldLabel}>FİLM RULOSU</Text>
          <Text style={styles.fieldValue}>{film}</Text>
        </View>

        <View style={styles.receiptRow}>
          <Text style={styles.fieldLabel}>POZ KARELERİ</Text>
          <Text style={styles.fieldValue}>{frames}</Text>
        </View>

        <View style={styles.receiptRowFull}>
          <Text style={styles.fieldLabel}>HAVA DURUMU</Text>
          <Text style={styles.fieldValue}>{weather}</Text>
        </View>
      </View>

      {/* Barcode Mock Line */}
      <View style={styles.barcodeWrapper}>
        <View style={styles.barcodeLines} pointerEvents="none">
          {Array.from({ length: 24 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.barcodeBar,
                { width: i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2 },
              ]}
            />
          ))}
        </View>
        <Text style={styles.barcodeText}>POZ-35MM-2026-LAB-0727</Text>
      </View>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    marginVertical: Spacing.xs,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  receiptGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    backgroundColor: 'rgba(28, 26, 36, 0.03)',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
  },
  receiptRow: {
    width: '46%',
    gap: 2,
  },
  receiptRowFull: {
    width: '100%',
    gap: 2,
    paddingTop: 4,
    borderTopWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
  },
  fieldLabel: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  barcodeWrapper: {
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
