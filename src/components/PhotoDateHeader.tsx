import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { PhotoEntry } from '@/utils/photoDetailData';

interface PhotoDateHeaderProps {
  photo: PhotoEntry;
}

export const PhotoDateHeader: React.FC<PhotoDateHeaderProps> = ({ photo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <Text style={styles.bigDateText}>{photo.date}</Text>
        <Text style={styles.subMetaText}>
          {photo.dateLabel} · {photo.time} • {photo.filmTitle}
        </Text>
      </View>

      <PaperStamp label={`FRAME ${photo.frameCode}`} color={Colors.stampRed} rotation="-2deg" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    marginTop: Spacing.xs,
  },
  leftGroup: {
    flex: 1,
    paddingRight: 8,
  },
  bigDateText: {
    fontSize: 28,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subMetaText: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
    marginTop: 1,
  },
});
