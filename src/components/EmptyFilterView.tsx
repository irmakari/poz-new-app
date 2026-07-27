import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';

export const EmptyFilterView: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrapbookCard
        bgColor="#FFFDF9"
        rotation="-1.5deg"
        hasTape="top-center"
        tapeColor={Colors.tapeDefault}
        padding={Spacing.xl}
        style={styles.card}
      >
        <View style={styles.iconCircle}>
          <PozIcon name="films" size={32} color={Colors.textMuted} />
        </View>

        <Text style={styles.titleText}>burada henüz film yok</Text>
        <Text style={styles.subText}>
          yeni anılar çekmeye başladığında burada görünecek.
        </Text>

        <PaperStamp label="EMPTY ENVELOPE" color={Colors.textMuted} rotation="3deg" />
      </ScrapbookCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(28, 26, 36, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  titleText: {
    fontSize: 20,
    fontFamily: Fonts.serif,
    color: Colors.text,
    fontWeight: '800',
  },
  subText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
