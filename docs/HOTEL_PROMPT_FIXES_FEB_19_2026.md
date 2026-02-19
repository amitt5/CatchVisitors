# Hotel Prompt & Code Fixes - February 19, 2026

## Issues Identified

### 1. Missing Media IDs in Prompt
The prompt provided to the user was incomplete. It only mentioned `rembrandt-square` for attractions and was missing media IDs for:
- ❌ Anne Frank House (`anne-frank-house`)
- ❌ Rijksmuseum (`rijksmuseum`)
- ❌ Rooftop facilities (`rooftop`)
- ❌ Spa (`spa`)
- ❌ Gym (`gym`)

### 2. Booking Calendar Not Appearing
When the agent said "I'm pulling up the booking form on your screen now", the calendar did not appear because the agent was not instructed to call the `show_hotel_media` tool with the `"calendar"` media ID.

### 3. Misleading Prompt Text (Added Feb 19)
The prompt said "dates and room are pre-filled" but they're not actually pre-filled. The user has to select them manually in the calendar.

### 4. Room Images Re-appearing During Booking (Added Feb 19)
When the assistant mentioned "Canal Suite" or "Classic King" during the booking conversation, it would trigger the room image to show again, hiding the calendar. This was confusing because the user needs to see the calendar to complete the booking.

---

## Fixes Implemented

### Fix 1: Complete Media ID List

Updated the prompt to include ALL 9 media IDs:

**Attractions (3):**
- `show_hotel_media("rembrandt-square", "Rembrandt Square")`
- `show_hotel_media("anne-frank-house", "Anne Frank House")`
- `show_hotel_media("rijksmuseum", "Rijksmuseum")`

**Rooms (2):**
- `show_hotel_media("canal-suite", "Canal Suite")`
- `show_hotel_media("classic-king", "Classic King")`

**Amenities (3):**
- `show_hotel_media("rooftop", "Rooftop Terrace")`
- `show_hotel_media("spa", "Spa")`
- `show_hotel_media("gym", "Gym")`

**Booking (1):**
- `show_hotel_media("calendar", "Booking Calendar")` ← **CRITICAL FIX**

### Fix 2: Explicit Booking Calendar Instructions

Added explicit instructions in multiple places:

1. **In the Media ID Reference section:**
   ```
   Booking (CRITICAL - call this when guest wants to book):
   - show_hotel_media("calendar", "Booking Calendar") — Shows booking calendar and form
   ```

2. **In the Conversation Flow section:**
   ```
   9. Booking — ask for dates and room preference, confirm pricing
      - CRITICAL: Call show_hotel_media("calendar", "Booking Calendar") when they want to book
      - Tell them: "I'm pulling up the booking form on your screen now..."
   ```

3. **In the Handling Bookings section:**
   ```
   When a guest wants to book:
   1. IMMEDIATELY call show_hotel_media("calendar", "Booking Calendar") — this displays the booking form
   2. Ask for their preferred dates...
   ```

4. **Added a critical reminder:**
   ```
   CRITICAL: The booking calendar only appears when you call show_hotel_media("calendar", "Booking Calendar").
   Don't forget to call it!
   ```

### Fix 3: Corrected Booking Form Instructions

**Old (incorrect):**
```
"I'm pulling up the booking form on your screen now — the dates and room are pre-filled, just add your details to confirm."
```

**New (correct):**
```
"You should see a booking calendar on your screen now where you can select your dates, choose your room, and confirm your booking."
```

This better reflects the actual user experience - they need to actively select dates and room type, nothing is pre-filled.

### Fix 4: Booking Mode Protection (Code Change)

**Problem:** When assistant mentioned "Canal Suite" during booking conversation, it would show the room image again and hide the calendar.

**Solution:** Implemented "booking mode" in `/components/hotels/voice-bot-modal.tsx`:

1. Added `isInBookingMode` state variable
2. When calendar is shown (`show_hotel_media("calendar", ...)`), set `isInBookingMode = true`
3. When in booking mode, block all other media display requests
4. Calendar stays visible so user can complete booking
5. Booking mode resets when modal closes or reopens

**Code changes:**
- Added state: `const [isInBookingMode, setIsInBookingMode] = useState(false);`
- Modified `showMediaItem()` to check booking mode and block other media
- Added useEffect to reset booking mode on modal open
- Updated `handleClose()` to reset booking mode

**Logging:** Console shows:
- `🔒 Booking mode activated` when calendar appears
- `🔒 BLOCKING media request: [media-id]` when other media is blocked
- `🔓 Booking mode reset` when modal opens

---

## Updated Files

### Prompt Files:

1. **`/docs/HOTEL_ASSISTANT_COMPLETE_PROMPT.md`**
   - Complete, copy-paste ready prompt with all fixes
   - All 9 media IDs clearly listed
   - Corrected booking form instructions (no more "pre-filled")
   - Instruction to avoid mentioning rooms again once calendar is shown

2. **`/docs/HOTEL_VAPI_SYSTEM_PROMPT_ADDITION.md`**
   - Updated booking instructions
   - Corrected language about booking form

3. **`/docs/HOTEL_MEDIA_IDS_QUICK_REFERENCE.md`**
   - Quick reference table with all 9 media IDs
   - Copy-paste code snippets
   - Vapi tool configuration

4. **`/docs/HOTEL_PROMPT_FIXES_FEB_19_2026.md`** (this file)
   - Summary of all issues and fixes
   - Implementation checklist

### Code Files:

5. **`/components/hotels/voice-bot-modal.tsx`**
   - Added booking mode protection
   - Prevents room images from hiding calendar during booking
   - Logging for debugging booking mode behavior

---

## Implementation Checklist

### In Vapi Dashboard:

1. **Update Assistant System Prompt:**
   - [ ] Copy the complete prompt from `/docs/HOTEL_ASSISTANT_COMPLETE_PROMPT.md`
   - [ ] Paste into your Vapi assistant's system message field
   - [ ] Save the assistant

2. **Verify Tool Configuration:**
   - [ ] Go to Tools → `show_hotel_media`
   - [ ] Verify the `media_id` enum includes all 9 IDs:
     ```
     "rembrandt-square", "anne-frank-house", "rijksmuseum",
     "canal-suite", "classic-king",
     "rooftop", "spa", "gym",
     "calendar"
     ```
   - [ ] Save if any changes needed

3. **Enable the Tool:**
   - [ ] Go to your assistant settings
   - [ ] Under "Tools", ensure `show_hotel_media` is **enabled** (not just added)
   - [ ] Save

### Testing:

Test these scenarios to verify the fixes:

1. **Test Attractions:**
   - User: "What's nearby?"
   - Expected: Agent shows Rembrandt Square, Anne Frank House, AND Rijksmuseum images

2. **Test Amenities:**
   - User: "What facilities do you have?"
   - Expected: Agent shows rooftop, spa, and gym images

3. **Test Booking Flow (CRITICAL - Tests both Fix 2 and Fix 4):**

   **Part A: Calendar appears**
   - User: "I'd like to book a room for April 17-20"
   - Expected: Agent calls `show_hotel_media("calendar", "Booking Calendar")`
   - Expected: Booking calendar appears on screen
   - Expected: Agent says "You should see a booking calendar on your screen now where you can select your dates..."
   - ✅ Success: Calendar is visible on screen

   **Part B: Booking mode protects calendar (NEW)**
   - While calendar is showing, agent mentions "Canal Suite" or "Classic King"
   - Expected: Room image does NOT appear (booking mode blocks it)
   - Expected: Calendar stays visible throughout booking conversation
   - Expected: Console logs show `🔒 BLOCKING media request: canal-suite - in booking mode`
   - ✅ Success: Calendar never disappears during booking flow

4. **Test Booking Language (Fix 3):**
   - Listen to what agent says when showing calendar
   - ❌ Should NOT say: "dates and room are pre-filled"
   - ✅ Should say: "select your dates, choose your room, and confirm your booking"

---

## Example Test Transcript (Complete Booking Flow)

**User:** "I'd like to make a reservation for April 17-20"

**Behind the scenes:**
1. Agent silently calls: `show_hotel_media("calendar", "Booking Calendar")`
2. Calendar appears on screen
3. Booking mode activates (console: `🔒 Booking mode activated`)

**Agent says:**
"Perfect! You should see a booking calendar on your screen now. Please select April 17th as your check-in and April 20th as check-out — that's 3 nights. Then you'll be able to choose between the Canal Suite at €380 per night or the Classic King at €210 per night, and complete your booking."

**User:** "What was the Canal Suite price again?"

**Behind the scenes:**
4. Agent tries to call `show_hotel_media("canal-suite", "Canal Suite")`
5. Booking mode blocks it (console: `🔒 BLOCKING media request: canal-suite - in booking mode`)
6. Calendar stays visible ✅

**Agent says:**
"The Canal Suite is €380 per night. For 3 nights that would be €1,140 total."

✅ **Success criteria:**
- Calendar appears when booking starts
- Calendar stays visible even when agent mentions room names
- No mention of "pre-filled" dates or rooms

---

## Technical Notes

### Original Implementation (Fixes 1-2):
- The `calendar` media ID was already supported in the code (`/components/hotels/voice-bot-modal.tsx` line 165)
- The API route already accepts `calendar` as valid (`/app/api/hotels/show-media/route.ts` line 38)
- Only prompt updates needed in Vapi dashboard
- The keyword matching system catches "book", "reservation", "reserve", "dates", "check-in" (see `MEDIA_KEYWORDS` in voice-bot-modal.tsx line 140)

### New Implementation (Fixes 3-4):
- **Fix 3**: Prompt wording changes only - no code
- **Fix 4**: Code changes in `/components/hotels/voice-bot-modal.tsx`:
  - New state: `isInBookingMode`
  - Modified: `showMediaItem()` function checks booking mode
  - Modified: `handleClose()` resets booking mode
  - New: `useEffect` to reset booking mode on modal open
  - All changes are client-side only, no API changes needed

### How Booking Mode Works:
1. User asks to book → Agent calls `show_hotel_media("calendar", ...)`
2. `showMediaItem("calendar")` sets `isInBookingMode = true` and `setShowCalendar(true)`
3. Agent mentions "Canal Suite" → Triggers `show_hotel_media("canal-suite", ...)`
4. `showMediaItem("canal-suite")` checks `isInBookingMode` → returns early (blocked)
5. Calendar stays visible, room image never shows
6. When modal closes, `isInBookingMode` resets to `false`

---

## Root Cause

The agent was not explicitly instructed to call the `show_hotel_media` tool when handling bookings. While the code supported the `calendar` media ID, the prompt didn't tell the agent to use it.

The fix adds multiple explicit reminders in the prompt to call `show_hotel_media("calendar", "Booking Calendar")` whenever a guest wants to book.
