# Hotel Demo - Recording Guide

This is the staged demo page for creating a video recording showcasing the voice bot for hotels.

## Page Location
`/hotels` - http://localhost:3000/hotels

## How It Works

1. **Hero Section**: Realistic hotel landing page with "Talk to Our AI Concierge" button
2. **Voice Bot Modal**: Opens when button is clicked, featuring:
   - Live transcription chat interface
   - Media gallery (auto-slideshow)
   - Booking calendar
   - Vapi voice integration

## Keyboard Shortcuts for Demo Recording

While the voice bot modal is open, use these keys to control the media display:

| Key | Action |
|-----|--------|
| `1` | Show attractions (Rembrandt Plein, Anne Frank Museum, Dam Square) |
| `2` | Show rooms (Deluxe Canal View, Premium Suite, Executive Suite) |
| `3` | Show amenities (Rooftop Restaurant, Wellness & Spa, Canal Terrace) |
| `C` | Show booking calendar |
| `H` | Hide media/calendar |
| `ESC` | Hide media/calendar |

### Media Display
- Media automatically cycles through 3 images every 3 seconds
- Each set has a caption overlay
- Smooth transitions with progress indicators

## Demo Recording Tips

1. **Pre-record your Vapi agent script** so you know exactly when to trigger media
2. **Practice timing** - trigger media keys slightly before the agent mentions them
3. **Use keyboard shortcuts** instead of UI buttons for smoother demo
4. **Test the flow** a few times before final recording

## Suggested Demo Script Flow

1. User clicks "Talk to Our AI Concierge" button
2. Modal opens, call starts
3. Agent: "Hello! Welcome to Hotel Amsterdam Royal..."
4. User: "What are some places of interest nearby?"
5. **Press `1`** → Shows attractions slideshow
6. Agent: "Great question! We're 7 minutes from Rembrandt Plein..." (images auto-cycle)
7. User: "Can you show me the available rooms?"
8. **Press `2`** → Shows rooms slideshow
9. Agent: "Of course! We have several beautiful options..." (images auto-cycle)
10. User: "I'd like to book a room"
11. **Press `C`** → Shows calendar
12. Agent: "Wonderful! What dates are you considering?"
13. User selects date in calendar
14. Agent: "Perfect! I can reserve that for you..."

## Environment Variables Required

Make sure these are set in your `.env.local`:

```
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_public_key
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_assistant_id (for hotel demo)
```

## Vapi Assistant Setup

Create a Vapi assistant specifically for this demo with instructions like:

```
You are an AI concierge for Hotel Amsterdam Royal, a luxury boutique hotel
in Amsterdam's canal district. You help guests with:
- Information about nearby attractions (Rembrandt Plein, Anne Frank Museum)
- Room details and availability
- Booking assistance
- Hotel amenities

Be warm, professional, and helpful. When users ask about locations or rooms,
describe them enthusiastically. Guide them naturally toward booking.
```

## Customization

To change images, edit `MEDIA_SETS` in `/components/hotels/voice-bot-modal.tsx`

To change hotel details, edit `/components/hotels/hotel-hero.tsx`
