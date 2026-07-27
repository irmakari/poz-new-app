import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';

interface JournalNoteCardProps {
  text: string;
  metaText: string;
}

export const JournalNoteCard: React.FC<JournalNoteCardProps> = ({
  text,
  metaText,
}) => {
  const handleEditNote = () => {
    Alert.alert(
      'Notu Düzenle',
      'Not düzenleme özelliği yakında eklenecek.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  return (
    <ScrapbookCard
      bgColor={Colors.yellow}
      rotation="-1.5deg"
      hasTape="top-left"
      tapeColor={Colors.tapePink}
      hasTornEdge="bottom"
      padding={Spacing.lg}
      style={styles.containerCard}
    >
      <View style={styles.cardHeaderRow}>
        <Text style={styles.headerTitle}>günün notu</Text>
        <PaperStamp label="NOTE" color={Colors.yellowDark} rotation="4deg" />
      </View>

      <Text style={styles.bodyText}>“{text}”</Text>

      <View style={styles.footerRow}>
        <Text style={styles.metaText}>{metaText}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleEditNote}
          style={styles.editLinkButton}
        >
          <Text style={styles.editLinkText}>notu düzenle</Text>
        </TouchableOpacity>
      </View>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    marginVertical: Spacing.xs,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    fontFamily: Fonts.sansMedium,
    fontStyle: 'italic',
    marginVertical: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderColor: 'rgba(230, 168, 0, 0.25)',
  },
  metaText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    color: Colors.yellowDark,
    fontWeight: '700',
  },
  editLinkButton: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  editLinkText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.sansSemiBold,
    textDecorationLine: 'underline',
  },
});
