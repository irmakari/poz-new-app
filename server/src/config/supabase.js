const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

let supabase = null;

if (process.env.SUPABASE_URL && process.env.SUPABASE_URL !== 'https://YOUR_PROJECT_REF.supabase.co') {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn('⚠️ Supabase URL henüz ayarlanmadı! Lütfen server/.env dosyasında SUPABASE_URL değişkenini güncelleyin.');
}

module.exports = { supabase };
