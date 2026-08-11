import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
import { FilmItem } from '@/utils/filmData';

interface FilmDetailsReceiptProps {
  film: FilmItem;
}

export const FilmDetailsReceipt: React.FC<FilmDetailsReceiptProps> = ({ film }) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="film bilgileri" stamp="LAB RECEIPT" />

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

        {/* 2-Column Info Specs Grid */}
        <View style={styles.specsGrid}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>FİLM ADI</Text>
            <Text style={styles.specValue}>{film.name || film.title}</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>FİLM TÜRÜ</Text>
            <Text style={styles.specValue}>{film.filmTypeName || film.type || '35mm'}</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>ISO DEĞERİ</Text>
            <Text style={styles.specValue}>{film.iso || 400}</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>POZ KARELERİ</Text>
            <Text style={styles.specValue}>{film.totalFrames} KARE</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>KULLANIM AMACI</Text>
            <Text style={styles.specValue}>{film.purpose || 'aylık film'}</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>BAŞLANGIÇ</Text>
            <Text style={styles.specValue}>{film.startDate || '27 temmuz 2026'}</Text>
          </View>

          {film.developedDate ? (
            <View style={styles.specRowFull}>
              <Text style={styles.specLabel}>BANYO TARİHİ</Text>
              <Text style={styles.specValue}>{film.developedDate}</Text>
            </View>
          ) : null}

          <View style={styles.specRowFull}>
            <Text style={styles.specLabel}>SERİ NUMARASI</Text>
            <Text style={styles.specValue}>{film.serial}</Text>
          </View>
        </View>

        {/* Lab Barcode */}
        <View style={styles.barcodeBox}>
          <View style={styles.barcodeLines} pointerEvents="none">
            {Array.from({ length: 28 }).map((_, i) => (
              <View
                key={`lab-bc-${i}`}
                style={[
                  styles.barcodeBar,
                  { width: i % 4 === 0 ? 3 : i % 2 === 0 ? 1 : 2 },
                ]}
              />
            ))}
          </View>
          <Text style={styles.barcodeText}>{film.serial}</Text>
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
    marginBottom: Spacing.md,
  },
  receiptTitle: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    letterSpacing: 1,
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
