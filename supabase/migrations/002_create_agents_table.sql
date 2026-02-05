-- Agents table for CatchVisitors
-- Stores authenticated user agents: business name, website, languages, prompts, and performance metrics.
-- Run this in the Supabase SQL Editor or via Supabase CLI.

CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  prompt TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused')),
  calls INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  vapi_assistant_id TEXT,
  vapi_assistant_data JSONB,
  vapi_phone_number TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents (user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_agents_created_at ON agents (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents (status) WHERE status IS NOT NULL;

-- Optional: enable Row Level Security (RLS) for agents table
-- ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Optional: RLS policy to ensure users can only access their own agents
-- CREATE POLICY "Users can view their own agents" ON agents
--   FOR SELECT USING (auth.uid()::text = user_id);
-- 
-- CREATE POLICY "Users can insert their own agents" ON agents
--   FOR INSERT WITH CHECK (auth.uid()::text = user_id);
-- 
-- CREATE POLICY "Users can update their own agents" ON agents
--   FOR UPDATE USING (auth.uid()::text = user_id);
-- 
-- CREATE POLICY "Users can delete their own agents" ON agents
--   FOR DELETE USING (auth.uid()::text = user_id);
