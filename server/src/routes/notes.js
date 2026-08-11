const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

let mockNotes = {
  '2026-07-27': {
    dateKey: '2026-07-27',
    note: '"bugün biraz yorucuydu ama akşam güzel hissettirdi."',
    timestamp: '22:45 • ev',
    mood: 'huzurlu',
    location: 'ev',
    song: { title: 'a canım', artist: 'mabel matiz' }
  }
};

// GET DAILY NOTES
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('daily_notes').select('*').eq('user_id', req.user?.id || '00000000-0000-0000-0000-000000000001');
      if (!error && data) {
        return res.json({ success: true, notes: data });
      }
    }
    return res.json({ success: true, notes: mockNotes });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// SAVE DAILY NOTE
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { dateKey, note, mood, location, song } = req.body;
    if (!dateKey || !note) {
      return res.status(400).json({ success: false, error: 'dateKey ve note zorunludur' });
    }

    const noteItem = {
      user_id: req.user?.id || '00000000-0000-0000-0000-000000000001',
      date_key: dateKey,
      note,
      mood: mood || null,
      location: location || null,
      song: song || null,
      created_at: new Date().toISOString()
    };

    if (supabase) {
      const { data, error } = await supabase.from('daily_notes').upsert([noteItem], { onConflict: 'user_id, date_key' }).select().single();
      if (!error && data) {
        return res.status(201).json({ success: true, note: data });
      }
    }

    mockNotes[dateKey] = noteItem;
    return res.status(201).json({ success: true, note: noteItem });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE DAILY NOTE
router.delete('/:dateKey', authMiddleware, async (req, res) => {
  try {
    const { dateKey } = req.params;
    if (supabase) {
      await supabase.from('daily_notes').delete().eq('user_id', req.user?.id || 'demo-user-123').eq('date_key', dateKey);
    }
    delete mockNotes[dateKey];
    return res.json({ success: true, message: 'Not silindi' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
