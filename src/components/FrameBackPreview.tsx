import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
import { MockSongItem } from '@/utils/captureReviewData';

interface FrameBackPreviewProps {
  frameNumber?: string;
  dateStr?: string;
  timeStr?: string;
  note?: string;
  song?: MockSongItem | null;
  mood?: string | null;
  location?: string | null;
}

export const FrameBackPreview: React.FC<FrameBackPreviewProps> = ({
  frameNumber = '13',
  dateStr = '27 temmuz 2026',
  timeStr = '18:42',
  note,
  song,
  mood,
  location,
}) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="karenin arkası" stamp="PHOTO BACK" />

      <ScrapbookCard
        bgColor="#FFFDF9"
        rotation="0.8deg"
        hasTape="top-center"
        tapeColor={Colors.tapeDefault}
        hasTornEdge="bottom"
        padding={Spacing.md}
        style={styles.card}
      >
        {/* Header Spec */}
        <View style={styles.headerRow}>
          <View style={styles.titleGroup}>
            <Text style={styles.frameHeaderTitle}>{frameNumber}. KARE BİLGİLERİ</Text>
            <Text style={styles.dateSubText}>{dateStr} · {timeStr}</Text>
          </View>

          <PaperStamp label="BACK PRINT" color={Colors.textSecondary} rotation="-3deg" />
        </View>

        {/* Note Section */}
        <View style={styles.previewBlock}>
          <Text style={styles.blockLabel}>NOT</Text>
          {note ? (
            <Text style={styles.noteValueText}>“{note}”</Text>
          ) : (
            <Text style={styles.placeholderValueText}>not eklenmedi</Text>
          )}
        </View>

        {/* Dynamic Chips Row */}
        <View style={styles.chipsPreviewGrid}>
          {/* Song */}
          <View style={styles.previewChipCell}>
            <Text style={styles.blockLabel}>ŞARKI</Text>
            {song ? (
              <Text style={styles.songValueText}>{song.title} – {song.artist}</Text>
            ) : (
              <Text style={styles.placeholderValueText}>şarkı eklenmedi</Text>
            )}
          </View>

          {/* Mood */}
          <View style={styles.previewChipCell}>
            <Text style={styles.blockLabel}>HİS</Text>
            {mood ? (
              <Text style={styles.moodValueText}>{mood}</Text>
            ) : (
              <Text style={styles.placeholderValueText}>his seçilmedi</Text>
            )}
          </View>

          {/* Location */}
          <View style={styles.previewChipCell}>
            <Text style={styles.blockLabel}>KONUM</Text>
            {location ? (
              <Text style={styles.locationValueText}>{location}</Text>
            ) : (
              <Text style={styles.placeholderValueText}>konum eklenmedi</Text>
            )}
          </View>
        </View>

        {/* Lab Code Footer */}
        <View style={styles.footerBarcodeRow}>
          <Text style={styles.codeText}>POZ-PRINT-BACK • EXP-{frameNumber}</Text>
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
    marginBottom: Spacing.sm,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  titleGroup: {
    gap: 1,
  },
  frameHeaderTitle: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 0.8,
  },
  dateSubText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  previewBlock: {
    backgroundColor: 'rgba(28, 26, 36, 0.03)',
    borderRadius: BorderRadius.sm,
    padding: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
  },
  blockLabel: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  noteValueText: {
    fontSize: 13,
    fontFamily: Fonts.serif,
    fontStyle: 'italic',
    color: Colors.text,
    lineHeight: 18,
  },
  placeholderValueText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  chipsPreviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  previewChipCell: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(28, 26, 36, 0.03)',
    borderRadius: BorderRadius.sm,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
  },
  songValueText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.pinkDark,
  },
  moodValueText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.greenDark,
    textTransform: 'lowercase',
  },
  locationValueText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.blueDark,
    textTransform: 'lowercase',
  },
  footerBarcodeRow: {
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingTop: 4,
  },
  codeText: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
});
