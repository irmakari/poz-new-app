import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

  const currentMood = photo.mood || 'huzurlu';
  const moodSubtext = moodDescMap[currentMood] || 'sakin anlar & dingin zihin';
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

        {/* Left Side Binder Holes */}
        <View style={styles.binderHolesColumn}>
          <View style={styles.binderHole} />
          <View style={styles.binderHole} />
          <View style={styles.binderHole} />
          <View style={styles.binderHole} />
        </View>

        {/* ── Scrollable Notebook Blocks ── */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.innerContent}
          showsVerticalScrollIndicator={false}
        >
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

            <Text style={styles.memoDateStamp}>{dateStampText}</Text>
            <View style={styles.memoDividerLine} />
          </View>

          {/* ── Block 2: KARE HİSSİ ── */}
          <View style={styles.memoBlock}>
            <View style={styles.headerRowWithIcon}>
              <Text style={styles.memoHeaderLabel}>KARE HİSSİ</Text>
              <PozIcon name="sparkle" size={12} color="#2563EB" />
            </View>

            <View style={styles.valueRow}>
              <Text style={styles.moodTitleText}>{currentMood}</Text>
              <Text style={styles.leafEmojiText}>🌿</Text>
            </View>
            <Text style={styles.memoSubText}>{moodSubtext}</Text>

            <View style={styles.memoDividerLine} />
          </View>

          {/* ── Block 3: KONUM ── */}
          <View style={styles.memoBlock}>
            <View style={styles.headerRowWithIcon}>
              <Text style={styles.memoHeaderLabel}>KONUM</Text>
              <PozIcon name="photo" size={12} color="#2563EB" />
            </View>

            <Text style={styles.locationTitleText}>{photo.location || 'Kadıköy, İstanbul'}</Text>
            <Text style={styles.memoSubText}>41.042°N · 29.008°E</Text>

            <View style={styles.memoDividerLine} />
          </View>

          {/* ── Block 4: ŞARKI (if available) ── */}
          {photo.song ? (
            <View style={styles.memoBlock}>
              <View style={styles.headerRowWithIcon}>
                <Text style={styles.memoHeaderLabel}>ŞARKI</Text>
                <PozIcon name="star" size={12} color="#D97706" />
              </View>
              <Text style={styles.songTitleText}>
                🎵 {photo.song.title} <Text style={styles.songArtistText}>— {photo.song.artist}</Text>
              </Text>
              <View style={styles.memoDividerLine} />
            </View>
          ) : null}

          {/* ── Block 5: Capsule Pills Row ── */}
          <View style={styles.pillsRow}>
            <View style={styles.hashBadgeSquare}>
              <Text style={styles.hashBadgeText}>#</Text>
            </View>

            <View style={styles.purplePill}>
              <PozIcon name="sparkle" size={10} color="#6B21A8" />
              <Text style={styles.purplePillText}>{photo.filmTitle || 'midnight flash'}</Text>
            </View>

            <View style={styles.greenPill}>
              <PozIcon name="star" size={10} color="#15803D" />
              <Text style={styles.greenPillText}>gece yürüyüşü</Text>
            </View>

            <View style={styles.brownPill}>
              <PozIcon name="camera" size={10} color="#78350F" />
              <Text style={styles.brownPillText}>analog</Text>
            </View>
          </View>

          {/* ── Block 6: Technical Editorial Footer ── */}
          <View style={styles.technicalFooter}>
            <Text style={styles.technicalFooterText}>
              POZ · 35MM ISO 800 · FRM {photo.frameCode || '021'}
            </Text>
          </View>
        </ScrollView>
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

  /* 35mm Film Negative Strip peeking behind right edge */
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
    paddingLeft: 20,
    paddingRight: 14,
    paddingTop: 16,
    paddingBottom: 12,
  },

  /* Binder Ring Holes Column */
  binderHolesColumn: {
    position: 'absolute',
    left: 8,
    top: 50,
    gap: 16,
    zIndex: 3,
  },
  binderHole: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EAE5D9',
    borderWidth: 1,
    borderColor: 'rgba(24, 19, 29, 0.15)',
  },

  scrollView: {
    flex: 1,
  },
  innerContent: {
    paddingBottom: 8,
  },

  /* Notebook Blocks */
  memoBlock: {
    marginBottom: 8,
  },
  headerRowWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  memoHeaderLabel: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: 4,
    fontWeight: '800',
  },
  memoNoteText: {
    fontSize: 14,
    fontFamily: Fonts.serif,
    color: Colors.text,
    fontStyle: 'italic',
    lineHeight: 19,
  },
  readMoreLink: {
    marginTop: 3,
  },
  readMoreText: {
    fontSize: 10.5,
    fontFamily: Fonts.sansBold,
    color: Colors.stampRed,
    textDecorationLine: 'underline',
  },
  memoDateStamp: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    textAlign: 'right',
    fontStyle: 'italic',
    marginTop: 2,
  },
  memoDividerLine: {
    height: 1,
    backgroundColor: 'rgba(24, 19, 29, 0.08)',
    marginTop: 8,
  },

  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moodTitleText: {
    fontSize: 18,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
  },
  leafEmojiText: {
    fontSize: 16,
  },
  memoSubText: {
    fontSize: 10.5,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 1,
  },

  locationTitleText: {
    fontSize: 15,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },

  songTitleText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  songArtistText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
  },

  /* Capsule Pills Row */
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 8,
    flexWrap: 'wrap',
  },
  hashBadgeSquare: {
    width: 24,
    height: 22,
    borderRadius: 5,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hashBadgeText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: '#FFFDF6',
    fontWeight: '800',
  },
  purplePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0E6FE',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: BorderRadius.pill,
  },
  purplePillText: {
    fontSize: 10.5,
    fontFamily: Fonts.sansBold,
    color: '#6B21A8',
  },
  greenPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E6F0E6',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: BorderRadius.pill,
  },
  greenPillText: {
    fontSize: 10.5,
    fontFamily: Fonts.sansBold,
    color: '#15803D',
  },
  brownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F2ECE4',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: BorderRadius.pill,
  },
  brownPillText: {
    fontSize: 10.5,
    fontFamily: Fonts.sansBold,
    color: '#78350F',
  },

  /* Technical Editorial Footer */
  technicalFooter: {
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 4,
  },
  technicalFooterText: {
    fontSize: 8.5,
    fontFamily: Fonts.mono,
    color: 'rgba(24, 19, 29, 0.35)',
    letterSpacing: 1.5,
  },
});
