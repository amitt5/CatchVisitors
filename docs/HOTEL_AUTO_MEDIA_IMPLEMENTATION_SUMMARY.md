# Hotel Auto-Media Display - Implementation Summary

**Date**: February 17-18, 2026
**Status**: ✅ Working
**Implementation Pattern**: Transcript-based keyword matching with Vapi tool calls

---

## Overview

Implemented automatic image display for the Hotel Haven Amsterdam demo, where the AI voice assistant shows relevant images (rooms, attractions, amenities, calendar) automatically as it talks about them, instead of requiring manual keyboard shortcuts.

---

## The Challenge

### Initial Problem
- User asked: "What rooms do you have?"
- AI batched tool calls: `show_hotel_media("canal-suite")` + `show_hotel_media("classic-king")`
- Both images queued → Only last image visible → Out of sync with speech

### Why Simple Time-Based Queue Failed
- LLMs batch parallel function calls for efficiency
- All tool calls execute BEFORE the AI starts speaking
- No way to control timing server-side

### The Insight
Instead of fighting LLM batching behavior, work WITH it:
1. Let Vapi batch tool calls (tells us WHAT will be shown)
2. Use real-time transcripts to determine WHEN to show each image
3. Keyword matching triggers image display at the right moment

---

## Final Solution Architecture

### **Client-Side Intelligence + Transcript Matching**

```
┌─────────────────────────────────────────────────────────────┐
│ Vapi Flow                                                   │
├─────────────────────────────────────────────────────────────┤
│ 1. User: "What rooms do you have?"                          │
│ 2. AI plans response                                        │
│ 3. AI calls: show_hotel_media("canal-suite")               │
│           + show_hotel_media("classic-king")                │
│ 4. Client receives tool calls → Stores in pending queue    │
│ 5. AI starts speaking: "Our Canal Suite..."                │
│ 6. Client receives transcript: "Our Canal Suite..."        │
│ 7. Keyword match: "canal suite" → Show Canal Suite image  │
│ 8. AI continues: "And our Classic King..."                 │
│ 9. Client receives transcript: "Classic King..."           │
│10. Keyword match: "classic king" → Show Classic King image│
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Details

### 1. **Tool Configuration (Vapi Dashboard)**

**Tool Name**: `show_hotel_media`
**Type**: Server-side async
**URL**: `https://[ngrok-url]/api/hotels/show-media`

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
    ]
  },
  "media_name": {
    "type": "string",
    "description": "Display name"
  }
}
```

**Critical**: Tool must be **ENABLED** in assistant settings (not just created)!

---

### 2. **API Route** (`/app/api/hotels/show-media/route.ts`)

```typescript
export async function POST(req: NextRequest) {
  const body = await req.json();
  const mediaId = body.message?.toolCalls?.[0]?.function?.arguments?.media_id;

  // Simple response - Vapi just needs acknowledgment
  return NextResponse.json({ result: `Displaying ${mediaId}` });
}
```

**Note**: The API doesn't trigger image display - it just logs. The client-side code handles actual display.

---

### 3. **Client-Side Logic** (`/components/hotels/voice-bot-modal.tsx`)

#### A. Keyword Mapping
```typescript
const MEDIA_KEYWORDS: Record<string, string[]> = {
  "canal-suite": ["canal suite", "canal view", "best room", "premium room"],
  "classic-king": ["classic king", "king room", "cosy room", "cozy room"],
  "rembrandt-square": ["rembrandt", "rembrandt square"],
  "anne-frank-house": ["anne frank", "frank house"],
  "rijksmuseum": ["rijksmuseum", "rijks museum", "museum"],
  "rooftop": ["rooftop", "terrace", "roof top"],
  "spa": ["spa", "pool", "sauna", "steam room"],
  "gym": ["gym", "fitness"],
  "calendar": ["book", "reservation", "reserve", "dates", "check-in"]
};
```

#### B. Vapi Message Listener
```typescript
vapi.on('message', (message: any) => {
  // STEP 1: Capture tool calls from conversation-update
  if (message.type === 'conversation-update' && message.conversation) {
    message.conversation.forEach((item: any) => {
      if (item.tool_calls) {
        item.tool_calls.forEach((toolCall: any) => {
          if (toolCall.function?.name === 'show_hotel_media') {
            const mediaId = toolCall.function.arguments.media_id;
            // Add to pending (with deduplication)
            setPendingMediaItems(prev =>
              !prev.includes(mediaId) ? [...prev, mediaId] : prev
            );
          }
        });
      }
    });
  }

  // STEP 2: Match transcripts to pending items
  if (message.type === 'transcript' && message.role === 'assistant') {
    setPendingMediaItems(currentPending => {
      const matchedItem = findMatchingMediaItem(
        message.transcript,
        currentPending
      );

      if (matchedItem) {
        showMediaItem(matchedItem);
        return currentPending.filter(item => item !== matchedItem);
      }
      return currentPending;
    });
  }
});
```

#### C. Keyword Matching Function
```typescript
const findMatchingMediaItem = (
  transcript: string,
  pendingItems: string[]
): string | null => {
  const lowerTranscript = transcript.toLowerCase();

  for (const mediaId of pendingItems) {
    const keywords = MEDIA_KEYWORDS[mediaId] || [];
    const isMatch = keywords.some(keyword =>
      lowerTranscript.includes(keyword)
    );
    if (isMatch) return mediaId;
  }
  return null;
};
```

---

### 4. **System Prompt** (Critical Section)

```
### VISUAL DISPLAY TOOL (MANDATORY)

**YOU MUST call show_hotel_media when answering questions about rooms,
attractions, or amenities.**

When user asks about rooms:
1. IMMEDIATELY call show_hotel_media("canal-suite", "Canal Suite")
2. IMMEDIATELY call show_hotel_media("classic-king", "Classic King")
3. Then describe the rooms

Media IDs:
- Rooms: "canal-suite", "classic-king"
- Attractions: "rembrandt-square", "anne-frank-house", "rijksmuseum"
- Amenities: "rooftop", "spa", "gym"
- Booking: "calendar"

Tool calls are SILENT - never mention them to the user.
Just call the tool and describe the item naturally.
```

**Key**: Use strong language ("MUST", "REQUIRED") to ensure AI calls tools.

---

## Key Challenges & Solutions

### Challenge 1: Tool Batching
**Problem**: LLM calls both tools at once before speaking
**Solution**: Accept batching, use transcripts to trigger display at right time

### Challenge 2: Only Last Image Showing
**Problem**: Time-based queue showed images too fast
**Solution**: Removed time delays, used keyword matching instead

### Challenge 3: Duplicate Pending Items
**Problem**: conversation-update fires multiple times, duplicating items
**Solution**: Added deduplication check in setPendingMediaItems

### Challenge 4: Transcript Matching Not Running
**Problem**: React state closure - pendingMediaItems was stale
**Solution**: Use callback form of setState to get current value

### Challenge 5: "No result returned" from Vapi
**Problem**: ngrok offline or wrong URL
**Solution**: Restart ngrok, update Vapi tool URL

### Challenge 6: AI Not Calling Tool
**Problem**: Tool enabled but AI ignoring it
**Solution**: Strengthened system prompt with mandatory language

---

## Debugging Tips

### Browser Console Logs
```
🏨 VAPI MESSAGE RECEIVED
📋 Message Type: conversation-update
🎯 TOOL CALLS DETECTED (format 4: conversation-update)
📋 Found media ID in tool call: canal-suite
📋 Found media ID in tool call: classic-king
📦 Updated pending media items: ['canal-suite', 'classic-king']

🔍 Checking transcript for keyword matches...
📝 Transcript: "Our Canal Suite is the best..."
✅ Transcript match found: "canal-suite"
🖼️ Showing media item: canal-suite
📦 Remaining pending items: ['classic-king']

🔍 Checking transcript for keyword matches...
📝 Transcript: "And our Classic King room..."
✅ Transcript match found: "classic-king"
🖼️ Showing media item: classic-king
📦 Remaining pending items: []
```

### Server Logs (ngrok + Next.js)
```
🏨 ===== VAPI HOTEL MEDIA TOOL CALL RECEIVED =====
🎯 Extracted data:
  - Media ID: canal-suite
  - Media Name: Canal Suite
✅ Sending response: {"result": "Displaying Canal Suite"}
POST /api/hotels/show-media 200 in 62ms
```

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| No images showing | Tool not enabled in Vapi | Enable tool in assistant settings |
| "No result returned" | ngrok offline | Restart ngrok, update Vapi URL |
| Only last image shows | Time-based queue | Use transcript matching instead |
| Duplicate items in queue | No deduplication | Filter out existing items |
| Transcript matching not running | Stale state closure | Use setState callback |
| AI not calling tool | Weak prompt | Use "MUST" language in prompt |
| Vercel build fails | Lockfile out of sync | Run `pnpm install` locally |

---

## Files Modified

1. `/app/api/hotels/show-media/route.ts` - API endpoint (NEW)
2. `/components/hotels/voice-bot-modal.tsx` - Client logic (MODIFIED)
3. `/middleware.ts` - Added `/api/hotels/(.*)` to public routes
4. `/docs/VAPI_TRANSCRIPT_MATCHING_PROMPT.md` - System prompt guide (NEW)
5. `/docs/HOTELS_AUTO_MEDIA.md` - Full documentation (NEW)

---

## Testing Checklist

- [x] Tool calls detected in browser console
- [x] Pending items populated correctly
- [x] No duplicate items in pending queue
- [x] Transcript matching triggers
- [x] Images appear when keywords detected
- [x] Images change as AI talks about different items
- [x] Works for rooms (canal-suite, classic-king)
- [x] Works for attractions (rembrandt-square, anne-frank-house, rijksmuseum)
- [x] Works for amenities (rooftop, spa, gym)
- [x] Calendar shows on booking request
- [x] No API errors in server logs
- [x] ngrok URL reachable from Vapi

---

## Environment Variables

```bash
NEXT_PUBLIC_VAPI_API_KEY=<public-key>
VAPI_PRIVATE_KEY=<private-key>
NEXT_PUBLIC_VAPI_ASSISTANT_ID_HOTEL=<hotel-assistant-id>
```

---

## Advantages Over Time-Based Queue

| Aspect | Time Queue | Transcript Matching |
|--------|-----------|-------------------|
| **Sync accuracy** | Poor (fixed delays) | Perfect (keyword-based) |
| **Handles batching** | No (fights it) | Yes (works with it) |
| **Natural conversation** | Rigid timing | Flexible |
| **Setup complexity** | Simple | Moderate |
| **Reliability** | Low | High |
| **Edge cases** | Many | Few |

---

## Future Enhancements

1. **LLM-based matching** (for variations like "the premium room" → canal-suite)
2. **Multi-language support** (keyword translations)
3. **Confidence scoring** (prefer exact matches over partial)
4. **Analytics** (track which images trigger most)
5. **A/B testing** (keyword matching vs LLM matching)

---

## Lessons Learned

1. **Don't fight the framework** - Work with LLM batching instead of against it
2. **Real-time data is powerful** - Transcripts provide perfect timing signals
3. **Client-side intelligence** - Browser can do smart matching locally
4. **State closures matter** - Use setState callbacks for current values
5. **Explicit prompts win** - "MUST" > "should" for tool calling
6. **Tool enablement ≠ creation** - Always verify in assistant settings
7. **Deduplication matters** - conversation-update fires multiple times
8. **Debug with emojis** - Makes console logs easy to scan

---

## Related Implementations

- **Navank Product Images**: Same pattern, different keywords
- **Pattern**: Client-side transcript matching with Vapi tools
- **Reusable**: Can apply to any voice assistant with visual elements

---

## Success Metrics

✅ Images appear exactly when mentioned
✅ No manual keyboard shortcuts needed
✅ Works for all media types (rooms, attractions, amenities, calendar)
✅ Natural conversation flow maintained
✅ Zero latency (keyword matching is instant)
✅ Reliable across multiple test sessions

---

**Status**: Production-ready ✅
**Pattern**: Proven and reusable 🎯
**Documentation**: Complete 📚
