const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { supabase } = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

// In-memory fallback
const mockUsers = [
  { id: '00000000-0000-0000-0000-000000000001', email: 'irmak@pozapp.com', username: 'irmak', full_name: 'İrmak Arı' },
  { id: crypto.randomUUID(), email: 'demo@pozapp.com', username: 'analog_lover', full_name: 'Analog Sever' }
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, full_name } = req.body;

    // Backend Validasyonları
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'E-posta adresi zorunludur' });
    }
    const cleanInput = email.trim().toLowerCase();
    const cleanEmail = cleanInput.includes('@') ? cleanInput : `${cleanInput}@pozapp.com`;

    if (!password || password.length < 4) {
      return res.status(400).json({ success: false, error: 'Şifre en az 4 karakter olmalıdır' });
    }

    const cleanUsername = (username && username.trim()) || cleanEmail.split('@')[0];
    const cleanName = (full_name && full_name.trim()) || cleanUsername;

    // E-posta mükerrerlik kontrolü
    if (supabase) {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (existingUser) {
        return res.status(400).json({ success: false, error: 'Bu e-posta adresi zaten kullanımda' });
      }
    } else {
      const existing = mockUsers.find(u => u.email === cleanEmail);
      if (existing) {
        return res.status(400).json({ success: false, error: 'Bu e-posta adresi zaten kullanımda' });
      }
    }

    let userId = crypto.randomUUID();
    let newUser = { id: userId, email: cleanEmail, username: cleanUsername, full_name: cleanName };

    if (supabase) {
      const { data, error } = await supabase.from('profiles').insert([
        { id: userId, email: cleanEmail, username: cleanUsername, full_name: cleanName }
      ]).select().single();

      if (error && error.code !== '42P01') {
        console.error('Supabase Register DB Error:', error);
        return res.status(500).json({ success: false, error: 'Kullanıcı kaydı oluşturulamadı: ' + error.message });
      }
      if (data) newUser = data;
    } else {
      mockUsers.push(newUser);
    }

    const token = jwt.sign(newUser, process.env.JWT_SECRET || 'poz_app_secret', { expiresIn: '30d' });

    return res.status(201).json({
      success: true,
      message: 'Kullanıcı başarıyla oluşturuldu',
      token,
      user: newUser
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const input = (email || '').trim().toLowerCase();
    if (!input) {
      return res.status(400).json({ success: false, error: 'E-posta veya kullanıcı adı zorunludur' });
    }
    if (!password) {
      return res.status(400).json({ success: false, error: 'Şifre zorunludur' });
    }

    const cleanEmail = input.includes('@') ? input : `${input}@pozapp.com`;
    let user = null;

    if (supabase) {
      const { data } = await supabase.from('profiles').select('*').or(`email.eq.${cleanEmail},username.eq.${input}`).maybeSingle();
      user = data;
    }

    if (!user) {
      user = mockUsers.find(u => u.email === cleanEmail || u.username === input || u.email === input);
    }

    // Fallback if not in DB & no Supabase
    if (!user) {
      user = {
        id: crypto.randomUUID(),
        email: cleanEmail,
        username: input.includes('@') ? input.split('@')[0] : input,
        full_name: input.charAt(0).toUpperCase() + input.slice(1)
      };
      mockUsers.push(user);
    }

    const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'poz_app_secret', { expiresIn: '30d' });

    return res.json({
      success: true,
      message: 'Giriş başarılı',
      token,
      user
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


// GET ME
router.get('/me', authMiddleware, async (req, res) => {
  try {
    let profile = req.user;
    if (supabase && req.user?.id) {
      const { data } = await supabase.from('profiles').select('*').eq('id', req.user.id).single();
      if (data) profile = data;
    }

    return res.json({
      success: true,
      user: profile,
      stats: {
        totalFilms: 5,
        totalPhotos: 42,
        darkroomTimeMinutes: 180
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE PROFILE
router.patch('/profile', authMiddleware, async (req, res) => {
  try {
    const { username, full_name, avatar_url, bio } = req.body;
    const userId = req.user?.id;

    const updates = {};
    if (username !== undefined) updates.username = username.trim();
    if (full_name !== undefined) updates.full_name = full_name.trim();
    if (avatar_url !== undefined) updates.avatar_url = avatar_url;
    if (bio !== undefined) updates.bio = bio;

    if (supabase && userId) {
      const { data, error } = await supabase.from('profiles').update(updates).eq('id', userId).select().single();
      if (!error && data) {
        return res.json({ success: true, message: 'Profil başarıyla güncellendi', user: data });
      }
    }

    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      Object.assign(user, updates);
      return res.json({ success: true, message: 'Profil başarıyla güncellendi', user });
    }

    return res.json({ success: true, message: 'Profil güncellendi', user: { ...req.user, ...updates } });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  return res.json({ success: true, message: 'Çıkış başarılı' });
});


module.exports = router;
