# Hotel Media IDs - Quick Reference Card

## Complete List of Media IDs for show_hotel_media Tool

| Category | Media ID | Media Name | When to Use |
|----------|----------|------------|-------------|
| **Attractions** | | | |
| | `rembrandt-square` | "Rembrandt Square" | Mentioning Rembrandt Square |
| | `anne-frank-house` | "Anne Frank House" | Mentioning Anne Frank House |
| | `rijksmuseum` | "Rijksmuseum" | Mentioning Rijksmuseum/museum |
| **Rooms** | | | |
| | `canal-suite` | "Canal Suite" | Describing Canal Suite (show FIRST) |
| | `classic-king` | "Classic King" | Describing Classic King (show SECOND) |
| **Amenities** | | | |
| | `rooftop` | "Rooftop Terrace" | Mentioning rooftop/terrace |
| | `spa` | "Spa" | Mentioning spa/pool/sauna/steam room |
| | `gym` | "Gym" | Mentioning gym/fitness |
| **Booking** | | | |
| | `calendar` | "Booking Calendar" | Guest wants to book/reserve |

---

## Copy-Paste Tool Calls

```javascript
// Attractions
show_hotel_media("rembrandt-square", "Rembrandt Square")
show_hotel_media("anne-frank-house", "Anne Frank House")
show_hotel_media("rijksmuseum", "Rijksmuseum")

// Rooms (show in this order)
show_hotel_media("canal-suite", "Canal Suite")      // FIRST
show_hotel_media("classic-king", "Classic King")    // SECOND

// Amenities
show_hotel_media("rooftop", "Rooftop Terrace")
show_hotel_media("spa", "Spa")
show_hotel_media("gym", "Gym")

// Booking
show_hotel_media("calendar", "Booking Calendar")    // CRITICAL for booking
```

---

## Vapi Tool Configuration

In Vapi Dashboard → Tools → `show_hotel_media`

**Parameters Schema:**
```json
{
  "type": "object",
  "properties": {
    "media_id": {
      "type": "string",
      "enum": [
        "rembrandt-square",
        "anne-frank-house",
        "rijksmuseum",
        "canal-suite",
        "classic-king",
        "rooftop",
        "spa",
        "gym",
        "calendar"
      ],
      "description": "ID of the media to display"
    },
    "media_name": {
      "type": "string",
      "description": "Display name of the media item"
    }
  },
  "required": ["media_id", "media_name"]
}
```

---

## Critical Reminders

1. **All 9 media IDs are available** - not just rembrandt-square!
2. **Calendar is a media ID** - call it when guest wants to book
3. **Tool calls are silent** - never announce you're calling them
4. **Call tools one at a time** - not in batches
5. **Timing**: Call tool → Describe item (4-5s) → Pause (2s) → Next tool
