-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  assistant_id TEXT NOT NULL,
  org_id TEXT,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  cost DECIMAL(10, 6) DEFAULT 0,
  costs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on assistant_id for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_sessions_assistant_id ON chat_sessions(assistant_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at DESC);

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (adjust based on your auth requirements)
CREATE POLICY "Allow all operations on chat_sessions" ON chat_sessions
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);
