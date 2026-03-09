import { useState } from "react";

const Phone = ({ label, sublabel, children }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    <div style={{
      width: 220, height: 420, border: "3px solid #222", borderRadius: 28,
      background: "#f5f3ee", overflow: "hidden", position: "relative",
      boxShadow: "4px 4px 0 #222", display: "flex", flexDirection: "column"
    }}>
      <div style={{ width: 70, height: 10, background: "#222", borderRadius: "0 0 8px 8px", margin: "0 auto 0" }} />
      {children}
    </div>
    <div style={{ textAlign: "center", maxWidth: 220 }}>
      <div style={{
        background: "#222", color: "#f5f3ee", fontSize: 11, fontWeight: 700,
        padding: "4px 12px", borderRadius: 4, letterSpacing: 0.5
      }}>{label}</div>
      {sublabel && <div style={{ fontSize: 9, color: "#888", marginTop: 3 }}>{sublabel}</div>}
    </div>
  </div>
);

const AgentBar = ({ speaking = false, text = "Speaking…" }) => (
  <div style={{
    background: "#1a1a1a", padding: "6px 10px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexShrink: 0
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: speaking ? "#8B7355" : "#555",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9
      }}>🎙️</div>
      <div style={{ fontSize: 8, color: "#ccc" }}>● {text}</div>
    </div>
    {speaking && (
      <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
        {[4,8,5,10,6,8,4].map((h, i) => (
          <div key={i} style={{ width: 2, height: h, background: "#8B7355", borderRadius: 1 }} />
        ))}
      </div>
    )}
  </div>
);

const ImgBox = ({ w = "100%", h = 100, label, overlay, style = {} }) => (
  <div style={{
    width: w, height: h, background: "linear-gradient(135deg, #d4cfc6 0%, #b8b0a0 100%)",
    borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", flexShrink: 0, ...style
  }}>
    <span style={{ fontSize: 8, color: "#888" }}>{label || "PHOTO"}</span>
    {overlay && (
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
        borderRadius: "0 0 8px 8px", padding: "12px 8px 6px"
      }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>{overlay.title}</div>
        {overlay.sub && <div style={{ fontSize: 8, color: "rgba(255,255,255,0.75)", marginTop: 1 }}>{overlay.sub}</div>}
      </div>
    )}
  </div>
);

const Dots = ({ total = 4, active = 0 }) => (
  <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        width: i === active ? 16 : 5, height: 5, borderRadius: 3,
        background: i === active ? "#8B7355" : "#ccc",
        transition: "width 0.2s"
      }} />
    ))}
  </div>
);

// ─── Rooms: fullscreen hero + swipe ───
const RoomGalleryHero = () => (
  <Phone label="ROOMS — Hero carousel" sublabel="Swipe left/right to browse rooms">
    <AgentBar speaking text="Here are our rooms — swipe to explore" />
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Hero image */}
      <div style={{ position: "relative", height: 180, flexShrink: 0 }}>
        <ImgBox h={180} style={{ borderRadius: 0, width: "100%" }} label="DELUXE ROOM — GARDEN VIEW"
          overlay={{ title: "Deluxe — Garden View", sub: "€269 / night" }} />
        {/* prev/next arrows */}
        <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 22, height: 22, background: "rgba(255,255,255,0.8)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>‹</div>
        <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 22, height: 22, background: "rgba(255,255,255,0.8)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>›</div>
        {/* counter badge */}
        <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.5)", borderRadius: 10, padding: "2px 7px", fontSize: 8, color: "#fff" }}>1 / 4</div>
      </div>
      {/* Room detail card */}
      <div style={{ flex: 1, background: "#fff", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700 }}>Deluxe Room</div>
            <div style={{ fontSize: 9, color: "#888" }}>Garden View · 28 m²</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>€269</div>
            <div style={{ fontSize: 8, color: "#aaa" }}>per night</div>
          </div>
        </div>
        {/* feature pills */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {["King bed", "Garden view", "Ensuite"].map(p => (
            <div key={p} style={{ padding: "2px 7px", background: "#f0ece3", border: "1px solid #e0dbd0", borderRadius: 10, fontSize: 7.5, color: "#666" }}>{p}</div>
          ))}
        </div>
        {/* thumbnail strip */}
        <div>
          <div style={{ fontSize: 8, color: "#aaa", marginBottom: 4 }}>All rooms</div>
          <div style={{ display: "flex", gap: 5 }}>
            {["Garden View", "Balcony", "Prestige", "Suite"].map((r, i) => (
              <div key={r} style={{
                width: 36, height: 28, borderRadius: 4,
                background: i === 0 ? "linear-gradient(135deg, #8B7355, #c4a882)" : "linear-gradient(135deg, #d4cfc6, #b8b0a0)",
                border: i === 0 ? "2px solid #8B7355" : "1.5px solid #ddd",
                display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden"
              }}>
                <div style={{ fontSize: 5.5, color: i === 0 ? "#fff" : "#999", padding: "0 2px 2px", textAlign: "center", lineHeight: 1.2 }}>{r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* CTA */}
      <div style={{ background: "#1a1a1a", margin: "0 10px 10px", borderRadius: 8, padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 9, color: "#fff", fontWeight: 600 }}>Book This Room →</span>
      </div>
    </div>
  </Phone>
);

// ─── Amenities: grid layout ───
const AmenitiesGrid = () => (
  <Phone label="AMENITIES — Photo grid" sublabel="Tap any card to expand full image">
    <AgentBar speaking text="Let me show you our facilities" />
    <div style={{ flex: 1, background: "#f9f7f3", padding: "10px", display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
      <div style={{ fontSize: 10, fontWeight: 700 }}>Amenities</div>
      {/* 2-col grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {[
          { name: "Rooftop Pool", icon: "🏊", tag: "Open 7–22h" },
          { name: "Spa & Wellness", icon: "🧖", tag: "By appointment" },
          { name: "Restaurant", icon: "🍽️", tag: "Breakfast incl." },
          { name: "Fitness Center", icon: "💪", tag: "24h access" },
          { name: "Bar & Lounge", icon: "🍸", tag: "Until midnight" },
          { name: "Concierge", icon: "🛎️", tag: "24h service" },
        ].map(({ name, icon, tag }, i) => (
          <div key={name} style={{
            background: "#fff", borderRadius: 8,
            border: "1px solid #e8e2d8", overflow: "hidden"
          }}>
            <ImgBox h={56} style={{ borderRadius: 0, width: "100%" }} label={icon} />
            <div style={{ padding: "5px 7px" }}>
              <div style={{ fontSize: 8, fontWeight: 700 }}>{name}</div>
              <div style={{ fontSize: 7, color: "#aaa", marginTop: 1 }}>{tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Phone>
);

// ─── Amenity expanded ───
const AmenityExpanded = () => (
  <Phone label="AMENITIES — Tapped to expand" sublabel="Full-screen detail on tap">
    <AgentBar speaking={false} text="Rooftop Pool details" />
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* full image */}
      <div style={{ position: "relative", height: 160, flexShrink: 0 }}>
        <ImgBox h={160} style={{ borderRadius: 0, width: "100%" }} label="🏊 ROOFTOP POOL"
          overlay={{ title: "Rooftop Pool", sub: "Open daily · 7:00–22:00" }} />
        <div style={{ position: "absolute", top: 8, left: 8, width: 22, height: 22, background: "rgba(0,0,0,0.5)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", cursor: "pointer" }}>←</div>
      </div>
      <div style={{ flex: 1, background: "#fff", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 800 }}>Rooftop Pool</div>
        <div style={{ fontSize: 8, color: "#666", lineHeight: 1.6 }}>
          A heated outdoor pool on the 6th floor with panoramic views over Amsterdam's canal ring.
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {["Heated", "Panoramic view", "Towels provided", "Adults only"].map(p => (
            <div key={p} style={{ padding: "2px 7px", background: "#f0ece3", border: "1px solid #e0dbd0", borderRadius: 10, fontSize: 7.5 }}>{p}</div>
          ))}
        </div>
        {/* hours */}
        <div style={{ background: "#f9f7f3", borderRadius: 6, padding: "7px 9px" }}>
          <div style={{ fontSize: 8, fontWeight: 700, marginBottom: 4 }}>Hours</div>
          {[["Mon–Fri", "7:00–22:00"], ["Sat–Sun", "8:00–22:00"]].map(([d, h]) => (
            <div key={d} style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: "#666" }}>
              <span>{d}</span><span>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Phone>
);

// ─── Attractions: list with map pin aesthetic ───
const AttractionsList = () => (
  <Phone label="ATTRACTIONS — Nearby list" sublabel="Distance + quick description">
    <AgentBar speaking text="Here's what's nearby the hotel" />
    <div style={{ flex: 1, background: "#f9f7f3", padding: "10px", display: "flex", flexDirection: "column", gap: 6, overflowY: "auto" }}>
      <div style={{ fontSize: 10, fontWeight: 700 }}>Nearby Attractions</div>
      {[
        { name: "Rijksmuseum", dist: "400m", walk: "5 min walk", icon: "🏛️", tag: "Museum" },
        { name: "Vondelpark", dist: "600m", walk: "8 min walk", icon: "🌳", tag: "Park" },
        { name: "Anne Frank House", dist: "1.2km", walk: "15 min walk", icon: "🏠", tag: "Historical" },
      ].map(({ name, dist, walk, icon, tag }) => (
        <div key={name} style={{
          background: "#fff", border: "1px solid #e8e2d8", borderRadius: 8,
          overflow: "hidden", display: "flex"
        }}>
          <ImgBox w={64} h={72} style={{ borderRadius: 0, width: 64, flexShrink: 0 }} label={icon} />
          <div style={{ flex: 1, padding: "7px 9px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 3 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontSize: 9, fontWeight: 700 }}>{name}</div>
              <div style={{ fontSize: 7, color: "#aaa", background: "#f0ece3", padding: "1px 5px", borderRadius: 8 }}>{tag}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 8 }}>📍</span>
              <span style={{ fontSize: 8, color: "#8B7355", fontWeight: 600 }}>{dist}</span>
              <span style={{ fontSize: 7, color: "#aaa" }}>· {walk}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Phone>
);

// ─── Attraction expanded ───
const AttractionExpanded = () => (
  <Phone label="ATTRACTIONS — Tapped to expand" sublabel="Map + details on tap">
    <AgentBar speaking={false} text="Rijksmuseum details" />
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* photo */}
      <div style={{ position: "relative", height: 130, flexShrink: 0 }}>
        <ImgBox h={130} style={{ borderRadius: 0, width: "100%" }} label="🏛️ RIJKSMUSEUM"
          overlay={{ title: "Rijksmuseum", sub: "400m · 5 min walk" }} />
        <div style={{ position: "absolute", top: 8, left: 8, width: 22, height: 22, background: "rgba(0,0,0,0.5)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff" }}>←</div>
      </div>
      {/* map stub */}
      <div style={{
        height: 60, background: "linear-gradient(135deg, #c8d8c0 0%, #a8c0a0 50%, #c8d8c0 100%)",
        flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative"
      }}>
        {/* fake map grid */}
        {[30, 70, 50, 90].map((l, i) => (
          <div key={i} style={{ position: "absolute", left: `${l}%`, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.3)" }} />
        ))}
        {[30, 70].map((t, i) => (
          <div key={i} style={{ position: "absolute", top: `${t}%`, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.3)" }} />
        ))}
        {/* pin */}
        <div style={{ position: "absolute", left: "55%", top: "25%", fontSize: 16 }}>📍</div>
        <div style={{ position: "absolute", left: "30%", top: "55%", fontSize: 10 }}>🏨</div>
        {/* route line */}
        <div style={{ position: "absolute", left: "36%", top: "55%", width: "19%", height: 1.5, background: "#8B7355", transform: "rotate(-15deg)", transformOrigin: "left center" }} />
        <div style={{ position: "absolute", bottom: 4, right: 8, background: "rgba(0,0,0,0.5)", borderRadius: 4, padding: "2px 5px", fontSize: 7, color: "#fff" }}>View in Maps</div>
      </div>
      <div style={{ flex: 1, background: "#fff", padding: "9px 12px", display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ fontSize: 11, fontWeight: 800 }}>Rijksmuseum</div>
        <div style={{ fontSize: 8, color: "#666", lineHeight: 1.6 }}>
          The Netherlands' national museum of art and history. Rembrandt, Vermeer, and the Dutch Golden Age.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["400m", "Distance"], ["5 min", "Walk"], ["€22.50", "Entry"]].map(([val, lbl]) => (
            <div key={lbl} style={{ flex: 1, background: "#f9f7f3", borderRadius: 6, padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 10, fontWeight: 700 }}>{val}</div>
              <div style={{ fontSize: 7, color: "#aaa" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Phone>
);

// ─── Rooms: thumbnail-first approach (alternative) ───
const RoomThumbnailStrip = () => (
  <Phone label="ROOMS — Alt: horizontal scroll strip" sublabel="Compact strip, agent stays bigger">
    <AgentBar speaking text="We have 4 room types available" />
    {/* agent still has space */}
    <div style={{ flex: 1, background: "#fff", padding: "10px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* scrollable horizontal strip */}
      <div style={{ paddingLeft: 10 }}>
        <div style={{ fontSize: 8, color: "#aaa", marginBottom: 6, paddingRight: 10 }}>Tap a room to see more</div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingRight: 10 }}>
          {[
            { name: "Deluxe Garden", price: "€269", active: false },
            { name: "Deluxe Balcony", price: "€289", active: true },
            { name: "Prestige", price: "€349", active: false },
            { name: "Suite", price: "€489", active: false },
          ].map(({ name, price, active }) => (
            <div key={name} style={{
              flexShrink: 0, width: 90, border: active ? "2px solid #8B7355" : "1.5px solid #e8e2d8",
              borderRadius: 8, overflow: "hidden", background: active ? "#fdf9f4" : "#fff"
            }}>
              <ImgBox h={60} style={{ borderRadius: 0, width: "100%" }} label="🛏️" />
              <div style={{ padding: "5px 6px" }}>
                <div style={{ fontSize: 7.5, fontWeight: 600, lineHeight: 1.3 }}>{name}</div>
                <div style={{ fontSize: 8, fontWeight: 800, color: "#8B7355", marginTop: 2 }}>{price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* selected room detail inline */}
      <div style={{ flex: 1, borderTop: "1px solid #f0ece3", padding: "10px 10px 0" }}>
        <div style={{ fontSize: 9, color: "#aaa", marginBottom: 6 }}>Selected room</div>
        <div style={{ display: "flex", gap: 8 }}>
          <ImgBox w={70} h={56} style={{ width: 70, flexShrink: 0, borderRadius: 6 }} label="🛏️" />
          <div>
            <div style={{ fontSize: 10, fontWeight: 700 }}>Deluxe — Balcony</div>
            <div style={{ fontSize: 8, color: "#888" }}>30 m² · Canal-side balcony</div>
            <div style={{ display: "flex", gap: 3, marginTop: 4, flexWrap: "wrap" }}>
              {["King bed", "Balcony", "Canal view"].map(p => (
                <div key={p} style={{ padding: "1px 5px", background: "#f0ece3", borderRadius: 8, fontSize: 6.5 }}>{p}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div style={{ background: "#1a1a1a", margin: "0 10px 10px", borderRadius: 8, padding: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 9, color: "#fff", fontWeight: 600 }}>Book This Room →</span>
      </div>
    </div>
  </Phone>
);

export default function GalleryWireframes() {
  return (
    <div style={{ background: "#f0ece3", minHeight: "100vh", padding: "32px 24px", fontFamily: "monospace" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Image Gallery States — Mobile Widget</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>CatchVisitors · Hotel vertical · Rooms / Amenities / Attractions</div>
        </div>

        {/* ROOMS section */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#8B7355", marginBottom: 14, textTransform: "uppercase" }}>── Rooms</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6, overflowX: "auto", paddingBottom: 8 }}>
            <RoomGalleryHero />
            <div style={{ display: "flex", alignItems: "center", height: 420, paddingTop: 60 }}>
              <div style={{ fontSize: 18, color: "#ccc" }}>vs</div>
            </div>
            <RoomThumbnailStrip />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxWidth: 500, marginTop: 8 }}>
            <div style={{ background: "#fff", border: "1.5px solid #ddd", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, marginBottom: 4 }}>OPTION A — Hero Carousel</div>
              <div style={{ fontSize: 9, color: "#666", lineHeight: 1.5 }}>One room fills the screen. Swipe left/right between rooms. Thumbnail strip at bottom for quick nav. Best for visual impact.</div>
            </div>
            <div style={{ background: "#fff", border: "1.5px solid #ddd", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, marginBottom: 4 }}>OPTION B — Strip + Detail</div>
              <div style={{ fontSize: 9, color: "#666", lineHeight: 1.5 }}>Horizontal scroll strip at top, selected room detail below. Agent bar stays visible. Best for comparison shopping.</div>
            </div>
          </div>
        </div>

        {/* AMENITIES section */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#8B7355", marginBottom: 14, textTransform: "uppercase" }}>── Amenities</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 24, overflowX: "auto", paddingBottom: 8 }}>
            <AmenitiesGrid />
            <div style={{ display: "flex", alignItems: "center", height: 420, paddingTop: 60 }}>
              <div style={{ fontSize: 20, color: "#aaa" }}>→ tap →</div>
            </div>
            <AmenityExpanded />
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #ddd", borderRadius: 8, padding: "10px 12px", maxWidth: 460, marginTop: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 800, marginBottom: 4 }}>AMENITIES PATTERN</div>
            <div style={{ fontSize: 9, color: "#666", lineHeight: 1.5 }}>
              2-column photo grid overview → tap any card → full image + hours + feature pills. Back arrow returns to grid. No CTA needed (amenities are included).
            </div>
          </div>
        </div>

        {/* ATTRACTIONS section */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#8B7355", marginBottom: 14, textTransform: "uppercase" }}>── Nearby Attractions</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 24, overflowX: "auto", paddingBottom: 8 }}>
            <AttractionsList />
            <div style={{ display: "flex", alignItems: "center", height: 420, paddingTop: 60 }}>
              <div style={{ fontSize: 20, color: "#aaa" }}>→ tap →</div>
            </div>
            <AttractionExpanded />
          </div>
          <div style={{ background: "#fff", border: "1.5px solid #ddd", borderRadius: 8, padding: "10px 12px", maxWidth: 460, marginTop: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 800, marginBottom: 4 }}>ATTRACTIONS PATTERN</div>
            <div style={{ fontSize: 9, color: "#666", lineHeight: 1.5 }}>
              Vertical list with distance badge. Tap → photo + mini map stub with walking route + distance/entry stats. "View in Maps" opens native maps app. Agent can narrate while user browses.
            </div>
          </div>
        </div>

        {/* Key decisions */}
        <div style={{ borderTop: "2px solid #222", paddingTop: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 12 }}>KEY DESIGN DECISIONS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, maxWidth: 700 }}>
            {[
              ["Agent always visible", "Even when browsing images, the agent bar stays at the top so user knows conversation is still active. Dark strip so it doesn't compete with content."],
              ["Tap to expand", "All three content types use a two-level pattern: overview list/grid → tapped detail. Keeps initial view scannable."],
              ["Back = return to agent", "Back arrow on any expanded view returns to the main agent bottom sheet, not just the previous content. Voice flow continues."],
            ].map(([title, desc]) => (
              <div key={title} style={{ background: "#fff", border: "1.5px solid #ddd", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, fontWeight: 800, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 9, color: "#666", lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
