"use client";

import { useState, useEffect, useCallback } from "react";

const ROOMS = [
  {
    name: "Deluxe Room with Garden View",
    price: "€269",
    size: "45",
    beds: "1",
    sleeps: "2",
    images: [
      "https://images.eu.ctfassets.net/og3b0tarlg4b/5TTLX90ke1oNjcZgHQCb9p/bd42d41a23ae467f860a6d8227ff6b8e/room-03DLXG-image-bfwjp6-Le_Bristol_Paris-DLXG-Chambre_222-HD-4_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/5wudJWzfb5REcWjL8exDeq/a0a7e6d551b92286f52e6c9859c067f4/room-03DLXG-image-n6a5ni-Le_Bristol_Paris-DLXG-Chambre_222-HD-5_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/HLBZs7GBDCTwoGcIkXilA/5a3929e670646e9a63eac761b1791e65/room-03DLXG-image-2jsdqn-Le_Bristol_Paris-DLXG-Chambre_222-HD-2_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/nIUrZZR0RJ5j1ANGa94nt/0a0649303081f5ff946c141205dc860d/room-03DLXG-image-sxv4tl-Le_Bristol_Paris-DLXG-Chambre_222-HD-1_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
    ],
  },
  {
    name: "Deluxe Room with Balcony",
    price: "€289",
    size: "45",
    beds: "1",
    sleeps: "2",
    images: [
      "https://images.eu.ctfassets.net/og3b0tarlg4b/6mfqJ7voUNEhOa7TF4QCO1/9be0cf054fb1aefe1abf330205561d0e/room-DLXB-image-lf3ppz-Le_Bristol_Paris_-_Chambre_Deluxe_Balcon_-_916_-_HD_-_2_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/5hcckP0U624pOuhD4wYNUS/22fd2e3e78b2d14cff356a4a86692675/room-DLXB-image-LBP_le_bristol_paris_-_chambre_deluxe_vue_jardin_-_916_-__S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/39VLthagr4VnawXvstjBK7/fe8e550b978585382cd1961310bfe9f3/room-DLXB-image-Le_Bristol_Paris_deluxe_room_with_balcony-room3_R.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/5rb6JXrqjEvpXg78Tqa3HN/7de7eb31f566a21548ac9f299b028574/room-DLXB-image-LBP_deluxe_room_with_balcony-sdb_R.jpg?w=1070&h=808&fm=jpg&fit=fill",
    ],
  },
  {
    name: "Prestige Room",
    price: "€349",
    size: "50",
    beds: "1",
    sleeps: "3",
    images: [
      "https://images.eu.ctfassets.net/og3b0tarlg4b/7DVPIBIel2ZsaZh4043zAN/f63d257385ad9ce6b90c56314dcb2209/room-04PRE-image-Le_Bristol_Paris-Chambre_Prestige-410-HD-2_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/6Pe4ZMrdqYklN8Ew8mNbGr/e5e34ef470661f26caca63341b4eb06a/room-04PRE-image-Le_Bristol_Paris-Chambre_Prestige-160-HD-3_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/1NUWRn6A9bwCv3xkKFEwpJ/32a49c3630731b246aac26f2104c23ad/room-04PRE-image-LBP-chambre_prestige-160_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
    ],
  },
  {
    name: "Prestige Room with Balcony",
    price: "€379",
    size: "50",
    beds: "1",
    sleeps: "2",
    images: [
      "https://images.eu.ctfassets.net/og3b0tarlg4b/3lIpWcaTAi0et539woVlh8/c4cac37f62b11166f8a2d081a0dea9ee/room-PREB-image-qq36gd-Le_Bristol_RomainRicard_03-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/3gv383RHFtjjidrNezBiaO/9ba6c771fe7848b095d041c28ff6e877/room-PREB-image-on8gi-Le_Bristol_RomainRicard_02-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/36AhXoGwsKN0Opxy1Bp60p/2013bc0bad1805f6ba42d3a7a7096c17/room-PREB-image-kerbv1-Le_Bristol_RomainRicard_01-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      "https://images.eu.ctfassets.net/og3b0tarlg4b/1sm5ekipLXFE0nuJuUpiqE/75dc3351246b1ada9d5ba2dd6a119176/room-PREB-image-7lxlt8-Le_Bristol_RomainRicard_07-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
    ],
  },
];

interface ModalState {
  roomIndex: number;
  imageIndex: number;
}

function RoomModal({
  state,
  onClose,
}: {
  state: ModalState;
  onClose: () => void;
}) {
  const room = ROOMS[state.roomIndex];
  const [imgIndex, setImgIndex] = useState(state.imageIndex);

  const prev = useCallback(
    () => setImgIndex((i) => (i - 1 + room.images.length) % room.images.length),
    [room.images.length]
  );
  const next = useCallback(
    () => setImgIndex((i) => (i + 1) % room.images.length),
    [room.images.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm tracking-wide"
        >
          ✕ Close
        </button>

        {/* Main image */}
        <div className="relative bg-black aspect-[4/3] overflow-hidden">
          <img
            key={imgIndex}
            src={room.images[imgIndex]}
            alt={room.name}
            className="w-full h-full object-cover"
          />

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            ‹
          </button>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            ›
          </button>

          {/* Counter */}
          <span className="absolute bottom-3 right-4 text-xs text-white/70">
            {imgIndex + 1} / {room.images.length}
          </span>
        </div>

        {/* Info bar */}
        <div className="bg-[#1C1A17] px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg text-white">{room.name}</h3>
            <div className="mt-1 flex items-center gap-4 text-xs text-white/50">
              <span>⬜ {room.size} m²</span>
              <span>🛏 {room.beds} Bed</span>
              <span>👤 {room.sleeps} Sleeps</span>
            </div>
          </div>
          <span className="text-[#C8A96E] font-semibold text-lg">
            {room.price}<span className="text-xs font-normal text-white/50">/night</span>
          </span>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-2">
          {room.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setImgIndex(i)}
              className={`flex-1 h-16 overflow-hidden border-2 transition-colors ${
                i === imgIndex ? "border-[#C8A96E]" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HotelRooms() {
  const [modal, setModal] = useState<ModalState | null>(null);

  return (
    <>
      <section id="rooms" className="bg-[#1C1A17] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
              Rooms &amp; Suites
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-serif text-white">
              Explore Rooms and Suites
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROOMS.map((room, roomIndex) => (
              <div
                key={room.name}
                className="relative h-72 overflow-hidden group cursor-pointer"
                onClick={() => setModal({ roomIndex, imageIndex: 0 })}
              >
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-white">{room.name}</h3>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-xs text-white/70">⬜ {room.size} m²</span>
                      <span className="text-xs text-white/70">🛏 {room.beds} Bed</span>
                      <span className="text-xs text-white/70">👤 {room.sleeps} Sleeps</span>
                    </div>
                  </div>
                  <span className="bg-[#C8A96E] text-white text-xs font-semibold px-3 py-1.5">
                    {room.price}/night
                  </span>
                </div>
                {/* Image count badge */}
                <span className="absolute top-3 left-3 bg-black/50 text-white/80 text-xs px-2 py-1">
                  {room.images.length} photos
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modal !== null && (
        <RoomModal state={modal} onClose={() => setModal(null)} />
      )}
    </>
  );
}
