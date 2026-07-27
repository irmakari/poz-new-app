import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';

interface FilmIdentityLabelsProps {
  identity: {
    favoriteFilm: string;
    topMood: string;
    favoriteTime: string;
    topGenre: string;
    topLocation: string;
  };
}

export const FilmIdentityLabels: React.FC<FilmIdentityLabelsProps> = ({ identity }) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="senin film kimliğin" stamp="IDENTITY LOG" />

      {/* Color Test Strips & Lab Tags Grid */}
      <View style={styles.tagsContainer}>
        {/* 1. Green Mood Tag */}
        <View style={[styles.identityTag, { backgroundColor: Colors.green, transform: [{ rotate: '-1.8deg' }] }]}>
          <PozIcon name="sparkle" size={14} color={Colors.greenDark} />
          <View>
            <Text style={[styles.tagLabel, { color: Colors.greenDark }]}>BASKIN HİS</Text>
            <Text style={styles.tagValueText}>{identity.topMood}</Text>
          </View>
        </View>

        {/* 2. Lavender Film Tag */}
        <View style={[styles.identityTag, { backgroundColor: Colors.lavender, transform: [{ rotate: '2deg' }] }]}>
          <PozIcon name="films" size={14} color={Colors.lavenderDark} />
          <View>
            <Text style={[styles.tagLabel, { color: Colors.lavenderDark }]}>FAVORİ FİLM</Text>
            <Text style={styles.tagValueText}>{identity.favoriteFilm}</Text>
          </View>
        </View>

        {/* 3. Yellow Time Ticket */}
        <View style={[styles.identityTag, { backgroundColor: Colors.yellow, transform: [{ rotate: '-1.2deg' }] }]}>
          <PozIcon name="calendar" size={14} color={Colors.yellowDark} />
          <View>
            <Text style={[styles.tagLabel, { color: Colors.yellowDark }]}>ÇEKİM SAATİ</Text>
            <Text style={styles.tagValueText}>{identity.favoriteTime}</Text>
          </View>
        </View>

        {/* 4. Pink Cassette Tag */}
        <View style={[styles.identityTag, { backgroundColor: Colors.pink, transform: [{ rotate: '1.5deg' }] }]}>
          <PozIcon name="music" size={14} color={Colors.pinkDark} />
          <View>
            <Text style={[styles.tagLabel, { color: Colors.pinkDark }]}>TÜR</Text>
            <Text style={styles.tagValueText}>{identity.topGenre}</Text>
          </View>
        </View>

        {/* 5. Blue Location Tag */}
        <View style={[styles.identityTag, { backgroundColor: Colors.blue, transform: [{ rotate: '-1deg' }] }]}>
          <PozIcon name="photo" size={14} color={Colors.blueDark} />
          <View>
            <Text style={[styles.tagLabel, { color: Colors.blueDark }]}>FAVORİ MEKAN</Text>
            <Text style={styles.tagValueText}>{identity.topLocation}</Text>
          </View>
        </View>
      </View>

      {/* Personal Summary Sentence */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>
          “en çok akşam saatlerinde, sakin ve müzikli anılar biriktiriyorsun.”
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
    marginBottom: Spacing.xs,
  },
  identityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.sm,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tagLabel: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tagValueText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  summaryCard: {
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryText: {
    fontSize: 13,
    fontFamily: Fonts.serif,
    fontStyle: 'italic',
    color: Colors.text,
    lineHeight: 18,
  },
});
