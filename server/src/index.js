const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const filmRoutes = require('./routes/films');
const photoRoutes = require('./routes/photos');
const noteRoutes = require('./routes/notes');
const musicRoutes = require('./routes/music');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Healthcheck Route
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Poz App Express Backend',
    timestamp: new Date().toISOString(),
    env: {
      supabaseConnected: !!(process.env.SUPABASE_URL && process.env.SUPABASE_URL !== 'https://YOUR_PROJECT_REF.supabase.co')
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/films', filmRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/music', musicRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint bulunamadı' });
});

// Server Listen
app.listen(PORT, () => {
  console.log(`🚀 Poz App Backend sunucusu http://localhost:${PORT} portunda başarıyla çalışıyor!`);
});
