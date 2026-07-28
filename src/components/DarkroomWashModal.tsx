import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';

interface DarkroomWashModalProps {
  visible: boolean;
  filmTitle?: string;
  onComplete: () => void;
  onClose?: () => void;
}

export const DarkroomWashModal: React.FC<DarkroomWashModalProps> = ({
  visible,
  filmTitle = 'summer glow',
  onComplete,
  onClose,
}) => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('FİLM RENK VE ASİT BANYOSUNA GİRDİ...');
  const [isFinished, setIsFinished] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (visible) {
      setProgress(0);
      setIsFinished(false);
      setStageText('FİLM RENK VE ASİT BANYOSUNA GİRDİ...');

      // Film negative strip horizontal sliding loop animation
      Animated.loop(
        Animated.timing(slideAnim, {
          toValue: -120,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Red Darkroom Light Pulsing
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.4,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Progress intervals
      const t1 = setTimeout(() => {
        setProgress(35);
        setStageText('FİKSASYON VE SU BANYOSUNDAN GEÇİYOR...');
      }, 1200);

      const t2 = setTimeout(() => {
        setProgress(75);
        setStageText('KURUTMA VE NETLEŞTİRME İŞLEMİ YAPILIYOR...');
      }, 2400);

      const t3 = setTimeout(() => {
        setProgress(100);
        setStageText('BANYO TAMAMLANDI! TÜM KARELER AÇILDI ✨');
        setIsFinished(true);
      }, 3500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.darkroomBackdrop}>
        <View style={styles.darkroomCard}>
          {/* Header Red Light Accent */}
          <Animated.View style={[styles.redLightIndicator, { opacity: pulseAnim }]} />

          <View style={styles.headerRow}>
            <PaperStamp label="DARKROOM LAB" color={Colors.stampRed} rotation="-2deg" />
            <Text style={styles.labCodeText}>LAB-PROCESS • 35MM</Text>
          </View>

          {/* Film Title */}
          <Text style={styles.filmTitleText}>{filmTitle}</Text>
          <Text style={styles.subText}>Karanlık oda yıkatma ve netleştirme süreci</Text>

          {/* Sliding Animated Film Negative Strip */}
          <View style={styles.filmStripWindow}>
            <Animated.View
              style={[
                styles.slidingFilmTrack,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              {Array.from({ length: 8 }).map((_, idx) => (
                <View key={idx} style={styles.mockNegativeCell}>
                  <View style={styles.mockSprocketTop} />
                  <View style={styles.mockFrameBox}>
                    <PozIcon name="photo" size={18} color="rgba(244, 236, 226, 0.4)" />
                    <Text style={styles.cellCodeText}>{`0${idx + 1}A`}</Text>
                  </View>
                  <View style={styles.mockSprocketBottom} />
                </View>
              ))}
            </Animated.View>
          </View>

          {/* Progress Bar & Status Text */}
          <View style={styles.progressArea}>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusText}>{stageText}</Text>
              <Text style={styles.percentText}>{`%${progress}`}</Text>
            </View>
          </View>

          {/* Bottom Action CTA */}
          {isFinished ? (
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={onComplete}
              style={styles.completeButton}
            >
              <Text style={styles.completeButtonText}>KARELERİ GÖR VE AÇ ›</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.waitingHintText}>lütfen film banyosunun tamamlanmasını bekle...</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  darkroomBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(17, 14, 24, 0.94)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  darkroomCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1C1424',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(201, 74, 74, 0.4)',
    shadowColor: '#C94A4A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    position: 'relative',
  },
  redLightIndicator: {
    position: 'absolute',
    top: 14,
    right: 16,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.dangerLab,
    shadowColor: Colors.dangerLab,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  labCodeText: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    color: Colors.filmBlue,
    fontWeight: '700',
  },
  filmTitleText: {
    fontSize: 26,
    fontFamily: Fonts.sansBlack,
    color: '#F4ECE2',
    letterSpacing: -0.5,
  },
  subText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    marginTop: 2,
    marginBottom: 16,
  },
  filmStripWindow: {
    height: 100,
    backgroundColor: '#111827',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 12,
    justifyContent: 'center',
  },
  slidingFilmTrack: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 8,
  },
  mockNegativeCell: {
    width: 110,
    height: 84,
    backgroundColor: '#18131D',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  mockSprocketTop: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 2,
  },
  mockSprocketBottom: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 2,
  },
  mockFrameBox: {
    flex: 1,
    marginVertical: 3,
    backgroundColor: '#111827',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellCodeText: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: Colors.mustard,
    marginTop: 2,
  },
  progressArea: {
    marginVertical: 12,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.dangerLab,
    borderRadius: 4,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 10.5,
    fontFamily: Fonts.mono,
    color: '#F4ECE2',
    flex: 1,
  },
  percentText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.mustard,
    fontWeight: '800',
    marginLeft: 8,
  },
  completeButton: {
    backgroundColor: Colors.burgundy,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(244, 236, 226, 0.3)',
  },
  completeButtonText: {
    color: '#F4ECE2',
    fontFamily: Fonts.sansBlack,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  waitingHintText: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },
});
