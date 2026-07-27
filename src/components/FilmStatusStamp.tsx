import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, BorderRadius } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { FilmStatus } from '@/utils/filmData';

interface FilmStatusStampProps {
  status: FilmStatus;
  frameCount?: number;
  totalFrames?: number;
  remainingTime?: string;
}

export const FilmStatusStamp: React.FC<FilmStatusStampProps> = ({
  status,
  frameCount = 12,
  totalFrames = 36,
  remainingTime = '2 sa 14 dk',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          stampText: 'FILM AÇILDI',
          stampColor: Colors.greenDark,
          bgColor: 'rgba(198, 246, 213, 0.4)',
          borderColor: Colors.greenDark,
          title: 'film açıldı',
          subtext: `${totalFrames} karenin tamamı hazır.`,
        };
      case 'developing':
        return {
          stampText: 'KARANLIK ODADA',
          stampColor: Colors.stampRed,
          bgColor: 'rgba(229, 72, 72, 0.1)',
          borderColor: Colors.stampRed,
          title: 'karanlık odada banyoda',
          subtext: `filmin hazırlanıyor (${remainingTime}).`,
        };
      case 'active':
      default:
        return {
          stampText: 'ÇEKİME DEVAM EDİYOR',
          stampColor: Colors.lavenderDark,
          bgColor: 'rgba(227, 215, 255, 0.4)',
          borderColor: Colors.lavenderDark,
          title: 'çekime devam ediyor',
          subtext: `${totalFrames - frameCount} kare kaldı.`,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.container, { backgroundColor: config.bgColor, borderColor: config.borderColor }]}>
      <PaperStamp label={config.stampText} color={config.stampColor} rotation="-2deg" />

      <View style={styles.textGroup}>
        <Text style={[styles.titleText, { color: config.stampColor }]}>{config.title}</Text>
        <Text style={styles.subtextText}>{config.subtext}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: 12,
    marginVertical: 10,
  },
  textGroup: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
  },
  subtextText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 1,
  },
});
