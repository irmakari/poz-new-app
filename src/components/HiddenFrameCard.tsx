import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';

interface HiddenFrameCardProps {
  frameNumber?: string;
  filmName?: string;
  serialNumber?: string;
  dateStr?: string;
  timeStr?: string;
}

export const HiddenFrameCard: React.FC<HiddenFrameCardProps> = ({
  frameNumber = '13',
  filmName = 'summer glow',
  serialNumber = 'SG-0726-013',
  dateStr = '27 temmuz 2026',
  timeStr = '18:42',
}) => {
  return (
    <View style={styles.cardContainer}>
      <TapeDecoration position="top-right" width={42} height={12} color={Colors.tapeLavender} />

      {/* Dark Negative Frame Box */}
      <View style={styles.darkFrameBox}>
        {/* Sprocket Holes Row (Top) */}
        <View style={styles.sprocketRow}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={`t-${i}`} style={styles.sprocketHole} />
          ))}
        </View>

        {/* Center Closed Negative Visual */}
        <View style={styles.closedNegativeVisual}>
          <View style={styles.lockBadge}>
            <PozIcon name="lock" size={26} color="rgba(255, 255, 255, 0.6)" />
          </View>
          <Text style={styles.unexposedTitle}>GİZLİ KARE • {frameNumber}. POZ</Text>
          <Text style={styles.unexposedSub}>BANYODAN SONRA AÇILACAK</Text>
        </View>

        {/* Sprocket Holes Row (Bottom) */}
        <View style={styles.sprocketRow}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={`b-${i}`} style={styles.sprocketHole} />
          ))}
        </View>
      </View>

      {/* Frame Details & Rubber Stamp */}
      <View style={styles.detailsRow}>
        <View style={styles.infoGroup}>
          <Text style={styles.frameTitleText}>{frameNumber}. kare</Text>
          <Text style={styles.metaText}>
            {dateStr} · {timeStr} • {filmName}
          </Text>
          <Text style={styles.serialText}>{serialNumber}</Text>
        </View>

        <PaperStamp label={`FRAME #${frameNumber}`} color={Colors.stampRed} rotation="4deg" />
      </View>

      {/* Hero Explanatory Subtext */}
      <View style={styles.heroMessageCard}>
        <Text style={styles.heroMessageTitle}>bu kare, filmin açılana kadar gizli kalacak.</Text>
        <Text style={styles.heroMessageSub}>şimdilik yalnızca o ana ait birkaç küçük iz bırak.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: Spacing.md,
    position: 'relative',
  },
  darkFrameBox: {
    backgroundColor: '#16141D',
    borderRadius: BorderRadius.md,
    padding: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  sprocketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginVertical: 4,
  },
  sprocketHole: {
    width: 8,
    height: 5,
    backgroundColor: 'rgba(250, 246, 238, 0.75)',
    borderRadius: 1.5,
  },
  closedNegativeVisual: {
    height: 120,
    backgroundColor: '#201C2B',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 4,
  },
  lockBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  unexposedTitle: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFDF6',
    letterSpacing: 1,
  },
  unexposedSub: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: Colors.lavender,
    letterSpacing: 0.5,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  infoGroup: {
    gap: 2,
  },
  frameTitleText: {
    fontSize: 26,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  metaText: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
  },
  serialText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
  },
  heroMessageCard: {
    backgroundColor: 'rgba(28, 26, 36, 0.03)',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
    marginTop: 4,
  },
  heroMessageTitle: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  heroMessageSub: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
