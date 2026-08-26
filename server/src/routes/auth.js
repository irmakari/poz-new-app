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
const PASSWORD_ITERATIONS = 120000;
const PASSWORD_KEY_LENGTH = 64;
const PASSWORD_DIGEST = 'sha512';

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, PASSWORD_KEY_LENGTH, PASSWORD_DIGEST)
    .toString('hex');
  return `${PASSWORD_ITERATIONS}:${salt}:${hash}`;
};

const verifyPassword = (password, storedHash) => {
  if (!storedHash) return false;

  const [iterationsValue, salt, originalHash] = storedHash.split(':');
  const iterations = Number(iterationsValue);
  if (!iterations || !salt || !originalHash) return false;

  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, PASSWORD_KEY_LENGTH, PASSWORD_DIGEST)
    .toString('hex');

  if (hash.length !== originalHash.length) return false;

  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
};

const sanitizeUser = (user) => {
  if (!user) return user;
  const { password_hash, ...safeUser } = user;
  return safeUser;
};

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
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({ success: false, error: 'Geçerli bir e-posta adresi giriniz' });
    }

    if (!password || password.length < 4) {
      return res.status(400).json({ success: false, error: 'Şifre en az 4 karakter olmalıdır' });
    }

    const cleanUsername = (username && username.trim()) || cleanEmail.split('@')[0];
    const cleanName = (full_name && full_name.trim()) || cleanUsername;
    const passwordHash = hashPassword(password);

    // E-posta / kullanıcı adı mükerrerlik kontrolü
    if (supabase) {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .or(`email.eq.${cleanEmail},username.eq.${cleanUsername}`)
        .maybeSingle();

      if (existingUser) {
        return res.status(400).json({ success: false, error: 'Bu e-posta adresi veya kullanıcı adı zaten kullanımda' });
      }
    } else {
      const existing = mockUsers.find(u => u.email === cleanEmail || u.username === cleanUsername);
      if (existing) {
        return res.status(400).json({ success: false, error: 'Bu e-posta adresi veya kullanıcı adı zaten kullanımda' });
      }
    }

    let userId = crypto.randomUUID();
    let newUser = { id: userId, email: cleanEmail, username: cleanUsername, full_name: cleanName };

    if (supabase) {
      const { data, error } = await supabase.from('profiles').insert([
        { id: userId, email: cleanEmail, username: cleanUsername, full_name: cleanName, password_hash: passwordHash }
      ]).select().single();

      if (error && error.code !== '42P01') {
        console.error('Supabase Register DB Error:', error);
        return res.status(500).json({ success: false, error: 'Kullanıcı kaydı oluşturulamadı: ' + error.message });
      }
      if (data) newUser = data;
    } else {
      mockUsers.push({ ...newUser, password_hash: passwordHash });
    }

    const safeUser = sanitizeUser(newUser);
    const token = jwt.sign(safeUser, process.env.JWT_SECRET || 'poz_app_secret', { expiresIn: '30d' });

    return res.status(201).json({
      success: true,
      message: 'Kullanıcı başarıyla oluşturuldu',
      token,
      user: safeUser
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

    if (!user) {
      return res.status(401).json({ success: false, error: 'E-posta/kullanıcı adı veya şifre hatalı' });
    }

    const isPasswordValid = user.password_hash
      ? verifyPassword(password, user.password_hash)
      : !supabase;

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: 'E-posta/kullanıcı adı veya şifre hatalı' });
    }

    const safeUser = sanitizeUser(user);
    const token = jwt.sign({ id: safeUser.id, email: safeUser.email, username: safeUser.username }, process.env.JWT_SECRET || 'poz_app_secret', { expiresIn: '30d' });

    return res.json({
      success: true,
      message: 'Giriş başarılı',
      token,
      user: safeUser
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
      if (data) profile = sanitizeUser(data);
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
        return res.json({ success: true, message: 'Profil başarıyla güncellendi', user: sanitizeUser(data) });
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
