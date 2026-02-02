export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      demos: {
        Row: {
          id: string;
          website_url: string;
          language: string;
          scraped_content: string | null;
          formatted_data: Json | null;
          call_id: string | null;
          transcript: string | null;
          summary: string | null;
          email: string | null;
          created_at: string;
          call_completed_at: string | null;
        };
        Insert: {
          id?: string;
          website_url: string;
          language: string;
          scraped_content?: string | null;
          formatted_data?: Json | null;
          call_id?: string | null;
          transcript?: string | null;
          summary?: string | null;
          email?: string | null;
          created_at?: string;
          call_completed_at?: string | null;
        };
        Update: {
          id?: string;
          website_url?: string;
          language?: string;
          scraped_content?: string | null;
          formatted_data?: Json | null;
          call_id?: string | null;
          transcript?: string | null;
          summary?: string | null;
          email?: string | null;
          created_at?: string;
          call_completed_at?: string | null;
        };
      };
    };
  };
}
