import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';
import { ProfileMemory } from '@/utils/profileData';

interface MemoryCollageProps {
  memories: ProfileMemory[];
}

export const MemoryCollage: React.FC<MemoryCollageProps> = ({ memories }) => {
  const router = useRouter();

  const handleGoToArchive = () => {
    router.push('/(tabs)/films');
  };

  return (
    <View style={styles.container}>
      <SectionTitle title="son anıların" stamp="PHOTO PRINTS" />

      {/* Photo Prints Horizontal Collage Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {memories.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.polaroidFrame,
              { transform: [{ rotate: item.rotation }] },
            ]}
          >
            <TapeDecoration
              position={index % 2 === 0 ? 'top-left' : 'top-right'}
              width={28}
              height={10}
              color={index % 2 === 0 ? Colors.tapePink : Colors.tapeLavender}
            />

            <View style={[styles.photoVisual, { backgroundColor: item.bgColors[0] }]}>
              <View style={[styles.visualAccentCircle, { backgroundColor: item.bgColors[1] }]} />
              <PozIcon name={item.iconName} size={26} color="#FFFDF6" />
            </View>

            <View style={styles.captionRow}>
              <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.dateCodeText}>{item.dateStr} • {item.frameCode}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Go to Archive CTA */}
      <TouchableOpacity
        activeOpacity={0.8}
        accessibilityLabel="arşive git"
        onPress={handleGoToArchive}
        style={styles.archiveLinkButton}
      >
        <Text style={styles.archiveLinkText}>arşive git</Text>
        <PozIcon name="arrow-right" size={16} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: 2,
    paddingVertical: 8,
    gap: 14,
  },
  polaroidFrame: {
    width: 145,
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.sm,
    padding: 7,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  photoVisual: {
    width: '100%',
    height: 105,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  visualAccentCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    top: -10,
    right: -10,
    opacity: 0.65,
  },
  captionRow: {
    marginTop: 6,
    gap: 1,
  },
  titleText: {
    fontSize: 13,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
  },
  dateCodeText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
  },
  archiveLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDF9',
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
    marginTop: Spacing.xs,
  },
  archiveLinkText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
});
