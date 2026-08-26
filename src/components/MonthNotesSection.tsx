import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { FilmNote } from '@/utils/filmData';

interface MonthNotesSectionProps {
  notes?: FilmNote[];
}

export const MonthNotesSection: React.FC<MonthNotesSectionProps> = ({ notes }) => {
  if (!notes || notes.length === 0) return null;

  return (
    <View style={styles.container}>
      <SectionTitle title="bu filmde bıraktığın notlar" stamp="MEMO LOG" />

      <View style={styles.notesList}>
        {notes.map((note, index) => {
          const cardColors = ['#C6A5FF', '#FFBE55', '#8C9BF6', '#FF5AB3'];
          const bgColor = note.bgColor || cardColors[index % cardColors.length];
          const isDark = bgColor === Colors.blue || bgColor === Colors.lavender;

          return (
            <View
              key={note.id}
              style={[
                styles.noteCard,
                { backgroundColor: bgColor },
                index % 3 === 0 && styles.featuredNoteCard,
              ]}
            >
              <Text style={[styles.backdropText, isDark && styles.lightBackdropText]}>NOT</Text>

              <View style={styles.noteHeader}>
                <View style={styles.iconBubble}>
                  <PozIcon name="sparkle" size={16} color={Colors.text} />
                </View>
                <Text style={[styles.dateStampText, isDark && styles.lightText]}>{note.dateStr}</Text>
                {note.frameCode ? (
                  <View style={styles.framePill}>
                    <Text style={styles.framePillText}>KARE {note.frameCode}</Text>
                  </View>
                ) : null}
              </View>

              <Text style={[styles.noteTitle, isDark && styles.lightText]} numberOfLines={1}>
                Gün Notu
              </Text>
              <Text style={[styles.noteText, isDark && styles.lightText]} numberOfLines={4}>
                {note.text}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  notesList: {
    gap: 12,
    marginTop: 4,
  },
  noteCard: {
    width: '100%',
    minHeight: 138,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 3,
  },
  featuredNoteCard: {
    minHeight: 156,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  iconBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  dateStampText: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.text,
    textTransform: 'uppercase',
    flex: 1,
  },
  framePill: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  framePillText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    color: Colors.text,
  },
  noteTitle: {
    fontSize: 24,
    lineHeight: 27,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
    marginBottom: 7,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.sansMedium,
    color: Colors.text,
  },
  backdropText: {
    position: 'absolute',
    right: 8,
    bottom: -16,
    fontSize: 72,
    lineHeight: 76,
    fontFamily: Fonts.sansBlack,
    color: 'rgba(15, 23, 42, 0.08)',
  },
  lightBackdropText: {
    color: 'rgba(255, 255, 255, 0.13)',
  },
  lightText: {
    color: '#FFFFFF',
  },
});
