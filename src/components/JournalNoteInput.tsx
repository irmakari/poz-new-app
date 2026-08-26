import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';

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

      <View
        style={[
          styles.noteCard,
          isFocused && styles.noteCardFocused,
        ]}
      >
        <Text style={styles.backdropText}>NOTE</Text>

        <View style={styles.headerRow}>
          <View style={styles.iconBubble}>
            <PozIcon name="sparkle" size={16} color={Colors.text} />
          </View>
          <Text style={styles.counterText}>
            {value.length} / {maxLength}
          </Text>
        </View>

        <Text style={styles.kickerText}>Memo</Text>
        <Text style={styles.labelTitle}>Günün Notu</Text>

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  noteCard: {
    marginTop: 4,
    minHeight: 198,
    backgroundColor: '#FFBE55',
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    overflow: 'hidden',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 7,
    elevation: 3,
  },
  noteCardFocused: {
    borderColor: Colors.text,
    shadowColor: Colors.text,
    shadowOpacity: 0.2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  kickerText: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: Colors.text,
    marginBottom: 2,
  },
  labelTitle: {
    fontSize: 29,
    lineHeight: 32,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.sansMedium,
    color: Colors.text,
    minHeight: 74,
    textAlignVertical: 'top',
    padding: 0,
    maxWidth: '92%',
  },
  counterText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.text,
    fontWeight: '900',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: 'hidden',
  },
  backdropText: {
    position: 'absolute',
    right: -8,
    bottom: -14,
    fontSize: 72,
    lineHeight: 76,
    fontFamily: Fonts.sansBlack,
    color: 'rgba(15, 23, 42, 0.08)',
  },
});
