import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { ScrapbookCard } from '@/components/ScrapbookCard';
import { TapeDecoration } from '@/components/TapeDecoration';
import { PaperStamp } from '@/components/PaperStamp';
import { FilmProgress } from '@/components/FilmProgress';
import { WeekSelector } from '@/components/WeekSelector';
import { SectionTitle } from '@/components/SectionTitle';
import { PozIcon } from '@/components/PozIcon';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Bar */}
        <View style={styles.topBar}>
          <View style={styles.userInfoRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>I</Text>
              <View style={styles.avatarDot} />
            </View>
            <View>
              <Text style={styles.welcomeText}>merhaba, ırmak</Text>
              <Text style={styles.dateText}>27 temmuz, pazartesi</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
              <PozIcon name="search" size={20} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
              <PozIcon name="bell" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Card: Analog Film Envelope / Photo Sleeve */}
        <ScrapbookCard
          bgColor={Colors.blue}
          rotation="-1.2deg"
          hasTape="top-right"
          tapeColor={Colors.tapeDefault}
          tapeRotation="14deg"
          padding={Spacing.lg}
          style={styles.heroEnvelope}
        >
          {/* Top Notch of Lab Envelope */}
          <View style={styles.envelopeFlapLine} />

          <View style={styles.heroHeaderRow}>
            <View style={styles.heroTitleGroup}>
              <PaperStamp label="35MM ISO 400" color={Colors.blueDark} rotation="-3deg" />
              <Text style={styles.heroSubHeader}>bugünün filmi</Text>
            </View>

            {/* Physical Layered Film Canister Object */}
            <View style={styles.filmCanisterGraphic}>
              <View style={styles.canisterSpool} />
              <View style={styles.canisterBody}>
                <View style={styles.canisterRing} />
                <PozIcon name="films" size={22} color="#FFFDF6" />
              </View>
            </View>
          </View>

          {/* Film Name */}
          <Text style={styles.filmTitle}>summer glow</Text>

          {/* Physical 35mm Negative Film Strip Component */}
          <FilmProgress currentFrames={12} totalFrames={36} />

          <View style={styles.heroFooterRow}>
            <Text style={styles.frameCounterText}>12 / 36 kare çektin</Text>
            <Text style={styles.remainingBadge}>24 KARE KALDI</Text>
          </View>
        </ScrapbookCard>

        {/* Weekly Date Selector (Lab Date Tickets) */}
        <WeekSelector />

        {/* Section Header with Highlighter Accent & Rubber Stamp */}
        <SectionTitle title="bugünün anıları" stamp="DAILY LOG" />

        {/* Organic Scrapbook Collage (Staggered Layout) */}
        <View style={styles.collageContainer}>
          {/* Left Column */}
          <View style={styles.collageColumnLeft}>
            {/* 1. Yellow Memo Sheet Card (Torn Bottom Edge) */}
            <ScrapbookCard
              bgColor={Colors.yellow}
              rotation="-2.4deg"
              hasTape="top-left"
              tapeColor={Colors.tapePink}
              hasTornEdge="bottom"
              padding={Spacing.md}
              style={styles.yellowMemoCard}
            >
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderTitle}>günün notu</Text>
                <PaperStamp label="MEMO" color={Colors.yellowDark} rotation="4deg" />
              </View>

              <Text style={styles.handwrittenNoteText}>
                “bugün biraz yorucuydu ama akşam güzel hissettirdi.”
              </Text>

              <View style={styles.noteFooter}>
                <Text style={styles.handwrittenTimestamp}>22:45 • ev</Text>
              </View>
            </ScrapbookCard>

            {/* 4. Green Mood Sticker Card */}
            <ScrapbookCard
              bgColor={Colors.green}
              rotation="3deg"
              hasTape="top-right"
              tapeColor={Colors.tapeDefault}
              padding={Spacing.md}
              style={styles.greenStickerCard}
            >
              <View style={styles.moodHeaderRow}>
                <PozIcon name="sparkle" size={20} color={Colors.greenDark} />
                <Text style={styles.moodTagText}>bugünkü hissin</Text>
              </View>
              <Text style={styles.moodValueText}>huzurlu</Text>

              <View style={styles.stickerBadge}>
                <Text style={styles.stickerText}>★ GOOD VIBES</Text>
              </View>
            </ScrapbookCard>
          </View>

          {/* Right Column */}
          <View style={styles.collageColumnRight}>
            {/* 2. Mat Lavender Cardstock with Stacked Photo Prints */}
            <ScrapbookCard
              bgColor={Colors.lavender}
              rotation="1.6deg"
              hasTape="top-right"
              tapeColor={Colors.tapeBlue}
              padding={Spacing.md}
              style={styles.bluePhotosCard}
            >
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardHeaderTitle}>bugünün kareleri</Text>
                <Text style={styles.photoCountBadge}>2 KARE</Text>
              </View>

              {/* Physical Stacked Polaroid Prints */}
              <View style={styles.photoStackContainer}>
                {/* Back Photo Print */}
                <View style={styles.photoPrintBack}>
                  <View style={styles.negativeDarkFill}>
                    <PozIcon name="photo" size={22} color="rgba(255, 255, 255, 0.4)" />
                  </View>
                  <Text style={styles.printCodeText}>KARE #01</Text>
                </View>

                {/* Front Photo Print */}
                <View style={styles.photoPrintFront}>
                  <TapeDecoration position="top-right" width={32} height={10} color={Colors.tapeDefault} />
                  <View style={styles.negativeDarkFillFront}>
                    <PozIcon name="camera" size={24} color={Colors.lavender} />
                  </View>
                  <Text style={styles.printCodeText}>KARE #02 • 35MM</Text>
                </View>
              </View>
            </ScrapbookCard>

            {/* 3. Pink Cassette Tape / Concert Ticket Card */}
            <ScrapbookCard
              bgColor={Colors.pink}
              rotation="-1.8deg"
              hasTape="bottom-left"
              tapeColor={Colors.tapeDefault}
              padding={Spacing.md}
              style={styles.pinkSongCard}
            >
              <View style={styles.cardHeaderRow}>
                <PozIcon name="music" size={18} color={Colors.pinkDark} />
                <Text style={styles.songLabel}>günün şarkısı</Text>
              </View>

              {/* Physical Cassette Label / Album Badge */}
              <View style={styles.cassetteContainer}>
                <View style={styles.albumCoverBox}>
                  <PozIcon name="music" size={20} color="#FFFDF6" />
                </View>
                <View style={styles.songInfoGroup}>
                  <Text style={styles.songTitleText} numberOfLines={1}>a canım</Text>
                  <Text style={styles.artistNameText} numberOfLines={1}>mabel matiz</Text>
                </View>
              </View>

              {/* Tape Notches / Sound Wave */}
              <View style={styles.audioWaveformMock}>
                <View style={[styles.waveBar, { height: 10 }]} />
                <View style={[styles.waveBar, { height: 18 }]} />
                <View style={[styles.waveBar, { height: 12 }]} />
                <View style={[styles.waveBar, { height: 22 }]} />
                <View style={[styles.waveBar, { height: 14 }]} />
                <View style={[styles.waveBar, { height: 8 }]} />
              </View>
            </ScrapbookCard>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: 130, // Bottom Tab Bar clearance
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lavenderDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFDF6',
    position: 'relative',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: '#FFFDF6',
    fontSize: 18,
    fontFamily: Fonts.sansExtraBold,
  },
  avatarDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.greenDark,
    borderWidth: 2,
    borderColor: '#FFFDF6',
  },
  welcomeText: {
    fontSize: 18,
    color: Colors.text,
    fontFamily: Fonts.sansExtraBold,
  },
  dateText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.mono,
    marginTop: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  /* Hero Envelope Styles */
  heroEnvelope: {
    marginBottom: Spacing.sm,
    position: 'relative',
  },
  envelopeFlapLine: {
    position: 'absolute',
    top: 0,
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: 'rgba(43, 131, 186, 0.3)',
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTitleGroup: {
    gap: 4,
  },
  heroSubHeader: {
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: Fonts.mono,
    marginTop: 4,
  },
  filmCanisterGraphic: {
    alignItems: 'center',
    transform: [{ rotate: '5deg' }],
  },
  canisterSpool: {
    width: 14,
    height: 6,
    backgroundColor: '#16141D',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  canisterBody: {
    width: 38,
    height: 42,
    backgroundColor: '#16141D',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  canisterRing: {
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.yellow,
  },
  filmTitle: {
    fontSize: 28,
    color: Colors.text,
    fontFamily: Fonts.serif,
    marginVertical: 4,
    letterSpacing: -0.5,
  },
  heroFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  frameCounterText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.mono,
  },
  remainingBadge: {
    fontSize: 10,
    color: Colors.blueDark,
    fontFamily: Fonts.mono,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(43, 131, 186, 0.2)',
  },

  /* Collage Staggered Grid */
  collageContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  collageColumnLeft: {
    flex: 1,
    gap: Spacing.md,
  },
  collageColumnRight: {
    flex: 1,
    gap: Spacing.md,
    marginTop: 10, // Staggered offset for organic collage feel
  },

  /* Yellow Memo Card */
  yellowMemoCard: {
    minHeight: 165,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderTitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
  },
  handwrittenNoteText: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: Fonts.serif,
    fontStyle: 'italic',
    lineHeight: 21,
    marginVertical: 4,
  },
  noteFooter: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
  },
  handwrittenTimestamp: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    color: Colors.yellowDark,
  },

  /* Green Mood Card */
  greenStickerCard: {
    minHeight: 125,
    justifyContent: 'space-between',
  },
  moodHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moodTagText: {
    fontSize: 11,
    color: Colors.greenDark,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
  },
  moodValueText: {
    fontSize: 24,
    color: Colors.text,
    fontFamily: Fonts.sansBlack,
    marginVertical: 2,
  },
  stickerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.greenDark,
    borderStyle: 'dashed',
  },
  stickerText: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: Colors.greenDark,
  },

  /* Blue Photo Prints Card */
  bluePhotosCard: {
    minHeight: 190,
  },
  photoCountBadge: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    color: Colors.lavenderDark,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  photoStackContainer: {
    height: 125,
    marginTop: 8,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPrintBack: {
    position: 'absolute',
    width: 105,
    height: 95,
    backgroundColor: '#FFFDF9',
    borderRadius: 4,
    padding: 5,
    transform: [{ rotate: '-8deg' }],
    borderWidth: 1,
    borderColor: Colors.border,
    top: 4,
    left: 4,
    alignItems: 'center',
  },
  photoPrintFront: {
    position: 'absolute',
    width: 110,
    height: 102,
    backgroundColor: '#FFFDF9',
    borderRadius: 4,
    padding: 5,
    transform: [{ rotate: '4deg' }],
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    alignItems: 'center',
  },
  negativeDarkFill: {
    width: '100%',
    height: 64,
    backgroundColor: '#1E1B26',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  negativeDarkFillFront: {
    width: '100%',
    height: 70,
    backgroundColor: '#181520',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  printCodeText: {
    fontSize: 8,
    fontFamily: Fonts.mono,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  /* Pink Song Card */
  pinkSongCard: {
    minHeight: 135,
  },
  songLabel: {
    fontSize: 11,
    color: Colors.pinkDark,
    fontFamily: Fonts.mono,
    textTransform: 'uppercase',
  },
  cassetteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  albumCoverBox: {
    width: 38,
    height: 38,
    borderRadius: 6,
    backgroundColor: Colors.pinkDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFDF9',
  },
  songInfoGroup: {
    flex: 1,
  },
  songTitleText: {
    fontSize: 15,
    color: Colors.text,
    fontFamily: Fonts.sansExtraBold,
  },
  artistNameText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: Fonts.sans,
  },
  audioWaveformMock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginTop: 10,
    paddingTop: 4,
  },
  waveBar: {
    width: 4,
    backgroundColor: Colors.pinkDark,
    borderRadius: 2,
    opacity: 0.7,
  },
});
