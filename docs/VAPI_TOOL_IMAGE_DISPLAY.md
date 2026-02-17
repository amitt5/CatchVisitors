# Vapi Tool Implementation Guide: Automatic Image Display

This document explains how to implement Vapi tools that automatically display images when the AI assistant discusses specific items.

## Overview

When the Vapi assistant talks about a product/item, it calls a custom tool that:
1. Sends a request to your server API
2. Triggers the client to display the corresponding image
3. Enhances the user experience with visual context

---

## Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│    Vapi     │  HTTP   │   Server     │         │   Client    │
│  Assistant  │────────>│  API Route   │         │  (Browser)  │
│             │  POST   │              │         │             │
└─────────────┘         └──────────────┘         └─────────────┘
                               │                        │
                               │    WebSocket Events    │
                               └───────────────────────>│
                                                         │
                                                    Display Image
```

**Flow:**
1. User asks about a product
2. Vapi assistant calls `show_product_image` tool (HTTP POST to your server)
3. Server receives the request and logs it
4. Client listens to Vapi WebSocket events
5. Client detects tool call and displays the image

---

## Implementation Steps

### 1. Create Product Image Mapping

Define a mapping of product IDs to images:

```typescript
// components/your-modal/your-voice-bot-modal.tsx

const PRODUCT_IMAGE_MAP: Record<string, { url: string; caption: string }> = {
  "product-id-1": {
    url: "https://example.com/image1.jpg",
    caption: "Product 1 Name — Description"
  },
  "product-id-2": {
    url: "https://example.com/image2.jpg",
    caption: "Product 2 Name — Description"
  },
  // ... add all products
};
```

### 2. Create Server API Endpoint

Create a Next.js API route to handle Vapi tool calls:

**File:** `app/api/[your-app]/show-[item]-image/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('\n🔔 ===== VAPI TOOL CALL RECEIVED =====');
  console.log('⏰ Timestamp:', new Date().toISOString());

  try {
    const body = await req.json();
    console.log('📦 Full request body:', JSON.stringify(body, null, 2));

    const message = body.message;
    const itemId = message?.toolCalls?.[0]?.function?.arguments?.item_id;
    const itemName = message?.toolCalls?.[0]?.function?.arguments?.item_name;

    console.log('🎯 Extracted data:');
    console.log('  - Item ID:', itemId);
    console.log('  - Item Name:', itemName);

    const response = {
      success: true,
      result: `Displaying ${itemName || itemId}`,
      itemId,
      itemName
    };

    console.log('✅ Sending response:', JSON.stringify(response, null, 2));
    console.log('===== END TOOL CALL =====\n');

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ ERROR handling tool call:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process tool call' },
      { status: 500 }
    );
  }
}
```

### 3. Update Middleware (if needed)

Ensure your API route is publicly accessible:

```typescript
// middleware.ts
const isPublicRoute = createRouteMatcher([
  // ... other routes
  "/api/[your-app]/(.*)",  // Add your API routes
]);
```

### 4. Add Client-Side Listener

In your voice bot modal component, listen for tool calls:

```typescript
// In your Vapi initialization useEffect

vapi.on('message', (message: any) => {
  console.log('\n🔵 ===== VAPI MESSAGE RECEIVED =====');
  console.log('⏰ Timestamp:', new Date().toISOString());
  console.log('📋 Message Type:', message.type);
  console.log('📦 Full Message:', JSON.stringify(message, null, 2));

  // Format 1: tool-calls
  if (message.type === 'tool-calls' && message.toolCalls) {
    console.log('🎯 TOOL CALLS DETECTED (format 1)');
    message.toolCalls.forEach((toolCall: any) => {
      if (toolCall.function?.name === 'show_product_image') {
        const params = toolCall.function.arguments;
        let itemId: string;

        // Handle both string and parsed object arguments
        if (typeof params === 'string') {
          try {
            const parsed = JSON.parse(params);
            itemId = parsed.item_id;
          } catch (e) {
            console.error('Failed to parse tool arguments:', e);
            return;
          }
        } else {
          itemId = params.item_id;
        }

        console.log('🔍 Tool call to show item:', itemId);

        const itemImage = PRODUCT_IMAGE_MAP[itemId];
        if (itemImage) {
          console.log('✅ Item image found! Displaying:', itemImage);
          setCurrentMedia([itemImage]);
          setCurrentMediaIndex(0);
          console.log('🖼️  Image display state updated');
        } else {
          console.warn('⚠️  Item ID not found:', itemId);
          console.log('Available IDs:', Object.keys(PRODUCT_IMAGE_MAP));
        }
      }
    });
  }

  // Format 2: toolCallList
  if (message.toolCallList && Array.isArray(message.toolCallList)) {
    console.log('🎯 TOOL CALLS DETECTED (format 2 - toolCallList)');
    message.toolCallList.forEach((toolCall: any) => {
      if (toolCall.function?.name === 'show_product_image') {
        const itemId = toolCall.function.arguments?.item_id;
        console.log('🔍 Tool call (toolCallList) to show item:', itemId);

        const itemImage = PRODUCT_IMAGE_MAP[itemId];
        if (itemImage) {
          console.log('✅ Item image found! Displaying:', itemImage);
          setCurrentMedia([itemImage]);
          setCurrentMediaIndex(0);
        }
      }
    });
  }

  // Format 3: function-call
  if (message.type === 'function-call' && message.functionCall) {
    console.log('🎯 FUNCTION CALL DETECTED (format 3)');
    if (message.functionCall.name === 'show_product_image') {
      const itemId = message.functionCall.parameters?.item_id;
      console.log('🔍 Function call to show item:', itemId);

      const itemImage = PRODUCT_IMAGE_MAP[itemId];
      if (itemImage) {
        console.log('✅ Item image found! Displaying:', itemImage);
        setCurrentMedia([itemImage]);
        setCurrentMediaIndex(0);
      }
    }
  }

  console.log('===== END VAPI MESSAGE =====\n');

  // ... rest of your message handling (transcripts, etc.)
});
```

---

## Vapi Configuration

### 1. Create the Tool in Vapi Dashboard

Go to **Tools** → **Create Tool**

**Tool Settings:**
- **Name:** `show_product_image` (or `show_room_image` for hotels, etc.)
- **Description:** "Display product image on the user's screen when discussing specific NAVANK cable manufacturing materials. Use this when mentioning specific products like water blocking tape, XLPE compounds, mica tape, etc."
- **Type:** Server URL
- **Async:** ✅ Enabled
- **Strict:** ✅ Enabled

### 2. Configure Parameters

**Parameters JSON:**
```json
{
  "type": "object",
  "properties": {
    "item_id": {
      "description": "The unique identifier for the item to display. Must be one of: item-1, item-2, item-3, etc.",
      "type": "string",
      "default": ""
    },
    "item_name": {
      "description": "Human-readable name of the item being shown (e.g. \"Deluxe Suite\", \"Water Blocking Tape\")",
      "type": "string",
      "default": ""
    }
  },
  "required": [
    "item_id",
    "item_name"
  ]
}
```

### 3. Configure Server Settings

**Server URL:**
- **Local (with ngrok):** `https://your-ngrok-url.ngrok.io/api/[your-app]/show-[item]-image`
- **Production:** `https://your-domain.com/api/[your-app]/show-[item]-image`

**Timeout:** 20 seconds

### 4. Update Assistant Prompt

Add this to your assistant's system message:

```
IMPORTANT: When discussing specific [items/products], you MUST call the show_[item]_image tool to display images.

Item IDs to use:
- Item 1 → "item-id-1"
- Item 2 → "item-id-2"
- Item 3 → "item-id-3"
[... list all items with their IDs ...]

ALWAYS call show_[item]_image(item_id="...", item_name="...") BEFORE explaining an item.

When showing images, mention it naturally:
- "Let me show you what that looks like"
- "I'm displaying that on your screen now"
- "Take a look at this"
```

### 5. Enable Tool in Assistant

1. Go to **Assistants** → Your Assistant
2. Find the **Tools** section
3. **Check/Enable** your tool: `☑️ show_product_image`
4. **Save** the assistant

---

## Testing

### 1. Setup for Local Testing

**Terminal 1 - Start Dev Server:**
```bash
npm run dev
```

**Terminal 2 - Start Ngrok:**
```bash
./start-ngrok.sh
```

Copy the ngrok HTTPS URL and update your Vapi tool's Server URL.

### 2. Test the API Endpoint

```bash
curl -X POST https://your-ngrok-url.ngrok.io/api/your-app/show-item-image \
  -H "Content-Type: application/json" \
  -d '{"message":{"toolCalls":[{"function":{"name":"show_product_image","arguments":{"item_id":"item-1","item_name":"Item 1"}}}]}}'
```

Expected response:
```json
{
  "success": true,
  "result": "Displaying Item 1",
  "itemId": "item-1",
  "itemName": "Item 1"
}
```

### 3. Test with Real Assistant

1. Open your app: `http://localhost:3000/your-page`
2. Open browser console (F12)
3. Start voice bot
4. Ask: "Tell me about [item name]"
5. Watch for logs:
   - **Server logs:** `🔔 ===== VAPI TOOL CALL RECEIVED =====`
   - **Browser logs:** `🔵 ===== VAPI MESSAGE RECEIVED =====`
   - **Browser logs:** `✅ Item image found! Displaying:`

### 4. Monitor Requests

**Ngrok Dashboard:** http://127.0.0.1:4040
- See all requests from Vapi to your server in real-time

---

## Troubleshooting

### Issue: Images Not Showing

**Check 1: Is the tool being called?**
- Look in browser console for: `🔵 ===== VAPI MESSAGE RECEIVED =====`
- If NO messages → Tool not being called by Vapi
- If messages but wrong type → Check message.type in logs

**Check 2: Is the server receiving requests?**
- Look in server logs for: `🔔 ===== VAPI TOOL CALL RECEIVED =====`
- If NO → Check Vapi tool Server URL
- Check ngrok dashboard at http://127.0.0.1:4040

**Check 3: Is the tool enabled in assistant?**
- Go to Vapi → Assistants → Your Assistant
- Ensure tool is checked: `☑️ show_product_image`

**Check 4: Are item IDs correct?**
- Check browser logs: `Available IDs: [...]`
- Ensure Vapi is sending correct `item_id` values

### Issue: Assistant Speaking Instead of Calling Tool

**Problem:** Assistant says "Python. Show product image..." instead of actually calling it.

**Solution:**
- Tool is NOT enabled in the assistant
- Go to Assistant settings → Tools section → Enable the tool

### Issue: Ngrok URL Keeps Changing

**Solution:**
- Free ngrok URLs are temporary
- Sign up for ngrok account (free) for static URLs
- Or use production URL once deployed

---

## Adapting for Different Use Cases

### Example: Hotel Demo

**1. Update naming:**
- `show_product_image` → `show_room_image`
- `product_id` → `room_id`
- `PRODUCT_IMAGE_MAP` → `ROOM_IMAGE_MAP`

**2. Room IDs:**
```typescript
const ROOM_IMAGE_MAP: Record<string, { url: string; caption: string }> = {
  "deluxe-canal-view": {
    url: "/images/rooms/deluxe-canal.jpg",
    caption: "Deluxe Canal View — Spacious room with stunning canal views"
  },
  "premium-suite": {
    url: "/images/rooms/premium-suite.jpg",
    caption: "Premium Suite — Luxury suite with private terrace"
  },
  // ... more rooms
};
```

**3. API Route:**
```
/app/api/hotels/show-room-image/route.ts
```

**4. Vapi Tool Name:**
```
show_room_image
```

**5. Parameters:**
```json
{
  "type": "object",
  "properties": {
    "room_id": {
      "description": "Room identifier: deluxe-canal-view, premium-suite, executive-suite",
      "type": "string"
    },
    "room_name": {
      "description": "Human-readable room name",
      "type": "string"
    }
  },
  "required": ["room_id", "room_name"]
}
```

**6. Assistant Prompt:**
```
When discussing hotel rooms, call show_room_image(room_id="...", room_name="...") to display the room.

Room IDs:
- Deluxe Canal View → "deluxe-canal-view"
- Premium Suite → "premium-suite"
- Executive Suite → "executive-suite"
```

---

## Production Deployment

### 1. Update Server URL in Vapi

Replace ngrok URL with production URL:
```
https://your-production-domain.com/api/your-app/show-item-image
```

### 2. Environment Variables

Ensure these are set in production:
```env
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_public_key
VAPI_PRIVATE_KEY=your_vapi_private_key
NEXT_PUBLIC_VAPI_ASSISTANT_ID_YOUR_APP=your_assistant_id
```

### 3. Test Production

Use the same curl test with production URL:
```bash
curl -X POST https://your-domain.com/api/your-app/show-item-image \
  -H "Content-Type: application/json" \
  -d '{"message":{"toolCalls":[{"function":{"name":"show_product_image","arguments":{"item_id":"item-1","item_name":"Item 1"}}}]}}'
```

---

## Code Files Reference

**For Navank Implementation:**
- Client: `/components/navank/navank-voice-bot-modal.tsx`
- Server: `/app/api/navank/show-product-image/route.ts`
- Middleware: `/middleware.ts`

**For Hotel Implementation (to be created):**
- Client: `/components/hotels/voice-bot-modal.tsx`
- Server: `/app/api/hotels/show-room-image/route.ts`
- Middleware: Already configured for `/hotels`

---

## Key Learnings

1. **Tool must be enabled in assistant** - Not just created, but checked in the assistant's tool list
2. **Server URL must include full path** - Not just domain, must have `/api/...` path
3. **Multiple message formats** - Handle tool-calls, toolCallList, and function-call formats
4. **Async tools work better** - Use async server-side tools for reliability
5. **Detailed logging is essential** - Makes debugging much easier
6. **Test API endpoint separately first** - Use curl to verify server before testing with Vapi

---

## Support

For issues:
1. Check server logs for `🔔 VAPI TOOL CALL RECEIVED`
2. Check browser console for `🔵 VAPI MESSAGE RECEIVED`
3. Check ngrok dashboard: http://127.0.0.1:4040
4. Verify tool is enabled in Vapi assistant settings

---

**Last Updated:** February 2026
**Implementation:** Navank Voice Assistant with Product Image Display
