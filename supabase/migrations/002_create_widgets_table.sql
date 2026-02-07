-- Create widgets table for voice assistant widgets
CREATE TABLE IF NOT EXISTS widgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  widget_id TEXT UNIQUE NOT NULL DEFAULT (substr(md5(random()::text || clock_timestamp()::text), 1, 8)),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_widgets_agent_id ON widgets(agent_id);
CREATE INDEX IF NOT EXISTS idx_widgets_user_id ON widgets(user_id);
CREATE INDEX IF NOT EXISTS idx_widgets_widget_id ON widgets(widget_id);

-- Add widget_id to agents table for reference
ALTER TABLE agents ADD COLUMN IF NOT EXISTS widget_id TEXT UNIQUE REFERENCES widgets(widget_id) ON DELETE SET NULL;
