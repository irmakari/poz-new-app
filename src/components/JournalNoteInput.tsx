import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';

interface JournalNoteInputProps {
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
}

export const JournalNoteInput: React.FC<JournalNoteInputProps> = ({
  value,
  onChangeText,
  maxLength = 240,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <SectionTitle title="bu kareye bir not bırak" stamp="MEMO" />

      <ScrapbookCard
        bgColor={Colors.yellow}
        rotation="-1deg"
        hasTape="top-left"
        tapeColor={Colors.tapePink}
        hasTornEdge="bottom"
        padding={Spacing.md}
        style={[
          styles.noteCard,
          isFocused && styles.noteCardFocused,
        ]}
      >
        <View style={styles.headerRow}>
          <Text style={styles.labelTitle}>GÜNLÜK NOTU</Text>
          <PaperStamp label="NOTE" color={Colors.yellowDark} rotation="3deg" />
        </View>

        <TextInput
          multiline
          numberOfLines={4}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          placeholder="bu anı gelecekte nasıl hatırlamak istersin?"
          placeholderTextColor="rgba(28, 26, 36, 0.4)"
          accessibilityLabel="Kare notu metin alanı"
          accessibilityHint="240 karaktere kadar kısa bir not ekleyebilirsiniz"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.textInput}
        />

        <View style={styles.footerRow}>
          <Text style={styles.counterText}>
            {value.length} / {maxLength}
          </Text>
        </View>
      </ScrapbookCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  noteCard: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
  },
  noteCardFocused: {
    borderColor: Colors.yellowDark,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  labelTitle: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.yellowDark,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  textInput: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.serif,
    color: Colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
    padding: 0,
  },
  footerRow: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  counterText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
});
