-- ─── POZ APP SUPABASE DATABASE SCHEMA ────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES TABLOSU
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  password_hash TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Existing Supabase projects can rerun this file safely after pulling changes.
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_unique_idx
  ON public.profiles (username)
  WHERE username IS NOT NULL;

-- 2. FILMS TABLOSU (Analog Film Makaraları)
CREATE TABLE IF NOT EXISTS public.films (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  film_type_name TEXT NOT NULL DEFAULT 'Summer Glow',
  film_type_id TEXT DEFAULT 'ft-summer-glow',
  iso INT DEFAULT 400,
  total_frames INT DEFAULT 24,
  captured_frames INT DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'readyToDevelop', 'developing', 'completed', 'archived')),
  color_token TEXT DEFAULT '#111827',
  developing_started_at TIMESTAMPTZ,
  developed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PHOTOS TABLOSU (Çekilen Pozlar & Günlük Fotoğraflar)
CREATE TABLE IF NOT EXISTS public.photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  film_id UUID REFERENCES public.films(id) ON DELETE SET NULL,
  capture_mode TEXT DEFAULT 'film' CHECK (capture_mode IN ('daily', 'film')),
  status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'developing', 'developed', 'unlocked')),
  frame_number INT,
  frame_code TEXT,
  photo_url TEXT,
  location TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  mood TEXT,
  note TEXT,
  song JSONB,
  scene_type TEXT,
  bg_colors TEXT[],
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  developed_at TIMESTAMPTZ
);

-- 4. DAILY_NOTES TABLOSU (Günün Anısı / Günlük Notlar)
CREATE TABLE IF NOT EXISTS public.daily_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date_key TEXT NOT NULL, -- Örn: '2026-07-27'
  note TEXT NOT NULL,
  mood TEXT,
  location TEXT,
  song JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date_key)
);

-- ─── STORAGE BUCKET ─────────────────────────────────────────────────────────
-- Supabase Storage kısmında 'photos' adında public bir kova (bucket) oluşturun.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('photos', 'photos', true) 
ON CONFLICT (id) DO NOTHING;

-- ─── ROW LEVEL SECURITY (RLS) POLICIES ──────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.films ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow individual read/write profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow individual read/write films" ON public.films;
DROP POLICY IF EXISTS "Allow individual read/write photos" ON public.photos;
DROP POLICY IF EXISTS "Allow individual read/write daily_notes" ON public.daily_notes;

-- Herkes kendi verisine tam erişebilir:
CREATE POLICY "Allow individual read/write profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Allow individual read/write films" ON public.films FOR ALL USING (true);
CREATE POLICY "Allow individual read/write photos" ON public.photos FOR ALL USING (true);
CREATE POLICY "Allow individual read/write daily_notes" ON public.daily_notes FOR ALL USING (true);

-- Storage bucket erişimi
DROP POLICY IF EXISTS "Allow public read photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload photos" ON storage.objects;

CREATE POLICY "Allow public read photos" ON storage.objects FOR SELECT USING (bucket_id = 'photos');
CREATE POLICY "Allow authenticated upload photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'photos');
