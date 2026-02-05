-- Demos table for CatchVisitors
-- Stores demo requests: website URL, language, scraped content, formatted data for VAPI, and call metadata.
-- Run this in the Supabase SQL Editor or via Supabase CLI.

CREATE TABLE IF NOT EXISTS demos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_url TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('en', 'nl')),
  scraped_content TEXT,
  formatted_data JSONB,
  gemini_prompt TEXT,
  organisation_name TEXT,
  call_id TEXT,
  transcript TEXT,
  summary TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  call_completed_at TIMESTAMPTZ,
  vapi_assistant_id TEXT,
  vapi_assistant_data JSONB,
  vapi_phone_number TEXT
);

-- Optional: index for listing demos by creation time and looking up by call_id
CREATE INDEX IF NOT EXISTS idx_demos_created_at ON demos (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demos_call_id ON demos (call_id) WHERE call_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_demos_email ON demos (email) WHERE email IS NOT NULL;

-- Optional: enable Row Level Security (RLS) if you want to restrict access
-- ALTER TABLE demos ENABLE ROW LEVEL SECURITY;
