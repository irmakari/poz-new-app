import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';
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
          const rotation = index % 2 === 0 ? '-1.5deg' : '1.8deg';
          return (
            <ScrapbookCard
              key={note.id}
              bgColor={note.bgColor || Colors.yellow}
              rotation={rotation}
              hasTape={index % 2 === 0 ? 'top-left' : 'top-right'}
              tapeColor={Colors.tapePink}
              hasTornEdge="bottom"
              padding={Spacing.md}
              style={styles.noteCard}
            >
              <View style={styles.noteHeader}>
                <Text style={styles.dateStampText}>{note.dateStr}</Text>
                {note.frameCode ? (
                  <PaperStamp label={`KARE ${note.frameCode}`} color={Colors.yellowDark} rotation="2deg" />
                ) : null}
              </View>

              <Text style={styles.noteText}>“{note.text}”</Text>
            </ScrapbookCard>
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
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  dateStampText: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.serif,
    fontStyle: 'italic',
    color: Colors.text,
  },
});
