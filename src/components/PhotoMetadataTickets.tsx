import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { PhotoEntry } from '@/utils/photoDetailData';

interface PhotoMetadataTicketsProps {
  photo: PhotoEntry;
}

export const PhotoMetadataTickets: React.FC<PhotoMetadataTicketsProps> = ({ photo }) => {
  return (
    <View style={styles.container}>
      <SectionTitle title="bu karenin küçük izleri" stamp="PHOTO LOG" />

      <View style={styles.ticketsGrid}>
        {/* 1. Date & Time */}
        <View style={[styles.ticketBadge, { backgroundColor: '#FFF1B0', transform: [{ rotate: '-1.5deg' }] }]}>
          <PozIcon name="calendar" size={12} color="#5C4A00" />
          <Text style={[styles.ticketText, { color: '#181520' }]}>{photo.date} · {photo.time}</Text>
        </View>

        {/* 2. Frame Code */}
        <View style={[styles.ticketBadge, { backgroundColor: Colors.lavender, transform: [{ rotate: '1.8deg' }] }]}>
          <PozIcon name="photo" size={12} color="#FFFDF9" />
          <Text style={[styles.ticketText, { color: '#FFFDF9' }]}>KARE #{photo.frameNumber} ({photo.frameCode})</Text>
        </View>

        {/* 3. Location */}
        {photo.location ? (
          <View style={[styles.ticketBadge, { backgroundColor: Colors.blue, transform: [{ rotate: '-1deg' }] }]}>
            <PozIcon name="photo" size={12} color="#FFFDF9" />
            <Text style={[styles.ticketText, { color: '#FFFDF9' }]}>📍 {photo.location}</Text>
          </View>
        ) : null}

        {/* 4. Mood */}
        {photo.mood ? (
          <View style={[styles.ticketBadge, { backgroundColor: Colors.green, transform: [{ rotate: '1.2deg' }] }]}>
            <PozIcon name="sparkle" size={12} color="#FFFDF9" />
            <Text style={[styles.ticketText, { color: '#FFFDF9' }]}>HİS: {photo.mood}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  ticketsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  ticketBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: BorderRadius.sm,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  ticketText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
});
