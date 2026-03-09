import { useState } from "react";

const W = ({ children, style, className = "" }) => (
  <div className={className} style={{ fontFamily: "monospace", ...style }}>{children}</div>
);

const Phone = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    <div style={{
      width: 220, height: 420, border: "3px solid #222", borderRadius: 28,
      background: "#f5f3ee", overflow: "hidden", position: "relative",
      boxShadow: "4px 4px 0 #222", display: "flex", flexDirection: "column"
    }}>
      {/* notch */}
      <div style={{ width: 70, height: 10, background: "#222", borderRadius: "0 0 8px 8px", margin: "0 auto 0" }} />
      {children}
    </div>
    <div style={{
      background: "#222", color: "#f5f3ee", fontSize: 11, fontWeight: 700,
      padding: "4px 12px", borderRadius: 4, letterSpacing: 0.5, textAlign: "center", maxWidth: 220
    }}>{label}</div>
  </div>
);

const Bar = ({ h = 12, w = "100%", color = "#d4c9b0", radius = 4, style = {} }) => (
  <div style={{ height: h, width: w, background: color, borderRadius: radius, ...style }} />
);

const Dot = ({ size = 8, color = "#222" }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: color }} />
);

// ─── State 0: Widget closed, page visible ───
const State0 = () => (
  <Phone label="STATE 0 — Page with widget button">
    <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
      {/* hotel name */}
      <Bar h={10} w="60%" color="#aaa" />
      <Bar h={7} w="40%" color="#ccc" />
      {/* hero image placeholder */}
      <div style={{ height: 90, background: "#ddd", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 9, color: "#888" }}>HERO IMAGE</span>
      </div>
      {/* nav pills */}
      <div style={{ display: "flex", gap: 4 }}>
        {["Rooms","Amenities","Location"].map(t => (
          <div key={t} style={{ padding: "3px 6px", border: "1px solid #bbb", borderRadius: 10, fontSize: 8, color: "#666" }}>{t}</div>
        ))}
      </div>
      {/* content lines */}
      {[80, 60, 70, 50].map((w, i) => <Bar key={i} h={6} w={`${w}%`} color="#ddd" />)}
    </div>
    {/* Floating mic button */}
    <div style={{
      position: "absolute", bottom: 16, right: 14,
      width: 42, height: 42, borderRadius: "50%",
      background: "#8B7355", display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 3px 8px rgba(0,0,0,0.3)", border: "2px solid #222"
    }}>
      <span style={{ fontSize: 16 }}>🎙️</span>
    </div>
    {/* label */}
    <div style={{ position: "absolute", bottom: 22, right: 62, background: "#222", color: "#fff", fontSize: 8, padding: "2px 6px", borderRadius: 4 }}>
      Ask AI
    </div>
  </Phone>
);

// ─── State 1: Widget open, idle (both options visible) ───
const State1 = () => (
  <Phone label="STATE 1 — Agent open, idle">
    <div style={{ flex: 1, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
      {/* dimmed bg hint */}
      {[80, 60, 70].map((w, i) => <Bar key={i} h={6} w={`${w}%`} color="#e0ddd5" />)}
    </div>
    {/* Bottom sheet agent panel */}
    <div style={{
      background: "#fff", borderTop: "2px solid #222",
      borderRadius: "16px 16px 0 0",
      padding: "12px 12px 16px",
      display: "flex", flexDirection: "column", gap: 10,
      boxShadow: "0 -4px 20px rgba(0,0,0,0.15)"
    }}>
      {/* handle */}
      <div style={{ width: 36, height: 4, background: "#ccc", borderRadius: 2, margin: "0 auto" }} />
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#8B7355", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>🎙️</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700 }}>AI Concierge</div>
            <div style={{ fontSize: 8, color: "#888" }}>● Ready</div>
          </div>
        </div>
        <div style={{ fontSize: 14, color: "#888", cursor: "pointer" }}>✕</div>
      </div>
      {/* Big mic button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "#8B7355", border: "2px solid #222",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
        }}>🎙️</div>
        <div style={{ fontSize: 9, color: "#666" }}>Tap to speak</div>
      </div>
      {/* Divider with OR */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ flex: 1, height: 1, background: "#eee" }} />
        <span style={{ fontSize: 8, color: "#aaa" }}>OR</span>
        <div style={{ flex: 1, height: 1, background: "#eee" }} />
      </div>
      {/* Text input */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        border: "1.5px solid #ddd", borderRadius: 20, padding: "6px 10px"
      }}>
        <span style={{ fontSize: 9, color: "#aaa", flex: 1 }}>Type your question…</span>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#8B7355", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff" }}>→</div>
      </div>
    </div>
  </Phone>
);

// ─── State 2: Voice active ───
const State2 = () => (
  <Phone label="STATE 2 — Voice active (text gone)">
    <div style={{ flex: 1, padding: "8px 10px", opacity: 0.3, display: "flex", flexDirection: "column", gap: 6 }}>
      {[80, 60, 70].map((w, i) => <Bar key={i} h={6} w={`${w}%`} color="#ddd" />)}
    </div>
    <div style={{
      background: "#1a1a1a", borderTop: "2px solid #222",
      borderRadius: "16px 16px 0 0",
      padding: "12px 12px 20px",
      display: "flex", flexDirection: "column", gap: 10,
      alignItems: "center"
    }}>
      <div style={{ width: 36, height: 4, background: "#444", borderRadius: 2, margin: "0 auto" }} />
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#8B7355", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>🎙️</div>
          <div style={{ fontSize: 9, color: "#aaa" }}>AI Concierge</div>
        </div>
        <div style={{ fontSize: 12, color: "#666" }}>✕</div>
      </div>
      {/* pulsing mic */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 70, height: 70 }}>
        <div style={{ position: "absolute", width: 70, height: 70, borderRadius: "50%", background: "rgba(139,115,85,0.2)", border: "1px solid rgba(139,115,85,0.4)" }} />
        <div style={{ position: "absolute", width: 56, height: 56, borderRadius: "50%", background: "rgba(139,115,85,0.3)" }} />
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#8B7355", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎙️</div>
      </div>
      {/* waveform bars */}
      <div style={{ display: "flex", gap: 3, alignItems: "center", height: 20 }}>
        {[6,12,18,10,16,8,14,10,18,12,6].map((h, i) => (
          <div key={i} style={{ width: 3, height: h, background: "#8B7355", borderRadius: 2 }} />
        ))}
      </div>
      <div style={{ fontSize: 8, color: "#888" }}>Listening…</div>
      {/* transcript */}
      <div style={{ background: "#2a2a2a", borderRadius: 8, padding: "6px 10px", width: "100%", fontSize: 8, color: "#ccc" }}>
        "Do you have rooms with a canal view?"
      </div>
    </div>
  </Phone>
);

// ─── State 3: Text active ───
const State3 = () => (
  <Phone label="STATE 3 — Texting (mic gone)">
    <div style={{ flex: 1, padding: "8px 10px", opacity: 0.3, display: "flex", flexDirection: "column", gap: 6 }}>
      {[80, 60, 70].map((w, i) => <Bar key={i} h={6} w={`${w}%`} color="#ddd" />)}
    </div>
    <div style={{
      background: "#fff", borderTop: "2px solid #222",
      borderRadius: "16px 16px 0 0",
      padding: "10px 12px 14px",
      display: "flex", flexDirection: "column", gap: 8
    }}>
      <div style={{ width: 36, height: 4, background: "#ccc", borderRadius: 2, margin: "0 auto" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 9, fontWeight: 700 }}>AI Concierge</div>
        <div style={{ fontSize: 12, color: "#888" }}>✕</div>
      </div>
      {/* Chat bubbles */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ alignSelf: "flex-start", background: "#f0ece3", borderRadius: "10px 10px 10px 2px", padding: "5px 8px", fontSize: 8, maxWidth: "75%" }}>
          Hi! How can I help you today?
        </div>
        <div style={{ alignSelf: "flex-end", background: "#8B7355", color: "#fff", borderRadius: "10px 10px 2px 10px", padding: "5px 8px", fontSize: 8, maxWidth: "75%" }}>
          What rooms are available?
        </div>
        <div style={{ alignSelf: "flex-start", background: "#f0ece3", borderRadius: "10px 10px 10px 2px", padding: "5px 8px", fontSize: 8, maxWidth: "75%" }}>
          We have 4 room types…
        </div>
      </div>
      {/* Text input only, no mic */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        border: "1.5px solid #8B7355", borderRadius: 20, padding: "6px 10px"
      }}>
        <span style={{ fontSize: 9, color: "#aaa", flex: 1 }}>Reply…</span>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#8B7355", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff" }}>→</div>
      </div>
    </div>
  </Phone>
);

// ─── State 4: Content triggered (full-screen sheet) ───
const State4 = () => (
  <Phone label="STATE 4 — Content panel (rooms)">
    {/* mini agent bar */}
    <div style={{
      background: "#1a1a1a", padding: "6px 10px",
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#8B7355", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>🎙️</div>
        <div style={{ fontSize: 8, color: "#ccc" }}>● Speaking…</div>
      </div>
      {/* waveform */}
      <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
        {[4,8,6,10,5,8,4].map((h, i) => (
          <div key={i} style={{ width: 2, height: h, background: "#8B7355", borderRadius: 1 }} />
        ))}
      </div>
    </div>
    {/* full content area */}
    <div style={{ flex: 1, background: "#f9f7f3", padding: "10px 10px 6px", display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
      <div style={{ fontSize: 10, fontWeight: 700 }}>Choose Your Room</div>
      {[
        { name: "Deluxe — Garden View", price: "€269" },
        { name: "Deluxe — Balcony", price: "€289" },
        { name: "Prestige Room", price: "€349", active: true },
      ].map(r => (
        <div key={r.name} style={{
          display: "flex", alignItems: "center", gap: 8,
          background: r.active ? "#f0ece3" : "#fff",
          border: r.active ? "1.5px solid #8B7355" : "1px solid #e8e2d8",
          borderRadius: 8, padding: "6px 8px"
        }}>
          <div style={{ width: 44, height: 36, background: "#ddd", borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 7, color: "#999" }}>IMG</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, fontWeight: 600 }}>{r.name}</div>
          </div>
          <div style={{ fontSize: 9, fontWeight: 700 }}>{r.price}<span style={{ fontSize: 7, fontWeight: 400 }}>/nt</span></div>
        </div>
      ))}
    </div>
    {/* sticky footer */}
    <div style={{
      background: "#fff", borderTop: "1px solid #eee",
      padding: "8px 10px",
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <div style={{ fontSize: 8, color: "#888" }}>€349 × 2 nights</div>
      <div style={{ fontSize: 9, fontWeight: 700 }}>€698</div>
    </div>
    <div style={{
      background: "#1a1a1a", margin: "0 10px 10px",
      borderRadius: 8, padding: "8px",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <span style={{ fontSize: 9, color: "#fff", fontWeight: 600 }}>Continue to Date Selection →</span>
    </div>
  </Phone>
);

// ─── State 5: Calendar ───
const State5 = () => (
  <Phone label="STATE 5 — Calendar (1 month)">
    <div style={{
      background: "#1a1a1a", padding: "6px 10px",
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#8B7355", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>🎙️</div>
        <div style={{ fontSize: 8, color: "#ccc" }}>● Speaking…</div>
      </div>
      <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
        {[4,8,6,10,5].map((h, i) => (
          <div key={i} style={{ width: 2, height: h, background: "#8B7355", borderRadius: 1 }} />
        ))}
      </div>
    </div>
    <div style={{ flex: 1, background: "#f9f7f3", padding: "10px", display: "flex", flexDirection: "column", gap: 8 }}>
      {/* check-in / check-out summary */}
      <div style={{ display: "flex", gap: 6 }}>
        {[["CHECK-IN", "13 Apr"], ["CHECK-OUT", "15 Apr"]].map(([label, val]) => (
          <div key={label} style={{ flex: 1, background: "#fff", border: "1px solid #e0dbd0", borderRadius: 6, padding: "5px 8px" }}>
            <div style={{ fontSize: 7, color: "#999" }}>{label}</div>
            <div style={{ fontSize: 10, fontWeight: 700 }}>{val}</div>
          </div>
        ))}
        <div style={{ background: "#fff", border: "1px solid #e0dbd0", borderRadius: 6, padding: "5px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 7, color: "#999" }}>NIGHTS</div>
          <div style={{ fontSize: 10, fontWeight: 700 }}>2</div>
        </div>
      </div>
      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 12, color: "#888" }}>‹</div>
        <div style={{ fontSize: 10, fontWeight: 700 }}>April 2026</div>
        <div style={{ fontSize: 12, color: "#888" }}>›</div>
      </div>
      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
        {["S","M","T","W","T","F","S"].map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 7, color: "#aaa" }}>{d}</div>
        ))}
      </div>
      {/* Calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {[...Array(2).fill(null), 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((d, i) => (
          <div key={i} style={{
            textAlign: "center", fontSize: 8,
            padding: "4px 0",
            borderRadius: 4,
            background: d === 13 ? "#8B7355" : d === 14 ? "#c4a882" : d === 15 ? "#8B7355" : "transparent",
            color: (d === 13 || d === 15) ? "#fff" : d === 14 ? "#fff" : d ? "#333" : "transparent",
          }}>{d || ""}</div>
        ))}
      </div>
    </div>
    <div style={{
      background: "#1a1a1a", margin: "0 10px 10px",
      borderRadius: 8, padding: "8px",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <span style={{ fontSize: 9, color: "#fff", fontWeight: 600 }}>Continue to Room Selection →</span>
    </div>
  </Phone>
);

export default function Wireframes() {
  const [active, setActive] = useState(null);

  const states = [
    { id: 0, comp: <State0 /> },
    { id: 1, comp: <State1 /> },
    { id: 2, comp: <State2 /> },
    { id: 3, comp: <State3 /> },
    { id: 4, comp: <State4 /> },
    { id: 5, comp: <State5 /> },
  ];

  return (
    <div style={{ background: "#f0ece3", minHeight: "100vh", padding: "32px 24px", fontFamily: "monospace" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Mobile Widget — State Wireframes</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>CatchVisitors · Hotel vertical · Mobile layout</div>
        </div>

        {/* flow line */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, overflowX: "auto", paddingBottom: 32 }}>
          {states.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "flex-start", gap: 6, flexShrink: 0 }}>
              {s.comp}
              {i < states.length - 1 && (
                <div style={{ display: "flex", alignItems: "center", height: 420, paddingTop: 60 }}>
                  <div style={{ fontSize: 20, color: "#aaa" }}>→</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* legend */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 8 }}>
          {[
            ["STATE 0", "Floating mic button (bottom-right). Label 'Ask AI' fades after first use."],
            ["STATE 1", "Bottom sheet slides up. Both mic button and text input visible. Neither active yet."],
            ["STATE 2", "User taps mic. Text input disappears. Dark theme, waveform animation, transcript."],
            ["STATE 3", "User starts typing. Mic disappears. Chat bubble history appears above input."],
            ["STATE 4", "Agent triggers content. Mini agent bar collapses to top strip. Full-screen room list."],
            ["STATE 5", "Calendar: single month view with swipe nav. Check-in/out summary bar at top."],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: "#fff", border: "1.5px solid #ddd", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 9, color: "#666", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
