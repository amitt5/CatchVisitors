# Hotel Booking Mode Fix v2 - February 19, 2026

## Problem Identified

The initial booking mode implementation didn't work because **React state updates are asynchronous**.

### What Happened:

1. Assistant called `show_hotel_media("calendar", "Booking Calendar")`
2. Code set `isInBookingMode = true` (state)
3. Immediately after, assistant called `show_hotel_media("canal-suite", "Canal Suite")`
4. But the state update from step 2 hadn't completed yet!
5. So the check `if (isInBookingMode)` was still `false`
6. Room image showed, hiding the calendar ❌

### User Feedback:

> "when it said you should see booking calendar it showed the calendar but the moment it mentioned canal suite the room was shown again"

---

## Fix v2: Use Ref for Immediate Tracking

**Problem**: State updates are async in React
**Solution**: Use `useRef` which updates immediately (synchronous)

### Code Changes

```typescript
// Added ref for immediate (synchronous) tracking
const isInBookingModeRef = useRef(false);

// In showMediaItem function:
if (mediaId === 'calendar') {
  setIsInBookingMode(true);           // Update state (for UI)
  isInBookingModeRef.current = true;  // Update ref (immediate!)
} else {
  // Check ref FIRST (immediate), then state (backup)
  if (isInBookingModeRef.current || isInBookingMode) {
    console.log('🔒 BLOCKING media request:', mediaId);
    return; // Block!
  }
}

// Reset ref when modal opens/closes
useEffect(() => {
  isInBookingModeRef.current = false;
}, [isOpen]);
```

### Why This Works:

| Approach | Update Speed | When Available |
|----------|--------------|----------------|
| `setState()` | Async | Next render |
| `ref.current =` | Immediate | Same function |

When multiple media calls happen in quick succession:
- **State**: ❌ Still has old value
- **Ref**: ✅ Has new value immediately

---

## Additional Prompt Improvements

### Issue: Assistant Mentions Room Names During Booking

**Problem**: Saying "Canal Suite" or "Classic King" after showing calendar triggers their media tools

**Fix**: Updated prompt to explicitly forbid mentioning room names after calendar is shown

**New Instructions:**

```
When a guest wants to book:
1. Call show_hotel_media("calendar", "Booking Calendar")
2. Tell them: "You should see a booking calendar on your screen now..."
3. CRITICAL: Do NOT mention room names (Canal Suite or Classic King) after showing calendar
4. Ask: "Would you like me to stay on the call while you complete the booking?"
5. If they ask about pricing AFTER calendar shown, just state price — don't call room tool
```

### Example (CORRECT):

Guest: "I'd like to book April 17-20"

*[Call calendar tool]*
"Perfect! You should see a booking calendar on your screen now. Please select April 17th check-in and April 20th check-out. Would you like me to stay on the call while you complete the booking?"

✅ No room names mentioned → Calendar stays visible

### Example (WRONG - OLD BEHAVIOR):

Guest: "I'd like to book April 17-20"

*[Call calendar tool]*
"Perfect! Calendar is showing. Would you prefer the **Canal Suite** or Classic King?"

❌ Mentioned "Canal Suite" → Triggers room tool → Calendar disappears

---

## Better UX: Ask About Staying on Call

**New behavior**: After showing calendar, ask if visitor wants help or prefers to proceed alone

**Example flows:**

**Flow 1 - Visitor wants to proceed alone:**
```
Agent: "Would you like me to stay on the call while you complete the booking?"
Visitor: "No thanks, I got it"
Agent: "Perfect! Take your time. I'm here if you need anything."
```

**Flow 2 - Visitor wants help:**
```
Agent: "Would you like me to stay on the call while you complete the booking?"
Visitor: "Yes please"
Agent: "Of course! I'm here if you have any questions while filling it out."
```

---

## Files Updated

### Code:
1. **`/components/hotels/voice-bot-modal.tsx`**
   - Added `isInBookingModeRef` ref
   - Modified `showMediaItem()` to check ref first
   - Added debug logging for booking mode status
   - Reset ref in `useEffect` and `handleClose()`

### Prompts:
2. **`/docs/HOTEL_ASSISTANT_COMPLETE_PROMPT.md`**
   - Added warning not to mention room names after calendar
   - Updated handling bookings section with "stay on call" question
   - Updated examples to show correct behavior
   - Added prominent warning in Media ID section

---

## Testing

### Test Scenario 1: Booking Mode Blocks Room Images

1. Say: "I'd like to book for April 17-20"
2. **Expected**: Calendar appears
3. **Expected**: Console shows `🔒 Booking mode activated`
4. Assistant mentions "Canal Suite" in speech
5. **Expected**: Console shows `🔒 BLOCKING media request: canal-suite`
6. **Expected**: Calendar STAYS VISIBLE (room image does NOT appear)
7. ✅ **Success**: Calendar never disappears

### Test Scenario 2: Assistant Doesn't Mention Room Names

1. Say: "I'd like to book for April 17-20"
2. **Expected**: Calendar appears
3. **Listen**: Agent should NOT say "Canal Suite" or "Classic King" by name
4. **Expected**: Agent asks "Would you like me to stay on the call?"
5. ✅ **Success**: No room names mentioned, calendar stays visible

### Test Scenario 3: Assistant Asks About Staying on Call

1. Say: "I'd like to book a room"
2. **Expected**: Calendar appears
3. **Expected**: Agent asks: "Would you like me to stay on the call while you complete the booking?"
4. Say: "Yes please" or "No thanks"
5. **Expected**: Agent responds appropriately
6. ✅ **Success**: Better UX, visitor has choice

---

## Console Logs to Look For

When booking mode is working correctly, you'll see:

```
🖼️  Showing media item: calendar
📊 Current booking mode status: { state: false, ref: false, showCalendar: false }
✅ Displaying booking calendar - entering booking mode
🔒 Booking mode activated - other media will be blocked

🖼️  Showing media item: canal-suite
📊 Current booking mode status: { state: true, ref: true, showCalendar: true }
🔒 BLOCKING media request: canal-suite - in booking mode, calendar must stay visible
   Booking mode ref: true | state: true
```

---

## Technical Explanation

### Why Refs Work When State Doesn't:

**React State:**
```javascript
setIsInBookingMode(true);  // Schedules update for next render
if (isInBookingMode) {     // Still FALSE here!
  // This won't block yet
}
```

**React Ref:**
```javascript
isInBookingModeRef.current = true;  // Updates IMMEDIATELY
if (isInBookingModeRef.current) {   // TRUE immediately!
  // This WILL block!
}
```

### When to Use Refs vs State:

- **State**: When you need React to re-render on change
- **Ref**: When you need immediate value for logic checks

In our case:
- State: Nice to have (could show UI indicator)
- Ref: **Critical** for blocking logic to work correctly

---

## Deployment Checklist

- [x] Code updated with ref-based booking mode
- [x] Prompt updated to avoid room names during booking
- [x] Prompt updated to ask about staying on call
- [x] Build tested and passes
- [ ] Update Vapi assistant with new prompt
- [ ] Test booking flow end-to-end
- [ ] Verify console logs show blocking behavior
- [ ] Verify calendar stays visible during entire booking
