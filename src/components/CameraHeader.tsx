import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { FilmCounter } from '@/components/FilmCounter';

interface CameraHeaderProps {
  filmName?: string;
  filmType?: string;
  remainingFrames?: number;
}

export const CameraHeader: React.FC<CameraHeaderProps> = ({
  filmName = 'film rulosu',
  filmType = '35mm · iso 400',
  remainingFrames = 24,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleInfoGroup}>
        <PaperStamp label="FILM IN USE" color={Colors.yellow} rotation="-2deg" />

        <View style={styles.textGroup}>
          <Text style={styles.filmNameText}>{filmName}</Text>
          <Text style={styles.filmTypeText}>{filmType}</Text>
        </View>
      </View>

      <FilmCounter remainingFrames={remainingFrames} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  titleInfoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textGroup: {
    gap: 1,
  },
  filmNameText: {
    fontSize: 20,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: '#FFFDF9',
    letterSpacing: -0.3,
  },
  filmTypeText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: 'rgba(255, 255, 255, 0.65)',
    textTransform: 'uppercase',
  },
});
