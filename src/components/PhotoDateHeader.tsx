import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';
import { PhotoEntry } from '@/utils/photoDetailData';

interface PhotoDateHeaderProps {
  photo: PhotoEntry;
}

export const PhotoDateHeader: React.FC<PhotoDateHeaderProps> = ({ photo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        {/* Top Monospace Frame Tag */}
        <Text style={styles.kareTagText}>KARE {photo.frameCode || photo.frameNumber}</Text>

        {/* Dominant Multi-line Date Title */}
        <Text style={styles.bigDateText}>
          {photo.date || '27 Temmuz 2026'}
        </Text>

        {/* Sub-meta Info Row: Time & Location */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <PozIcon name="star" size={12} color={Colors.textSecondary} />
            <Text style={styles.metaItemText}>{photo.time || '14:20'}</Text>
          </View>

          <View style={styles.metaItem}>
            <PozIcon name="profile" size={12} color={Colors.textSecondary} />
            <Text style={styles.metaItemText}>{photo.location || 'Kadıköy, İstanbul'}</Text>
          </View>
        </View>
      </View>

      {/* Top Right Vintage Stamp */}
      <PaperStamp label="35MM FILM" color={Colors.stampRed} rotation="-4deg" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
    marginTop: 2,
    paddingHorizontal: 4,
  },
  leftGroup: {
    flex: 1,
    paddingRight: 12,
  },
  kareTagText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  bigDateText: {
    fontSize: 30,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
    lineHeight: 34,
    letterSpacing: -0.8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaItemText: {
    fontSize: 12.5,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
  },
});
