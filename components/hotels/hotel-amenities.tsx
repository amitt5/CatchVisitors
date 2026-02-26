const AMENITIES = [
  {
    name: "Rooftop Bar & Restaurant",
    image: "/videos/hotel-room/rooftop_restaurant.png",
    description:
      "Dine under the Amsterdam sky with panoramic canal views. Our rooftop restaurant serves contemporary Dutch cuisine paired with an extensive wine list.",
  },
  {
    name: "Spa & Wellness",
    image: "/videos/hotel-room/sauna.jpg",
    description:
      "Unwind in our serene spa sanctuary. Featuring a Finnish sauna, steam room, and a full menu of treatments designed to restore body and mind.",
  },
  {
    name: "Fitness Center",
    image: "/videos/hotel-room/hotel_gym.jpg",
    description:
      "Stay at your peak with our fully equipped fitness center, open 24 hours. Personal training sessions available on request.",
  },
];

export function HotelAmenities() {
  return (
    <section id="amenities" className="bg-[#FAFAF5] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#C8A96E] text-xs font-semibold tracking-[0.2em] uppercase">
            Hotel Experience
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif text-[#1C1A17]">
            Our Amenities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AMENITIES.map((item) => (
            <div key={item.name} className="group overflow-hidden bg-white">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#1C1A17]">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-[#6B6560] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
