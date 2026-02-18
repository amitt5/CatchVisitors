'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';
import { useState } from 'react';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

// ─── Color tokens ─────────────────────────────────────────────────────────────
// Primary brown: #45321A   White: #FFFFFF   Dark gray: #403F3F
// Light gray bg: #F6F6F6   Black: #191919

// ─── Calendar helpers ─────────────────────────────────────────────────────────
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function isSunday(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() === 0;
}
function isSaturday(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() === 6;
}

const TIME_SLOTS_WEEKDAY = [
  '10:00','10:30','11:00','11:30','12:00','12:30',
  '13:00','13:30','14:00','14:30','15:00','15:30',
  '16:00','16:30',
];
const TIME_SLOTS_SATURDAY = [
  '10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30',
];

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="#45321A" strokeWidth="2" />
        <path d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="#45321A" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="3" fill="#45321A" />
      </svg>
    ),
    title: 'Neuro-Based Spinal Adjustment',
    desc: 'Precision chiropractic corrections that decrease pain, restore mobility, and kick-start your recovery from the very first session.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M14 10c2 6 4 10 4 18M20 10c1 8 2 12 2 18M26 28c0-6 1-10 2-18M32 28c0-8 2-12 4-18" stroke="#45321A" strokeWidth="2" strokeLinecap="round" />
        <rect x="10" y="26" width="28" height="4" rx="2" fill="#45321A" fillOpacity=".15" stroke="#45321A" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Medical Acupuncture',
    desc: 'Targeted needle therapy to reduce inflammation, relieve deep muscle pain, and prepare your body for optimal chiropractic results.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M12 32c4-6 8-10 12-10s8 4 12 10" stroke="#45321A" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="24" cy="18" rx="8" ry="6" stroke="#45321A" strokeWidth="2" />
        <circle cx="24" cy="18" r="2.5" fill="#45321A" />
      </svg>
    ),
    title: 'Therapeutic Massage',
    desc: 'Deep-tissue or relaxation massage to release tension, improve circulation, and help your body unwind after a long working day.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M10 32h28M14 32v-6a10 10 0 0 1 20 0v6" stroke="#45321A" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 26c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#45321A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    ),
    title: 'Custom Foot Orthotics',
    desc: 'Foot Levelers orthotics crafted specifically for your feet — delivering superior comfort, support, and full-body alignment correction.',
  },
];

const specialties = [
  'Lower Back Pain', 'Neck Pain', 'Headaches & Migraines', 'Whiplash',
  'Hernias & Disc Problems', 'Upper Back & Shoulder Pain', 'Sciatica', 'Sports Injuries',
  'Pregnancy-Related Pain', 'Infant & Children\'s Care', 'Arthritis & Wear-and-Tear', 'Tension Headaches',
];

const carePhases = [
  { step: '01', title: 'Relief Care', desc: 'We focus on reducing your pain as quickly as possible so you can function and sleep normally again.' },
  { step: '02', title: 'Corrective Care', desc: 'Once pain is under control, we correct underlying structural issues to prevent recurring problems.' },
  { step: '03', title: 'Wellness Care', desc: 'Ongoing maintenance to keep your spine healthy, your body resilient, and your quality of life high.' },
];

const testimonials = [
  { name: 'Marieke van den Berg', text: 'I had lower back pain for almost two years. After just four sessions with Dr. Jahani I felt like a different person. He really takes the time to explain what is happening and why.', rating: 5 },
  { name: 'David Okonkwo', text: 'The combination of chiropractic adjustment and acupuncture made an enormous difference for my neck pain. I had been to two other clinics with no results. Highly recommended.', rating: 5 },
  { name: 'Lisa Fontaine', text: 'I came in for pregnancy-related back pain and was treated with great care throughout. The team is professional, warm, and genuinely invested in your recovery.', rating: 5 },
];

const faqs = [
  { q: 'Does chiropractic treatment hurt?', a: 'Most patients experience little to no discomfort. You may hear a gentle "pop" during a spinal adjustment — that is simply gas releasing from the joint and is completely normal.' },
  { q: 'How many sessions will I need?', a: 'It depends on your condition. Acute pain typically improves within a few sessions; chronic issues may require a longer corrective phase. Dr. Jahani will outline a clear, personalised plan at your first visit.' },
  { q: 'Do I need a referral from my GP?', a: 'No referral is required. You can call or text us directly to book. If your doctor has imaging (X-rays, MRI) we encourage you to bring it along.' },
  { q: 'What is the difference between neuro-based chiropractic and regular chiropractic?', a: 'Neuro-based spinal correction focuses on the neurological component of spinal dysfunction, not just the mechanical. This approach often produces faster, more lasting results for pain and mobility issues.' },
  { q: 'Do you treat children and infants?', a: 'Yes. Dr. Jahani has experience treating children and infants for a range of conditions. Paediatric adjustments use very gentle, low-force techniques appropriate for young patients.' },
  { q: 'Is chiropractic covered by Dutch health insurance?', a: 'Chiropractic is often covered by supplemental (aanvullende) insurance policies. We recommend checking with your insurer. We provide detailed receipts for reimbursement.' },
];

// ─── Booking widget ───────────────────────────────────────────────────────────
type BookingStep = 'calendar' | 'time' | 'details' | 'confirmed';

function BookingWidget() {
  const today = new Date();
  const [step, setStep] = useState<BookingStep>('calendar');
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  }

  function isPast(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(23, 59, 59);
    return d < today;
  }

  function isDisabled(day: number) {
    return isPast(day) || isSunday(viewYear, viewMonth, day);
  }

  const selectedDate = selectedDay
    ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString('en-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const timeSlots = selectedDay && isSaturday(viewYear, viewMonth, selectedDay)
    ? TIME_SLOTS_SATURDAY
    : TIME_SLOTS_WEEKDAY;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep('confirmed');
  }

  if (step === 'confirmed') {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">✓</div>
        <div>
          <h3 className="text-xl font-extrabold text-[#191919] mb-1">Appointment Requested!</h3>
          <p className="text-[#403F3F] text-sm leading-relaxed">
            <span className="font-semibold text-[#45321A]">{selectedDate}</span> at <span className="font-semibold text-[#45321A]">{selectedTime}</span>
          </p>
          <p className="text-[#403F3F] text-sm mt-3">
            We will contact <span className="font-semibold">{form.name}</span> at <span className="font-semibold">{form.phone}</span> within a few hours to confirm.
          </p>
        </div>
        <button
          onClick={() => { setStep('calendar'); setSelectedDay(null); setSelectedTime(null); setForm({ name: '', email: '', phone: '' }); }}
          className="text-[#45321A] text-sm font-semibold underline underline-offset-2"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Progress bar */}
      <div className="flex border-b border-[#45321A]/10">
        {(['calendar', 'time', 'details'] as BookingStep[]).map((s, i) => {
          const labels = ['Select Date', 'Select Time', 'Your Details'];
          const stepIdx = ['calendar', 'time', 'details'].indexOf(step);
          const done = i < stepIdx;
          const active = i === stepIdx;
          return (
            <div key={s} className={`flex-1 py-3 text-center text-xs font-semibold transition-colors ${active ? 'bg-[#45321A] text-white' : done ? 'bg-[#45321A]/10 text-[#45321A]' : 'text-[#403F3F]/50'}`}>
              <span className="inline-flex items-center gap-1.5">
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${active ? 'bg-white text-[#45321A]' : done ? 'bg-[#45321A] text-white' : 'bg-[#403F3F]/20 text-[#403F3F]'}`}>
                  {done ? '✓' : i + 1}
                </span>
                {labels[i]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="p-6">
        {/* ── STEP 1: Calendar ─────────────────────────────────────────── */}
        {step === 'calendar' && (
          <div>
            {/* Month nav */}
            <div className="flex items-center justify-between mb-5">
              <button onClick={prevMonth} className="w-8 h-8 rounded-full border border-[#45321A]/20 flex items-center justify-center text-[#45321A] hover:bg-[#45321A]/5 transition-colors">
                <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/></svg>
              </button>
              <span className="font-bold text-[#191919]">{MONTH_NAMES[viewMonth]} {viewYear}</span>
              <button onClick={nextMonth} className="w-8 h-8 rounded-full border border-[#45321A]/20 flex items-center justify-center text-[#45321A] hover:bg-[#45321A]/5 transition-colors">
                <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map(d => (
                <div key={d} className={`text-center text-xs font-semibold py-1 ${d === 'Sun' ? 'text-[#403F3F]/30' : 'text-[#403F3F]'}`}>{d}</div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const disabled = isDisabled(day);
                const selected = selectedDay === day;
                return (
                  <button
                    key={day}
                    disabled={disabled}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square rounded-lg text-sm font-medium transition-colors
                      ${disabled ? 'text-[#403F3F]/25 cursor-not-allowed' : ''}
                      ${selected ? 'bg-[#45321A] text-white font-bold' : ''}
                      ${!disabled && !selected ? 'hover:bg-[#45321A]/10 text-[#191919]' : ''}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-[#403F3F]/60 mt-4 text-center">Clinic is closed on Sundays</p>

            <button
              disabled={!selectedDay}
              onClick={() => setStep('time')}
              className="mt-5 w-full bg-[#45321A] text-white font-bold py-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#5a4228] transition-colors"
            >
              {selectedDay ? `Continue — ${MONTH_NAMES[viewMonth]} ${selectedDay}` : 'Select a date'}
            </button>
          </div>
        )}

        {/* ── STEP 2: Time slots ───────────────────────────────────────── */}
        {step === 'time' && (
          <div>
            <button onClick={() => setStep('calendar')} className="flex items-center gap-1.5 text-sm text-[#45321A] font-semibold mb-5 hover:opacity-75 transition-opacity">
              <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/></svg>
              {selectedDate}
            </button>

            <p className="text-sm font-semibold text-[#191919] mb-4">Available time slots</p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-2.5 rounded-lg text-sm font-semibold border transition-colors
                    ${selectedTime === t
                      ? 'bg-[#45321A] text-white border-[#45321A]'
                      : 'border-[#45321A]/20 text-[#403F3F] hover:border-[#45321A] hover:text-[#45321A]'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              disabled={!selectedTime}
              onClick={() => setStep('details')}
              className="mt-6 w-full bg-[#45321A] text-white font-bold py-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#5a4228] transition-colors"
            >
              {selectedTime ? `Continue — ${selectedTime}` : 'Select a time'}
            </button>
          </div>
        )}

        {/* ── STEP 3: Contact details ──────────────────────────────────── */}
        {step === 'details' && (
          <form onSubmit={handleSubmit}>
            <button type="button" onClick={() => setStep('time')} className="flex items-center gap-1.5 text-sm text-[#45321A] font-semibold mb-5 hover:opacity-75 transition-opacity">
              <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/></svg>
              {selectedDate} · {selectedTime}
            </button>

            <p className="text-sm font-semibold text-[#191919] mb-4">Your contact details</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#403F3F] uppercase tracking-wide block mb-1.5">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#F6F6F6] border border-[#45321A]/15 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder-[#403F3F]/50 focus:outline-none focus:border-[#45321A] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#403F3F] uppercase tracking-wide block mb-1.5">Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#F6F6F6] border border-[#45321A]/15 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder-[#403F3F]/50 focus:outline-none focus:border-[#45321A] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#403F3F] uppercase tracking-wide block mb-1.5">Phone Number *</label>
                <input
                  required
                  type="tel"
                  placeholder="06 ..."
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#F6F6F6] border border-[#45321A]/15 rounded-lg px-4 py-3 text-sm text-[#191919] placeholder-[#403F3F]/50 focus:outline-none focus:border-[#45321A] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-[#45321A] text-white font-bold py-3 rounded-full hover:bg-[#5a4228] transition-colors"
            >
              Confirm Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ChiroPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={`${plusJakarta.variable} font-[family-name:var(--font-jakarta)] text-[#191919] bg-white`}>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#45321A] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 2C9 2 7 5 7 8c0 2 1 3.5 2.5 4.5L9 20h6l-.5-7.5C16 11.5 17 10 17 8c0-3-2-6-5-6z" fill="white" />
              </svg>
            </div>
            <div>
              <div className="font-extrabold text-base text-[#191919] leading-tight">Health4Life</div>
              <div className="text-[10px] text-[#45321A] font-semibold uppercase tracking-widest leading-none">Chiropractic</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#403F3F]">
            <a href="#services" className="hover:text-[#45321A] transition-colors">Services</a>
            <a href="#approach" className="hover:text-[#45321A] transition-colors">Approach</a>
            <a href="#about" className="hover:text-[#45321A] transition-colors">About</a>
            <a href="#testimonials" className="hover:text-[#45321A] transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-[#45321A] transition-colors">FAQ</a>
            <a href="#booking" className="hover:text-[#45321A] transition-colors">Book</a>
          </div>

          <a
            href="#booking"
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
              Amsterdam Zuid · Since 2010
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-[#191919] mb-6">
              Stop Pain.<br />
              Restore <span className="text-[#45321A]">Mobility.</span><br />
              Reclaim Life.
            </h1>
            <p className="text-[#403F3F] text-lg leading-relaxed mb-8 max-w-md">
              Amsterdam&apos;s chiropractic specialist and pain management clinic. If you have back pain, neck pain or headaches — call or text us today and stop pain immediately.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#booking"
                className="bg-[#45321A] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#5a4228] transition-colors"
              >
                Book an Appointment
              </a>
              <a
                href="tel:0206731800"
                className="border-2 border-[#45321A] text-[#45321A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#45321A]/5 transition-colors"
              >
                Call 020-673 1800
              </a>
            </div>

            <div className="mt-12 flex gap-10">
              {[['15+', 'Years in Amsterdam'], ['5', 'Treatments Offered'], ['100%', 'Personalised Care']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-extrabold text-[#45321A]">{num}</div>
                  <div className="text-xs text-[#403F3F] font-medium mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#45321A]/10 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80"
                alt="Chiropractor treating patient"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">✓</div>
              <div>
                <div className="font-bold text-sm text-[#191919]">WhatsApp Available</div>
                <div className="text-xs text-[#403F3F]">06-1882-0000</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">Comprehensive Pain Management &amp; Care</h2>
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
          <div className="mt-6 bg-[#45321A]/5 border border-[#45321A]/15 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#45321A] flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" fill="white" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-[#191919]">Fysio-Chiro Combined Therapy</div>
              <div className="text-sm text-[#403F3F] mt-0.5">An integrated approach combining physiotherapy and chiropractic techniques for complex or persistent conditions.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONDITIONS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F6F6F6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">Conditions Treated</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">We Specialise in Treating</h2>
            <p className="text-[#403F3F] mt-3 max-w-xl mx-auto">
              From sudden injuries to long-standing chronic pain, Dr. Jahani has the expertise and experience to help you recover fully.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {specialties.map((s) => (
              <div key={s} className="bg-white border border-[#45321A]/10 rounded-xl px-5 py-4 flex items-center gap-3 hover:border-[#45321A]/40 hover:shadow-sm transition-all">
                <div className="w-2 h-2 rounded-full bg-[#45321A] flex-shrink-0" />
                <span className="text-sm font-medium text-[#403F3F]">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE-PHASE APPROACH ─────────────────────────────────────────── */}
      <section id="approach" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">Our Method</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">The Three-Phase Care Model</h2>
            <p className="text-[#403F3F] mt-3 max-w-lg mx-auto">
              We don&apos;t just treat the symptom. Our structured approach ensures you get better — and stay better.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {carePhases.map((phase) => (
              <div key={phase.step} className="relative bg-[#F6F6F6] rounded-2xl p-8">
                <div className="text-6xl font-extrabold text-[#45321A]/10 absolute top-6 right-8 leading-none select-none">{phase.step}</div>
                <div className="text-xs font-bold text-[#45321A] uppercase tracking-widest mb-3">Phase {phase.step}</div>
                <h3 className="text-xl font-extrabold text-[#191919] mb-3">{phase.title}</h3>
                <p className="text-[#403F3F] text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CTA BANNER ──────────────────────────────────────────────── */}
      <section className="bg-[#45321A] py-20 text-center text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Stop Living with Pain?</h2>
          <p className="text-white/75 text-lg mb-8">
            Call or text us today. We will assess your condition, explain your treatment options clearly, and get you started on the path to recovery — without the jargon.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#booking" className="bg-white text-[#45321A] font-bold px-8 py-4 rounded-full text-sm hover:bg-[#F6F6F6] transition-colors">Book Online</a>
            <a href="tel:0206731800" className="border-2 border-white text-white font-bold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors">Call 020-673 1800</a>
          </div>
        </div>
      </section>

      {/* ── ABOUT / DR. JAHANI ───────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div className="aspect-square rounded-3xl overflow-hidden bg-[#F6F6F6] shadow-lg">
            <img
              src="/images/dr-jahani.webp"
              alt="Dr. M. Jahani — Health4Life Chiropractic Amsterdam"
              className="w-full h-full object-cover object-[center_55%]"
            />
          </div>
          <div>
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">Meet Your Chiropractor</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-2 text-[#191919]">Dr. M. Jahani</h2>
            <p className="text-[#45321A] font-semibold mb-5">DC, B.Sc. Biochemistry · Canadian Chiropractor</p>
            <p className="text-[#403F3F] leading-relaxed mb-4">
              Dr. Jahani earned his Bachelor of Science in Biochemistry from York University, Toronto (1999), followed by his Doctor of Chiropractic degree from the New York Chiropractic College (2003). He founded Health4Life Chiropractic in Amsterdam Zuid in 2010.
            </p>
            <p className="text-[#403F3F] leading-relaxed mb-6">
              With over two decades of clinical experience, Dr. Jahani specialises in neuro-based spinal correction combined with medical acupuncture and soft-tissue therapy — an integrated approach that consistently delivers results where other treatments have failed.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[['2003', 'Doctor of Chiropractic'], ['2010', 'Founded in Amsterdam'], ['15+', 'Years Local Experience'], ['5', 'Treatment Modalities']].map(([n, l]) => (
                <div key={l} className="bg-[#F6F6F6] rounded-xl p-5">
                  <div className="text-2xl font-extrabold text-[#45321A]">{n}</div>
                  <div className="text-xs text-[#403F3F] font-medium mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 bg-[#F6F6F6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">Patient Reviews</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">What Our Patients Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 shadow-sm">
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
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#F6F6F6] rounded-xl overflow-hidden border border-[#45321A]/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-[#191919] hover:bg-[#45321A]/5 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`ml-4 flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#45321A] flex items-center justify-center transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>
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

      {/* ── BOOKING ──────────────────────────────────────────────────────── */}
      <section id="booking" className="py-20 bg-[#F6F6F6]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-start">
          {/* Info */}
          <div>
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">Book Online</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-6 text-[#191919]">Schedule Your Appointment</h2>
            <p className="text-[#403F3F] leading-relaxed mb-8">
              Pick a date and time that works for you. We will confirm your booking within a few hours by phone or email.
            </p>
            <div className="space-y-5">
              {[
                { label: 'Address', value: 'Maasstraat 103, 1078 HH Amsterdam' },
                { label: 'Phone', value: '020-673 1800' },
                { label: 'WhatsApp', value: '06-1882-0000' },
                { label: 'Email', value: 'Dr_mJahani@yahoo.ca' },
                { label: 'Hours', value: 'Mon – Fri 10:00 – 17:00 · Sat 10:00 – 14:00' },
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

          {/* Booking widget */}
          <BookingWidget />
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#191919] text-white py-14">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#45321A] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M12 2C9 2 7 5 7 8c0 2 1 3.5 2.5 4.5L9 20h6l-.5-7.5C16 11.5 17 10 17 8c0-3-2-6-5-6z" fill="white" />
                </svg>
              </div>
              <div>
                <div className="font-extrabold text-base leading-tight">Health4Life</div>
                <div className="text-[10px] text-[#45321A] font-semibold uppercase tracking-widest leading-none">Chiropractic</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Chiropractic Specialist and Pain Management Clinic in Amsterdam Zuid. Serving patients since 2010.
            </p>
          </div>
          <div>
            <div className="font-semibold text-sm mb-4 text-white/80 uppercase tracking-wide">Quick Links</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              {[['services', 'Services'], ['approach', 'Our Approach'], ['about', 'About Dr. Jahani'], ['testimonials', 'Reviews'], ['faq', 'FAQ'], ['booking', 'Book Appointment']].map(([href, label]) => (
                <li key={href}><a href={`#${href}`} className="hover:text-white transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm mb-4 text-white/80 uppercase tracking-wide">Contact</div>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>Maasstraat 103</li>
              <li>1078 HH Amsterdam</li>
              <li>020-673 1800</li>
              <li>06-1882-0000 (WhatsApp)</li>
              <li className="pt-1">Mon – Fri: 10:00 – 17:00</li>
              <li>Sat: 10:00 – 14:00</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>© 2026 Health4Life Chiropractic Amsterdam. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
