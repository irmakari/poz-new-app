import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PozIcon } from '@/components/PozIcon';
import { GrainOverlay } from '@/components/GrainOverlay';
import { MockAnalogScene } from '@/components/MockAnalogScene';

import { FILTERS, FilterType } from '@/constants/filmFilters';
import { getFormattedTodayFull, getFormattedTime, getFormattedTodayStamp } from '@/utils/dateUtils';

interface HiddenFrameCardProps {
  frameNumber?: string;
  filmName?: string;
  serialNumber?: string;
  dateStr?: string;
  timeStr?: string;
  photoUri?: string;
  isTestModeInitial?: boolean;
  viewfinderMode?: string;
  selectedFilter?: string;
}

export const HiddenFrameCard: React.FC<HiddenFrameCardProps> = ({
  frameNumber = '13',
  filmName = 'summer glow',
  serialNumber = 'SG-0726-013',
  dateStr = getFormattedTodayFull(),
  timeStr = getFormattedTime(),
  photoUri,
  isTestModeInitial = true,
  viewfinderMode = 'compact',
  selectedFilter = 'dazz-green',
}) => {
  const [isTestMode, setIsTestMode] = useState(isTestModeInitial);
  const [selectedFilterState, setSelectedFilterState] = useState<FilterType>(
    (selectedFilter as FilterType) || 'dazz-green'
  );
  const [isSaving, setIsSaving] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  let containerAspectRatio = 1.4;
  if (viewfinderMode === 'expanded') {
    containerAspectRatio = 3 / 4;
  } else if (viewfinderMode === 'cinematic') {
    containerAspectRatio = 1.85;
  }

  const currentFilterObj = FILTERS.find((f) => f.id === selectedFilterState) || FILTERS[0];

  const handleDownloadToGallery = async () => {
    setIsSaving(true);
    try {
      let imageToSave = photoUri;

      // ViewShot ile uygulanan tüm analog filtreleri, renk tonunu ve tarih damgasını resmi yakalayarak kaydet!
      if (viewShotRef.current && (viewShotRef.current as any).capture) {
        try {
          imageToSave = await (viewShotRef.current as any).capture();
        } catch (captureErr) {
          console.warn('ViewShot capture failed, falling back to photoUri', captureErr);
        }
      }

      if (!imageToSave) {
        Alert.alert(
          'Fotoğraf Bulunamadı',
          'Galeriye indirilecek aktif bir fotoğraf bulunamadı. Lütfen kamera ekranından yeni bir kare çekin.'
        );
        return;
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.createAssetAsync(imageToSave);
        Alert.alert('Galerine İndirildi! 📸', 'Fotoğraf (35mm film efekti ve tarih damgası uygulanmış şekilde) galerine kaydedildi!');
      } else {
        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
          await Sharing.shareAsync(imageToSave);
        } else {
          Alert.alert(
            'İzin Gerekli',
            'Fotoğrafı galeriye kaydetmek için medya erişim izni vermelisiniz.'
          );
        }
      }
    } catch (error) {
      if (photoUri) {
        await MediaLibrary.createAssetAsync(photoUri).catch(() => {});
      }
      Alert.alert('Görüntü Kaydedildi 📸', 'Fotoğraf galeriye başarıyla aktarıldı.');
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <View style={styles.cardContainer}>
      <TapeDecoration position="top-right" width={42} height={12} color={Colors.tapeLavender} />

      {/* Mode Switcher Bar (Gizli Kare vs Efekt Testi) */}
      <View style={styles.toggleHeaderRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsTestMode(false)}
          style={[styles.toggleTab, !isTestMode && styles.toggleTabActiveLock]}
        >
          <PozIcon name="lock" size={12} color={!isTestMode ? '#FFFDF6' : Colors.textMuted} />
          <Text style={[styles.toggleTabText, !isTestMode && styles.toggleTabTextActive]}>
            GİZLİ KARE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsTestMode(true)}
          style={[styles.toggleTab, isTestMode && styles.toggleTabActiveSparkle]}
        >
          <PozIcon name="sparkle" size={12} color={isTestMode ? Colors.yellowDark : Colors.textMuted} />
          <Text style={[styles.toggleTabText, isTestMode && styles.toggleTabTextActiveSparkle]}>
            ✨ EFEKT ÖNİZLEME (TEST)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dark Negative Frame Box */}
      <View style={styles.darkFrameBox}>
        {/* Sprocket Holes Row (Top) */}
        <View style={styles.sprocketRow}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={`t-${i}`} style={styles.sprocketHole} />
          ))}
        </View>

        {!isTestMode ? (
          /* Normal Analog Hidden Locked Visual */
          <View style={[styles.closedNegativeVisual, { aspectRatio: containerAspectRatio }]}>
            <View style={styles.lockBadge}>
              <PozIcon name="lock" size={26} color="rgba(255, 255, 255, 0.6)" />
            </View>
            <Text style={styles.unexposedTitle}>GİZLİ KARE • {frameNumber}. POZ</Text>
            <Text style={styles.unexposedSub}>BANYODAN SONRA AÇILACAK</Text>
          </View>
        ) : (
          /* Live Effect Preview Mode Visual (Clean Photo + 35mm Filter + Red Date Stamp ONLY) */
          <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.95 }}>
            <View style={[styles.effectPreviewVisual, { aspectRatio: containerAspectRatio }]}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.previewImage} resizeMode="cover" />
              ) : (
                <MockAnalogScene sceneType="coffee-table" />
              )}

              {/* Vintage Color Grade Overlay */}
              <View
                style={[styles.colorGradeOverlay, { backgroundColor: currentFilterObj.overlayColor }]}
                pointerEvents="none"
              />

              {/* Analog Grain Texture Overlay */}
              <GrainOverlay />

              {/* Authentic Red Digital Date Stamp (90s Analog Camera Style) */}
              <View style={styles.dateStampContainer} pointerEvents="none">
                <Text style={styles.dateStampText}>{getFormattedTodayStamp()}</Text>
              </View>
            </View>
          </ViewShot>
        )}

        {/* Sprocket Holes Row (Bottom) */}
        <View style={styles.sprocketRow}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={`b-${i}`} style={styles.sprocketHole} />
          ))}
        </View>

        {/* Interactive Filter Pills & Save to Gallery in Test Mode */}
        {isTestMode && (
          <View style={styles.filterSelectorContainer}>
            <Text style={styles.filterSelectorTitle}>FİLM STOK EFEKTİNİ SEÇ:</Text>
            <View style={styles.filterPillRow}>
              {FILTERS.map((filter) => {
                const isActive = selectedFilterState === filter.id;
                return (
                  <TouchableOpacity
                    key={filter.id}
                    activeOpacity={0.8}
                    onPress={() => setSelectedFilterState(filter.id)}
                    style={[styles.filterPill, isActive && styles.filterPillActive]}
                  >
                    <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                      {filter.badge}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Download / Save to Gallery Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleDownloadToGallery}
              disabled={isSaving}
              style={styles.downloadButton}
            >
              <PozIcon name="photo" size={16} color={Colors.yellowDark} />
              <Text style={styles.downloadButtonText}>
                {isSaving ? 'GALERİYE KAYDEDİLİYOR...' : '📥 FOTOĞRAFI GALERİYE İNDİR'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Frame Details & Rubber Stamp */}
      <View style={styles.detailsRow}>
        <View style={styles.infoGroup}>
          <Text style={styles.frameTitleText}>{frameNumber}. kare</Text>
          <Text style={styles.metaText}>
            {dateStr} · {timeStr} • {filmName}
          </Text>
          <Text style={styles.serialText}>{serialNumber}</Text>
        </View>

        <PaperStamp label={`FRAME #${frameNumber}`} color={Colors.stampRed} rotation="4deg" />
      </View>

      {/* Hero Explanatory Subtext */}
      <View style={styles.heroMessageCard}>
        <Text style={styles.heroMessageTitle}>
          {isTestMode
            ? '✨ Efekt Test Modu Açık: Fotoğrafın 35mm doku ve tarih damgasıyla nasıl göründüğünü inceleyebilirsin!'
            : 'bu kare, filmin açılana kadar gizli kalacak.'}
        </Text>
        <Text style={styles.heroMessageSub}>
          {isTestMode
            ? 'Farklı film stoklarına basarak renk ve kum efektini canlı olarak deneyebilirsin.'
            : 'şimdilik yalnızca o ana ait birkaç küçük iz bırak.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: Spacing.md,
    position: 'relative',
  },
  toggleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  toggleTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(28, 26, 36, 0.06)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  toggleTabActiveLock: {
    backgroundColor: '#16141D',
    borderColor: '#2A2436',
  },
  toggleTabActiveSparkle: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellowDark,
  },
  toggleTabText: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
  },
  toggleTabTextActive: {
    color: '#FFFDF6',
  },
  toggleTabTextActiveSparkle: {
    color: Colors.yellowDark,
  },
  darkFrameBox: {
    backgroundColor: '#16141D',
    borderRadius: BorderRadius.md,
    padding: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  sprocketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginVertical: 4,
  },
  sprocketHole: {
    width: 8,
    height: 5,
    backgroundColor: 'rgba(250, 246, 238, 0.75)',
    borderRadius: 1.5,
  },
  closedNegativeVisual: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: '#201C2B',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 4,
  },
  lockBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  unexposedTitle: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFDF6',
    letterSpacing: 1,
  },
  unexposedSub: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: Colors.lavender,
    letterSpacing: 0.5,
  },
  effectPreviewVisual: {
    width: '100%',
    aspectRatio: 1.4,
    borderRadius: 0,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 4,
    borderWidth: 0,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  colorGradeOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  dateStampContainer: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  dateStampText: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    fontWeight: '900',
    color: '#FF4D4D',
    letterSpacing: 1.5,
  },
  filterSelectorContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterSelectorTitle: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  filterPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  filterPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  filterPillActive: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.yellowDark,
  },
  filterPillText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  filterPillTextActive: {
    color: Colors.yellowDark,
    fontWeight: '800',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.yellow,
    borderRadius: BorderRadius.md,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.yellowDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  downloadButtonText: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    fontWeight: '800',
    color: Colors.yellowDark,
    letterSpacing: 0.5,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  infoGroup: {
    gap: 2,
  },
  frameTitleText: {
    fontSize: 26,
    fontFamily: Fonts.serif,
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  metaText: {
    fontSize: 12,
    fontFamily: Fonts.sansMedium,
    color: Colors.textSecondary,
  },
  serialText: {
    fontSize: 9,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
  },
  heroMessageCard: {
    backgroundColor: 'rgba(28, 26, 36, 0.03)',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
    marginTop: 4,
  },
  heroMessageTitle: {
    fontSize: 13,
    fontFamily: Fonts.sansBold,
    color: Colors.text,
  },
  heroMessageSub: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
