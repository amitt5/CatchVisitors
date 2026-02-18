'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';
import { useState } from 'react';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

// ─── Color tokens ────────────────────────────────────────────────────────────
// Primary brown: #45321A
// White:         #FFFFFF
// Dark gray:     #403F3F
// Light gray bg: #F6F6F6
// Black:         #191919

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="#45321A" strokeWidth="2" />
        <path d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="#45321A" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="3" fill="#45321A" />
      </svg>
    ),
    title: 'Chiropractic Care',
    desc: 'Evidence-based spinal adjustments to restore alignment and relieve pain.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M12 36c4-8 8-14 12-14s8 6 12 14" stroke="#45321A" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 12v10" stroke="#45321A" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="10" r="3" fill="#45321A" />
      </svg>
    ),
    title: 'Posture Correction',
    desc: 'Customised programs to fix poor posture caused by desk work and lifestyle.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="10" y="20" width="28" height="14" rx="3" stroke="#45321A" strokeWidth="2" />
        <path d="M18 20v-6a6 6 0 0 1 12 0v6" stroke="#45321A" strokeWidth="2" />
        <circle cx="24" cy="27" r="2.5" fill="#45321A" />
      </svg>
    ),
    title: 'Sports Rehab',
    desc: 'Targeted rehabilitation for athletes recovering from acute or chronic injuries.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 8c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16" stroke="#45321A" strokeWidth="2" strokeLinecap="round" />
        <path d="M34 8l6 6-6 6" stroke="#45321A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 20v4l3 3" stroke="#45321A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Rapid Recovery',
    desc: 'Faster return to daily life with soft-tissue therapy and guided mobility work.',
  },
];

const specialties = [
  'Back Pain', 'Neck Pain', 'Headaches & Migraines', 'Sciatica',
  'Herniated Disc', 'Whiplash', 'Shoulder Pain', 'Hip & Knee Pain',
  'Repetitive Strain', 'Scoliosis', 'Pregnancy-Related Pain', 'Sports Injuries',
];

const team = [
  { name: 'Dr. Sarah Mitchell', role: 'Lead Chiropractor', exp: '14 years' },
  { name: 'Dr. James Voss', role: 'Sports Rehabilitation', exp: '9 years' },
  { name: 'Dr. Priya Nair', role: 'Paediatric & Prenatal', exp: '7 years' },
];

const testimonials = [
  {
    name: 'Emma de Vries',
    text: 'After months of chronic back pain I was desperate. Three sessions in and I was sleeping through the night again. Absolutely life-changing.',
    rating: 5,
  },
  {
    name: 'Thomas Bakker',
    text: 'Dr. Mitchell explained everything clearly and the treatment plan was spot on. My sciatica is 90% better after six weeks.',
    rating: 5,
  },
  {
    name: 'Sofie Jansen',
    text: 'Kind, professional and effective. The posture correction program fixed years of desk-job damage. Highly recommend.',
    rating: 5,
  },
];

const faqs = [
  {
    q: 'Does chiropractic treatment hurt?',
    a: 'Most patients experience little to no discomfort. You may hear a gentle "pop" during an adjustment — that is simply gas releasing from the joint and is perfectly normal.',
  },
  {
    q: 'How many sessions will I need?',
    a: 'It depends on your condition and goals. Acute pain typically resolves in 4–8 sessions; chronic issues may benefit from an ongoing maintenance plan. We will outline a clear treatment plan at your first visit.',
  },
  {
    q: 'Do I need a referral from my doctor?',
    a: 'No referral is required. You can book directly. If your GP has relevant imaging or reports, we encourage you to bring them along.',
  },
  {
    q: 'Is chiropractic care covered by insurance?',
    a: 'Many supplemental health plans include chiropractic coverage. We recommend checking with your insurer. We provide detailed receipts for reimbursement claims.',
  },
  {
    q: 'What should I wear to my appointment?',
    a: 'Comfortable, loose-fitting clothing is ideal. We provide gowns if needed. Avoid thick belts or tight jeans that may restrict movement during assessment.',
  },
];

export default function ChiroPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  return (
    <div className={`${plusJakarta.variable} font-[family-name:var(--font-jakarta)] text-[#191919] bg-white`}>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#45321A] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 2C9 2 7 5 7 8c0 2 1 3.5 2.5 4.5L9 20h6l-.5-7.5C16 11.5 17 10 17 8c0-3-2-6-5-6z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-lg text-[#191919] tracking-tight">ChiroWell</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#403F3F]">
            <a href="#services" className="hover:text-[#45321A] transition-colors">Services</a>
            <a href="#about" className="hover:text-[#45321A] transition-colors">About</a>
            <a href="#team" className="hover:text-[#45321A] transition-colors">Team</a>
            <a href="#testimonials" className="hover:text-[#45321A] transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-[#45321A] transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-[#45321A] transition-colors">Contact</a>
          </div>

          <a
            href="#contact"
            className="bg-[#45321A] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#5a4228] transition-colors"
          >
            Book Appointment
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#F6F6F6] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#45321A]/10 text-[#45321A] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              Trusted Chiropractic Care
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-[#191919] mb-6">
              Rediscover Comfort,<br />
              <span className="text-[#45321A]">Freedom</span> &amp; Vitality
            </h1>
            <p className="text-[#403F3F] text-lg leading-relaxed mb-8 max-w-md">
              Expert chiropractic care that gets to the root cause of your pain — not just the symptoms. Feel better, move better, live better.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-[#45321A] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#5a4228] transition-colors"
              >
                Book an Appointment
              </a>
              <a
                href="#services"
                className="border-2 border-[#45321A] text-[#45321A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#45321A]/5 transition-colors"
              >
                Our Services
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 flex gap-10">
              {[['2,000+', 'Happy Patients'], ['12+', 'Years Experience'], ['98%', 'Satisfaction Rate']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-extrabold text-[#45321A]">{num}</div>
                  <div className="text-xs text-[#403F3F] font-medium mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#45321A]/10 flex items-center justify-center shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80"
                alt="Chiropractor treating patient"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">✓</div>
              <div>
                <div className="font-bold text-sm text-[#191919]">Same-Day Appointments</div>
                <div className="text-xs text-[#403F3F]">Available Mon – Sat</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES STRIP ───────────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">Comprehensive Care for Every Body</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-[#F6F6F6] rounded-2xl p-7 hover:shadow-md transition-shadow">
                <div className="mb-5">{s.icon}</div>
                <h3 className="font-bold text-[#191919] text-lg mb-2">{s.title}</h3>
                <p className="text-[#403F3F] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES GRID ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F6F6F6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">Conditions Treated</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">We Specialise in Treating</h2>
            <p className="text-[#403F3F] mt-3 max-w-xl mx-auto">
              From acute injuries to long-standing chronic pain, our team has the expertise to help you recover and thrive.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {specialties.map((s) => (
              <div
                key={s}
                className="bg-white border border-[#45321A]/10 rounded-xl px-5 py-4 flex items-center gap-3 hover:border-[#45321A]/40 hover:shadow-sm transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-[#45321A] flex-shrink-0" />
                <span className="text-sm font-medium text-[#403F3F]">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CTA BANNER ──────────────────────────────────────────────── */}
      <section className="bg-[#45321A] py-20 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Live Pain-Free?</h2>
          <p className="text-white/75 text-lg mb-8">
            Book your first consultation today. We will assess your condition, explain your options, and create a personalised plan — no pressure, no jargon.
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-[#45321A] font-bold px-8 py-4 rounded-full text-sm hover:bg-[#F6F6F6] transition-colors"
          >
            Schedule Your Session
          </a>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div className="aspect-square rounded-3xl overflow-hidden bg-[#F6F6F6] shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=80"
              alt="Lead chiropractor"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">About Our Practice</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-5 text-[#191919]">A Practice Built on Results</h2>
            <p className="text-[#403F3F] leading-relaxed mb-4">
              ChiroWell was founded on a simple belief: every person deserves to move without pain. For over a decade we have been helping patients in Amsterdam reclaim their health through precise, evidence-based chiropractic care.
            </p>
            <p className="text-[#403F3F] leading-relaxed mb-6">
              Our approach combines traditional chiropractic techniques with modern diagnostics and rehabilitation science. We treat the whole person — not just the complaint — because lasting relief requires understanding the root cause.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[['12+', 'Years in Practice'], ['3', 'Expert Chiropractors'], ['2,000+', 'Patients Treated'], ['98%', 'Recommend Us']].map(([n, l]) => (
                <div key={l} className="bg-[#F6F6F6] rounded-xl p-5">
                  <div className="text-2xl font-extrabold text-[#45321A]">{n}</div>
                  <div className="text-xs text-[#403F3F] font-medium mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <section id="team" className="py-20 bg-[#F6F6F6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">Meet Your Practitioners</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] bg-[#45321A]/10">
                  <img
                    src={[
                      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80',
                      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80',
                      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=80',
                    ][i]}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#191919] text-lg">{member.name}</h3>
                  <p className="text-[#45321A] text-sm font-semibold mt-0.5">{member.role}</p>
                  <p className="text-[#403F3F] text-sm mt-2">{member.exp} experience</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">Patient Reviews</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">What Our Patients Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#F6F6F6] rounded-2xl p-7">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-[#45321A]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#403F3F] text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="font-semibold text-[#191919] text-sm">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-[#F6F6F6]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-[#45321A]/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-[#191919] hover:bg-[#F6F6F6] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`ml-4 flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#45321A] flex items-center justify-center transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>
                    <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="#45321A" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[#403F3F] text-sm leading-relaxed border-t border-[#45321A]/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14">
          {/* Info */}
          <div>
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-6 text-[#191919]">Book Your Appointment</h2>
            <p className="text-[#403F3F] leading-relaxed mb-8">
              Ready to start your recovery journey? Fill in the form and we will be in touch within 24 hours to confirm your appointment.
            </p>
            <div className="space-y-5">
              {[
                { label: 'Address', value: 'Herengracht 182, 1016 BR Amsterdam' },
                { label: 'Phone', value: '+31 20 555 0100' },
                { label: 'Email', value: 'hello@chirowell.nl' },
                { label: 'Hours', value: 'Mon – Fri 8:00 – 19:00 · Sat 9:00 – 14:00' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#45321A]/10 flex items-center justify-center flex-shrink-0 text-[#45321A] text-xs font-bold">
                    {label[0]}
                  </div>
                  <div>
                    <div className="text-xs text-[#403F3F] font-semibold uppercase tracking-wide">{label}</div>
                    <div className="text-[#191919] font-medium mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); alert('Thank you! We will contact you shortly.'); }}
            className="bg-[#F6F6F6] rounded-2xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-[#403F3F] uppercase tracking-wide block mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-[#45321A]/15 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder-[#403F3F]/50 focus:outline-none focus:border-[#45321A] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#403F3F] uppercase tracking-wide block mb-1.5">Phone</label>
                <input
                  type="tel"
                  placeholder="+31 6 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-[#45321A]/15 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder-[#403F3F]/50 focus:outline-none focus:border-[#45321A] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#403F3F] uppercase tracking-wide block mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-[#45321A]/15 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder-[#403F3F]/50 focus:outline-none focus:border-[#45321A] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#403F3F] uppercase tracking-wide block mb-1.5">How Can We Help?</label>
              <textarea
                rows={4}
                placeholder="Briefly describe your condition or what you would like to address..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-[#45321A]/15 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder-[#403F3F]/50 focus:outline-none focus:border-[#45321A] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#45321A] text-white font-bold py-3.5 rounded-full hover:bg-[#5a4228] transition-colors"
            >
              Request Appointment
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#191919] text-white py-14">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#45321A] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M12 2C9 2 7 5 7 8c0 2 1 3.5 2.5 4.5L9 20h6l-.5-7.5C16 11.5 17 10 17 8c0-3-2-6-5-6z" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-lg">ChiroWell</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Evidence-based chiropractic care for Amsterdam and surrounding areas. Your health is our priority.
            </p>
          </div>
          <div>
            <div className="font-semibold text-sm mb-4 text-white/80 uppercase tracking-wide">Quick Links</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              {['Services', 'About', 'Team', 'Reviews', 'FAQ', 'Contact'].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm mb-4 text-white/80 uppercase tracking-wide">Contact</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>Herengracht 182</li>
              <li>1016 BR Amsterdam</li>
              <li>+31 20 555 0100</li>
              <li>hello@chirowell.nl</li>
              <li className="pt-1">Mon – Fri: 8:00 – 19:00</li>
              <li>Sat: 9:00 – 14:00</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>© 2026 ChiroWell Amsterdam. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
