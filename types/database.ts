// Database types for Supabase tables

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  website_url: string;
  languages: string[];
  prompt: string;
  vapi_assistant_id: string | null;
  status: 'active' | 'paused';
  calls: number;
  created_at: string;
  updated_at: string | null;
}

export interface Demo {
  id: string;
  user_id: string | null;
  name: string;
  website_url: string;
  languages: string[];
  prompt: string | null;
  organisation_name: string | null;
  vapi_assistant_id: string | null;
  vapi_assistant_data: any | null;
  vapi_phone_number: string | null;
  status: 'active' | 'paused';
  calls: number;
  created_at: string;
  updated_at: string | null;
}

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: Agent;
        Insert: Omit<Agent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Agent>;
      };
      demos: {
        Row: Demo;
        Insert: Omit<Demo, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Demo>;
      };
    };
  };
}
