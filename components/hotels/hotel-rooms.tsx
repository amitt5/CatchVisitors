const ROOMS = [
  {
    name: "Canal Suite",
    price: "€299",
    image: "/videos/hotel-room/canal_suite.png",
    size: "45",
    beds: "1",
    sleeps: "2",
  },
  {
    name: "Classic King",
    price: "€199",
    image: "/videos/hotel-room/Classic_King.png",
    size: "32",
    beds: "1",
    sleeps: "2",
  },
  {
    name: "Executive Suite",
    price: "€399",
    image: "/videos/hotel-room/rooftop_restaurant.png",
    size: "60",
    beds: "2",
    sleeps: "4",
  },
];

const EXPLORE_ROOMS = [
  {
    name: "Canal Suite",
    price: "€299",
    image: "/videos/hotel-room/canal_suite.png",
    size: "45",
    beds: "1",
    sleeps: "2",
  },
  {
    name: "Classic King",
    price: "€199",
    image: "/videos/hotel-room/Classic_King.png",
    size: "32",
    beds: "1",
    sleeps: "2",
  },
  {
    name: "Rooftop Penthouse",
    price: "€499",
    image: "/videos/hotel-room/rooftop_restaurant.png",
    size: "75",
    beds: "2",
    sleeps: "3",
  },
  {
    name: "Garden Studio",
    price: "€159",
    image: "/videos/hotel-room/hotel_gym.jpg",
    size: "28",
    beds: "1",
    sleeps: "2",
  },
];

function RoomIcon({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1 text-xs text-[#6B6560]">
      {label}
    </span>
  );
}

export function HotelRooms() {
  return (
    <>
      {/* ── Section 1: Our Exquisite Rooms (light bg) ── */}
      <section id="rooms" className="bg-[#FAFAF5] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
              Rooms &amp; Suites
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-serif text-[#1C1A17]">
              Our Exquisite Rooms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROOMS.map((room) => (
              <div
                key={room.name}
                className="bg-white overflow-hidden group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-[#1C1A17] text-[#C8A96E] text-xs font-semibold px-3 py-1.5">
                    {room.price}/night
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-[#1C1A17]">
                    {room.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-4">
                    <RoomIcon label={`⬜ ${room.size} m²`} />
                    <RoomIcon label={`🛏 ${room.beds} Bed`} />
                    <RoomIcon label={`👤 ${room.sleeps} Sleeps`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Explore Rooms (dark bg) ── */}
      <section className="bg-[#1C1A17] py-20 px-6">
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
            {EXPLORE_ROOMS.map((room) => (
              <div
                key={room.name}
                className="relative h-72 overflow-hidden group cursor-pointer"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-white">
                      {room.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-xs text-white/70">
                        ⬜ {room.size} m²
                      </span>
                      <span className="text-xs text-white/70">
                        🛏 {room.beds} Bed
                      </span>
                      <span className="text-xs text-white/70">
                        👤 {room.sleeps} Sleeps
                      </span>
                    </div>
                  </div>
                  <span className="bg-[#C8A96E] text-white text-xs font-semibold px-3 py-1.5">
                    {room.price}/night
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
