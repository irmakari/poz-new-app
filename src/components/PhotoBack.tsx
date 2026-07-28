import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
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
  const cardHeight = Math.round(cardWidth * 1.5);

  return (
    <View style={[styles.polaroidBack, { width: cardWidth, height: cardHeight }]}>
      <TapeDecoration position="top-left" width={42} height={13} color={Colors.tapePink} />

      {/* Header Info & Stamp */}
      <View style={styles.headerRow}>
        <View style={styles.headerTitleGroup}>
          <Text style={styles.backTitleText}>{photo.frameNumber}. kare</Text>
          <Text style={styles.backMetaText}>
            {photo.date} · {photo.time}
          </Text>
        </View>

        <PaperStamp label="DEVELOPED" color={Colors.stampRed} rotation="3deg" />
      </View>

      {/* Journal Note Paper Block */}
      <View style={styles.notePaperBlock}>
        <Text style={styles.noteText} numberOfLines={4}>
          “{photo.note || 'bu kareye not eklenmemiş.'}”
        </Text>

        {photo.note && photo.note.length > 75 && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onOpenFullNote}
            style={styles.readMoreLink}
          >
            <Text style={styles.readMoreText}>notun tamamını oku ›</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Physical Tags Row */}
      <View style={styles.tagsContainer}>
        {/* Song Tag */}
        {photo.song && (
          <View style={[styles.backTag, { backgroundColor: Colors.pink }]}>
            <PozIcon name="music" size={12} color={Colors.pinkDark} />
            <Text style={styles.tagText} numberOfLines={1}>
              {photo.song.title} – {photo.song.artist}
            </Text>
          </View>
        )}

        {/* Mood Tag */}
        {photo.mood && (
          <View style={[styles.backTag, { backgroundColor: Colors.green }]}>
            <PozIcon name="sparkle" size={12} color={Colors.greenDark} />
            <Text style={styles.tagText}>{photo.mood}</Text>
          </View>
        )}

        {/* Location Tag */}
        {photo.location && (
          <View style={[styles.backTag, { backgroundColor: Colors.blue }]}>
            <PozIcon name="photo" size={12} color={Colors.blueDark} />
            <Text style={styles.tagText}>{photo.location}</Text>
          </View>
        )}

        {/* Film Tag */}
        <View style={[styles.backTag, { backgroundColor: Colors.lavender }]}>
          <PozIcon name="films" size={12} color={Colors.lavenderDark} />
          <Text style={styles.tagText}>{photo.filmTitle}</Text>
        </View>
      </View>

      {/* Footer Serial */}
      <View style={styles.footerRow}>
        <Text style={styles.footerSerialText}>
          {photo.serial} • FRAME {photo.frameCode}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  polaroidBack: {
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 6,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  headerTitleGroup: {
    gap: 1,
  },
  backTitleText: {
    fontSize: 22,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
  },
  backMetaText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
  },
  notePaperBlock: {
    backgroundColor: 'rgba(28, 26, 36, 0.03)',
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
    marginVertical: Spacing.xs,
    flex: 1,
    justifyContent: 'center',
  },
  noteText: {
    fontSize: 13,
    fontFamily: Fonts.sansMedium,
    color: Colors.text,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  readMoreLink: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: Colors.stampRed,
    textDecorationLine: 'underline',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: Spacing.xs,
  },
  backTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  tagText: {
    fontSize: 10,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  footerRow: {
    paddingTop: 4,
    borderTopWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    marginTop: 4,
  },
  footerSerialText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
});
