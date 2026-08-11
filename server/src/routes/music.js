const express = require('express');
const router = express.Router();

// iTunes Search API Entegrasyonu (Ücretsiz & API Key gerektirmez)
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q || req.query.query;
    if (!query) {
      return res.status(400).json({ success: false, error: 'Arama terimi (q) zorunludur' });
    }

    const iTunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=15&country=TR`;
    const response = await fetch(iTunesUrl);
    const data = await response.json();

    const formattedSongs = (data.results || []).map(item => ({
      id: String(item.trackId),
      title: item.trackName,
      artist: item.artistName,
      album: item.collectionName,
      albumCover: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '300x300bb') : null,
      previewUrl: item.previewUrl,
      durationMs: item.trackTimeMillis
    }));

    return res.json({
      success: true,
      query,
      count: formattedSongs.length,
      songs: formattedSongs
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
