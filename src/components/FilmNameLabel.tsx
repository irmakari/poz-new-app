import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { SectionTitle } from '@/components/SectionTitle';

interface FilmNameLabelProps {
  value: string;
  onChangeText: (text: string) => void;
  defaultTitle: string;
}

export const FilmNameLabel: React.FC<FilmNameLabelProps> = ({
  value,
  onChangeText,
  defaultTitle,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <SectionTitle title="filmine bir isim ver" stamp="ROLL NAME" />

      <ScrapbookCard
        bgColor="#FFFDF9"
        rotation="-1deg"
        hasTape="top-left"
        tapeColor={Colors.tapePink}
        hasTornEdge="bottom"
        padding={Spacing.md}
        style={[
          styles.card,
          isFocused && styles.cardFocused,
        ]}
      >
        <View style={styles.headerRow}>
          <Text style={styles.labelTitle}>FİLM ETİKETİ</Text>
          <PaperStamp label="LABEL" color={Colors.textSecondary} rotation="3deg" />
        </View>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          maxLength={30}
          placeholder={`ör. ${defaultTitle}`}
          placeholderTextColor="rgba(28, 26, 36, 0.4)"
          accessibilityLabel="Film adı metin alanı"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.textInput}
        />

        <View style={styles.footerRow}>
          <Text style={styles.helperText}>
            {value.trim() ? `Ön izleme: “${value}”` : `Boş kalırsa: “${defaultTitle}”`}
          </Text>
          <Text style={styles.counterText}>{value.length} / 30</Text>
        </View>
      </ScrapbookCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  card: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardFocused: {
    borderColor: '#181520',
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
    color: Colors.textSecondary,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  textInput: {
    fontSize: 18,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
    paddingVertical: 6,
    paddingHorizontal: 0,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  helperText: {
    fontSize: 11,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  counterText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    fontWeight: '700',
  },
});
