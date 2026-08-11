import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { PaperStamp } from './PaperStamp';


interface SectionTitleProps {
  title: string;
  categoryLabel?: string;
  code?: string;
  stamp?: string;
  actionLabel?: string;
  onPressAction?: () => void;
  style?: ViewStyle;
  isStampedTitle?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  categoryLabel,
  code,
  stamp,
  actionLabel,
  onPressAction,
  style,
  isStampedTitle = false,
}) => {
  const defaultCategory = categoryLabel || 'ARCHIVE LOG';

  return (
    <View style={[styles.container, style]}>
      <View style={styles.contentColumn}>
        {/* Top Spaced Mono Category Tag */}
        <View style={styles.topMetaRow}>
          <Text style={styles.monoCategoryText}>{defaultCategory}</Text>
          {onPressAction ? (
            <TouchableOpacity activeOpacity={0.75} onPress={onPressAction} style={styles.actionLinkRow}>
              <Text style={styles.actionLinkText}>{actionLabel || 'tümünü gör ›'}</Text>
            </TouchableOpacity>
          ) : (
            code && <Text style={styles.monoCodeText}>{code}</Text>
          )}
        </View>

        {/* Clean Plain Title Row */}
        <View style={styles.titleRow}>
          {isStampedTitle ? (
            <View style={styles.stampedTitleBadge}>
              <View style={styles.stampedTitleInnerDashed}>
                <Text style={styles.stampedTitleText}>{title}</Text>
              </View>
              <View style={styles.inkDotAccent} />
            </View>
          ) : (
            <Text style={styles.titleText}>{title}</Text>
          )}

          {stamp && (
            <PaperStamp
              label={stamp}
              color={Colors.stampRed}
              rotation="2deg"
            />
          )}
        </View>

        {/* Technical Editorial Hairline Divider */}
        <View style={styles.hairlineDivider} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
    paddingHorizontal: 2,
  },
  contentColumn: {
    flexDirection: 'column',
    gap: 4,
  },
  topMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monoCategoryText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    letterSpacing: 1.5,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  monoCodeText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.stampRed,
    letterSpacing: 1,
    fontWeight: '800',
  },
  actionLinkRow: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  actionLinkText: {
    fontSize: 11,
    fontFamily: Fonts.sansBold,
    color: Colors.stampRed,
    letterSpacing: 0.2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  titleText: {
    fontSize: 21,
    fontFamily: Fonts.sansSemiBold,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  stampedTitleBadge: {
    borderWidth: 1.5,
    borderColor: Colors.text,
    borderRadius: 7,
    padding: 2,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    transform: [{ rotate: '-0.5deg' }],
  },
  stampedTitleInnerDashed: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(28, 26, 36, 0.65)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  stampedTitleText: {
    fontSize: 19,
    fontFamily: Fonts.sansSemiBold,
    color: Colors.text,
    letterSpacing: -0.2,
  },
  inkDotAccent: {
    position: 'absolute',
    top: 3,
    right: 4,
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: Colors.text,
    opacity: 0.4,
  },
  hairlineDivider: {
    height: 1,
    backgroundColor: 'rgba(28, 26, 36, 0.12)',
    marginTop: 6,
    width: '100%',
  },
});
