import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { MOOD_OPTIONS, MoodOptionItem } from '@/utils/captureReviewData';

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

      {/* Mood Stickers Grid */}
      <View style={styles.stickersGrid}>
        {MOOD_OPTIONS.map((item, index) => {
          const isSelected = selectedMood === item.label && !customMood;
          const rotation = index % 2 === 0 ? '-1.8deg' : '1.8deg';

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
                styles.stickerCard,
                { backgroundColor: item.color, transform: [{ rotate: isSelected ? '0deg' : rotation }] },
                isSelected && styles.selectedStickerCard,
              ]}
            >
              {isSelected ? (
                <PozIcon name="star" size={14} color={Colors.text} />
              ) : (
                <PozIcon name="sparkle" size={14} color={Colors.text} />
              )}
              <Text
                style={[
                  styles.stickerText,
                  isSelected && styles.selectedStickerText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Custom Mood Action */}
      {!showCustomInput ? (
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => setShowCustomInput(true)}
          style={styles.customMoodButton}
        >
          <Text style={styles.customMoodButtonText}>+ kendi hissimi yaz</Text>
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
            placeholder="hissini yaz (örn: dingin)..."
            placeholderTextColor="rgba(28, 26, 36, 0.4)"
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  stickersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  stickerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: BorderRadius.sm,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedStickerCard: {
    borderWidth: 2,
    borderColor: '#181520',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  stickerText: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  selectedStickerText: {
    fontFamily: Fonts.sansBlack,
  },
  customMoodButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginTop: 2,
  },
  customMoodButtonText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  customInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
    marginTop: 4,
  },
  customInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.text,
  },
  customCloseButton: {
    backgroundColor: '#181520',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  customCloseText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: '#FFFDF6',
  },
});
