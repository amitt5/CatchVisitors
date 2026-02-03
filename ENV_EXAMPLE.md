# Environment Variables for CatchVisitors

## Required Environment Variables

Add these to your `.env.local` file:

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### OpenAI
```
OPENAI_API_KEY=your_openai_api_key
```

### VAPI
```
VAPI_API_KEY=your_vapi_api_key
VAPI_WEBHOOK_SECRET=your_webhook_secret
```

### Website Scraping
```
SCRAPE_DO_TOKEN=your_scrape_do_token
```

### Base URL (for webhooks)
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# For production:
# NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## Database Schema Updates

Make sure your Supabase `demos` table includes these columns:

```sql
ALTER TABLE demos 
ADD COLUMN vapi_assistant_id TEXT NULL,
ADD COLUMN vapi_assistant_data JSON NULL,
ADD COLUMN vapi_phone_number TEXT NULL;
```

## VAPI Setup

1. Get your VAPI API key from [VAPI Dashboard](https://vapi.ai)
2. Set up a webhook secret for security
3. Configure your assistant settings in the VAPI dashboard or via API

## Testing

1. Run `npm run dev`
2. Navigate to the demo section
3. Click "Setup Required" to configure your website
4. Enter a website URL and select language
5. Click "OK" to create the VAPI assistant
6. Once configured, click "Click to Talk" to start the conversation
