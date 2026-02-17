# Hotels Demo Auto-Media Display Implementation

## Overview

This document describes the implementation of automatic media display in the hotels demo, where the Vapi voice assistant triggers media (attractions, rooms, amenities, booking calendar) automatically during conversation instead of requiring manual keyboard shortcuts.

## Architecture

The implementation uses **Vapi Server Tools** to trigger media display from the voice assistant.

```
┌─────────────────┐     Tool Call      ┌──────────────────────┐
│  Vapi Assistant │ ──────────────────> │ /api/hotels/show-media│
│                 │                     │     (Next.js API)     │
└─────────────────┘                     └──────────────────────┘
         │                                          │
         │ WebSocket Message                        │ HTTP 200
         ▼                                          ▼
┌─────────────────┐                     ┌──────────────────────┐
│  VoiceBotModal  │                     │   Server Logs Tool   │
│   (Client)      │                     │      Execution       │
└─────────────────┘                     └──────────────────────┘
         │
         ▼
  Display Media/Calendar
```

## Components

### 1. Vapi Tool Configuration

**Tool Name**: `show_hotel_media`
**Type**: Server-side async tool
**Endpoint**: `https://yourdomain.com/api/hotels/show-media`

**Parameters**:
```json
{
  "media_id": {
    "type": "string",
    "enum": [
      "rembrandt-square", "anne-frank-house", "rijksmuseum",
      "canal-suite", "classic-king",
      "rooftop", "spa", "gym",
      "calendar"
    ],
    "description": "ID of the specific media item to display"
  },
  "media_name": {
    "type": "string",
    "description": "Display name of the media item (e.g., 'Canal Suite', 'Rembrandt Square')"
  }
}
```

**Tool Description** (for AI):
```
Display specific hotel images for attractions, rooms, amenities, or the booking calendar.
Call this tool when discussing:
- Rembrandt Square → media_id: "rembrandt-square"
- Anne Frank House → media_id: "anne-frank-house"
- Rijksmuseum → media_id: "rijksmuseum"
- Canal Suite → media_id: "canal-suite"
- Classic King → media_id: "classic-king"
- Rooftop terrace → media_id: "rooftop"
- Spa → media_id: "spa"
- Gym → media_id: "gym"
- Booking → media_id: "calendar"

Always use both media_id (kebab-case) and media_name (Display Name) parameters.
```

### 2. API Route

**File**: `/app/api/hotels/show-media/route.ts`

```typescript
export async function POST(req: NextRequest) {
  // 1. Receive tool call from Vapi
  // 2. Extract media_type from message.toolCalls[0].function.arguments
  // 3. Validate media_type
  // 4. Log for debugging
  // 5. Return success response

  return NextResponse.json({
    success: true,
    result: `Displaying ${mediaType}`,
    mediaType
  });
}
```

**Key Points**:
- Endpoint only validates and logs - it does NOT trigger the actual media display
- Client-side component listens to Vapi WebSocket messages for the actual display
- Comprehensive logging with emojis for easy debugging

### 3. Client Component

**File**: `/components/hotels/voice-bot-modal.tsx`

**Key Changes**:

#### A. Media Display Handler
```typescript
const handleMediaDisplay = (mediaType: string) => {
  switch(mediaType) {
    case 'attractions':
      setCurrentMedia(MEDIA_SETS.attractions);
      setCurrentMediaIndex(0);
      setShowCalendar(false);
      break;
    case 'rooms':
      setCurrentMedia(MEDIA_SETS.rooms);
      setCurrentMediaIndex(0);
      setShowCalendar(false);
      break;
    case 'amenities':
      setCurrentMedia(MEDIA_SETS.amenities);
      setCurrentMediaIndex(0);
      setShowCalendar(false);
      break;
    case 'calendar':
      setShowCalendar(true);
      setCurrentMedia(null);
      setBookingStep('calendar');
      break;
  }
};
```

#### B. Vapi Message Listener
The component listens to multiple Vapi message formats:

**Format 1**: `tool-calls` type
```typescript
if (message.type === 'tool-calls' && message.toolCalls) {
  message.toolCalls.forEach((toolCall: any) => {
    if (toolCall.function?.name === 'show_hotel_media') {
      const mediaType = toolCall.function.arguments.media_type;
      handleMediaDisplay(mediaType);
    }
  });
}
```

**Format 2**: `toolCallList` array
```typescript
if (message.toolCallList && Array.isArray(message.toolCallList)) {
  message.toolCallList.forEach((toolCall: any) => {
    if (toolCall.function?.name === 'show_hotel_media') {
      const mediaType = toolCall.function.arguments?.media_type;
      handleMediaDisplay(mediaType);
    }
  });
}
```

**Format 3**: `function-call` type
```typescript
if (message.type === 'function-call' && message.functionCall) {
  if (message.functionCall.name === 'show_hotel_media') {
    const mediaType = message.functionCall.parameters?.media_type;
    handleMediaDisplay(mediaType);
  }
}
```

### 4. Middleware Configuration

**File**: `/middleware.ts`

Added hotel API routes to public routes:
```typescript
const isPublicRoute = createRouteMatcher([
  // ...
  "/api/hotels/(.*)",  // Hotel API routes (including tool calls)
]);
```

This ensures Vapi can call the tool endpoint without authentication.

## Media Items

Individual media items that can be displayed:

### Attractions
| Media ID           | Media Name          | Description                                |
|--------------------|---------------------|--------------------------------------------|
| `rembrandt-square` | Rembrandt Square    | Lively square, 7 min walk                  |
| `anne-frank-house` | Anne Frank House    | Historic museum, 12 min walk               |
| `rijksmuseum`      | Rijksmuseum         | World-class art museum, 15 min walk        |

### Rooms
| Media ID       | Media Name   | Description                                          |
|----------------|--------------|------------------------------------------------------|
| `canal-suite`  | Canal Suite  | Floor-to-ceiling canal views, freestanding bathtub   |
| `classic-king` | Classic King | Cosy, beautifully designed, no canal view            |

### Amenities
| Media ID  | Media Name       | Description                                    |
|-----------|------------------|------------------------------------------------|
| `rooftop` | Rooftop Terrace  | Canal views, breakfast & evening drinks        |
| `spa`     | Spa              | Heated pool, sauna, steam room                 |
| `gym`     | Gym              | Fitness facilities                             |

### Booking
| Media ID   | Media Name        | Description                                             |
|------------|-------------------|---------------------------------------------------------|
| `calendar` | Booking Calendar  | 2-month calendar (April/May 2026) → Room → Payment → Confirmation |

## Environment Variables

Uses existing hotel assistant ID:
```bash
NEXT_PUBLIC_VAPI_ASSISTANT_ID_HOTEL=<your-hotel-assistant-id>
# Falls back to: 61ecaf11-a10e-4205-8440-611bd394ede7
```

## Vapi Assistant Configuration

### 1. Create the Tool in Vapi Dashboard

1. Go to Vapi Dashboard → Tools
2. Click "Create Tool"
3. Select "Function" type
4. Configure:
   - **Name**: `show_hotel_media`
   - **Type**: Server (async)
   - **URL**: `https://yourdomain.com/api/hotels/show-media`
   - **Method**: POST
   - **Parameters**:
     ```json
     {
       "type": "object",
       "properties": {
         "media_type": {
           "type": "string",
           "enum": ["attractions", "rooms", "amenities", "calendar"],
           "description": "Type of media to display"
         }
       },
       "required": ["media_type"]
     }
     ```

### 2. Add Tool to Assistant

1. Go to Vapi Dashboard → Assistants
2. Select your hotel assistant (or create one)
3. Go to "Tools" section
4. **Enable** the `show_hotel_media` tool (CRITICAL: Must be enabled, not just added)
5. Update system prompt to include tool usage guidance

### 3. System Prompt Example

```
You are an AI concierge for Hotel Haven Amsterdam. You help guests with:
- Information about nearby attractions
- Room options and availability
- Hotel amenities and facilities
- Making bookings

IMPORTANT: Use the show_hotel_media tool to display relevant visuals:
- When discussing things to do → call show_hotel_media with media_type: "attractions"
- When discussing rooms → call show_hotel_media with media_type: "rooms"
- When discussing facilities → call show_hotel_media with media_type: "amenities"
- When making a booking → call show_hotel_media with media_type: "calendar"

Always call the tool BEFORE providing detailed information so users can see visuals.
```

## Testing

### 1. Enable Debug Logging

The implementation includes comprehensive console logging. Open browser DevTools to see:
- 🏨 Tool call received events
- 📦 Full request/response bodies
- 🎯 Extracted media types
- ✅ Success confirmations
- ⚠️ Warnings for invalid data

### 2. Test Scenarios

**Test Individual Attraction**:
```
User: "What can I do nearby?"
Expected: Assistant mentions Rembrandt Square → Image of Rembrandt Square appears
         Assistant mentions Anne Frank House → Image changes to Anne Frank House
         Assistant mentions Rijksmuseum → Image changes to Rijksmuseum
```

**Test Individual Rooms**:
```
User: "Show me your rooms"
Expected: Assistant describes Canal Suite → Image of Canal Suite appears
         Assistant describes Classic King → Image changes to Classic King
```

**Test Individual Amenities**:
```
User: "What facilities do you have?"
Expected: Assistant mentions rooftop → Image of rooftop terrace appears
         Assistant mentions spa → Image changes to spa
         Assistant mentions gym → Image changes to gym
```

**Test Calendar**:
```
User: "I'd like to make a reservation"
Expected: Booking calendar opens (April/May 2026)
```

**Test Specific Items**:
```
User: "Tell me about the Canal Suite"
Expected: Image of Canal Suite appears while assistant describes it

User: "Is the Anne Frank House nearby?"
Expected: Image of Anne Frank House appears
```

### 3. Fallback Controls

Keyboard shortcuts remain available for manual testing:
- `1` = Attractions
- `2` = Rooms
- `3` = Amenities
- `C` = Calendar
- `H` = Hide media
- `←/→` = Navigate slideshow
- `ESC` = Close media

## Troubleshooting

### Tool Not Being Called

**Check**:
1. ✅ Tool is **enabled** in Vapi assistant settings (not just created)
2. ✅ System prompt mentions when to use the tool
3. ✅ Tool URL is correct and publicly accessible
4. ✅ Check Vapi dashboard logs for tool call attempts

### Media Not Displaying

**Check**:
1. ✅ Browser console shows "🏨 VAPI MESSAGE RECEIVED"
2. ✅ Browser console shows "🎯 TOOL CALLS DETECTED"
3. ✅ `media_type` parameter is valid (attractions/rooms/amenities/calendar)
4. ✅ No JavaScript errors in console

### API Route Errors

**Check**:
1. ✅ Route is in middleware public routes list
2. ✅ Server logs show incoming requests
3. ✅ Request body contains `message.toolCalls[0].function.arguments.media_type`

## Comparison with Navank Implementation

Both implementations use the same pattern:

| Aspect                  | Navank                          | Hotels                          |
|-------------------------|----------------------------------|---------------------------------|
| **Tool Name**           | `show_product_image`            | `show_hotel_media`              |
| **Parameter**           | `product_id` (12 products)      | `media_type` (4 types)          |
| **API Route**           | `/api/navank/show-product-image`| `/api/hotels/show-media`        |
| **Client Component**    | `navank-voice-bot-modal.tsx`    | `voice-bot-modal.tsx`           |
| **Display Mechanism**   | Single image from map           | Slideshow or calendar           |
| **Message Formats**     | 3 formats (same)                | 3 formats (same)                |

## Future Enhancements

1. **Auto-advance slideshows**: Automatically cycle through images
2. **Analytics**: Track which media types are most requested
3. **Dynamic content**: Load media from CMS instead of hardcoded
4. **Multi-media**: Support videos in addition to images
5. **Context awareness**: Remember previously shown media to avoid repetition

## References

- **Navank Implementation**: `/docs/VAPI_TOOL_IMAGE_DISPLAY.md`
- **Vapi Tools Docs**: https://docs.vapi.ai/tools
- **Component**: `/components/hotels/voice-bot-modal.tsx`
- **API Route**: `/app/api/hotels/show-media/route.ts`
