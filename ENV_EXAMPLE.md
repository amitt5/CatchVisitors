# Environment Variables for CatchVisitors

## Required Environment Variables

Add these to your `.env.local` file:

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### OpenRouter (for Gemini access)
```
OPENROUTER_API_KEY=your_openrouter_api_key
```

### OpenAI
```
OPENAI_API_KEY=your_openai_api_key
```

### Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### VAPI
```
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_public_key
VAPI_PRIVATE_KEY=your_vapi_private_key
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_vapi_assistant_id
NEXT_PUBLIC_TEST_VAPI_ASSISTANT_ID=your_test_vapi_assistant_id
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
ADD COLUMN gemini_prompt TEXT NULL,
ADD COLUMN organisation_name TEXT NULL,
ADD COLUMN vapi_assistant_id TEXT NULL,
ADD COLUMN vapi_assistant_data JSON NULL,
ADD COLUMN vapi_phone_number TEXT NULL;
```

## API Keys Setup

### OpenRouter Setup
1. Get your API key from [OpenRouter Dashboard](https://openrouter.ai/keys)
2. OpenRouter provides access to Google Gemini models and many others
3. Copy the API key to your environment variables

### VAPI Setup

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
