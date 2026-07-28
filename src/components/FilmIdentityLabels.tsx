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
      <SectionTitle title="senin film kimliğin" categoryLabel="PROFILE LABELS" code="LAB-35MM" stamp="IDENTITY" />

      {/* Color Test Strips & Lab Tags Grid */}
      <View style={styles.tagsContainer}>
        {/* 1. Olive Mood Tag */}
        <View style={[styles.identityTag, { backgroundColor: Colors.olive, transform: [{ rotate: '-1.8deg' }] }]}>
          <PozIcon name="sparkle" size={14} color="#F4ECE2" />
          <View>
            <Text style={[styles.tagLabel, { color: 'rgba(244, 236, 226, 0.75)' }]}>BASKIN HİS</Text>
            <Text style={[styles.tagValueText, { color: '#F4ECE2' }]}>{identity.topMood}</Text>
          </View>
        </View>

        {/* 2. Plum Film Tag */}
        <View style={[styles.identityTag, { backgroundColor: Colors.plum, transform: [{ rotate: '2deg' }] }]}>
          <PozIcon name="films" size={14} color="#F4ECE2" />
          <View>
            <Text style={[styles.tagLabel, { color: Colors.filmBlue }]}>FAVORİ FİLM</Text>
            <Text style={[styles.tagValueText, { color: '#F4ECE2' }]}>{identity.favoriteFilm}</Text>
          </View>
        </View>

        {/* 3. Paper Cream Time Ticket */}
        <View style={[styles.identityTag, { backgroundColor: Colors.paper, transform: [{ rotate: '-1.2deg' }] }]}>
          <PozIcon name="calendar" size={14} color={Colors.mustard} />
          <View>
            <Text style={[styles.tagLabel, { color: Colors.mustard }]}>ÇEKİM SAATİ</Text>
            <Text style={[styles.tagValueText, { color: Colors.ink }]}>{identity.favoriteTime}</Text>
          </View>
        </View>

        {/* 4. Burgundy Cassette Tag */}
        <View style={[styles.identityTag, { backgroundColor: Colors.burgundy, transform: [{ rotate: '1.5deg' }] }]}>
          <PozIcon name="music" size={14} color="#F4ECE2" />
          <View>
            <Text style={[styles.tagLabel, { color: 'rgba(244, 236, 226, 0.75)' }]}>TÜR</Text>
            <Text style={[styles.tagValueText, { color: '#F4ECE2' }]}>{identity.topGenre}</Text>
          </View>
        </View>

        {/* 5. Deep Navy Location Tag */}
        <View style={[styles.identityTag, { backgroundColor: Colors.deepNavy, transform: [{ rotate: '-1deg' }] }]}>
          <PozIcon name="photo" size={14} color={Colors.filmBlue} />
          <View>
            <Text style={[styles.tagLabel, { color: Colors.filmBlue }]}>FAVORİ MEKAN</Text>
            <Text style={[styles.tagValueText, { color: '#F4ECE2' }]}>{identity.topLocation}</Text>
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
    borderColor: 'rgba(28, 26, 36, 0.1)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tagLabel: {
    fontSize: 8.5,
    fontFamily: Fonts.mono,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tagValueText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
  },
  summaryCard: {
    backgroundColor: '#F7F2EA',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryText: {
    fontSize: 13,
    fontFamily: Fonts.sansMedium,
    fontStyle: 'italic',
    color: Colors.ink,
    lineHeight: 18,
  },
});
