import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';

interface SongTicketProps {
  title: string;
  artist: string;
  duration: string;
}

export const SongTicket: React.FC<SongTicketProps> = ({
  title,
  artist,
  duration,
}) => {
  const handleOpenSong = () => {
    Alert.alert(
      'POZ Müzik',
      'Şarkı entegrasyonu yakında eklenecek.',
      [{ text: 'Tamam', style: 'default' }]
    );
  };

  return (
    <ScrapbookCard
      bgColor={Colors.pink}
      rotation="1.8deg"
      hasTape="bottom-right"
      tapeColor={Colors.tapeDefault}
      padding={Spacing.md}
      style={styles.containerCard}
    >
      <View style={styles.cardHeaderRow}>
        <View style={styles.headerLabelGroup}>
          <PozIcon name="music" size={18} color={Colors.pinkDark} />
          <Text style={styles.headerTitle}>günün şarkısı</Text>
        </View>

        <PaperStamp label="NOW PLAYING" color={Colors.pinkDark} rotation="-3deg" />
      </View>

      {/* Cassette / Album Ticket Body */}
      <View style={styles.cassetteBody}>
        <View style={styles.albumCoverBox}>
          <PozIcon name="music" size={24} color="#FFFDF9" />
        </View>

        <View style={styles.songInfoGroup}>
          <Text style={styles.songTitleText}>{title}</Text>
          <Text style={styles.artistNameText}>{artist}</Text>

          <View style={styles.durationRow}>
            <Text style={styles.durationText}>{duration}</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.serialText}>35MM-AUDIO-A1</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleOpenSong}
          style={styles.playButtonCircle}
        >
          <PozIcon name="arrow-right" size={16} color={Colors.pinkDark} />
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
  headerLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 12,
    color: Colors.pinkDark,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cassetteBody: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(217, 72, 143, 0.2)',
    gap: 12,
  },
  albumCoverBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.pinkDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFDF9',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  songInfoGroup: {
    flex: 1,
  },
  songTitleText: {
    fontSize: 17,
    fontFamily: Fonts.sansExtraBold,
    color: Colors.text,
  },
  artistNameText: {
    fontSize: 13,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  durationText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.pinkDark,
    fontWeight: '800',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.pinkDark,
  },
  serialText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
  },
  playButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFDF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(217, 72, 143, 0.3)',
  },
});
