const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const { supabase } = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });

let mockPhotos = [];

// GET ALL PHOTOS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { filmId, captureMode } = req.query;
    if (supabase) {
      let query = supabase.from('photos').select('*').eq('user_id', req.user?.id || '00000000-0000-0000-0000-000000000001');
      if (filmId) query = query.eq('film_id', filmId);
      if (captureMode) query = query.eq('capture_mode', captureMode);
      
      const { data, error } = await query.order('captured_at', { ascending: false });
      if (!error && data) {
        return res.json({ success: true, count: data.length, photos: data });
      }
    }

    let result = [...mockPhotos];
    if (filmId) result = result.filter(p => p.filmId === filmId);
    if (captureMode) result = result.filter(p => p.captureMode === captureMode);

    return res.json({ success: true, count: result.length, photos: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// UPLOAD & CREATE PHOTO FRAME
router.post('/upload', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const { filmId, captureMode, note, mood, location, song, frameNumber } = req.body;
    let photoUrl = null;

    // Supabase Storage'a Yükleme (varsa)
    if (supabase && req.file) {
      const fileExt = req.file.originalname.split('.').pop() || 'jpg';
      const fileName = `${req.user?.id || 'demo'}/${Date.now()}.${fileExt}`;

      const { data: storageData, error: storageErr } = await supabase.storage
        .from('photos')
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

      if (!storageErr && storageData) {
        const { data: publicUrlData } = supabase.storage.from('photos').getPublicUrl(fileName);
        photoUrl = publicUrlData.publicUrl;
      }
    }

    const newPhoto = {
      id: crypto.randomUUID(),
      user_id: req.user?.id || '00000000-0000-0000-0000-000000000001',
      film_id: filmId || null,
      capture_mode: captureMode || 'film',
      status: captureMode === 'daily' ? 'developed' : 'locked',
      frame_number: frameNumber ? parseInt(frameNumber) : 1,
      frame_code: frameNumber ? `${String(frameNumber).padStart(2, '0')}A` : '01A',
      photo_url: photoUrl || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      note: note || '',
      mood: mood || null,
      location: location || null,
      song: song ? (typeof song === 'string' ? JSON.parse(song) : song) : null,
      captured_at: new Date().toISOString()
    };

    if (supabase) {
      const { data, error } = await supabase.from('photos').insert([newPhoto]).select().single();
      if (!error && data) {
        // Eğer bir filme aitse filmdeki poz sayısını artır
        if (filmId) {
          await supabase.rpc('increment_captured_frames', { film_id_param: filmId }).catch(() => {});
        }
        return res.status(201).json({ success: true, photo: data });
      }
    }

    mockPhotos.unshift(newPhoto);
    return res.status(201).json({ success: true, photo: newPhoto });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE PHOTO DETAILS (Not, Mood, Konum, Şarkı Güncelle)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const photoId = req.params.id;
    const { note, mood, location, song } = req.body;

    const updates = {};
    if (note !== undefined) updates.note = note;
    if (mood !== undefined) updates.mood = mood;
    if (location !== undefined) updates.location = location;
    if (song !== undefined) updates.song = typeof song === 'string' ? JSON.parse(song) : song;

    if (supabase) {
      const { data, error } = await supabase.from('photos').update(updates).eq('id', photoId).select().single();
      if (!error && data) {
        return res.json({ success: true, message: 'Fotoğraf başarıyla güncellendi', photo: data });
      }
    }

    const photo = mockPhotos.find(p => p.id === photoId);
    if (photo) {
      Object.assign(photo, updates);
      return res.json({ success: true, message: 'Fotoğraf başarıyla güncellendi', photo });
    }

    return res.status(404).json({ success: false, error: 'Fotoğraf bulunamadı' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE PHOTO
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const photoId = req.params.id;
    if (supabase) {
      await supabase.from('photos').delete().eq('id', photoId);
    }
    mockPhotos = mockPhotos.filter(p => p.id !== photoId);
    return res.json({ success: true, message: 'Fotoğraf başarıyla silindi' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


module.exports = router;
