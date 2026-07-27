import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PaperStamp } from '@/components/PaperStamp';
import { PozIcon } from '@/components/PozIcon';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigateToHome = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header: POZ Scrapbook Logo Badge */}
          <View style={styles.headerRow}>
            <View style={styles.logoBadge}>
              <TapeDecoration position="top-center" width={48} height={14} color={Colors.tapeDefault} />
              <Text style={styles.logoText}>POZ</Text>
              <Text style={styles.logoSubtext}>35MM</Text>
            </View>
            <PaperStamp label="EST 2026" color={Colors.stampRed} rotation="4deg" />
          </View>

          {/* Decorative Analog Scrapbook Photo Composition */}
          <View style={styles.heroComposition}>
            {/* Background Card 1 (Pastel Pink Photo Frame) */}
            <View style={styles.backCardPink}>
              <View style={styles.filmStripBorder}>
                <View style={styles.sprocketHoleSmall} />
                <View style={styles.sprocketHoleSmall} />
                <View style={styles.sprocketHoleSmall} />
              </View>
            </View>

            {/* Background Card 2 (Butter Yellow Note) */}
            <ScrapbookCard
              bgColor={Colors.yellow}
              rotation="-6deg"
              hasTape="top-left"
              tapeColor={Colors.tapePink}
              style={styles.backCardYellow}
            >
              <Text style={styles.handwrittenText}>summer '26 memories</Text>
            </ScrapbookCard>

            {/* Front Main Polaroid Frame */}
            <ScrapbookCard
              bgColor={Colors.backgroundCard}
              rotation="3deg"
              hasTape="top-right"
              tapeColor={Colors.tapeLavender}
              padding={12}
              style={styles.frontPolaroid}
            >
              <View style={styles.photoContainer}>
                {/* Abstract Analog Sunset / Camera Graphic */}
                <View style={styles.sunGraphic} />
                <View style={styles.cameraGraphicBox}>
                  <PozIcon name="camera" size={38} color="#FFFDF6" />
                </View>
                <View style={styles.photoCap}>
                  <Text style={styles.photoCapText}>#01 SUMMER GLOW</Text>
                </View>
              </View>
              <Text style={styles.polaroidLabel}>günün karesi</Text>
            </ScrapbookCard>
          </View>

          {/* Main Title & Subtitle */}
          <View style={styles.textSection}>
            <Text style={styles.mainTitle}>anılarını filme dönüştür.</Text>
            <Text style={styles.subTitle}>
              günlerini fotoğraflar, notlar ve şarkılarla sakla.
            </Text>
          </View>

          {/* Mock Input Fields */}
          <View style={styles.formSection}>
            <View style={styles.inputWrapper}>
              <PozIcon name="mail" size={18} color={Colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e-posta adresi"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <PozIcon name="lock" size={18} color={Colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="şifre"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Devam Et Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleNavigateToHome}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>devam et</Text>
              <PozIcon name="arrow-right" size={18} color="#FFFDF6" />
            </TouchableOpacity>
          </View>

          {/* Divider with Scrapbook Feel */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Mock Buttons */}
          <View style={styles.socialButtonsSection}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleNavigateToHome}
              style={styles.socialButton}
            >
              <PozIcon name="apple" size={20} color={Colors.text} />
              <Text style={styles.socialButtonText}>Apple ile devam et</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleNavigateToHome}
              style={styles.socialButton}
            >
              <PozIcon name="google" size={20} color={Colors.text} />
              <Text style={styles.socialButtonText}>Google ile devam et</Text>
            </TouchableOpacity>
          </View>

          {/* Skip / Guest Link */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleNavigateToHome}
            style={styles.skipButton}
          >
            <Text style={styles.skipButtonText}>şimdilik keşfet</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  logoBadge: {
    backgroundColor: Colors.tabBarBg,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFDF6',
    fontFamily: Fonts.sansBlack,
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: Colors.lavender,
    letterSpacing: 1.5,
    marginTop: -2,
  },
  heroComposition: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.sm,
    position: 'relative',
  },
  backCardPink: {
    position: 'absolute',
    width: 220,
    height: 150,
    backgroundColor: Colors.pink,
    borderRadius: BorderRadius.lg,
    transform: [{ rotate: '-10deg' }],
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'flex-start',
    padding: 8,
  },
  filmStripBorder: {
    flexDirection: 'row',
    gap: 8,
  },
  sprocketHoleSmall: {
    width: 6,
    height: 4,
    backgroundColor: 'rgba(28, 26, 36, 0.15)',
    borderRadius: 1,
  },
  backCardYellow: {
    position: 'absolute',
    width: 170,
    height: 90,
    top: 20,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handwrittenText: {
    fontFamily: Fonts.serif,
    fontStyle: 'italic',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  frontPolaroid: {
    width: 190,
    alignItems: 'center',
    zIndex: 5,
  },
  photoContainer: {
    width: '100%',
    height: 110,
    backgroundColor: '#23202C',
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  sunGraphic: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.yellow,
    top: -20,
    right: -20,
    opacity: 0.8,
  },
  cameraGraphicBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.lavenderDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFDF6',
  },
  photoCap: {
    position: 'absolute',
    bottom: 6,
    left: 8,
  },
  photoCapText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: '#FFFDF6',
    letterSpacing: 0.5,
  },
  polaroidLabel: {
    fontFamily: Fonts.serif,
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  textSection: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
    fontFamily: Fonts.sansExtraBold,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: Fonts.sans,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  formSection: {
    width: '100%',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    fontFamily: Fonts.sans,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tabBarBg,
    borderRadius: BorderRadius.md,
    height: 54,
    gap: 8,
    marginTop: 4,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFDF6',
    fontFamily: Fonts.sansBold,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: Spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: Fonts.mono,
    marginHorizontal: 12,
  },
  socialButtonsSection: {
    width: '100%',
    gap: Spacing.sm,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 50,
    gap: 10,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: Fonts.sansSemiBold,
  },
  skipButton: {
    marginTop: Spacing.lg,
    paddingVertical: 8,
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    fontFamily: Fonts.sansSemiBold,
    textDecorationLine: 'underline',
  },
});
