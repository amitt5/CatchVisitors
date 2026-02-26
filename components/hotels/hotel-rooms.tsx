const EXPLORE_ROOMS = [
  {
    name: "Deluxe Room with Garden View",
    price: "€269",
    image:
      "https://images.eu.ctfassets.net/og3b0tarlg4b/5TTLX90ke1oNjcZgHQCb9p/bd42d41a23ae467f860a6d8227ff6b8e/room-03DLXG-image-bfwjp6-Le_Bristol_Paris-DLXG-Chambre_222-HD-4_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
    size: "45",
    beds: "1",
    sleeps: "2",
  },
  {
    name: "Deluxe Room with Balcony",
    price: "€289",
    image:
      "https://images.eu.ctfassets.net/og3b0tarlg4b/6mfqJ7voUNEhOa7TF4QCO1/9be0cf054fb1aefe1abf330205561d0e/room-DLXB-image-lf3ppz-Le_Bristol_Paris_-_Chambre_Deluxe_Balcon_-_916_-_HD_-_2_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
    size: "45",
    beds: "1",
    sleeps: "2",
  },
  {
    name: "Prestige Room",
    price: "€349",
    image:
      "https://images.eu.ctfassets.net/og3b0tarlg4b/7DVPIBIel2ZsaZh4043zAN/f63d257385ad9ce6b90c56314dcb2209/room-04PRE-image-Le_Bristol_Paris-Chambre_Prestige-410-HD-2_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
    size: "50",
    beds: "1",
    sleeps: "3",
  },
  {
    name: "Prestige Room with Balcony",
    price: "€379",
    image:
      "https://images.eu.ctfassets.net/og3b0tarlg4b/3lIpWcaTAi0et539woVlh8/c4cac37f62b11166f8a2d081a0dea9ee/room-PREB-image-qq36gd-Le_Bristol_RomainRicard_03-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
    size: "50",
    beds: "1",
    sleeps: "2",
  },
];

export function HotelRooms() {
  return (
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
  );
}
