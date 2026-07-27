import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';
import { LOCATION_OPTIONS } from '@/utils/captureReviewData';

interface LocationSelectorProps {
  selectedLocation: string | null;
  onSelectLocation: (loc: string | null) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocation,
  onSelectLocation,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View style={styles.container}>
      <SectionTitle title="konum" stamp="GPS LAB" />

      {selectedLocation ? (
        <View style={styles.selectedTagRow}>
          <View style={styles.locationBlueTag}>
            <PozIcon name="sparkle" size={14} color={Colors.blueDark} />
            <Text style={styles.locationTagText}>{selectedLocation}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onSelectLocation(null)}
            style={styles.removeButton}
          >
            <Text style={styles.removeText}>kaldır ✕</Text>
          </TouchableOpacity>
        </View>
      ) : !showOptions ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>konum eklenmedi</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setShowOptions(true)}
            style={styles.addLocationButton}
          >
            <Text style={styles.addLocationText}>+ konum ekle</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.optionsList}>
          {LOCATION_OPTIONS.map((loc) => (
            <TouchableOpacity
              key={loc}
              activeOpacity={0.8}
              onPress={() => {
                onSelectLocation(loc);
                setShowOptions(false);
              }}
              style={styles.optionChip}
            >
              <Text style={styles.optionChipText}>{loc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
  },
  selectedTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  locationBlueTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.sm,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
  },
  locationTagText: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    fontWeight: '800',
    color: Colors.blueDark,
    textTransform: 'uppercase',
  },
  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  removeText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFDF9',
    borderRadius: BorderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 4,
  },
  emptyText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
  },
  addLocationButton: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  addLocationText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: Colors.blueDark,
  },
  optionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  optionChip: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
  },
  optionChipText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.blueDark,
  },
});
