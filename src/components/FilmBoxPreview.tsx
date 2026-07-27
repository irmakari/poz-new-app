import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { FilmTypeOption, FilmPurposeOption, FrameOption } from '@/utils/newFilmData';

interface FilmBoxPreviewProps {
  filmType: FilmTypeOption;
  displayName: string;
  purpose: FilmPurposeOption;
  frameCount: FrameOption;
  startDateStr: string;
  serialNumber: string;
}

export const FilmBoxPreview: React.FC<FilmBoxPreviewProps> = ({
  filmType,
  displayName,
  purpose,
  frameCount,
  startDateStr,
  serialNumber,
}) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="rulon nasıl görünecek?" stamp="LIVE 3D PREVIEW" />

      <ScrapbookCard
        bgColor={filmType.primaryColor}
        rotation="-1.5deg"
        hasTape="top-right"
        tapeColor={Colors.tapeDefault}
        padding={Spacing.lg}
        style={styles.previewBox}
      >
        <View style={styles.topCutLine} pointerEvents="none" />

        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.titleGroup}>
            <PaperStamp label="FRESH ROLL" color={filmType.darkColor} rotation="-3deg" />
            <Text style={[styles.serialText, { color: filmType.darkColor }]}>
              {serialNumber}
            </Text>
          </View>

          {/* 3D Film Canister Object */}
          <View style={styles.canisterGraphic}>
            <View style={styles.canisterSpool} />
            <View style={styles.canisterBody}>
              <View style={styles.canisterRing} />
              <PozIcon name="films" size={20} color="#FFFDF6" />
            </View>
          </View>
        </View>

        {/* Film Title & Info Badges */}
        <View style={styles.titleArea}>
          <Text style={styles.filmTitleText}>{displayName}</Text>
          <Text style={styles.metaSubtitle}>
            {filmType.name.toUpperCase()} • {frameCount.count} EXPOSURES • ISO {filmType.iso}
          </Text>
        </View>

        {/* Purpose & Date Tags Row */}
        <View style={styles.tagsRow}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>AMAÇ: {purpose.label.toUpperCase()}</Text>
          </View>

          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>BAŞLANGIÇ: {startDateStr.toUpperCase()}</Text>
          </View>
        </View>

        {/* Serial Footer */}
        <View style={styles.footerRow}>
          <Text style={styles.footerCodeText}>POZ 35MM EMULSION • READY TO LOAD</Text>
        </View>
      </ScrapbookCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  previewBox: {
    marginTop: 4,
    position: 'relative',
  },
  topCutLine: {
    position: 'absolute',
    top: 0,
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: 'rgba(28, 26, 36, 0.15)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  titleGroup: {
    gap: 4,
  },
  serialText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  canisterGraphic: {
    alignItems: 'center',
    transform: [{ rotate: '5deg' }],
  },
  canisterSpool: {
    width: 14,
    height: 5,
    backgroundColor: '#16141D',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  canisterBody: {
    width: 36,
    height: 38,
    backgroundColor: '#16141D',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  canisterRing: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.yellow,
  },
  titleArea: {
    marginVertical: Spacing.xs,
  },
  filmTitleText: {
    fontSize: 30,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.8,
  },
  metaSubtitle: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: Spacing.xs,
  },
  tagBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
  },
  tagBadgeText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    fontWeight: '800',
    color: Colors.text,
  },
  footerRow: {
    marginTop: Spacing.xs,
    paddingTop: 4,
    borderTopWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  footerCodeText: {
    fontFamily: Fonts.mono,
    fontSize: 8,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
});
