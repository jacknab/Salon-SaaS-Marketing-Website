import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  CreditCard,
  Gift,
  Heart,
  Menu,
  MessageCircle,
  MousePointer2,
  Scissors,
  Send,
  Sparkles,
  Star,
  UserRound,
  X,
  Zap,
} from 'lucide-react';

type ModalMode = 'trial' | 'demo' | null;

const navItems = [
  { label: 'Platform', href: '#platform' },
  { label: 'Why MUSE', href: '#why-muse' },
  { label: 'Stories', href: '#stories' },
  { label: 'Pricing', href: '#pricing' },
];

const features = [
  {
    number: '01',
    title: 'A booking page that feels like you',
    description: 'Turn a first click into a feeling with a beautiful, always-open front desk that fills itself while you work.',
    label: 'Booking',
    icon: CalendarDays,
    tone: 'coral',
  },
  {
    number: '02',
    title: 'The quiet confidence of paid',
    description: 'Deposits, cards, tips, and checkout in one graceful flow. Stripe-powered payments that keep your books as polished as your studio.',
    label: 'Payments',
    icon: CreditCard,
    tone: 'sage',
  },
  {
    number: '03',
    title: 'Clients you know by heart',
    description: 'Keep every preference, formula, note, and thank-you in one place. Personal service, made easier to repeat.',
    label: 'Client care',
    icon: UserRound,
    tone: 'butter',
  },
  {
    number: '04',
    title: 'The nudge that brings them back',
    description: 'Send the right message at the right moment. Reviews, rewards, and SMS campaigns that sound like a human, not a funnel.',
    label: 'Growth',
    icon: MessageCircle,
    tone: 'lilac',
  },
];

const faqs = [
  {
    question: 'Is MUSE built for solo professionals or teams?',
    answer: 'Both. Start as a one-chair studio and invite your first teammate when the time is right. MUSE keeps permissions, calendars, payouts, and client records clear as your business grows.',
  },
  {
    question: 'Can I bring my existing clients and calendar?',
    answer: 'Absolutely. Our concierge onboarding team helps you import your client list, services, and availability so you can open your doors without starting from scratch.',
  },
  {
    question: 'How do MUSE payments work?',
    answer: 'MUSE uses Stripe for secure card processing and connects it directly to your booking and POS flows. You can take deposits, collect tips, and see payouts without switching tabs.',
  },
  {
    question: 'What happens after the free trial?',
    answer: 'You choose the plan that matches your rhythm. There are no surprise setup fees, and our team will reach out before your trial ends so you have time to make a confident decision.',
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, className: visible ? 'reveal is-visible' : 'reveal' };
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reveal = useReveal();
  return <div ref={reveal.ref} className={`${reveal.className} delay-${delay} ${className}`}>{children}</div>;
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-2.5 focus-ring ${inverse ? 'text-[#f8f2e9]' : 'text-[#26372f]'}`} data-testid="link-logo">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
        <Scissors size={15} strokeWidth={1.8} />
      </span>
      <span className="text-[1.2rem] font-semibold tracking-[0.18em]">MUSE</span>
    </a>
  );
}

function Button({
  children,
  onClick,
  variant = 'dark',
  className = '',
  testId,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'dark' | 'coral' | 'outline' | 'light';
  className?: string;
  testId: string;
}) {
  const variants = {
    dark: 'bg-[#26372f] text-[#f8f2e9] hover:bg-[#385046]',
    coral: 'bg-[#e96f59] text-[#fff8ee] hover:bg-[#d85e49]',
    outline: 'border border-[#26372f]/25 text-[#26372f] hover:border-[#26372f] hover:bg-[#26372f]/5',
    light: 'bg-[#f8f2e9] text-[#26372f] hover:bg-white',
  };
  return (
    <button onClick={onClick} className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`} data-testid={testId}>
      {children}
    </button>
  );
}

function DashboardVisual() {
  return (
    <div className="relative mx-auto h-[530px] w-full max-w-[590px] sm:h-[600px]" data-testid="visual-dashboard">
      <div className="absolute right-0 top-2 h-[75%] w-[84%] rotate-[3deg] rounded-[2rem] bg-[#cfd8c4] shadow-[0_24px_50px_rgba(38,55,47,.16)] sm:w-[87%]" />
      <div className="absolute bottom-0 left-0 z-[2] h-[79%] w-[88%] overflow-hidden rounded-[2rem] border border-[#26372f]/10 bg-[#f8f2e9] shadow-[0_24px_55px_rgba(38,55,47,.18)] sm:w-[87%]">
        <div className="flex items-center justify-between border-b border-[#26372f]/10 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#e96f59]" />
            <span className="font-mono text-[10px] tracking-[.15em] text-[#26372f]/60">MUSE / TODAY</span>
          </div>
          <span className="text-xs text-[#26372f]/45">Tuesday, 08 Oct</span>
        </div>
        <div className="p-5 sm:p-7">
          <p className="eyebrow text-[#26372f]/45">Good morning, Nora</p>
          <h3 className="serif mt-2 text-[2.1rem] leading-none text-[#26372f] sm:text-[2.7rem]">Your studio, in flow.</h3>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#e6e6d9] p-4">
              <p className="text-xs text-[#26372f]/55">Today&apos;s revenue</p>
              <p className="mt-2 text-2xl font-semibold text-[#26372f]">$1,248</p>
              <p className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-[#58755d]"><ArrowUpRight size={12} /> 18.4% this week</p>
            </div>
            <div className="rounded-2xl bg-[#f7d5c9] p-4">
              <p className="text-xs text-[#26372f]/55">Booked this week</p>
              <p className="mt-2 text-2xl font-semibold text-[#26372f]">84%</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#26372f]/10"><div className="h-full w-[84%] rounded-full bg-[#e96f59]" /></div>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-[#26372f]/10 bg-white/45 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Your next appointments</p>
              <span className="text-[10px] font-semibold text-[#e96f59]">View calendar</span>
            </div>
            <div className="mt-4 space-y-3">
              {['09:30  /  Margot · Gloss + cut', '11:00  /  Lila · Signature colour', '14:15  /  Hana · Scalp ritual'].map((item, index) => (
                <div className="flex items-center gap-3" key={item}>
                  <span className={`h-2 w-2 rounded-full ${index === 1 ? 'bg-[#e96f59]' : 'bg-[#9db398]'}`} />
                  <p className="text-xs text-[#26372f]/70">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="float-soft absolute right-[-2%] top-[13%] z-[3] w-[47%] rounded-[1.35rem] bg-[#e96f59] p-4 text-[#fff8ee] shadow-[0_20px_35px_rgba(38,55,47,.2)] sm:right-[-4%] sm:w-[43%] sm:p-5">
        <div className="flex items-center justify-between">
          <span className="eyebrow opacity-70">New review</span>
          <Star size={15} fill="currentColor" />
        </div>
        <p className="serif mt-5 text-xl leading-[.95] sm:text-2xl">&quot;A little piece of heaven.&quot;</p>
        <p className="mt-3 text-[10px] opacity-75">— Celia R. · 5 min ago</p>
      </div>
      <div className="drift absolute bottom-[5%] right-[2%] z-[4] rounded-full border border-[#26372f]/15 bg-[#f6c879] px-4 py-3 text-[11px] font-semibold text-[#26372f] shadow-[0_10px_20px_rgba(38,55,47,.12)] sm:right-[5%]">
        <span className="flex items-center gap-2"><Sparkles size={14} /> All caught up</span>
      </div>
    </div>
  );
}

function DemoModal({ mode, onClose }: { mode: ModalMode; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (!mode) {
      setSubmitted(false);
      setEmail('');
    }
  }, [mode]);
  if (!mode) return null;
  const demo = mode === 'demo';
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#26372f]/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="modal-conversion">
      <div className="relative w-full max-w-lg rounded-[2rem] bg-[#f8f2e9] p-7 shadow-[0_25px_80px_rgba(38,55,47,.3)] sm:p-10">
        <button onClick={onClose} className="focus-ring absolute right-5 top-5 rounded-full p-2 text-[#26372f]/60 transition hover:bg-[#26372f]/10 hover:text-[#26372f]" aria-label="Close dialog" data-testid="button-close-modal"><X size={20} /></button>
        {!submitted ? (
          <>
            <span className="eyebrow text-[#e96f59]">{demo ? 'A closer look' : 'Your first 14 days'}</span>
            <h2 className="serif mt-4 max-w-sm text-4xl leading-[.95] text-[#26372f]">{demo ? 'Let&apos;s make space for what matters.' : 'Your best business day starts here.'}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#26372f]/65">{demo ? 'Tell us where you are in your studio journey and a MUSE guide will walk you through the details.' : 'No card. No awkward setup. Just a generous two weeks to see how MUSE feels in your hands.'}</p>
            <form onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSubmitted(true); }} className="mt-7">
              <label htmlFor="conversion-email" className="eyebrow text-[#26372f]/50">Work email</label>
              <input id="conversion-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@yourstudio.com" className="focus-ring mt-2 w-full rounded-xl border border-[#26372f]/15 bg-[#fffaf3] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#26372f]/35 focus:border-[#e96f59]" data-testid="input-conversion-email" />
              <Button variant="coral" testId="button-submit-conversion" className="mt-3 w-full">{demo ? 'Request my demo' : 'Start my free trial'} <ArrowRight size={16} /></Button>
            </form>
            <p className="mt-4 text-center text-[11px] text-[#26372f]/45">By continuing, you agree to MUSE&apos;s thoughtful terms.</p>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dce6d7] text-[#58755d]"><CircleCheck size={28} /></div>
            <h2 className="serif mt-6 text-4xl text-[#26372f]">{demo ? 'We&apos;ll be in touch.' : 'You&apos;re on your way.'}</h2>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#26372f]/65">{demo ? 'A MUSE guide will send a few times to your inbox shortly.' : 'Check your inbox for a welcome note and your first step toward a calmer studio.'}</p>
            <Button onClick={onClose} variant="dark" testId="button-close-success" className="mt-7">Back to MUSE</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalMode>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const startTrial = () => { setMenuOpen(false); setModal('trial'); };
  const bookDemo = () => { setMenuOpen(false); setModal('demo'); };

  return (
    <div className="grain min-h-[100dvh] bg-[#f4efe8] text-[#26372f]">
      <header className="absolute left-0 right-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <BrandMark />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navItems.map((item) => <a key={item.href} href={item.href} className="focus-ring text-sm font-medium text-[#26372f]/65 transition hover:text-[#26372f]" data-testid={`link-nav-${item.label.toLowerCase().replace(' ', '-')}`}>{item.label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button onClick={bookDemo} className="focus-ring px-3 py-2 text-sm font-semibold text-[#26372f]/70 transition hover:text-[#26372f]" data-testid="button-nav-demo">Book a demo</button>
            <Button onClick={startTrial} variant="dark" testId="button-nav-trial" className="px-4 py-2.5 text-xs">Start free <ArrowUpRight size={14} /></Button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus-ring rounded-full border border-[#26372f]/15 p-2.5 md:hidden" aria-label="Toggle menu" data-testid="button-mobile-menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mx-4 rounded-2xl border border-[#26372f]/10 bg-[#f8f2e9] p-4 shadow-[0_18px_35px_rgba(38,55,47,.14)] md:hidden" data-testid="menu-mobile">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => <a onClick={() => setMenuOpen(false)} key={item.href} href={item.href} className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-[#26372f]/5" data-testid={`link-mobile-${item.label.toLowerCase().replace(' ', '-')}`}>{item.label}</a>)}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#26372f]/10 pt-3">
              <button onClick={bookDemo} className="rounded-full border border-[#26372f]/20 px-3 py-2.5 text-xs font-semibold" data-testid="button-mobile-demo">Book a demo</button>
              <button onClick={startTrial} className="rounded-full bg-[#26372f] px-3 py-2.5 text-xs font-semibold text-[#f8f2e9]" data-testid="button-mobile-trial">Start free</button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44 lg:px-12 lg:pt-48">
          <div className="absolute -left-36 top-10 h-[500px] w-[500px] rounded-full bg-[#dce6d7]/70 blur-3xl" />
          <div className="absolute right-[-12%] top-[-16%] h-[600px] w-[600px] rounded-full bg-[#f7d5c9]/60 blur-3xl" />
          <div className="relative mx-auto grid max-w-[1380px] items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-6">
            <div className="relative z-10 max-w-[680px]">
              <div className="hero-enter flex items-center gap-3 text-[#e96f59]"><span className="h-px w-8 bg-current" /><span className="eyebrow">The business side of beauty</span></div>
              <h1 className="hero-enter-delay serif mt-7 max-w-[650px] text-[4.15rem] leading-[.87] tracking-[-.035em] sm:text-[6.7rem] lg:text-[7.7rem]">More time for the work <em className="text-[#e96f59]">that made you start.</em></h1>
              <p className="hero-enter-late mt-8 max-w-[500px] text-base leading-7 text-[#26372f]/65 sm:text-lg">MUSE brings booking, payments, clients, and growth into one beautifully considered place — so your studio can feel as good behind the scenes as it does in the chair.</p>
              <div className="hero-enter-late mt-8 flex flex-wrap items-center gap-3">
                <Button onClick={startTrial} variant="coral" testId="button-hero-trial">Start free for 14 days <ArrowRight size={16} /></Button>
                <button onClick={bookDemo} className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-[#26372f]/5" data-testid="button-hero-demo">Book a demo <ArrowUpRight size={16} /></button>
              </div>
              <div className="hero-enter-late mt-8 flex items-center gap-3 text-xs text-[#26372f]/50"><div className="flex -space-x-2">{['MA', 'KO', 'SL'].map((initials, i) => <span key={initials} className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f4efe8] text-[9px] font-semibold text-[#26372f] ${i === 0 ? 'bg-[#e8c5a9]' : i === 1 ? 'bg-[#c4d3be]' : 'bg-[#ecc4c0]'}`}>{initials}</span>)}</div><span>Trusted by 3,200+ independent beauty pros</span></div>
            </div>
            <div className="relative z-10 lg:translate-x-7"><DashboardVisual /></div>
          </div>
          <div className="relative mx-auto mt-10 flex max-w-[1380px] items-center justify-between border-t border-[#26372f]/15 pt-5 text-[#26372f]/45">
            <span className="eyebrow">Scroll to explore</span><ArrowDownRight size={18} />
          </div>
        </section>

        <section className="border-y border-[#26372f]/10 bg-[#26372f] px-5 py-6 text-[#f8f2e9] sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-5">
            <p className="eyebrow text-[#f8f2e9]/55">The studios choosing a better business day</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold tracking-[.08em] text-[#f8f2e9]/75 sm:gap-x-12"><span>STUDIO ORO</span><span className="font-serif text-base font-normal tracking-normal">lune / house</span><span>FOLK BEAUTY</span><span className="font-serif text-base font-normal tracking-normal">Serein</span><span>FORM + FIELD</span></div>
          </div>
        </section>

        <section id="why-muse" className="overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto grid max-w-[1380px] items-end gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <span className="eyebrow text-[#e96f59]">01 / A softer operating system</span>
              <h2 className="serif mt-6 max-w-[570px] text-5xl leading-[.94] tracking-[-.02em] sm:text-6xl">The tools should disappear. <em className="text-[#e96f59]">The good work shouldn&apos;t.</em></h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="max-w-[550px] text-lg leading-8 text-[#26372f]/65 lg:ml-auto">Your clients feel the difference when everything is in its right place. MUSE gives you the calm, connected foundation to deliver a more personal experience — at every touchpoint.</p>
              <a href="#platform" className="focus-ring mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#e96f59] transition hover:gap-3" data-testid="link-explore-platform">Explore the platform <ArrowRight size={16} /></a>
            </Reveal>
          </div>
          <div className="mx-auto mt-16 grid max-w-[1380px] gap-5 md:grid-cols-3">
            <Reveal delay={1}><div className="relative min-h-[330px] overflow-hidden rounded-[1.75rem] bg-[#dce6d7] p-7"><div className="absolute -right-8 -top-9 h-44 w-44 rounded-full border-[18px] border-[#f4efe8]/60" /><Scissors className="relative text-[#26372f]/70" size={28} strokeWidth={1.4} /><p className="eyebrow mt-28 text-[#26372f]/50">Less admin</p><h3 className="serif mt-3 max-w-[230px] text-3xl leading-none">One less tab. A lot more headspace.</h3></div></Reveal>
            <Reveal delay={2}><div className="relative min-h-[330px] overflow-hidden rounded-[1.75rem] bg-[#f7d5c9] p-7"><div className="absolute bottom-[-30px] right-[-10px] h-48 w-48 rounded-full border-[24px] border-[#e96f59]/35" /><Heart className="relative text-[#e96f59]" size={28} strokeWidth={1.5} /><p className="eyebrow mt-28 text-[#26372f]/50">More connection</p><h3 className="serif mt-3 max-w-[250px] text-3xl leading-none">Remember the details clients come back for.</h3></div></Reveal>
            <Reveal delay={3}><div className="relative min-h-[330px] overflow-hidden rounded-[1.75rem] bg-[#f6c879] p-7"><div className="absolute right-8 top-12 h-20 w-20 rounded-full border border-[#26372f]/20" /><BarChart3 className="relative text-[#26372f]" size={28} strokeWidth={1.5} /><p className="eyebrow mt-28 text-[#26372f]/50">More momentum</p><h3 className="serif mt-3 max-w-[240px] text-3xl leading-none">See what&apos;s working. Do more of it.</h3></div></Reveal>
          </div>
        </section>

        <section id="platform" className="bg-[#e9e7da] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1380px]">
            <Reveal><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><span className="eyebrow text-[#e96f59]">02 / The full studio, in one place</span><h2 className="serif mt-5 max-w-[650px] text-5xl leading-[.92] tracking-[-.02em] sm:text-6xl">Run the business.<br /><em className="text-[#e96f59]">Keep the art.</em></h2></div><p className="max-w-[320px] text-sm leading-6 text-[#26372f]/60">Every tool is designed to feel less like software and more like a natural extension of your service.</p></div></Reveal>
            <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-[#26372f]/10 bg-[#26372f]/10 sm:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const tone = feature.tone === 'coral' ? 'bg-[#f7d5c9]' : feature.tone === 'sage' ? 'bg-[#dce6d7]' : feature.tone === 'butter' ? 'bg-[#f6c879]' : 'bg-[#ddd6e5]';
                return <Reveal key={feature.number} delay={(index % 3) + 1}><article className={`${tone} group relative min-h-[360px] p-7 transition-all duration-500 hover:brightness-[.98] sm:p-9`} data-testid={`card-feature-${feature.number}`}><div className="flex items-start justify-between"><span className="eyebrow text-[#26372f]/45">{feature.number} / {feature.label}</span><span className="rounded-full border border-[#26372f]/15 p-2.5 transition duration-300 group-hover:rotate-[-10deg]"><Icon size={18} strokeWidth={1.6} /></span></div><div className="absolute bottom-8 left-7 right-7 sm:left-9 sm:right-9"><h3 className="serif max-w-[340px] text-4xl leading-[.92]">{feature.title}</h3><p className="mt-4 max-w-[390px] text-sm leading-6 text-[#26372f]/65">{feature.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold opacity-0 transition duration-300 group-hover:opacity-100">See how it works <ArrowRight size={14} /></span></div></article></Reveal>;
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#e96f59] px-5 py-20 text-[#fff8ee] sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto grid max-w-[1380px] items-center gap-10 lg:grid-cols-[1fr_auto]">
            <Reveal><div><span className="eyebrow text-[#fff8ee]/65">03 / More of the right kind of growth</span><h2 className="serif mt-5 max-w-[800px] text-5xl leading-[.9] tracking-[-.02em] sm:text-7xl">What if your next best month felt <em>lighter?</em></h2></div></Reveal>
            <Reveal delay={1}><div className="flex items-center gap-4 border-t border-[#fff8ee]/25 pt-5 lg:block lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><span className="font-mono text-6xl tracking-[-.08em] sm:text-8xl">+31<span className="text-4xl">%</span></span><p className="max-w-[145px] text-sm leading-5 text-[#fff8ee]/75 lg:mt-2">average increase in repeat bookings after 90 days</p></div></Reveal>
          </div>
        </section>

        <section id="stories" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1380px]">
            <Reveal><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><span className="eyebrow text-[#e96f59]">04 / Notes from the chair</span><h2 className="serif mt-5 max-w-[650px] text-5xl leading-[.92] sm:text-6xl">Made for people<br /><em>with good taste.</em></h2></div><a href="#faq" className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[#e96f59]" data-testid="link-read-stories">Read more studio stories <ArrowRight size={16} /></a></div></Reveal>
            <Reveal delay={1}><div className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_.9fr]"><article className="relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[#26372f] p-7 text-[#f8f2e9] sm:p-10"><div className="absolute right-[-25px] top-[-25px] h-48 w-48 rounded-full border-[28px] border-[#58755d]/50" /><div className="relative flex items-center justify-between"><span className="eyebrow text-[#f8f2e9]/50">Northside studio / Portland</span><Sparkles size={19} className="text-[#f6c879]" /></div><div className="relative"><div className="mb-7 flex text-[#f6c879]"><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /></div><blockquote className="serif max-w-[690px] text-4xl leading-[.98] sm:text-5xl">&quot;MUSE gave me my evenings back — and my clients can feel that I&apos;m more present.&quot;</blockquote><div className="mt-8 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8c5a9] text-xs font-bold text-[#26372f]">NS</div><div><p className="text-sm font-semibold">Nina Sato</p><p className="text-xs text-[#f8f2e9]/50">Founder, Northside studio</p></div></div></div></article><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1"><article className="flex flex-1 flex-col justify-between rounded-[1.75rem] bg-[#f6c879] p-7 sm:p-8"><div className="flex items-center justify-between"><Gift size={25} strokeWidth={1.5} /><span className="eyebrow text-[#26372f]/50">Loyalty</span></div><p className="serif mt-12 text-3xl leading-[.95]">&quot;Our rewards now feel like a thank-you, not a discount.&quot;</p><span className="mt-8 text-xs font-semibold">Amara Cole, Gloss House</span></article><article className="flex flex-1 flex-col justify-between rounded-[1.75rem] bg-[#dce6d7] p-7 sm:p-8"><div className="flex items-center justify-between"><Send size={25} strokeWidth={1.5} /><span className="eyebrow text-[#26372f]/50">SMS marketing</span></div><p className="serif mt-12 text-3xl leading-[.95]">&quot;It sounds like us. That&apos;s why it works.&quot;</p><span className="mt-8 text-xs font-semibold">Leila Chen, Fieldwork Beauty</span></article></div></div></Reveal>
          </div>
        </section>

        <section id="pricing" className="border-y border-[#26372f]/10 bg-[#f8f2e9] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto grid max-w-[1380px] items-start gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal><span className="eyebrow text-[#e96f59]">05 / A clear place to begin</span><h2 className="serif mt-5 max-w-[500px] text-5xl leading-[.92] sm:text-6xl">Good business shouldn&apos;t require a <em>giant leap.</em></h2><p className="mt-6 max-w-[390px] text-sm leading-6 text-[#26372f]/60">Start small, get a feel for it, and grow into what&apos;s next. MUSE meets you where you are.</p><Button onClick={startTrial} variant="dark" testId="button-pricing-trial" className="mt-7">Start free for 14 days <ArrowRight size={16} /></Button></Reveal>
            <Reveal delay={1}><div className="rounded-[1.75rem] border border-[#26372f]/15 bg-[#e9e7da] p-7 sm:p-10"><div className="flex items-center justify-between border-b border-[#26372f]/15 pb-6"><div><span className="eyebrow text-[#e96f59]">Studio plan</span><p className="mt-2 text-sm text-[#26372f]/55">Everything to run beautifully.</p></div><span className="font-mono text-sm text-[#26372f]/50">from</span></div><div className="flex items-end gap-2 py-7"><span className="font-mono text-6xl tracking-[-.08em]">$39</span><span className="mb-2 text-sm text-[#26372f]/55">/ month</span></div><div className="grid gap-4 border-t border-[#26372f]/15 pt-6 sm:grid-cols-2"><div className="space-y-3">{['Branded booking website', 'Payments + built-in POS', 'Client notes + history', 'Unlimited team calendars'].map(item => <p key={item} className="flex items-center gap-2 text-sm"><Check size={15} className="text-[#e96f59]" />{item}</p>)}</div><div className="space-y-3">{['Review management', 'Rewards + referrals', 'SMS marketing campaigns', 'Concierge onboarding'].map(item => <p key={item} className="flex items-center gap-2 text-sm"><Check size={15} className="text-[#e96f59]" />{item}</p>)}</div></div><p className="mt-7 border-t border-[#26372f]/15 pt-5 text-xs text-[#26372f]/50">No setup fees · Cancel whenever you need</p></div></Reveal>
          </div>
        </section>

        <section id="faq" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <Reveal><span className="eyebrow text-[#e96f59]">06 / Questions, answered</span><h2 className="serif mt-5 text-5xl leading-[.92] sm:text-6xl">A little more <em>clarity.</em></h2><p className="mt-6 max-w-[280px] text-sm leading-6 text-[#26372f]/60">Still curious? We&apos;re real people, and we&apos;d love to talk it through.</p><button onClick={bookDemo} className="focus-ring mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#e96f59]" data-testid="button-faq-demo">Talk to our team <ArrowRight size={16} /></button></Reveal>
            <Reveal delay={1}><div className="border-t border-[#26372f]/15">{faqs.map((faq, index) => <div key={faq.question} className="border-b border-[#26372f]/15"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="focus-ring flex w-full items-center justify-between gap-6 py-6 text-left text-base font-semibold" aria-expanded={openFaq === index} data-testid={`button-faq-${index}`}><span>{faq.question}</span><ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-[#e96f59]' : 'text-[#26372f]/45'}`} /></button><div className={`grid transition-[grid-template-rows,opacity] duration-300 ${openFaq === index ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><p className="min-h-0 overflow-hidden pr-10 text-sm leading-6 text-[#26372f]/60">{faq.answer}</p></div></div>)}</div></Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#dce6d7] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="absolute -right-20 top-[-150px] h-[400px] w-[400px] rounded-full border-[55px] border-[#f8f2e9]/50" />
          <div className="relative mx-auto flex max-w-[1100px] flex-col items-center text-center">
            <Reveal><span className="eyebrow text-[#e96f59]">The next chapter looks good on you</span><h2 className="serif mt-6 max-w-[850px] text-6xl leading-[.88] tracking-[-.03em] sm:text-8xl">A better business day is closer than you think.</h2><p className="mx-auto mt-7 max-w-[490px] text-base leading-7 text-[#26372f]/65">Your craft deserves a partner that pays attention to the details. Come see what MUSE can do for yours.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button onClick={startTrial} variant="coral" testId="button-final-trial">Start free for 14 days <ArrowRight size={16} /></Button><Button onClick={bookDemo} variant="outline" testId="button-final-demo">Book a demo <ArrowUpRight size={16} /></Button></div></Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#26372f] px-5 py-12 text-[#f8f2e9] sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-col justify-between gap-10 border-b border-[#f8f2e9]/15 pb-12 md:flex-row"><div><BrandMark inverse /><p className="mt-5 max-w-[240px] text-sm leading-6 text-[#f8f2e9]/55">The considered operating system for modern beauty businesses.</p></div><div className="grid grid-cols-2 gap-x-16 gap-y-8 text-sm sm:grid-cols-3"><div><p className="eyebrow mb-4 text-[#f8f2e9]/40">Explore</p><div className="space-y-3 text-[#f8f2e9]/70"><a href="#platform" className="block hover:text-[#f8f2e9]">Platform</a><a href="#why-muse" className="block hover:text-[#f8f2e9]">Why MUSE</a><a href="#stories" className="block hover:text-[#f8f2e9]">Stories</a></div></div><div><p className="eyebrow mb-4 text-[#f8f2e9]/40">Company</p><div className="space-y-3 text-[#f8f2e9]/70"><a href="#faq" className="block hover:text-[#f8f2e9]">About</a><a href="#faq" className="block hover:text-[#f8f2e9]">Help center</a><button onClick={bookDemo} className="block text-left hover:text-[#f8f2e9]" data-testid="button-footer-contact">Contact</button></div></div><div className="col-span-2 sm:col-span-1"><p className="eyebrow mb-4 text-[#f8f2e9]/40">Follow along</p><div className="flex gap-3"><a href="#stories" aria-label="Instagram" className="rounded-full border border-[#f8f2e9]/20 p-2 hover:border-[#f8f2e9]/60" data-testid="link-instagram"><MousePointer2 size={15} /></a><a href="#stories" aria-label="LinkedIn" className="rounded-full border border-[#f8f2e9]/20 p-2 hover:border-[#f8f2e9]/60" data-testid="link-linkedin"><Zap size={15} /></a></div></div></div></div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-[11px] text-[#f8f2e9]/40 sm:flex-row"><span>© 2025 MUSE Technologies, Inc.</span><div className="flex gap-5"><a href="#faq" className="hover:text-[#f8f2e9]">Privacy</a><a href="#faq" className="hover:text-[#f8f2e9]">Terms</a><span>Made for the detail-obsessed.</span></div></div>
        </div>
      </footer>

      <DemoModal mode={modal} onClose={() => setModal(null)} />
    </div>
  );
}

export default App;