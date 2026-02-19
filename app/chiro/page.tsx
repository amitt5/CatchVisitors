'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';
import { useState } from 'react';
import { ChiroVoiceBot } from '@/components/chiro/chiro-voice-bot';

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
  { en: 'Lower Back Pain', nl: 'Lage Rugpijn', slug: 'lage-rugpijn' },
  { en: 'Neck Pain', nl: 'Nekpijn', slug: 'nek' },
  { en: 'Headaches & Migraines', nl: 'Hoofdpijn en Migraine', slug: 'hoofdpijn-migraine' },
  { en: 'Whiplash', nl: 'Whiplash', slug: 'whiplash' },
  { en: 'Hernias & Disc Problems', nl: 'Hernia / Discushernia', slug: 'hernia' },
  { en: 'Upper Back & Shoulder Pain', nl: 'Bovenrug & Schouder', slug: 'bovenrug-schouder' },
  { en: 'Sciatica', nl: 'Ischias', slug: 'ischias' },
  { en: 'Sports Injuries', nl: 'Sportblessures', slug: 'sportblessures' },
  { en: 'Pregnancy-Related Pain', nl: 'Zwangerschap', slug: 'zwangerschap' },
  { en: 'Infant & Children\'s Care', nl: 'Kinderen & Baby\'s', slug: 'kinderen' },
  { en: 'Arthritis & Wear-and-Tear', nl: 'Artrose / Slijtage', slug: 'artrose-slijtage' },
  { en: 'Tension Headaches', nl: 'Spanningshoofdpijn', slug: 'spanningshoofdpijn' },
];

const conditionDetails = {
  'lage-rugpijn': {
    title: 'Lage Rugpijn',
    what: 'Lage rugpijn is één van de meest voorkomende klachten in Nederland. Het kan variëren van een doffe pijn tot scherpe, uitstralende pijn naar de benen. Oorzaken zijn onder meer verkeerde houding, spierspanning, discusproblemen, of wervelgewricht-dysfunctie.',
    how: 'Chiropractie behandelt lage rugpijn door wervelkolom-correcties (adjustments) toe te passen die de mobiliteit herstellen, zenuwdruk verminderen, en het natuurlijke genezingsproces van het lichaam activeren. Veel patiënten ervaren al na enkele behandelingen significante verlichting.',
  },
  'nek': {
    title: 'Nekpijn',
    what: 'Nekpijn kan ontstaan door langdurig beeldschermwerk, slechte slaaphouding, stress, of een whiplash-trauma. Symptomen variëren van stijfheid en spanning tot hoofdpijn en uitstralende pijn naar schouders of armen.',
    how: 'Door gerichte chiropractische correcties van de nekwervels wordt de mobiliteit hersteld en zenuwfunctie genormaliseerd. Combinatie met medische acupunctuur en massage versnelt het herstel en vermindert spierspanning effectief.',
  },
  'hernia': {
    title: 'Hernia / Discushernia',
    what: 'Een hernia ontstaat wanneer de kern van een tussenwervelschijf door de buitenste ring heen drukt. Dit kan druk geven op zenuwen en leiden tot pijn, tintelingen, of krachtsverlies in benen of armen.',
    how: 'Chiropractie kan bij veel hernia-gevallen de druk op de aangedane zenuw verminderen door de wervelkolom te ontlasten en correcte uitlijning te bevorderen. Behandeling richt zich op symptoomverlichting en het voorkomen van verdere schade. In ernstige gevallen verwijzen we door.',
  },
  'whiplash': {
    title: 'Whiplash',
    what: 'Whiplash is een nek-letsel veroorzaakt door plotselinge versnelling of vertraging (bijvoorbeeld bij een auto-ongeluk). Symptomen kunnen direct of vertraagd optreden: nekpijn, hoofdpijn, duizeligheid, concentratieproblemen.',
    how: 'Chiropractische behandeling helpt whiplash-klachten door de beschadigde wervels en gewrichten voorzichtig te mobiliseren, littekweefsel te verminderen, en het herstel van normale beweging te bevorderen. Vroege behandeling voorkomt chronische klachten.',
  },
  'bovenrug-schouder': {
    title: 'Bovenrug & Schouder',
    what: 'Pijn in de bovenrug en schouders komt vaak voor bij kantoorwerk, stress, of slechte houding. Klachten kunnen uitstralen naar nek of armen en leiden tot hoofdpijn en vermoeidheid.',
    how: 'Chiropractie behandelt bovenrug- en schouderpijn door wervelkolom-correcties, mobilisatie van de schoudergewrichten, en het verminderen van spierspanning. Vaak gecombineerd met therapeutische massage voor optimaal resultaat.',
  },
  'hoofdpijn-migraine': {
    title: 'Hoofdpijn en Migraine',
    what: 'Veel hoofdpijn en migraine heeft een cervicogene oorsprong: veroorzaakt door problemen in de nek en bovenrug. Symptomen variëren van doffe druk tot intense, bonzende pijn met misselijkheid en lichtgevoeligheid.',
    how: 'Chiropractie vermindert hoofdpijn door nekwervels te corrigeren, spierspanning te verlagen, en zenuwprikkeling te normaliseren. Studies tonen aan dat chiropractie effectief is bij chronische hoofdpijn en migraine.',
  },
  'spanningshoofdpijn': {
    title: 'Spanningshoofdpijn',
    what: 'Spanningshoofdpijn voelt aan als een strakke band rond het hoofd en wordt vaak veroorzaakt door langdurige spierspanning in nek en schouders, stress, of verkeerde houding.',
    how: 'Door chiropractische correcties van de nekwervels en bovenrug, gecombineerd met massage en ontspanningstechnieken, wordt de onderliggende spierspanning effectief verminderd en de frequentie van hoofdpijn drastisch verlaagd.',
  },
  'zwangerschap': {
    title: 'Zwangerschap',
    what: 'Tijdens de zwangerschap ondergaat het lichaam grote veranderingen. Lage rugpijn, bekkenpijn, en ischias komen vaak voor door toegenomen gewicht, hormonale veranderingen, en verschuivingen in houding.',
    how: 'Chiropractie tijdens zwangerschap is veilig en effectief. Zachte correcties helpen het bekken in balans te houden, pijn te verminderen, en de bevalling te vergemakkelijken. Speciale behandeltafels en technieken worden gebruikt voor comfort en veiligheid.',
  },
  'sportblessures': {
    title: 'Sportblessures',
    what: 'Sportblessures variëren van acute verwondingen (verstuikingen, scheuren) tot overbelasting-klachten (tennisarm, loperSknie). Ze kunnen leiden tot pijn, bewegingsbeperking, en verminderde prestaties.',
    how: 'Chiropractie behandelt sportblessures door gewrichten te mobiliseren, ontstekingen te verminderen, en het herstel van weefsels te versnellen. Combinatie met revalidatie-oefeningen en adviezen voorkomt herhaling en verbetert prestaties.',
  },
  'kinderen': {
    title: 'Kinderen & Baby\'s',
    what: 'Kinderen en baby\'s kunnen baat hebben bij chiropractie voor klachten zoals koliek, slaapproblemen, asymmetrische hoofdvorm, groei-pijnen, houdingsproblemen, en sportblessures.',
    how: 'Pediatrische chiropractie gebruikt zeer zachte, lage-kracht technieken die speciaal zijn aangepast voor jonge patiënten. Behandeling is veilig, effectief, en kan de ontwikkeling en gezondheid van kinderen aanzienlijk verbeteren.',
  },
  'artrose-slijtage': {
    title: 'Artrose / Slijtage',
    what: 'Artrose is slijtage van gewrichtskraakbeen, vaak voorkomend in nek, rug, heupen en knieën. Symptomen zijn stijfheid, pijn, en verminderde mobiliteit, vooral \'s ochtends of na inactiviteit.',
    how: 'Hoewel kraakbeen niet kan worden hersteld, helpt chiropractie de mobiliteit te behouden, pijn te verminderen, en verdere slijtage te vertragen door correcte gewrichtsuitlijning en beweging te bevorderen.',
  },
  'ischias': {
    title: 'Ischias',
    what: 'Ischias is pijn die uitstraalt van de onderrug via de bil naar het been, veroorzaakt door irritatie of druk op de ischiaszenuw. Oorzaken kunnen zijn: hernia, bekken-dysfunctie, of spierverkorting.',
    how: 'Chiropractie behandelt ischias door de oorzaak aan te pakken: wervelkolom-correcties om zenuwdruk te verminderen, bekken-stabilisatie, en mobilisatie van gewrichten. Veel patiënten ervaren snelle verlichting.',
  },
};

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
  { q: 'Does chiropractic treatment hurt?', a: 'Most patients experience little to no discomfort during an adjustment. You may hear a popping sound — this is simply gas releasing from the joint, similar to cracking your knuckles. Some mild soreness after the first few sessions is normal and typically passes within 24 hours.' },
  { q: 'How many sessions will I need?', a: 'This depends on your condition. After the first visit, Dr. Jahani will give you a clear treatment plan with an estimated number of sessions. Most acute conditions improve significantly within 4–8 sessions.' },
  { q: 'Do I need a referral from my GP?', a: 'No. You can book directly without a GP referral.' },
  { q: 'What is the difference between neuro-based chiropractic and regular chiropractic?', a: 'Neuro-based chiropractic focuses on the relationship between spinal alignment and the nervous system. Rather than just treating symptoms, it targets the root neurological cause of pain and dysfunction for more lasting results.' },
  { q: 'Do you treat children and infants?', a: 'Yes. Dr. Jahani has experience treating infants and children. The first consultation for children under 12 is €110. Techniques used for younger patients are gentle and specifically adapted.' },
  { q: 'Is chiropractic covered by Dutch health insurance?', a: 'Almost all Dutch supplemental health insurance plans (aanvullende verzekering) cover chiropractic. Health4Life is registered with the NCA and SCN, which are required by most insurers. Check your policy or visit chiropractievergoeding.nl.' },
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
  const [showVoiceBot, setShowVoiceBot] = useState(false);
  const [language, setLanguage] = useState<'en' | 'nl'>('en');
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

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
            <a href="#pricing" className="hover:text-[#45321A] transition-colors">Pricing</a>
            <a href="#about" className="hover:text-[#45321A] transition-colors">About</a>
            <a href="#testimonials" className="hover:text-[#45321A] transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-[#45321A] transition-colors">FAQ</a>
            <a href="#booking" className="hover:text-[#45321A] transition-colors">Book</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center bg-[#F6F6F6] rounded-full p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${language === 'en' ? 'bg-[#45321A] text-white' : 'text-[#403F3F] hover:text-[#45321A]'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('nl')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${language === 'nl' ? 'bg-[#45321A] text-white' : 'text-[#403F3F] hover:text-[#45321A]'}`}
              >
                NL
              </button>
            </div>

            <a
              href="#booking"
              className="bg-[#45321A] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#5a4228] transition-colors"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/chiro-hero.mov" type="video/quicktime" />
          <source src="/videos/chiro-hero.mov" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 w-full">
          <div className="max-w-xl">
            <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 border border-white/20">
              Amsterdam Zuid · Since 2010
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-white mb-6">
              Stop Pain.<br />
              Restore <span className="text-[#c9a96e]">Mobility.</span><br />
              Reclaim Life.
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
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
                className="border-2 border-white text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
              >
                Call 020-673 1800
              </a>
              <button
                onClick={() => setShowVoiceBot(true)}
                className="flex items-center gap-2 bg-[#c9a96e] text-[#191919] font-semibold px-6 py-3.5 rounded-full hover:bg-[#d9bc88] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Talk to Our AI
              </button>
            </div>

            <div className="mt-12 flex gap-10">
              {[['15+', 'Years in Amsterdam'], ['5', 'Treatments Offered'], ['100%', 'Personalised Care']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-extrabold text-[#c9a96e]">{num}</div>
                  <div className="text-xs text-white/70 font-medium mt-0.5">{label}</div>
                </div>
              ))}
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
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">
              {language === 'nl' ? 'Behandelde Klachten' : 'Conditions Treated'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">
              {language === 'nl' ? 'Wij Zijn Gespecialiseerd in' : 'We Specialise in Treating'}
            </h2>
            <p className="text-[#403F3F] mt-3 max-w-xl mx-auto">
              {language === 'nl'
                ? 'Van acute blessures tot chronische pijn — Dr. Jahani heeft de expertise en ervaring om u volledig te laten herstellen.'
                : 'From sudden injuries to long-standing chronic pain, Dr. Jahani has the expertise and experience to help you recover fully.'}
            </p>
            {language === 'nl' && (
              <p className="text-[#45321A] text-sm font-semibold mt-3">
                ↓ Klik op een klacht voor meer informatie
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {specialties.map((s) => (
              <button
                key={s.slug}
                onClick={() => language === 'nl' && setSelectedCondition(s.slug)}
                className={`bg-white border border-[#45321A]/10 rounded-xl px-5 py-4 flex items-center gap-3 hover:border-[#45321A]/40 hover:shadow-sm transition-all text-left ${language === 'nl' ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-default'}`}
                disabled={language === 'en'}
              >
                <div className="w-2 h-2 rounded-full bg-[#45321A] flex-shrink-0" />
                <span className="text-sm font-medium text-[#403F3F]">
                  {language === 'nl' ? s.nl : s.en}
                </span>
                {language === 'nl' && (
                  <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0 ml-auto fill-[#45321A]">
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                  </svg>
                )}
              </button>
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

      {/* ── YOUR FIRST VISIT ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">New Patient Info</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">Your First Visit</h2>
            <p className="text-[#403F3F] mt-3 max-w-2xl mx-auto">
              We understand visiting a chiropractor for the first time can raise questions. Here&apos;s exactly what happens during your first appointment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Patient Forms', desc: 'Complete health history and condition intake forms upon arrival.' },
              { step: '2', title: 'Consultation', desc: 'Discuss health problems, concerns, and treatment goals with Dr. Jahani. The first visit is about understanding your condition and what you want to achieve.' },
              { step: '3', title: 'Examination', desc: 'Full chiropractic exam including reflex and flexibility testing, plus neurological, orthopedic, postural, and physical assessments. Nothing is done without your consent.' },
              { step: '4', title: 'X-Ray Studies', desc: 'If needed based on your condition, X-rays are taken to develop the most effective treatment plan and check for serious spinal conditions.' },
              { step: '5', title: 'Report of Findings', desc: 'Dr. Jahani provides a full report covering: How can he help you? How often will you need to come in? What will the cost be?' },
              { step: '6', title: 'Treatment', desc: 'At the end of the first visit, you can choose to start your first treatment: spinal adjustment, physical therapy, and/or soft tissue massage.' },
              { step: '7', title: 'Wellness Program', desc: 'Before leaving, Dr. Jahani will suggest a home wellness program which may include: ice/heat instructions, activities to avoid, and home exercises or stretches.' },
            ].map((item) => (
              <div key={item.step} className="bg-[#F6F6F6] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#45321A]/5 flex items-center justify-center">
                  <span className="text-xl font-extrabold text-[#45321A]">{item.step}</span>
                </div>
                <h3 className="font-bold text-[#191919] text-lg mb-2 pr-14">{item.title}</h3>
                <p className="text-[#403F3F] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING & INSURANCE ──────────────────────────────────────────── */}
      <section id="pricing" className="py-20 bg-[#F6F6F6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#45321A] text-sm font-semibold uppercase tracking-widest">Tarieven / Vergoedingen</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-[#191919]">Transparent Pricing</h2>
            <p className="text-[#403F3F] mt-3 max-w-2xl mx-auto">
              Clear, upfront pricing for all services. Payment is due after each visit (cash or card). We provide receipts for insurance reimbursement.
            </p>
          </div>

          {/* Pricing table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#45321A] text-white">
                  <tr>
                    <th className="text-left px-6 py-4 font-bold text-sm uppercase tracking-wide">Treatment</th>
                    <th className="text-right px-6 py-4 font-bold text-sm uppercase tracking-wide">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#45321A]/10">
                  {[
                    ['Eerste Consult Volwassen (incl. medische acupunctuur + eerste wervelkolom correctie)', '€ 160'],
                    ['Eerste Consult Kinderen tot 12 jaar', '€ 110'],
                    ['Vervolg Consult Chiropractie', '€ 80'],
                    ['Uitgebreid Consult Chiropractie + Medische Acupunctuur', '€ 130'],
                    ['Diep Tissue Therapie / Massage 30 min', '€ 70'],
                    ['Diep Tissue Therapie / Massage 60 min', '€ 120'],
                    ['Orthopedische Inlegzolen (Custom Orthotics)', '€ 480'],
                    ['Orthopedische Back Vitalizer', '€ 120'],
                    ['Orthopedische Waterkern Kussen', '€ 150'],
                    ['Orthopedische Luchtkussen (Neck/Rug)', '€ 150'],
                    ['High-tech Voet Scan incl. advies', '€ 120'],
                    ['Behandelplan Opzeggingskosten', '€ 150'],
                  ].map(([treatment, price]) => (
                    <tr key={treatment} className="hover:bg-[#45321A]/5 transition-colors">
                      <td className="px-6 py-4 text-[#403F3F] text-sm">{treatment}</td>
                      <td className="px-6 py-4 text-right text-[#191919] font-bold text-sm">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment note */}
          <div className="bg-[#45321A]/5 border border-[#45321A]/20 rounded-xl px-6 py-5 mb-8">
            <p className="text-[#403F3F] text-sm leading-relaxed">
              <strong className="text-[#191919]">Payment:</strong> Het verschuldigde bedrag wordt na afloop van elk bezoek vereffend. Betaling mogelijk met contant of pinpas. De kwitantie kunt u indienen bij uw verzekeringsmaatschappij.
            </p>
          </div>

          {/* Insurance information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#45321A] flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="white" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[#191919] text-xl mb-3">Vergoedingen / Insurance Coverage</h3>
                <p className="text-[#403F3F] text-sm leading-relaxed mb-4">
                  Vrijwel alle ziektekostenverzekeraars hebben chiropractie in hun aanvullende pakket opgenomen. Voorwaarde is dat de chiropractor aangesloten is bij een beroepsvereniging (NCA) en ingeschreven staat bij de Stichting Chiropractie Nederland (SCN). Bij de meeste verzekeraars valt chiropractie onder &quot;alternatieve geneeswijzen&quot; of &quot;beweegzorg&quot;.
                </p>
                <p className="text-[#403F3F] text-sm leading-relaxed mb-4">
                  <strong className="text-[#191919]">Health4Life is fully registered with NCA and SCN</strong>, meeting all insurer requirements.
                </p>
                <p className="text-sm">
                  <span className="text-[#403F3F]">For a complete list of insurers: </span>
                  <a href="https://www.chiropractievergoeding.nl" target="_blank" rel="noopener noreferrer" className="text-[#45321A] font-semibold underline hover:text-[#5a4228] transition-colors">
                    www.chiropractievergoeding.nl
                  </a>
                </p>
              </div>
            </div>
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

      {/* ── FLOATING VOICE BUTTON ────────────────────────────────────────── */}
      <button
        onClick={() => setShowVoiceBot(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#45321A] text-white font-semibold pl-4 pr-5 py-3.5 rounded-full shadow-xl hover:bg-[#5a4228] transition-all hover:scale-105 active:scale-95"
      >
        <span className="relative flex-shrink-0">
          <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
          <svg viewBox="0 0 24 24" className="relative w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-sm">Talk to Our AI</span>
      </button>

      {/* ── VOICE BOT MODAL ───────────────────────────────────────────────── */}
      <ChiroVoiceBot isOpen={showVoiceBot} onClose={() => setShowVoiceBot(false)} />

      {/* ── CONDITION DETAILS MODAL ──────────────────────────────────────── */}
      {selectedCondition && conditionDetails[selectedCondition as keyof typeof conditionDetails] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setSelectedCondition(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#45321A] text-white px-8 py-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-2xl font-extrabold">
                {conditionDetails[selectedCondition as keyof typeof conditionDetails].title}
              </h2>
              <button
                onClick={() => setSelectedCondition(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 20 20" className="w-5 h-5 fill-white">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-8 py-8 space-y-6">
              {/* What is it */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#45321A]/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#45321A" strokeWidth="2">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#191919] text-lg">Wat is het?</h3>
                </div>
                <p className="text-[#403F3F] leading-relaxed text-sm">
                  {conditionDetails[selectedCondition as keyof typeof conditionDetails].what}
                </p>
              </div>

              {/* How does chiro help */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#45321A]/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#45321A" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#191919] text-lg">Hoe helpt chiropractie?</h3>
                </div>
                <p className="text-[#403F3F] leading-relaxed text-sm">
                  {conditionDetails[selectedCondition as keyof typeof conditionDetails].how}
                </p>
              </div>

              {/* CTA */}
              <div className="bg-[#F6F6F6] rounded-xl px-6 py-6 mt-6">
                <p className="text-[#403F3F] text-sm mb-4 text-center">
                  Heeft u last van <strong className="text-[#191919]">{conditionDetails[selectedCondition as keyof typeof conditionDetails].title.toLowerCase()}</strong>?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="#booking"
                    onClick={() => setSelectedCondition(null)}
                    className="bg-[#45321A] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#5a4228] transition-colors text-center text-sm"
                  >
                    Maak een afspraak
                  </a>
                  <a
                    href="tel:0206731800"
                    className="border-2 border-[#45321A] text-[#45321A] font-semibold px-6 py-3 rounded-full hover:bg-[#45321A]/5 transition-colors text-center text-sm"
                  >
                    Bel 020-673 1800
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
              {[['services', 'Services'], ['approach', 'Our Approach'], ['pricing', 'Pricing'], ['about', 'About Dr. Jahani'], ['testimonials', 'Reviews'], ['faq', 'FAQ'], ['booking', 'Book Appointment']].map(([href, label]) => (
                <li key={href}><a href={`#${href}`} className="hover:text-white transition-colors">{label}</a></li>
              ))}
              <li><a href="/chiro/vacatures" className="hover:text-white transition-colors">Vacatures</a></li>
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
