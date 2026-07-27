import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PozIcon } from '@/components/PozIcon';

interface PhotoFilmLinkProps {
  filmTitle: string;
  filmId: string;
}

export const PhotoFilmLink: React.FC<PhotoFilmLinkProps> = ({ filmTitle, filmId }) => {
  const router = useRouter();

  const handleGoToFilm = () => {
    router.push({
      pathname: '/film/[id]',
      params: { id: filmId },
    });
  };

  return (
    <ScrapbookCard
      bgColor={Colors.lavender}
      rotation="-1deg"
      hasTape="top-left"
      tapeColor={Colors.tapeLavender}
      padding={Spacing.md}
      style={styles.card}
    >
      <View style={styles.contentRow}>
        <View style={styles.infoGroup}>
          <PozIcon name="films" size={20} color={Colors.lavenderDark} />
          <View>
            <Text style={styles.titleText}>bu kare {filmTitle} filmine ait.</Text>
            <Text style={styles.subText}>tüm kareleri ve film hikayesini gör</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          accessibilityLabel="filme git"
          onPress={handleGoToFilm}
          style={styles.filmLinkButton}
        >
          <Text style={styles.filmLinkText}>filme git ›</Text>
        </TouchableOpacity>
      </View>
    </ScrapbookCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: Spacing.xs,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  infoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  subText: {
    fontSize: 11,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  filmLinkButton: {
    backgroundColor: '#181520',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.sm,
  },
  filmLinkText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF9',
  },
});
