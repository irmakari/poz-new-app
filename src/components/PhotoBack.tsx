import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';
import { PhotoEntry } from '@/utils/photoDetailData';

interface PhotoBackProps {
  photo: PhotoEntry;
  cardWidth: number;
  onOpenFullNote: () => void;
}

export const PhotoBack: React.FC<PhotoBackProps> = ({
  photo,
  cardWidth,
  onOpenFullNote,
}) => {
  const cardHeight = Math.round(cardWidth * 1.48);

  const moodDescMap: Record<string, string> = {
    heyecanlı: 'gece enerjisi & tatlı coşku',
    huzurlu: 'sakin anlar & dingin zihin',
    mutlu: 'ışıldayan tebessüm & sevinç',
    sakin: 'sessiz anlar & iç huzur',
    taze: 'taptaze başlangıçlar',
    yorgun: 'gün sonu tatlı yorgunluğu',
    özlemli: 'derin anılar & nostalji',
  };

  const currentMood = photo.mood || 'sakin';
  const moodSubtext = moodDescMap[currentMood] || 'sessiz anlar & iç huzur';

  // Format date stamp e.g. "27/07/26"
  const dateStampText = '27/07/26';

  return (
    <View style={[styles.outerContainer, { width: cardWidth, height: cardHeight }]}>
      {/* ── 35mm Film Negative Strip Peeking out from Behind the Right Edge ── */}
      <View style={styles.filmStripPeeking} pointerEvents="none">
        <View style={styles.filmSprocketHole} />
        <Text style={styles.filmFrameNum}>21</Text>
        <View style={styles.filmSprocketHole} />
        <Text style={styles.filmFrameNum}>11A</Text>
        <View style={styles.filmSprocketHole} />
      </View>

      {/* ── Main Notebook Paper Sheet Card ── */}
      <View style={styles.paperSheetCard}>
        {/* Top Paper Tape */}
        <TapeDecoration position="top-left" width={48} height={14} color={Colors.tapeDefault} />

        {/* Left Side Binder Holes (3 delik) */}
        <View style={styles.binderHolesColumn}>
          <View style={styles.binderHole} />
          <View style={styles.binderHole} />
          <View style={styles.binderHole} />
        </View>

        {/* ── Main Card Inner Content ── */}
        <View style={styles.innerContent}>
          {/* ── Block 1: BUGÜNÜN NOTU ── */}
          <View style={styles.memoBlock}>
            <Text style={styles.memoHeaderLabel}>BUGÜNÜN NOTU</Text>
            <Text style={styles.memoNoteText} numberOfLines={3}>
              “{photo.note || 'öğleden sonra kısa bir kahve molası verdim.'}”
            </Text>

            {photo.note && photo.note.length > 55 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onOpenFullNote}
                style={styles.readMoreLink}
              >
                <Text style={styles.readMoreText}>notun tamamını oku ›</Text>
              </TouchableOpacity>
            )}

            <View style={styles.memoDividerLine} />
            <Text style={styles.memoDateStamp}>{dateStampText}</Text>
          </View>

          {/* ── Block 2: Side-by-Side Pastel Cards (His & Konum) ── */}
          <View style={styles.cardsRow}>
            {/* Left: KARE HİSSİ Card (Pastel Sage Green) */}
            <View style={styles.moodPastelCard}>
              <View style={styles.cardHeaderRow}>
                <PozIcon name="sparkle" size={13} color="#2D4A32" />
                <Text style={styles.moodHeaderLabel}>KARE HİSSİ</Text>
              </View>

              <Text style={styles.moodTitleText}>{currentMood}</Text>
              <Text style={styles.moodSubtextText}>{moodSubtext}</Text>

              {/* Botanical Leaf Motif Accent */}
              <View style={styles.leafMotifBox}>
                <Text style={styles.leafEmojiText}>🌿</Text>
              </View>
            </View>

            {/* Right: KONUM Card (Pastel Sky Blue) */}
            <View style={styles.locationPastelCard}>
              <View style={styles.cardHeaderRow}>
                <PozIcon name="photo" size={13} color="#1E40AF" />
                <Text style={styles.locationHeaderLabel}>KONUM</Text>
              </View>

              <Text style={styles.locationTitleText}>{photo.location || 'Kadıköy'}</Text>
              <Text style={styles.locationSubText}>İstanbul</Text>

              <View style={styles.locationDividerLine} />
              <Text style={styles.locationCoordsText}>41.042°N{'\n'}29.008°E</Text>

              {/* Maiden's Tower / Landmark Sketch Icon Accent */}
              <View style={styles.landmarkIconBox}>
                <PozIcon name="sun" size={18} color="#93C5FD" />
              </View>
            </View>
          </View>

          {/* ── Block 3: Capsule Pills Row ── */}
          <View style={styles.pillsRow}>
            {/* Square Hash Badge */}
            <View style={styles.hashBadgeSquare}>
              <Text style={styles.hashBadgeText}>#</Text>
            </View>

            {/* Midnight Flash Pill */}
            <View style={styles.purplePill}>
              <PozIcon name="sparkle" size={10} color="#6B21A8" />
              <Text style={styles.purplePillText}>{photo.filmTitle || 'midnight flash'}</Text>
            </View>

            {/* Gece Yürüyüşü Pill */}
            <View style={styles.greenPill}>
              <PozIcon name="star" size={10} color="#15803D" />
              <Text style={styles.greenPillText}>gece yürüyüşü</Text>
            </View>

            {/* Analog Pill */}
            <View style={styles.brownPill}>
              <PozIcon name="camera" size={10} color="#78350F" />
              <Text style={styles.brownPillText}>analog</Text>
            </View>
          </View>

          {/* ── Block 4: Technical Editorial Footer ── */}
          <View style={styles.technicalFooter}>
            <Text style={styles.technicalFooterText}>
              POZ · 35MM ISO 800 · FRM {photo.frameCode || '021'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* 35mm Film Negative Strip behind right edge */
  filmStripPeeking: {
    position: 'absolute',
    top: 12,
    right: -10,
    bottom: 12,
    width: 32,
    backgroundColor: '#16141D',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    zIndex: 1,
  },
  filmSprocketHole: {
    width: 8,
    height: 6,
    backgroundColor: '#FAF6EE',
    borderRadius: 1.5,
  },
  filmFrameNum: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: '#8FA8B8',
    fontWeight: '700',
    transform: [{ rotate: '-90deg' }],
  },

  /* Main Notebook Paper Sheet Card */
  paperSheetCard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F9F6F0',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(24, 19, 29, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 2,
    position: 'relative',
    paddingLeft: 22,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },

  /* Binder Ring Holes Column */
  binderHolesColumn: {
    position: 'absolute',
    left: 8,
    top: 60,
    gap: 14,
    zIndex: 3,
  },
  binderHole: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EAE5D9',
    borderWidth: 1,
    borderColor: 'rgba(24, 19, 29, 0.15)',
  },

  innerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },

  /* Block 1: BUGÜNÜN NOTU */
  memoBlock: {
    marginTop: 4,
  },
  memoHeaderLabel: {
    fontSize: 9.5,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: 6,
    fontWeight: '700',
  },
  memoNoteText: {
    fontSize: 14.5,
    fontFamily: Fonts.serif,
    color: Colors.text,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  readMoreLink: {
    marginTop: 4,
  },
  readMoreText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: Colors.stampRed,
    textDecorationLine: 'underline',
  },
  memoDividerLine: {
    height: 1,
    backgroundColor: 'rgba(24, 19, 29, 0.08)',
    marginTop: 10,
    marginBottom: 4,
  },
  memoDateStamp: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    textAlign: 'right',
    fontStyle: 'italic',
  },

  /* Block 2: Side-by-Side Pastel Cards */
  cardsRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 8,
  },

  /* Mood Card (Pastel Sage Green) */
  moodPastelCard: {
    flex: 1,
    backgroundColor: '#E1E8D5',
    borderRadius: 14,
    padding: 12,
    position: 'relative',
    minHeight: 120,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(45, 74, 50, 0.08)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  moodHeaderLabel: {
    fontSize: 8.5,
    fontFamily: Fonts.mono,
    color: '#2D4A32',
    letterSpacing: 1,
    fontWeight: '700',
  },
  moodTitleText: {
    fontSize: 22,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: '#1E3A27',
  },
  moodSubtextText: {
    fontSize: 10,
    fontFamily: Fonts.sans,
    color: '#38523F',
    marginTop: 2,
    lineHeight: 13,
  },
  leafMotifBox: {
    position: 'absolute',
    bottom: 6,
    left: 8,
    opacity: 0.6,
  },
  leafEmojiText: {
    fontSize: 24,
  },

  /* Location Card (Pastel Sky Blue) */
  locationPastelCard: {
    flex: 1,
    backgroundColor: '#E2EFF8',
    borderRadius: 14,
    padding: 12,
    position: 'relative',
    minHeight: 120,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(30, 64, 175, 0.08)',
  },
  locationHeaderLabel: {
    fontSize: 8.5,
    fontFamily: Fonts.mono,
    color: '#1E40AF',
    letterSpacing: 1,
    fontWeight: '700',
  },
  locationTitleText: {
    fontSize: 17,
    fontFamily: Fonts.sansBold,
    color: '#1E3A8A',
  },
  locationSubText: {
    fontSize: 11,
    fontFamily: Fonts.sans,
    color: '#3B82F6',
    marginTop: 1,
  },
  locationDividerLine: {
    height: 1,
    backgroundColor: 'rgba(30, 58, 138, 0.12)',
    marginVertical: 4,
  },
  locationCoordsText: {
    fontSize: 8.5,
    fontFamily: Fonts.mono,
    color: '#2563EB',
    lineHeight: 11,
  },
  landmarkIconBox: {
    position: 'absolute',
    bottom: 6,
    right: 8,
    opacity: 0.7,
  },

  /* Block 3: Capsule Pills Row */
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 4,
    flexWrap: 'wrap',
  },
  hashBadgeSquare: {
    width: 26,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hashBadgeText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    fontWeight: '800',
  },
  purplePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0E6FE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.pill,
  },
  purplePillText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: '#6B21A8',
  },
  greenPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E6F0E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.pill,
  },
  greenPillText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: '#15803D',
  },
  brownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F2ECE4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.pill,
  },
  brownPillText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: '#78350F',
  },

  /* Block 4: Technical Editorial Footer */
  technicalFooter: {
    alignItems: 'center',
    paddingTop: 4,
  },
  technicalFooterText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: 'rgba(24, 19, 29, 0.35)',
    letterSpacing: 1.5,
  },
});
