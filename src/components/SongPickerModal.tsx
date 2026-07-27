import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Colors, Fonts, Spacing, BorderRadius } from '@/constants/theme';
import { PozIcon } from '@/components/PozIcon';
import { MOCK_SONGS, MockSongItem } from '@/utils/captureReviewData';

interface SongPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectSong: (song: MockSongItem) => void;
}

export const SongPickerModal: React.FC<SongPickerModalProps> = ({
  visible,
  onClose,
  onSelectSong,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = MOCK_SONGS.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdropOverlay}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={styles.backdropTouch}
        />

        {/* Bottom Cream Sheet Panel */}
        <View style={styles.sheetPanel}>
          {/* Top Grab Handle */}
          <View style={styles.grabHandle} />

          {/* Modal Header */}
          <View style={styles.modalHeaderRow}>
            <View style={styles.modalTitleGroup}>
              <PozIcon name="music" size={18} color={Colors.pinkDark} />
              <Text style={styles.modalTitleText}>bir şarkı seç</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onClose}
              style={styles.closeIconButton}
            >
              <Text style={styles.closeIconText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={styles.searchBarBox}>
            <PozIcon name="search" size={16} color={Colors.textMuted} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="şarkı veya sanatçı ara..."
              placeholderTextColor={Colors.textMuted}
              style={styles.searchInput}
            />
          </View>

          {/* Song List */}
          <ScrollView
            style={styles.songListScroll}
            showsVerticalScrollIndicator={false}
          >
            {filteredSongs.map((song) => (
              <TouchableOpacity
                key={song.id}
                activeOpacity={0.82}
                onPress={() => {
                  onSelectSong(song);
                  onClose();
                }}
                style={styles.songItemRow}
              >
                <View style={[styles.albumSquare, { backgroundColor: song.color }]}>
                  <PozIcon name="music" size={16} color={Colors.text} />
                </View>

                <View style={styles.songTextGroup}>
                  <Text style={styles.songTitleText}>{song.title}</Text>
                  <Text style={styles.songArtistText}>{song.artist}</Text>
                </View>

                <View style={styles.selectTag}>
                  <Text style={styles.selectTagText}>SEÇ</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdropOverlay: {
    flex: 1,
    backgroundColor: 'rgba(22, 19, 31, 0.65)',
    justifyContent: 'flex-end',
  },
  backdropTouch: {
    flex: 1,
  },
  sheetPanel: {
    backgroundColor: '#FFFDF9',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl + 10,
    maxHeight: '75%',
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  grabHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(28, 26, 36, 0.2)',
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  modalTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitleText: {
    fontSize: 18,
    fontFamily: Fonts.serif,
    fontWeight: '800',
    color: Colors.text,
  },
  closeIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(28, 26, 36, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: Colors.textSecondary,
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 26, 36, 0.04)',
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.08)',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.sans,
    color: Colors.text,
  },
  songListScroll: {
    marginTop: 4,
  },
  songItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.06)',
    gap: 12,
  },
  albumSquare: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
  },
  songTextGroup: {
    flex: 1,
  },
  songTitleText: {
    fontSize: 14,
    fontFamily: Fonts.sansExtraBold,
    color: Colors.text,
  },
  songArtistText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  selectTag: {
    backgroundColor: Colors.pink,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(28, 26, 36, 0.1)',
  },
  selectTagText: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    fontWeight: '800',
    color: Colors.pinkDark,
  },
});
