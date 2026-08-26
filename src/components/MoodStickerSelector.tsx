import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { MOOD_OPTIONS } from '@/utils/captureReviewData';

interface MoodStickerSelectorProps {
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
  customMood: string;
  onChangeCustomMood: (text: string) => void;
}

export const MoodStickerSelector: React.FC<MoodStickerSelectorProps> = ({
  selectedMood,
  onSelectMood,
  customMood,
  onChangeCustomMood,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);

  return (
    <View style={styles.container}>
      <SectionTitle title="bu kare nasıl hissettiriyor?" stamp="MOOD LOG" />

      <View style={styles.moodBoard}>
        <Text style={styles.backdropText}>MOOD</Text>

        <View style={styles.boardHeader}>
          <View style={styles.iconBubble}>
            <PozIcon name="sparkle" size={17} color={Colors.text} />
          </View>
          <View style={styles.summaryPill}>
            <Text style={styles.summaryPillText}>
              {(customMood || selectedMood || 'seç').toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.kickerText}>Bugünkü His</Text>
        <Text style={styles.boardTitle} numberOfLines={1}>
          {customMood || selectedMood || 'Henüz Taze'}
        </Text>

        <View style={styles.moodGrid}>
        {MOOD_OPTIONS.map((item, index) => {
          const isSelected = selectedMood === item.label && !customMood;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              accessibilityLabel={`His seçeneği: ${item.label}`}
              accessibilityState={{ selected: isSelected }}
              onPress={() => {
                onChangeCustomMood('');
                onSelectMood(item.label);
              }}
              style={[
                styles.moodChip,
                { backgroundColor: isSelected ? Colors.text : '#FFFFFF' },
              ]}
            >
              <View style={[styles.colorDot, { backgroundColor: item.color }]} />
              <Text
                style={[
                  styles.moodChipText,
                  isSelected && styles.selectedMoodChipText,
                ]}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        </View>

        {!showCustomInput ? (
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => setShowCustomInput(true)}
            style={styles.customMoodButton}
          >
            <Text style={styles.customMoodButtonText}>kendi hissimi yaz</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.customInputBox}>
            <TextInput
              value={customMood}
              onChangeText={(text) => {
                onChangeCustomMood(text);
                if (text) onSelectMood(text);
              }}
              maxLength={24}
              placeholder="hissini yaz..."
              placeholderTextColor="rgba(15, 23, 42, 0.42)"
              style={styles.customInput}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowCustomInput(false)}
              style={styles.customCloseButton}
            >
              <Text style={styles.customCloseText}>tamam</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  moodBoard: {
    marginTop: 4,
    minHeight: 238,
    backgroundColor: '#C6A5FF',
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 7,
    elevation: 3,
  },
  boardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  summaryPill: {
    maxWidth: '54%',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  summaryPillText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    fontWeight: '900',
    color: Colors.text,
  },
  kickerText: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: Colors.text,
    marginBottom: 2,
  },
  boardTitle: {
    fontSize: 30,
    lineHeight: 33,
    fontFamily: Fonts.sansBlack,
    color: Colors.text,
    textTransform: 'capitalize',
    marginBottom: 16,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moodChip: {
    width: '31.5%',
    minHeight: 54,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    justifyContent: 'space-between',
  },
  colorDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  moodChipText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
    textTransform: 'capitalize',
  },
  selectedMoodChipText: {
    color: '#FFFFFF',
  },
  customMoodButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.text,
    borderRadius: BorderRadius.full,
    paddingVertical: 9,
    paddingHorizontal: 13,
    marginTop: 14,
  },
  customMoodButtonText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: '#FFFFFF',
  },
  customInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 12,
    minHeight: 46,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    gap: 8,
    marginTop: 14,
  },
  customInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.text,
  },
  customCloseButton: {
    backgroundColor: Colors.text,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
  },
  customCloseText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: '#FFFFFF',
  },
  backdropText: {
    position: 'absolute',
    right: -10,
    bottom: -11,
    fontSize: 58,
    lineHeight: 62,
    fontFamily: Fonts.sansBold,
    color: 'rgba(255, 255, 255, 0.2)',
  },
});
