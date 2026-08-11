const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { supabase } = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

// In-memory fallback
let mockFilms = [];

// GET ALL FILMS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (supabase) {
      const { data, error } = await supabase.from('films').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      if (!error && data) {
        return res.json({ success: true, count: data.length, films: data });
      }
    }
    return res.json({ success: true, count: mockFilms.length, films: mockFilms });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// CREATE NEW FILM
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, filmTypeName, filmTypeId, totalFrames, iso, colorToken } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, error: 'Film adı zorunludur' });
    }

    const newFilm = {
      id: crypto.randomUUID(),
      user_id: req.user?.id || '00000000-0000-0000-0000-000000000001',
      name: name.toLowerCase(),
      film_type_name: filmTypeName || 'Summer Glow',
      film_type_id: filmTypeId || 'ft-summer-glow',
      iso: iso || 400,
      total_frames: totalFrames || 24,
      captured_frames: 0,
      status: 'active',
      color_token: colorToken || '#111827',
      created_at: new Date().toISOString()
    };

    if (supabase) {
      const { data, error } = await supabase.from('films').insert([newFilm]).select().single();
      if (!error && data) {
        return res.status(201).json({ success: true, film: data });
      }
    }

    mockFilms.unshift(newFilm);
    return res.status(201).json({ success: true, film: newFilm });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET FILM BY ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const filmId = req.params.id;
    if (supabase) {
      const { data, error } = await supabase.from('films').select('*, photos(*)').eq('id', filmId).single();
      if (!error && data) {
        return res.json({ success: true, film: data });
      }
    }

    const film = mockFilms.find(f => f.id === filmId);
    if (!film) {
      return res.status(404).json({ success: false, error: 'Film bulunamadı' });
    }

    return res.json({ success: true, film });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// START DEVELOPING FILM (Karanlık Odaya Gönder)
router.patch('/:id/develop', authMiddleware, async (req, res) => {
  try {
    const filmId = req.params.id;
    const now = new Date().toISOString();

    if (supabase) {
      const { data, error } = await supabase.from('films').update({
        status: 'developing',
        developing_started_at: now
      }).eq('id', filmId).select().single();

      if (!error && data) {
        return res.json({ success: true, message: 'Film yıkamaya gönderildi', film: data });
      }
    }

    const film = mockFilms.find(f => f.id === filmId);
    if (film) {
      film.status = 'developing';
      film.developingStartedAt = now;
      return res.json({ success: true, message: 'Film yıkamaya gönderildi', film });
    }

    return res.status(404).json({ success: false, error: 'Film bulunamadı' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ARCHIVE FILM
router.patch('/:id/archive', authMiddleware, async (req, res) => {
  try {
    const filmId = req.params.id;
    if (supabase) {
      const { data, error } = await supabase.from('films').update({ status: 'archived' }).eq('id', filmId).select().single();
      if (!error && data) {
        return res.json({ success: true, message: 'Film arşivlendi', film: data });
      }
    }

    const film = mockFilms.find(f => f.id === filmId);
    if (film) {
      film.status = 'archived';
      return res.json({ success: true, message: 'Film arşivlendi', film });
    }

    return res.status(404).json({ success: false, error: 'Film bulunamadı' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// COMPLETE DEVELOPING FILM (Banyodan Çıkar / Tab Etmeyi Tamamla)
router.patch('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const filmId = req.params.id;
    const now = new Date().toISOString();

    if (supabase) {
      const { data, error } = await supabase.from('films').update({
        status: 'developed',
        developed_at: now
      }).eq('id', filmId).select().single();

      if (!error && data) {
        // Filmdeki tüm fotoğrafları da 'developed' durumuna getir
        await supabase.from('photos').update({ status: 'developed' }).eq('film_id', filmId);
        return res.json({ success: true, message: 'Film banyosu tamamlandı, fotoğraflar hazır!', film: data });
      }
    }

    const film = mockFilms.find(f => f.id === filmId);
    if (film) {
      film.status = 'developed';
      film.developedAt = now;
      return res.json({ success: true, message: 'Film banyosu tamamlandı, fotoğraflar hazır!', film });
    }

    return res.status(404).json({ success: false, error: 'Film bulunamadı' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


// DELETE FILM
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const filmId = req.params.id;
    if (supabase) {
      await supabase.from('films').delete().eq('id', filmId);
    }
    mockFilms = mockFilms.filter(f => f.id !== filmId);
    return res.json({ success: true, message: 'Film başarıyla silindi' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
