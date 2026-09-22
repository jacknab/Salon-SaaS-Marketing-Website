import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import {
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
  Scissors,
  Search,
  Send,
  Star,
  UsersRound,
  X,
  Zap,
} from 'lucide-react';

type ModalMode = 'trial' | 'demo' | null;

type BusinessItem = {
  label: string;
  slug: string;
};

type BusinessGroup = {
  label: string;
  icon: typeof Scissors;
  items: BusinessItem[];
};

type BusinessPageContent = {
  title: string;
  description: string;
  intro: string;
  serviceLabel: string;
  features: [string, string][];
  metrics: [string, string][];
  testimonial: string;
  persona: string;
};

const topNav = [
  { label: 'Booking', href: '#booking' },
  { label: 'Payments & POS', href: '#payments' },
  { label: 'Client management', href: '#clients' },
  { label: 'Marketing', href: '#marketing' },
  { label: 'Pricing', href: '#pricing' },
];

const siteBaseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const businessRoute = (slug: string) => `${siteBaseUrl}pro/${slug}-software`;
const homeHash = (hash: string) => `${siteBaseUrl}${hash}`;
const business = (label: string, slug: string): BusinessItem => ({ label, slug });

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

const homeMetadata: PageMetadata = {
  title: 'MUSE | The business platform for salons, spas, and studios',
  description: 'MUSE brings booking, payments, client care, and growth into one calm platform for beauty, wellness, and fitness businesses.',
  path: siteBaseUrl,
};

function usePageMetadata(metadata: PageMetadata) {
  useEffect(() => {
    const previousTitle = document.title;
    const canonicalUrl = new URL(metadata.path, window.location.origin).href;
    const entries = [
      { selector: 'meta[name="description"]', attribute: 'name', value: 'description', content: metadata.description },
      { selector: 'meta[property="og:title"]', attribute: 'property', value: 'og:title', content: metadata.title },
      { selector: 'meta[property="og:description"]', attribute: 'property', value: 'og:description', content: metadata.description },
      { selector: 'meta[property="og:url"]', attribute: 'property', value: 'og:url', content: canonicalUrl },
      { selector: 'meta[name="twitter:title"]', attribute: 'name', value: 'twitter:title', content: metadata.title },
      { selector: 'meta[name="twitter:description"]', attribute: 'name', value: 'twitter:description', content: metadata.description },
    ];
    const previous = entries.map((entry) => {
      const element = document.querySelector<HTMLMetaElement>(entry.selector);
      return { ...entry, element, previousContent: element?.getAttribute('content') };
    });
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute('href');
    const canonicalElement = canonical ?? Object.assign(document.createElement('link'), { rel: 'canonical' });
    if (!canonical) document.head.appendChild(canonicalElement);

    document.title = metadata.title;
    previous.forEach((entry) => {
      const element = entry.element ?? Object.assign(document.createElement('meta'), { [entry.attribute]: entry.value });
      if (!entry.element) document.head.appendChild(element);
      element.setAttribute('content', entry.content);
    });
    canonicalElement.setAttribute('href', canonicalUrl);

    return () => {
      document.title = previousTitle;
      previous.forEach((entry) => {
        if (entry.element && entry.previousContent !== null && entry.previousContent !== undefined) {
          entry.element.setAttribute('content', entry.previousContent);
        } else if (entry.element) {
          entry.element.remove();
        }
      });
      if (canonical) {
        if (previousCanonical) canonical.setAttribute('href', previousCanonical);
        else canonical.removeAttribute('href');
      } else {
        canonicalElement.remove();
      }
    };
  }, [metadata.description, metadata.path, metadata.title]);
}

const businessGroups: BusinessGroup[] = [
  {
    label: 'Beauty',
    icon: Scissors,
    items: [
      business('Booth renter', 'booth-renter'),
      business('Salon', 'salon'),
      business('Brow & lash', 'brow-lash'),
      business('Barber', 'barber'),
      business('Nail', 'nail-salon'),
      business('Hair removal', 'hair-removal'),
      business('Makeup', 'makeup'),
      business('Tanning', 'tanning'),
      business('Tattoo', 'tattoo-shop'),
      business('Pet grooming', 'pet-grooming'),
    ],
  },
  {
    label: 'Wellness',
    icon: Heart,
    items: [
      business('Spa', 'spa'),
      business('Aesthetic clinic', 'aesthetic-clinic'),
      business('Med spa', 'med-spa'),
      business('Weight loss clinic', 'weight-loss-clinic'),
      business('Massage', 'massage'),
      business('Acupuncture', 'acupuncture'),
      business('Chiropractor', 'chiropractor'),
      business('Mental health', 'mental-health'),
      business('Nutritionist', 'nutritionist'),
      business('Coaching', 'coaching'),
      business('Physical therapy', 'physical-therapy'),
    ],
  },
  {
    label: 'Fitness',
    icon: BarChart3,
    items: [
      business('Yoga', 'yoga'),
      business('Gym', 'gym'),
      business('Personal trainer', 'personal-trainer'),
      business('Martial arts', 'martial-arts'),
      business('Pilates', 'pilates'),
      business('Barre studio', 'barre-studio'),
      business('Cross training', 'cross-training'),
      business('Cycling', 'cycling'),
      business('Dance studio', 'dance-studio'),
    ],
  },
];

const businessPageContent: Record<string, BusinessPageContent> = {
  'booth-renter': {
    title: 'Booth rental software that keeps your chair business polished.',
    description: 'Book clients, get paid, and grow your independent beauty business without adding more tabs to your day.',
    intro: 'MUSE gives booth renters a professional booking experience, simple payments, and the client history you need to make every appointment count.',
    serviceLabel: 'Independent beauty business',
    features: [['Your own booking link', 'Let clients book around your chair, not around someone else’s calendar.'], ['Simple, separate payments', 'Keep deposits, tips, and payouts easy to understand.'], ['A client book that travels with you', 'Remember formulas, preferences, and follow-ups wherever you work.']],
    metrics: [['+28%', 'repeat bookings'], ['2 hrs', 'saved each week'], ['4.9/5', 'client rating']],
    testimonial: 'MUSE makes my business feel established without making it feel complicated.',
    persona: 'Avery, independent stylist',
  },
  salon: {
    title: 'Salon software that keeps your whole team in sync.',
    description: 'Run bookings, team calendars, checkout, and client care from one calm operating system for your salon.',
    intro: 'From the front desk to the last appointment, MUSE connects the moving parts that make a busy salon feel effortless.',
    serviceLabel: 'Salon management software',
    features: [['One calendar for the whole floor', 'See availability, services, and team schedules at a glance.'], ['Checkout that keeps the line moving', 'Take deposits, tips, and payments without slowing the goodbye.'], ['Client notes your team can trust', 'Give every stylist the context to deliver a familiar experience.']],
    metrics: [['31%', 'more repeat visits'], ['10 min', 'less admin per day'], ['4.9/5', 'average rating']],
    testimonial: 'The team spends less time untangling the schedule and more time making beautiful work.',
    persona: 'Mara, salon owner',
  },
  'brow-lash': {
    title: 'Brow and lash software for a booked-out beauty business.',
    description: 'Make rebooking, deposits, reminders, and client preferences feel as precise as your craft.',
    intro: 'MUSE helps brow and lash artists protect their time, stay fully booked, and give every client a thoughtful experience.',
    serviceLabel: 'Brow & lash studio software',
    features: [['Deposits built into booking', 'Protect your schedule with clear policies from the first click.'], ['Fast rebooking', 'Make the next appointment part of the current one.'], ['Preference-led client profiles', 'Keep shapes, tints, allergies, and product notes close at hand.']],
    metrics: [['+35%', 'rebook rate'], ['92%', 'on-time arrivals'], ['4.9/5', 'client rating']],
    testimonial: 'Every detail is right where I need it, so my clients feel remembered.',
    persona: 'Jules, brow artist',
  },
  barber: {
    title: 'Barber shop software that keeps every chair moving.',
    description: 'Fill the calendar, keep the queue clear, and make checkout as quick as the perfect fade.',
    intro: 'MUSE gives barbers a sharper way to manage appointments, walk-ins, payments, and the clients who always come back.',
    serviceLabel: 'Barber shop management',
    features: [['Team calendars at a glance', 'Keep every barber’s availability easy to scan.'], ['Fast checkout and tips', 'End every service with a clean, quick payment flow.'], ['Automatic appointment reminders', 'Reduce no-shows without chasing clients yourself.']],
    metrics: [['+24%', 'repeat bookings'], ['18%', 'fewer no-shows'], ['1 tap', 'to rebook']],
    testimonial: 'The shop feels busier in the best way, with less time spent managing the busy.',
    persona: 'Dre, barbershop owner',
  },
  'nail-salon': {
    title: 'Nail salon software that keeps every set polished.',
    description: 'Turn busy days into seamless ones with booking, reminders, deposits, and checkout made for nail salons.',
    intro: 'MUSE keeps your books full and your front desk calm, from the first gel appointment to the next perfect rebook.',
    serviceLabel: 'Nail salon management',
    features: [['Services clients can book clearly', 'Make sets, add-ons, durations, and pricing easy to understand.'], ['A schedule built for back-to-back days', 'See your floor at a glance and protect the time between services.'], ['Rebooking that feels natural', 'Keep your best clients coming back before they leave the chair.']],
    metrics: [['+31%', 'repeat bookings'], ['24/7', 'online booking'], ['4.9/5', 'client rating']],
    testimonial: 'MUSE gives us the rhythm to move through a packed day without losing the personal touch.',
    persona: 'Noor, nail studio founder',
  },
  'hair-removal': {
    title: 'Hair removal software for smoother schedules and happier clients.',
    description: 'Keep treatment plans, appointment timing, and repeat visits organized in one easy-to-run place.',
    intro: 'MUSE makes it simple to guide clients through a series, protect your schedule, and stay in touch between visits.',
    serviceLabel: 'Hair removal studio software',
    features: [['Series-friendly scheduling', 'Make recurring treatment plans simple to book and manage.'], ['Clear client records', 'Keep treatment notes and preferences ready for every visit.'], ['Timely follow-up messages', 'Bring clients back at the right moment, without a spreadsheet.']],
    metrics: [['+29%', 'series completion'], ['36%', 'more rebooks'], ['2 hrs', 'saved weekly']],
    testimonial: 'Our clients know what comes next, and so does the team.',
    persona: 'Elena, studio owner',
  },
  makeup: {
    title: 'Makeup artist software for a more organized beauty business.',
    description: 'Book consultations, collect deposits, and keep every client detail ready for the big day.',
    intro: 'MUSE brings your inquiries, appointments, payments, and personal client notes into one polished workflow.',
    serviceLabel: 'Makeup artist software',
    features: [['Consultations that convert', 'Give new clients a clear path from inquiry to appointment.'], ['Deposits for important dates', 'Protect event bookings with simple, upfront payments.'], ['A portfolio-ready booking experience', 'Let your brand set the tone before you ever meet.']],
    metrics: [['+27%', 'qualified bookings'], ['96%', 'deposit collection'], ['4.9/5', 'client rating']],
    testimonial: 'I can focus on the face in front of me instead of the admin behind it.',
    persona: 'Rae, makeup artist',
  },
  tanning: {
    title: 'Tanning salon software that keeps your days glowing.',
    description: 'Manage appointments, packages, payments, and client follow-up with less daily effort.',
    intro: 'MUSE keeps your schedule full and your packages easy to manage, so clients can book their next glow in seconds.',
    serviceLabel: 'Tanning salon management',
    features: [['Packages clients understand', 'Sell sessions and memberships without adding confusion at checkout.'], ['Quick repeat booking', 'Make the next visit one simple click away.'], ['Automated reminders', 'Help clients arrive ready and keep your rooms turning.']],
    metrics: [['+33%', 'package renewals'], ['24/7', 'online booking'], ['18%', 'fewer no-shows']],
    testimonial: 'The whole studio runs more predictably, even when the day is full.',
    persona: 'Kim, tanning studio owner',
  },
  'tattoo-shop': {
    title: 'Tattoo studio software for managing artists, schedules, and deposits.',
    description: 'Organize consultations, forms, deposits, and artist calendars from one clear place built for tattoo studios.',
    intro: 'MUSE helps tattoo artists spend less time coordinating the details and more time creating work clients will carry with them.',
    serviceLabel: 'Tattoo studio management',
    features: [['Consultations with context', 'Keep ideas, references, and client notes connected to every booking.'], ['Deposits that protect your time', 'Set expectations early with a clean, professional payment flow.'], ['Artist schedules in one view', 'Make guest spots, appointments, and availability easier to manage.']],
    metrics: [['+26%', 'consultation-to-book'], ['100%', 'deposit visibility'], ['4.9/5', 'client rating']],
    testimonial: 'MUSE takes the scheduling weight off my shoulders without getting in the way of the art.',
    persona: 'Kai, tattoo artist',
  },
  'pet-grooming': {
    title: 'Pet grooming software for a business clients trust.',
    description: 'Keep pet profiles, recurring appointments, reminders, and payments organized for a smoother grooming day.',
    intro: 'MUSE helps groomers remember every coat, preference, and pickup detail while making repeat visits easy for pet parents.',
    serviceLabel: 'Pet grooming software',
    features: [['Profiles for every pet', 'Keep breed, coat, behavior, and care notes close at hand.'], ['Recurring appointments', 'Make regular grooming routines easy to maintain.'], ['Pickup-ready communication', 'Send timely updates without interrupting the work.']],
    metrics: [['+34%', 'repeat visits'], ['21%', 'fewer no-shows'], ['4.9/5', 'client rating']],
    testimonial: 'The pets get the attention they deserve, and the business finally feels manageable.',
    persona: 'Sam, grooming studio owner',
  },
  spa: {
    title: 'Spa software for a calmer way to run your day.',
    description: 'Coordinate rooms, practitioners, packages, and client care from one thoughtful spa management platform.',
    intro: 'MUSE gives your team a clear rhythm so the guest experience can stay quiet, considered, and completely yours.',
    serviceLabel: 'Spa management software',
    features: [['Rooms and resources in sync', 'See what is available before a booking becomes a scramble.'], ['Packages that feel effortless', 'Manage memberships and treatment plans in one place.'], ['Guest notes with a human touch', 'Remember preferences without making the experience feel clinical.']],
    metrics: [['+30%', 'repeat treatments'], ['14%', 'more room utilization'], ['4.9/5', 'guest rating']],
    testimonial: 'MUSE helps the back of house feel as peaceful as the front of house.',
    persona: 'Talia, spa director',
  },
  'aesthetic-clinic': {
    title: 'Aesthetic clinic software for thoughtful client journeys.',
    description: 'Keep consultations, treatment schedules, payments, and follow-up connected from first visit to next step.',
    intro: 'MUSE gives aesthetic teams the structure to deliver high-touch care without making the client journey feel complicated.',
    serviceLabel: 'Aesthetic clinic software',
    features: [['Consultations with a clear next step', 'Turn treatment conversations into confident bookings.'], ['Treatment plans that stay connected', 'Keep the client journey visible to the right team member.'], ['Follow-up that feels considered', 'Stay in touch when it is helpful, not noisy.']],
    metrics: [['+22%', 'treatment plan starts'], ['38%', 'more rebooks'], ['4.9/5', 'client rating']],
    testimonial: 'The experience feels more intentional from consultation to follow-up.',
    persona: 'Dr. Lee, clinic founder',
  },
  'med-spa': {
    title: 'Med spa software that keeps your practice polished.',
    description: 'Manage consultations, appointments, payments, and client relationships in one professional workflow.',
    intro: 'MUSE brings the operational details together so your team can deliver a high-touch experience at every step.',
    serviceLabel: 'Med spa management',
    features: [['A schedule your team can trust', 'Coordinate providers, services, and room availability in one view.'], ['Deposits and checkout built in', 'Keep payment conversations simple and secure.'], ['Client history at the point of care', 'Give your team the context to make every visit feel personal.']],
    metrics: [['+28%', 'repeat treatments'], ['17%', 'less admin time'], ['4.9/5', 'client rating']],
    testimonial: 'MUSE gives us the polish our clients expect and the clarity our team needs.',
    persona: 'Morgan, med spa owner',
  },
  'weight-loss-clinic': {
    title: 'Weight loss clinic software for consistent client support.',
    description: 'Organize appointments, plans, payments, and check-ins so every client has a clear next step.',
    intro: 'MUSE helps your team make progress easier to schedule, track, and support without adding more admin to the journey.',
    serviceLabel: 'Weight loss clinic software',
    features: [['Plans with momentum', 'Keep recurring visits and milestones easy to manage.'], ['Private, organized client records', 'Bring the right context into every check-in.'], ['Support between appointments', 'Use thoughtful reminders to keep clients moving forward.']],
    metrics: [['+32%', 'plan adherence'], ['26%', 'more follow-ups'], ['4.9/5', 'client rating']],
    testimonial: 'Clients know what is next, and our team has the space to support them well.',
    persona: 'Taylor, clinic founder',
  },
  massage: {
    title: 'Massage therapy software for a more restorative business day.',
    description: 'Book sessions, manage rooms, take payments, and bring clients back with a calmer workflow.',
    intro: 'MUSE keeps your schedule grounded and your client care consistent, so you can stay present for the work.',
    serviceLabel: 'Massage therapy software',
    features: [['A schedule that breathes', 'Build in the right time between sessions and keep your day realistic.'], ['Easy repeat appointments', 'Make regular care simple for clients to maintain.'], ['Notes that stay useful', 'Remember pressure, focus areas, and preferences for next time.']],
    metrics: [['+36%', 'repeat sessions'], ['12%', 'fewer gaps'], ['4.9/5', 'client rating']],
    testimonial: 'It gives me a calmer day and gives my clients a reason to keep coming back.',
    persona: 'Jo, massage therapist',
  },
  acupuncture: {
    title: 'Acupuncture software for care that carries forward.',
    description: 'Keep treatment schedules, client notes, reminders, and payments in one focused practice platform.',
    intro: 'MUSE helps practitioners stay organized around the full care journey, not just the appointment on the calendar.',
    serviceLabel: 'Acupuncture practice software',
    features: [['Care plans made visible', 'Keep recurring treatments and next steps easy to follow.'], ['Focused client notes', 'Bring history and preferences into each visit.'], ['Gentle rebooking prompts', 'Support consistency without making care feel transactional.']],
    metrics: [['+29%', 'return visits'], ['94%', 'on-time reminders'], ['4.9/5', 'client rating']],
    testimonial: 'MUSE lets the business support the care instead of competing with it.',
    persona: 'Mina, acupuncturist',
  },
  chiropractor: {
    title: 'Chiropractic software for a practice that moves smoothly.',
    description: 'Coordinate appointments, care plans, payments, and patient communication in one clear system.',
    intro: 'MUSE helps chiropractic teams keep the front desk moving and the patient experience feeling personal.',
    serviceLabel: 'Chiropractic practice software',
    features: [['Scheduling without the shuffle', 'Keep providers, rooms, and recurring visits coordinated.'], ['Plans patients can follow', 'Make the next appointment easy to understand and book.'], ['A history your team can use', 'Keep notes and preferences available when they matter.']],
    metrics: [['+27%', 'care plan completion'], ['16%', 'less admin time'], ['4.9/5', 'patient rating']],
    testimonial: 'Our practice feels more organized, but never less personal.',
    persona: 'Chris, practice owner',
  },
  'mental-health': {
    title: 'Mental health practice software for more room to care.',
    description: 'Manage schedules, reminders, payments, and client communication with a thoughtful, low-friction workflow.',
    intro: 'MUSE handles the operational rhythm so practitioners can protect their focus and make each client interaction count.',
    serviceLabel: 'Mental health practice software',
    features: [['A schedule with clear boundaries', 'Make availability and recurring sessions easy to manage.'], ['Quiet, reliable reminders', 'Reduce missed sessions without adding pressure.'], ['Simple payment workflows', 'Keep billing clear and your attention where it belongs.']],
    metrics: [['+25%', 'session continuity'], ['19%', 'fewer no-shows'], ['4.9/5', 'client rating']],
    testimonial: 'The system stays in the background, which is exactly where it belongs.',
    persona: 'Nia, therapist',
  },
  nutritionist: {
    title: 'Nutritionist software for guidance that keeps going.',
    description: 'Organize consultations, follow-ups, payments, and client plans in one supportive practice platform.',
    intro: 'MUSE makes it easier to keep clients engaged between sessions and keep your business moving with them.',
    serviceLabel: 'Nutrition practice software',
    features: [['Follow-ups that stay on track', 'Make recurring check-ins simple to schedule.'], ['Client context in one place', 'Keep goals, preferences, and notes close for every session.'], ['A booking flow that educates', 'Help new clients understand the right first step.']],
    metrics: [['+31%', 'follow-up visits'], ['22%', 'more plan renewals'], ['4.9/5', 'client rating']],
    testimonial: 'I have more structure around the journey and more space for the person in front of me.',
    persona: 'Alex, nutritionist',
  },
  coaching: {
    title: 'Coaching software for a practice built around momentum.',
    description: 'Book sessions, manage packages, and keep clients moving forward with a clear coaching workflow.',
    intro: 'MUSE gives coaches a professional home base for the conversations, commitments, and next steps that create progress.',
    serviceLabel: 'Coaching practice software',
    features: [['Packages with a clear path', 'Let clients understand and book the journey ahead.'], ['Sessions that stay personal', 'Keep goals and context ready for every conversation.'], ['Follow-up without the chase', 'Send the right nudge at the right time.']],
    metrics: [['+34%', 'package renewals'], ['28%', 'more referrals'], ['4.9/5', 'client rating']],
    testimonial: 'MUSE helps the business create momentum without making the work feel less human.',
    persona: 'Cameron, coach',
  },
  'physical-therapy': {
    title: 'Physical therapy software for care plans that move forward.',
    description: 'Coordinate sessions, plans, payments, and patient communication in one focused practice platform.',
    intro: 'MUSE helps physical therapy teams keep every next step visible and every patient interaction prepared.',
    serviceLabel: 'Physical therapy practice software',
    features: [['Recurring care, made clear', 'Keep treatment schedules easy for patients and providers to follow.'], ['Useful patient context', 'Bring goals and progress notes into each appointment.'], ['A front desk that stays ahead', 'Reduce gaps with reminders and easy rebooking.']],
    metrics: [['+30%', 'plan completion'], ['15%', 'fewer schedule gaps'], ['4.9/5', 'patient rating']],
    testimonial: 'The operational side finally supports the progress we are trying to create.',
    persona: 'Reese, practice director',
  },
  yoga: {
    title: 'Yoga studio software for a practice that feels welcoming.',
    description: 'Manage classes, memberships, payments, and community communication from one grounded platform.',
    intro: 'MUSE helps yoga studios create a clear path from first class to lasting practice.',
    serviceLabel: 'Yoga studio management',
    features: [['Class schedules that are easy to join', 'Make availability, teachers, and spaces clear at a glance.'], ['Memberships without the maze', 'Give clients simple ways to keep showing up.'], ['Community-minded messaging', 'Reach your members with notes that feel like you.']],
    metrics: [['+38%', 'class retention'], ['24/7', 'online booking'], ['4.9/5', 'member rating']],
    testimonial: 'MUSE lets the studio feel as considered online as it does in the room.',
    persona: 'Priya, studio owner',
  },
  gym: {
    title: 'Gym software for a stronger member experience.',
    description: 'Bring memberships, classes, payments, and member communication together in one place.',
    intro: 'MUSE keeps the business side organized so your team can focus on helping members show up and get stronger.',
    serviceLabel: 'Gym management software',
    features: [['Memberships made simple', 'Keep plans, renewals, and member details easy to manage.'], ['Classes and trainers in sync', 'Give members a clear view of how to book their time.'], ['Retention you can act on', 'Reach out before a quiet member becomes a former one.']],
    metrics: [['+26%', 'member retention'], ['19%', 'more renewals'], ['4.8/5', 'member rating']],
    testimonial: 'We spend less time chasing details and more time coaching the people who trust us.',
    persona: 'Devon, gym owner',
  },
  'personal-trainer': {
    title: 'Personal trainer software for a business with momentum.',
    description: 'Schedule sessions, sell packages, take payments, and keep every client moving forward.',
    intro: 'MUSE gives independent trainers a professional system for the work behind the workout.',
    serviceLabel: 'Personal trainer software',
    features: [['Packages clients can understand', 'Make sessions, plans, and renewals easy to book.'], ['A calendar built around your time', 'Protect your availability while keeping clients moving.'], ['Progress-ready client profiles', 'Keep goals and preferences close for every session.']],
    metrics: [['+32%', 'package renewals'], ['21%', 'more referrals'], ['4.9/5', 'client rating']],
    testimonial: 'It makes the business feel as strong and consistent as the training.',
    persona: 'Jordan, personal trainer',
  },
  'martial-arts': {
    title: 'Martial arts software for a stronger school community.',
    description: 'Manage classes, memberships, payments, and family communication from one focused platform.',
    intro: 'MUSE helps martial arts schools keep students engaged, schedules clear, and the community connected.',
    serviceLabel: 'Martial arts school software',
    features: [['Class schedules by level', 'Make it easy for students and families to find the right room.'], ['Memberships and payments together', 'Keep recurring plans and checkout in one place.'], ['Communication that builds community', 'Share updates without adding another admin task.']],
    metrics: [['+29%', 'member retention'], ['23%', 'more renewals'], ['4.9/5', 'family rating']],
    testimonial: 'The school feels more connected because the details are no longer scattered.',
    persona: 'Malik, school owner',
  },
  pilates: {
    title: 'Pilates studio software for a more considered schedule.',
    description: 'Manage classes, packages, instructors, and member communication with a calmer studio workflow.',
    intro: 'MUSE helps Pilates studios make every class easy to discover, book, and return to.',
    serviceLabel: 'Pilates studio management',
    features: [['Classes with clarity', 'Show instructors, formats, and availability without friction.'], ['Packages that encourage practice', 'Make it simple for members to keep their routine.'], ['A schedule that protects capacity', 'Fill the room while keeping the experience considered.']],
    metrics: [['+35%', 'class retention'], ['18%', 'better capacity'], ['4.9/5', 'member rating']],
    testimonial: 'The calendar feels intentional now, which changes the whole studio day.',
    persona: 'Lena, Pilates founder',
  },
  'barre-studio': {
    title: 'Barre studio software for a community that keeps showing up.',
    description: 'Fill classes, manage memberships, and keep your members connected with less daily admin.',
    intro: 'MUSE gives barre studios a beautiful, practical way to turn first classes into lasting routines.',
    serviceLabel: 'Barre studio management',
    features: [['A class calendar that converts', 'Make the right class easy to find and book.'], ['Memberships without busywork', 'Keep plans and renewals clear for your team.'], ['Personal member touchpoints', 'Reach out with reminders and notes that feel genuine.']],
    metrics: [['+37%', 'class retention'], ['20%', 'more renewals'], ['4.9/5', 'member rating']],
    testimonial: 'MUSE helps us keep the energy of the studio going between classes.',
    persona: 'Sloane, barre owner',
  },
  'cross-training': {
    title: 'Cross training software for a gym that moves fast.',
    description: 'Keep classes, coaches, memberships, and payments coordinated when every day is in motion.',
    intro: 'MUSE gives high-energy training businesses the structure to move quickly without losing the details.',
    serviceLabel: 'Cross training gym software',
    features: [['Capacity-aware class booking', 'Keep sessions clear, balanced, and easy to join.'], ['Coach schedules in one view', 'Coordinate the people who keep the floor moving.'], ['Member momentum tools', 'Make renewals and return visits easier to support.']],
    metrics: [['+30%', 'class retention'], ['17%', 'more renewals'], ['4.8/5', 'member rating']],
    testimonial: 'The software keeps up with the pace of the gym, not the other way around.',
    persona: 'Casey, training gym owner',
  },
  cycling: {
    title: 'Cycling studio software for a ride people return to.',
    description: 'Manage classes, bikes, memberships, and member communication in one high-energy platform.',
    intro: 'MUSE helps cycling studios fill the room, keep the rhythm, and turn first rides into a routine.',
    serviceLabel: 'Cycling studio management',
    features: [['Class and bike visibility', 'Make every seat easy to understand and book.'], ['Memberships that keep pace', 'Give riders a clear reason to keep coming back.'], ['Messages with the right energy', 'Keep your community informed without adding noise.']],
    metrics: [['+41%', 'repeat rides'], ['22%', 'more renewals'], ['4.9/5', 'rider rating']],
    testimonial: 'The operations feel smoother, so the studio energy stays where it belongs.',
    persona: 'Max, cycling studio founder',
  },
  'dance-studio': {
    title: 'Dance studio software for every class, family, and milestone.',
    description: 'Manage classes, registrations, payments, and communication for a studio built around movement.',
    intro: 'MUSE helps dance studios keep schedules, families, and growing communities moving together.',
    serviceLabel: 'Dance studio management',
    features: [['Classes families can navigate', 'Make levels, teachers, and schedules clear from the start.'], ['Registrations and payments together', 'Keep enrollment season organized in one place.'], ['Communication that keeps people close', 'Share the details that make a studio feel like a community.']],
    metrics: [['+33%', 'class retention'], ['24/7', 'online registration'], ['4.9/5', 'family rating']],
    testimonial: 'MUSE gives us more time to teach and more confidence in the details.',
    persona: 'June, dance studio owner',
  },
};

const faqs = [
  ['Is MUSE built for independent professionals or full teams?', 'Both. Start as a one-chair studio and invite your first teammate when the time is right. MUSE keeps permissions, calendars, payouts, and client records clear as your business grows.'],
  ['Can I bring my existing clients and calendar?', 'Absolutely. Our concierge onboarding team helps you import your client list, services, and availability so you can open your doors without starting from scratch.'],
  ['How do MUSE payments work?', 'MUSE uses Stripe for secure card processing and connects it directly to your booking and POS flows. You can take deposits, collect tips, and see payouts without switching tabs.'],
  ['What happens after the free trial?', 'You choose the plan that matches your rhythm. There are no surprise setup fees, and our team will reach out before your trial ends so you have time to make a confident decision.'],
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, className: visible ? 'reveal is-visible' : 'reveal' };
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const state = useReveal();
  return <div ref={state.ref} className={`${state.className} delay-${delay} ${className}`}>{children}</div>;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href={siteBaseUrl} className={`focus-ring inline-flex items-center gap-2.5 ${light ? 'text-[#fff8f4]' : 'text-[#292328]'}`} data-testid="link-logo">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current"><Scissors size={15} strokeWidth={2} /></span>
      <span className="text-[1.2rem] font-bold tracking-[.2em]">MUSE</span>
    </a>
  );
}

function CTA({ children, onClick, variant = 'dark', testId, className = '', type = 'button' }: { children: ReactNode; onClick?: () => void; variant?: 'dark' | 'light' | 'coral' | 'outline'; testId: string; className?: string; type?: 'button' | 'submit' }) {
  const styles = {
    dark: 'bg-[#292328] text-white hover:bg-[#44343d]',
    light: 'bg-white text-[#292328] hover:bg-[#fff4ef]',
    coral: 'bg-[#ed5a52] text-white hover:bg-[#db494b]',
    outline: 'border border-current text-[#292328] hover:bg-[#292328] hover:text-white',
  };
  return <button type={type} onClick={onClick} className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${styles[variant]} ${className}`} data-testid={testId}>{children}</button>;
}

function ConversionModal({ mode, onClose }: { mode: ModalMode; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const successTitleRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mode) {
      setSent(false);
      setEmail('');
      setEmailError('');
      return;
    }

    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusDialog = () => closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const frame = window.requestAnimationFrame(focusDialog);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      const opener = openerRef.current;
      if (opener?.isConnected) window.requestAnimationFrame(() => opener.focus());
      openerRef.current = null;
    };
  }, [mode]);

  useEffect(() => {
    if (!mode || !sent) return;
    const frame = window.requestAnimationFrame(() => successTitleRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [mode, sent]);

  if (!mode) return null;
  const demo = mode === 'demo';
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Enter your work email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError('Enter a valid email address, such as you@yourstudio.com.');
      return;
    }
    setEmailError('');
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain bg-[#292328]/65 p-4 backdrop-blur-sm" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} data-testid="modal-conversion">
      <div ref={dialogRef} className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-[#fffaf7] p-7 shadow-2xl sm:p-10" role="dialog" aria-modal="true" aria-labelledby="conversion-dialog-title" aria-describedby="conversion-dialog-description" tabIndex={-1}>
        <button ref={closeRef} type="button" onClick={onClose} className="focus-ring absolute right-5 top-5 rounded-full p-2 text-[#292328]/50 hover:bg-[#292328]/10" aria-label="Close dialog" data-testid="button-close-modal"><X size={19} /></button>
        {sent ? (
          <div className="py-5 text-center" role="status" aria-live="polite"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dbe8dc] text-[#3b754b]"><CircleCheck size={28} aria-hidden="true" /></div><h2 ref={successTitleRef} tabIndex={-1} id="conversion-dialog-title" className="serif mt-6 text-4xl">{demo ? 'We’ll be in touch.' : 'You’re on your way.'}</h2><p id="conversion-dialog-description" className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#292328]/65">{demo ? 'A MUSE guide will send a few times to your inbox shortly.' : 'Check your inbox for a welcome note and your first step toward a calmer studio.'}</p><CTA onClick={onClose} testId="button-close-success" className="mt-7">Back to MUSE</CTA></div>
        ) : (
          <><span className="eyebrow text-[#ed5a52]">{demo ? 'A closer look' : '14 days on us'}</span><h2 id="conversion-dialog-title" className="serif mt-4 max-w-sm text-4xl leading-[.93]">{demo ? 'Let’s make space for what matters.' : 'Your best business day starts here.'}</h2><p id="conversion-dialog-description" className="mt-4 text-sm leading-6 text-[#292328]/65">{demo ? 'Tell us where you are in your studio journey and a MUSE guide will walk you through the details.' : 'No card. No awkward setup. Just two generous weeks to see how MUSE feels in your hands.'}</p><form onSubmit={handleSubmit} noValidate className="mt-7" aria-live="polite"><label htmlFor="modal-email" className="eyebrow text-[#292328]/50">Work email</label><input id="modal-email" required type="email" value={email} onChange={(event) => { setEmail(event.target.value); if (emailError) setEmailError(''); }} aria-invalid={emailError ? 'true' : 'false'} aria-describedby={emailError ? 'modal-email-error' : 'modal-email-help'} placeholder="you@yourstudio.com" className="focus-ring mt-2 w-full rounded-xl border border-[#292328]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#ed5a52]" data-testid="input-modal-email" />{emailError ? <p id="modal-email-error" className="mt-2 text-xs font-semibold text-[#b23b3b]" role="alert">{emailError}</p> : <p id="modal-email-help" className="sr-only">Enter a work email address to continue.</p>}<CTA type="submit" variant="coral" testId="button-submit-modal" className="mt-3 w-full">{demo ? 'Request my demo' : 'Start my free trial'} <ArrowRight size={16} /></CTA></form><p className="mt-4 text-center text-[11px] text-[#292328]/45">No credit card required.</p></>
        )}
      </div>
    </div>
  );
}

function HeroProductPanel() {
  return (
    <div className="hero-panel absolute bottom-[-7%] left-[-9%] z-10 w-[72%] max-w-[390px] rounded-2xl bg-white p-4 text-[#292328] shadow-[0_24px_60px_rgba(54,18,39,.35)] sm:bottom-[-9%] sm:left-[-5%] sm:p-5">
      <div className="flex items-center justify-between border-b border-[#292328]/10 pb-3"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#ed5a52]" /><span className="font-mono text-[9px] font-bold tracking-[.12em]">MUSE / BOOKING</span></div><span className="text-[10px] text-[#292328]/45">Tue, Oct 08</span></div>
      <div className="mt-4 flex items-center justify-between"><div><p className="text-[10px] text-[#292328]/50">Tuesday schedule</p><p className="mt-1 text-lg font-bold">10 appointments</p></div><CalendarDays size={19} className="text-[#ed5a52]" /></div>
      <div className="mt-4 space-y-2.5">{['09:30  Margot · Gloss + cut', '11:00  Lila · Signature colour', '14:15  Hana · Scalp ritual'].map((item, index) => <div key={item} className="flex items-center gap-2 rounded-lg bg-[#f7f0ef] px-2.5 py-2"><span className={`h-1.5 w-1.5 rounded-full ${index === 1 ? 'bg-[#ed5a52]' : 'bg-[#98b18c]'}`} /><span className="text-[10px]">{item}</span></div>)}</div>
    </div>
  );
}

function BusinessTypesMenu({ mobile = false, onSelect }: { mobile?: boolean; onSelect: () => void }) {
  return (
    <div className={`mega-menu ${mobile ? 'mega-menu-mobile' : ''}`} data-testid="menu-business-types">
      <div className="mega-menu-inner">
        {businessGroups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <section key={group.label} className="mega-menu-group">
              <div className="mega-menu-heading">
                <span className="mega-menu-heading-icon"><GroupIcon size={13} /></span>
                <span>{group.label}</span>
                <span className="mega-menu-heading-line" />
              </div>
              <div className="mega-menu-list">
                {group.items.map((item) => (
                  <a
                    href={businessRoute(item.slug)}
                    key={item.slug}
                    onClick={onSelect}
                    className="mega-menu-item focus-ring"
                    data-testid={`link-business-${item.slug}`}
                  >
                    <span className="mega-menu-item-icon">{item.label.slice(0, 1)}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function SiteHeader({ onTrial, onDemo }: { onTrial: () => void; onDemo: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [businessMenuOpen, setBusinessMenuOpen] = useState(false);
  const businessMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!businessMenuOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!businessMenuRef.current?.contains(event.target as Node)) setBusinessMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setBusinessMenuOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [businessMenuOpen]);

  const closeMenus = () => {
    setBusinessMenuOpen(false);
    setMenuOpen(false);
  };

  return (
    <header ref={businessMenuRef} className="relative z-30 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between border-b border-[#292328]/10 px-5 py-4 sm:px-8 lg:px-10">
        <Logo />
        <div className="hidden items-center gap-5 text-xs font-semibold md:flex">
          <a href={homeHash('#stories')} className="focus-ring text-[#292328]/60 hover:text-[#292328]" data-testid="link-header-stories">Customer stories</a>
          <a href={homeHash('#faq')} className="focus-ring text-[#292328]/60 hover:text-[#292328]" data-testid="link-header-faq">FAQs</a>
          <button onClick={onDemo} className="focus-ring text-[#292328]/75 hover:text-[#ed5a52]" data-testid="button-header-demo">Book a demo</button>
          <CTA onClick={onTrial} variant="coral" testId="button-header-trial" className="px-4 py-2.5 text-xs">Start free trial</CTA>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus-ring rounded-full border border-[#292328]/15 p-2 md:hidden" aria-label="Toggle menu" data-testid="button-mobile-menu">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      <div className="mx-auto hidden max-w-[1440px] items-center justify-between px-5 py-3 sm:px-8 lg:flex lg:px-10">
        <nav className="flex items-center gap-7" aria-label="Product navigation">
          <button
            onClick={() => setBusinessMenuOpen(!businessMenuOpen)}
            className={`focus-ring inline-flex items-center gap-1 text-[11px] font-semibold transition ${businessMenuOpen ? 'text-[#ed5a52]' : 'text-[#292328]/65 hover:text-[#ed5a52]'}`}
            aria-expanded={businessMenuOpen}
            aria-haspopup="true"
            data-testid="button-business-types"
          >
            Business types <ChevronDown size={13} className={`transition-transform ${businessMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          {topNav.map((item) => <a href={homeHash(item.href)} className="focus-ring text-[11px] font-semibold text-[#292328]/65 transition hover:text-[#ed5a52]" key={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</a>)}
        </nav>
        <div className="flex items-center gap-2 text-[11px] text-[#292328]/45"><span>For beauty businesses</span><Search size={14} /></div>
      </div>
      {businessMenuOpen && <BusinessTypesMenu onSelect={() => setBusinessMenuOpen(false)} />}
      {menuOpen && <div className="border-t border-[#292328]/10 bg-white px-5 py-4 md:hidden" data-testid="menu-mobile">
        <nav className="flex flex-col">
          <button onClick={() => setBusinessMenuOpen(!businessMenuOpen)} className="flex items-center justify-between border-b border-[#292328]/10 py-3 text-left text-sm font-semibold" aria-expanded={businessMenuOpen} data-testid="button-mobile-business-types">Business types <ChevronDown size={16} className={`transition-transform ${businessMenuOpen ? 'rotate-180 text-[#ed5a52]' : ''}`} /></button>
          {businessMenuOpen && <BusinessTypesMenu mobile onSelect={closeMenus} />}
          {topNav.map((item) => <a href={homeHash(item.href)} onClick={closeMenus} key={item.href} className="border-b border-[#292328]/10 py-3 text-sm font-semibold" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</a>)}
        </nav>
        <div className="grid grid-cols-2 gap-2 pt-4">
          <button onClick={() => { closeMenus(); onDemo(); }} className="rounded-full border border-[#292328]/20 px-3 py-3 text-xs font-bold" data-testid="button-mobile-demo">Book a demo</button>
          <button onClick={() => { closeMenus(); onTrial(); }} className="rounded-full bg-[#ed5a52] px-3 py-3 text-xs font-bold text-white" data-testid="button-mobile-trial">Start free trial</button>
        </div>
      </div>}
    </header>
  );
}

function BusinessTypePage({ businessItem, group }: { businessItem: BusinessItem; group: BusinessGroup }) {
  const [modal, setModal] = useState<ModalMode>(null);
  const content = businessPageContent[businessItem.slug];
  const related = group.items.filter((item) => item.slug !== businessItem.slug).slice(0, 4);
  usePageMetadata({
    title: `${businessItem.label} software | MUSE`,
    description: content.description,
    path: businessRoute(businessItem.slug),
  });

  const trial = () => setModal('trial');
  const demo = () => setModal('demo');

  return (
    <div className={`business-page min-h-[100dvh] overflow-x-hidden bg-[#fffaf7] text-[#292328] ${businessItem.slug === 'barber' ? 'business-page-barber' : ''}`} data-business-type={businessItem.slug}>
      <div className="promo-bar flex min-h-9 items-center justify-center gap-3 bg-[#292328] px-4 py-2 text-center text-[11px] font-semibold text-white sm:text-xs"><span className="hidden text-white/45 sm:inline line-through">$49</span><span>$39/month for your first 3 months</span><span className="hidden text-white/60 sm:inline">·</span><span className="hidden text-white/60 sm:inline">We’ll make the switch easy.</span><button onClick={trial} className="focus-ring rounded-full bg-[#ed5a52] px-3 py-1 text-[10px] font-bold hover:bg-[#f37969]" data-testid="button-promo-trial">Try for free <ArrowRight className="ml-1 inline" size={11} /></button></div>
      <SiteHeader onTrial={trial} onDemo={demo} />

      <main>
        <section className="business-page-hero relative overflow-hidden px-5 pb-20 pt-20 text-white sm:px-8 sm:pb-28 sm:pt-24 lg:px-10">
          <div className="hero-orb hero-orb-one" />
          <div className="relative mx-auto max-w-[1030px]">
            <Reveal>
              <div className="text-center">
                <span className="eyebrow text-white/70">{content.serviceLabel}</span>
                <h1 className="serif mx-auto mt-5 max-w-[920px] text-[3.4rem] leading-[.88] tracking-[-.035em] sm:text-[5.4rem] lg:text-[6.7rem]">{content.title}</h1>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <CTA onClick={trial} variant="dark" testId="button-business-trial">Start free trial <ArrowRight size={16} /></CTA>
                  <button onClick={demo} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#292328]" data-testid="button-business-demo">Book a demo <ArrowUpRight size={16} /></button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="business-image-trio mt-14 grid gap-4 sm:grid-cols-3">
                <img src="/muse-hero.jpg" alt={`${businessItem.label} business owner using MUSE`} className="h-[250px] w-full object-cover sm:h-[380px]" />
                <img src="/muse-service.jpg" alt={`${businessItem.label} client experience`} className="h-[250px] w-full object-cover sm:h-[380px]" />
                <img src="/muse-pos.jpg" alt={`${businessItem.label} payment experience`} className="h-[250px] w-full object-cover sm:h-[380px]" />
              </div>
              <p className="mx-auto mt-7 max-w-[700px] text-center text-base leading-7 text-white/80 sm:text-lg">{content.description}</p>
            </Reveal>
          </div>
        </section>

        <section className="business-overview-section px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <Reveal>
              <span className="eyebrow text-[#ed5a52]">Built around your work</span>
              <h2 className="serif mt-5 text-5xl leading-[.9] sm:text-6xl">More focus for the work that makes your <em className="text-[#ed5a52]">business different.</em></h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="max-w-[580px] text-base leading-7 text-[#292328]/65">{content.intro}</p>
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[#292328]/15 pt-5">{content.metrics.map(([value, label]) => <div key={label}><p className="font-mono text-2xl font-bold tracking-[-.08em] text-[#ed5a52] sm:text-3xl">{value}</p><p className="mt-2 max-w-[90px] text-[11px] leading-4 text-[#292328]/55">{label}</p></div>)}</div>
            </Reveal>
          </div>
        </section>

        <section className="business-difference-section bg-[#f2e8e6] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-[1100px]">
            <Reveal><span className="eyebrow text-[#ed5a52]">The MUSE difference</span><h2 className="serif mt-5 max-w-[700px] text-5xl leading-[.9] sm:text-6xl">The details are easier when everything is <em>in one place.</em></h2></Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-3">{content.features.map(([title, copy], index) => <Reveal key={title} delay={index + 1}><article className="min-h-[255px] border border-[#292328]/15 bg-[#fffaf7] p-6"><span className="font-mono text-3xl text-[#ed5a52]">0{index + 1}</span><h3 className="mt-12 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#292328]/60">{copy}</p></article></Reveal>)}</div>
          </div>
        </section>

        <section className="business-client-section bg-[#292328] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <Reveal><div className="client-ui max-w-[600px] bg-[#4a3943] p-6 sm:p-8"><div className="flex items-center justify-between border-b border-white/15 pb-4"><span className="eyebrow text-white/50">{businessItem.label} / client experience</span><Heart size={18} className="text-[#f4c9bd]" /></div><div className="mt-6 flex items-center gap-3 border-b border-white/10 pb-5"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9bcae] text-xs font-bold text-[#292328]">LM</div><div><p className="text-sm font-bold">Lila Morgan</p><p className="text-xs text-white/50">Next visit · Thursday at 2:15</p></div><span className="ml-auto rounded-full bg-[#9bb895] px-2 py-1 text-[9px] font-bold text-[#292328]">Returning</span></div><div className="mt-5 grid grid-cols-3 gap-2 text-center"><div className="bg-white/5 p-3"><p className="font-mono text-xl text-[#f4c9bd]">14</p><p className="mt-1 text-[9px] text-white/45">visits</p></div><div className="bg-white/5 p-3"><p className="font-mono text-xl text-[#f4c9bd]">$1.8k</p><p className="mt-1 text-[9px] text-white/45">lifetime value</p></div><div className="bg-white/5 p-3"><p className="font-mono text-xl text-[#f4c9bd]">4.9</p><p className="mt-1 text-[9px] text-white/45">review score</p></div></div></div></Reveal>
            <Reveal delay={1}><span className="eyebrow text-[#f4c9bd]">Made for the people who come back</span><blockquote className="serif mt-5 max-w-[520px] text-4xl leading-[.95] sm:text-5xl">“{content.testimonial}”</blockquote><p className="mt-7 text-sm text-white/55">{content.persona}</p></Reveal>
          </div>
        </section>

        <section className="business-related-section px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-[1100px]">
            <Reveal><div className="flex flex-col justify-between gap-5 border-b border-[#292328]/15 pb-8 sm:flex-row sm:items-end"><div><span className="eyebrow text-[#ed5a52]">You might also like</span><h2 className="serif mt-5 text-5xl leading-[.9] sm:text-6xl">More ways to make work <em>feel lighter.</em></h2></div><a href={homeHash('#pricing')} className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-[#ed5a52]">See pricing <ArrowRight size={16} /></a></div></Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{related.map((item, index) => <Reveal key={item.slug} delay={index + 1}><a href={businessRoute(item.slug)} className="focus-ring group flex items-center justify-between border border-[#292328]/15 p-4 transition hover:-translate-y-1 hover:border-[#ed5a52]" data-testid={`link-related-${item.slug}`}><span><span className="eyebrow block text-[#ed5a52]">{group.label}</span><span className="mt-2 block text-sm font-bold">{item.label}</span></span><ArrowUpRight size={16} className="text-[#292328]/40 transition group-hover:text-[#ed5a52]" /></a></Reveal>)}</div>
          </div>
        </section>

        <section className="business-closing-section closing-gradient relative overflow-hidden px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-10"><div className="closing-ring" /><div className="relative mx-auto max-w-[900px] text-center"><Reveal><span className="eyebrow text-white/70">A clearer way to grow</span><h2 className="serif mt-5 text-6xl leading-[.86] tracking-[-.03em] sm:text-8xl">Run a {businessItem.label.toLowerCase()} business that feels as good as it looks.</h2><p className="mx-auto mt-7 max-w-[470px] text-sm leading-6 text-white/75">Start with the tools that make your best work easier to book, sell, and remember.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><CTA onClick={trial} variant="light" testId="button-business-final-trial">Start free trial <ArrowRight size={16} /></CTA><button onClick={demo} className="focus-ring rounded-full border border-white/45 px-5 py-3 text-sm font-bold hover:bg-white hover:text-[#292328]" data-testid="button-business-final-demo">Book a demo</button></div></Reveal></div></section>
      </main>

      <footer className="business-footer bg-[#292328] px-5 py-12 text-white sm:px-8 lg:px-10"><div className="mx-auto max-w-[1100px]"><div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-8 md:flex-row"><div><Logo light /><p className="mt-5 max-w-[240px] text-sm leading-6 text-white/55">The complete business platform for ambitious beauty, wellness, and fitness professionals.</p></div><div className="grid grid-cols-2 gap-x-14 gap-y-5 text-sm text-white/65"><a href={homeHash('#overview')} className="hover:text-white">Product overview</a><a href={homeHash('#pricing')} className="hover:text-white">Pricing</a><a href={businessRoute('salon')} className="hover:text-white">Salon software</a><button onClick={demo} className="text-left hover:text-white" data-testid="button-business-footer-contact">Contact</button></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[11px] text-white/35 sm:flex-row"><span>© 2025 MUSE Technologies, Inc.</span><span>Made for the detail-obsessed.</span></div></div></footer>
      <ConversionModal mode={modal} onClose={() => setModal(null)} />
    </div>
  );
}

function LandingLogo() {
  return <a href={siteBaseUrl} className="focus-ring inline-flex items-center gap-2.5" data-testid="link-landing-logo"><span className="landing-mark"><Scissors size={14} /></span><span className="landing-wordmark">MUSE</span></a>;
}

function LandingHeader({ onTrial, onDemo }: { onTrial: () => void; onDemo: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['#overview', 'Platform'], ['#booking', 'Solutions'], ['#pricing', 'Pricing'], ['#faq', 'Resources']];
  return <header className="landing-header sticky top-0 z-30">
    <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-3.5 sm:px-8">
      <LandingLogo />
      <nav className="hidden items-center gap-7 text-xs font-bold md:flex" aria-label="Main navigation">{links.map(([href, label]) => <a href={href} className="landing-link focus-ring" key={href} data-testid={`link-landing-${label.toLowerCase()}`}>{label}</a>)}<button onClick={onDemo} className="landing-link focus-ring" data-testid="button-landing-demo">Book a demo</button><button onClick={onTrial} className="landing-button landing-button-ink px-4 py-2.5" data-testid="button-landing-trial">Start free trial</button></nav>
      <button onClick={() => setMenuOpen(!menuOpen)} className="focus-ring rounded-full border border-[#171422]/20 p-2 md:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen} data-testid="button-landing-menu">{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
    </div>
    {menuOpen && <div className="landing-menu px-5 pb-5 md:hidden" data-testid="menu-landing-mobile"><nav className="flex flex-col">{links.map(([href, label]) => <a href={href} onClick={() => setMenuOpen(false)} className="landing-link border-b border-[#171422]/10 py-3 text-sm font-bold" key={href} data-testid={`link-mobile-landing-${label.toLowerCase()}`}>{label}</a>)}</nav><div className="grid grid-cols-2 gap-2 pt-4"><button onClick={() => { setMenuOpen(false); onDemo(); }} className="landing-button landing-button-outline" data-testid="button-mobile-landing-demo">Book a demo</button><button onClick={() => { setMenuOpen(false); onTrial(); }} className="landing-button landing-button-ink" data-testid="button-mobile-landing-trial">Start free trial</button></div></div>}
  </header>;
}

function LandingDashboard() {
  return <div className="landing-dashboard mx-auto w-[72%] p-3 sm:p-5">
    <div className="flex items-center justify-between border-b border-[#171422]/10 pb-3"><span className="font-mono text-[8px] font-bold tracking-[.16em]">MUSE / TODAY</span><span className="h-2 w-2 rounded-full bg-[#d9eb63]" /></div>
    <div className="mt-4 flex items-center justify-between"><div><p className="text-[9px] text-[#171422]/50">Tuesday, October 08</p><p className="mt-1 text-sm font-bold sm:text-xl">Good morning, Mara</p></div><CalendarDays className="text-[#7258dc]" size={18} /></div>
    <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">{[['10', 'appointments'], ['92%', 'booked'], ['$1.8k', 'sales']].map(([value, label]) => <div className="bg-[#f1edff] p-2 sm:p-3" key={label}><p className="font-mono text-xs font-bold sm:text-base">{value}</p><p className="mt-1 text-[7px] text-[#171422]/50 sm:text-[9px]">{label}</p></div>)}</div>
    <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">{['09:30  Margot · Gloss + cut', '11:00  Lila · Signature colour', '14:15  Hana · Scalp ritual'].map((item, index) => <div className="flex items-center gap-2 rounded-md bg-[#faf9ff] px-2 py-1.5 sm:px-3 sm:py-2" key={item}><span className={`h-1.5 w-1.5 rounded-full ${index === 1 ? 'bg-[#7258dc]' : 'bg-[#d9eb63]'}`} /><span className="truncate text-[7px] sm:text-[10px]">{item}</span></div>)}</div>
  </div>;
}

function LandingPhone({ marketplace = false }: { marketplace?: boolean }) {
  return <div className="landing-phone"><div className="flex items-center justify-between bg-[#171422] px-2 py-1.5 text-[6px] font-bold text-white"><span>MUSE</span><span className="h-1 w-1 rounded-full bg-[#d9eb63]" /></div><div className="landing-phone-screen p-2.5"><div className="h-2 w-12 rounded-full bg-[#e5e0ff]" /><p className="mt-3 text-[8px] font-bold">{marketplace ? 'Find your next favourite' : 'Book your next visit'}</p><div className="mt-2 h-16 overflow-hidden rounded-md bg-[#ded5fc]"><img src={marketplace ? '/muse-service.jpg' : '/muse-hero.jpg'} alt="" className="h-full w-full object-cover opacity-80" /></div><div className="mt-2 rounded-md bg-[#7258dc] py-1.5 text-center text-[7px] font-bold text-white">{marketplace ? 'Explore services' : 'Book now'}</div><div className="mt-2 grid grid-cols-2 gap-1"><span className="h-5 rounded bg-[#eeeaff]" /><span className="h-5 rounded bg-[#f8d8e9]" /></div></div></div>;
}

function LandingFeatureCard({ icon: Icon, number, title, copy, href }: { icon: typeof CalendarDays; number: string; title: string; copy: string; href: string }) {
  return <Reveal delay={Number(number)}><a href={href} className="landing-feature focus-ring block min-h-[210px] p-5 sm:p-6" data-testid={`card-landing-feature-${number}`}><div className="flex items-start justify-between"><span className="landing-feature-icon"><Icon size={20} strokeWidth={1.8} /></span><span className="font-mono text-xs text-[#171422]/40">{number}</span></div><h3 className="mt-12 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#171422]/60">{copy}</p></a></Reveal>;
}

function HomePage() {
  const [modal, setModal] = useState<ModalMode>(null);
  usePageMetadata(homeMetadata);
  const [openFaq, setOpenFaq] = useState(0);
  const [annual, setAnnual] = useState(false);
  const trial = () => setModal('trial');
  const demo = () => setModal('demo');
  const featureCards = [
    { icon: CalendarDays, title: 'Manage your day', copy: 'One clear calendar for every appointment, room, and team member.', href: '#booking' },
    { icon: UsersRound, title: 'Know your clients', copy: 'Keep preferences, history, and thoughtful follow-up close at hand.', href: '#clients' },
    { icon: CreditCard, title: 'Get paid simply', copy: 'Deposits, tips, cards, and checkout in one graceful flow.', href: '#payments' },
    { icon: MessageCircle, title: 'Grow with purpose', copy: 'Reviews, rewards, and messages that bring good clients back.', href: '#marketing' },
  ];
  const mosaic = ['/muse-hero.jpg', '/muse-service.jpg', '/muse-pos.jpg', '/muse-service.jpg', '/muse-pos.jpg', '/muse-hero.jpg', '/muse-service.jpg', '/muse-pos.jpg'];
  return <div className="landing-page min-h-[100dvh] overflow-x-hidden">
    <div className="flex min-h-8 items-center justify-center gap-2 bg-[#171422] px-4 py-2 text-center text-[10px] font-bold text-white sm:text-xs"><span className="text-[#d9eb63]">14 days on us</span><span className="text-white/45">·</span><span className="text-white/70">Everything you need to run your business beautifully.</span><button onClick={trial} className="focus-ring text-[#d9eb63] underline underline-offset-2 hover:text-white" data-testid="button-landing-promo">Try it now</button></div>
    <LandingHeader onTrial={trial} onDemo={demo} />
    <main>
      <section className="landing-hero px-5 pb-14 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-10">
        <div className="mx-auto max-w-[1120px] text-center"><Reveal><span className="eyebrow text-[#7258dc]">The business platform for salons & spas</span><h1 className="landing-hero-title mx-auto mt-6">The #1 software for <em>salons and spas.</em></h1><p className="mx-auto mt-7 max-w-[510px] text-sm leading-6 text-[#171422]/62 sm:text-base">MUSE brings booking, payments, client care, and growth into one calm place — so you can spend more time on the work people come back for.</p><div className="mt-7 flex flex-wrap justify-center gap-2"><button onClick={trial} className="landing-button landing-button-ink focus-ring" data-testid="button-landing-hero-trial">Start free trial <ArrowRight size={15} /></button><button onClick={demo} className="landing-button landing-button-outline focus-ring" data-testid="button-landing-hero-demo">See MUSE in action <ArrowUpRight size={15} /></button></div></Reveal><Reveal delay={1}><div className="landing-hero-art relative mx-auto mt-14 min-h-[235px] max-w-[860px] rounded-[1.5rem] p-5 sm:mt-20 sm:min-h-[420px] sm:p-10"><LandingDashboard /><LandingPhone /><div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-[8px] font-bold backdrop-blur sm:bottom-8 sm:left-8 sm:text-[10px]"><span className="h-2 w-2 rounded-full bg-[#7258dc]" /> 248 clients cared for this month</div></div></Reveal></div>
      </section>

      <section className="landing-trust-line bg-white px-5 py-6 sm:px-8 lg:px-10"><div className="mx-auto flex max-w-[1160px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left"><span className="eyebrow text-[#171422]/42">Trusted by detail-obsessed teams</span><div className="landing-logo-cloud flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] font-bold sm:justify-end sm:text-xs"><span>FOLK BEAUTY</span><span>LUNE / HOUSE</span><span>STUDIO ORO</span><span className="font-serif text-sm font-normal tracking-normal">Serein</span><span>FORM + FIELD</span></div></div></section>

      <section id="overview" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto max-w-[1160px]"><Reveal><div className="max-w-[690px]"><span className="eyebrow text-[#7258dc]">One platform, infinite possibilities</span><h2 className="landing-display mt-5">Everything you need to run your <em>business.</em></h2><p className="mt-6 max-w-[470px] text-sm leading-6 text-[#171422]/62 sm:text-base">Built for the way beauty, wellness, and fitness businesses actually work. Clear enough for a busy Tuesday. Powerful enough for the next chapter.</p></div></Reveal><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{featureCards.map((item, index) => <LandingFeatureCard key={item.title} {...item} number={`0${index + 1}`} />)}</div></div></section>

      <section id="booking" className="landing-section-lilac px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1160px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr]"><Reveal><div className="landing-mosaic">{mosaic.map((image, index) => <div key={`${image}-${index}`}><img src={image} alt={`MUSE client experience ${index + 1}`} style={{ objectPosition: `${(index % 4) * 28}% center` }} /></div>)}</div></Reveal><Reveal delay={1}><span className="eyebrow text-[#7258dc]">Made for the work you do</span><h2 className="landing-display mt-5">One platform, <em>infinite possibilities.</em></h2><p className="mt-6 text-sm leading-6 text-[#171422]/62 sm:text-base">From a one-chair studio to a growing team, MUSE keeps your client experience consistent and your daily details in one place.</p><button onClick={demo} className="landing-button landing-button-ink mt-7 focus-ring" data-testid="button-landing-booking-demo">Talk to our team <ArrowRight size={15} /></button></Reveal></div></section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto max-w-[1160px]"><Reveal><div className="max-w-[670px]"><span className="eyebrow text-[#7258dc]">Everything you need to run your business</span><h2 className="landing-display mt-5">Less admin. More <em>momentum.</em></h2></div></Reveal><div className="mt-12 grid gap-4 lg:grid-cols-3"><Reveal delay={1}><article className="landing-app-card p-6 sm:p-8"><span className="font-mono text-3xl text-[#7258dc]">01</span><h3 className="mt-16 text-xl font-bold">Manage</h3><p className="mt-3 text-sm leading-6 text-[#171422]/60">Your calendar, team, services, rooms, and client notes — connected and easy to scan.</p><a href="#booking" className="focus-ring mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#7258dc]" data-testid="link-landing-manage">Explore booking <ArrowRight size={14} /></a></article></Reveal><Reveal delay={2}><article className="landing-app-card bg-[#f8d8e9] p-6 sm:p-8"><span className="font-mono text-3xl text-[#7258dc]">02</span><h3 className="mt-16 text-xl font-bold">Grow</h3><p className="mt-3 text-sm leading-6 text-[#171422]/60">Reviews, rewards, and marketing that feels like a thoughtful note — not another campaign.</p><a href="#marketing" className="focus-ring mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#7258dc]" data-testid="link-landing-grow">See growth tools <ArrowRight size={14} /></a></article></Reveal><Reveal delay={3}><article className="landing-app-card bg-[#eeeaff] p-6 sm:p-8"><span className="font-mono text-3xl text-[#7258dc]">03</span><h3 className="mt-16 text-xl font-bold">Get paid</h3><p className="mt-3 text-sm leading-6 text-[#171422]/60">Deposits, tips, memberships, and a built-in POS that keeps every goodbye simple.</p><a href="#payments" className="focus-ring mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#7258dc]" data-testid="link-landing-payments">See payments <ArrowRight size={14} /></a></article></Reveal></div></div></section>

      <section id="payments" className="landing-section-ink px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1160px] items-center gap-12 lg:grid-cols-[.85fr_1.15fr]"><Reveal><span className="eyebrow text-[#d9eb63]">All-in-one software for your business</span><h2 className="landing-display mt-5">Your best work, <em>better supported.</em></h2><p className="mt-6 max-w-[440px] text-sm leading-6 text-white/65 sm:text-base">MUSE quietly handles the operational side so your team can stay present for the client in front of them.</p><ul className="landing-list mt-7 max-w-[470px]">{['Branded online booking and automatic reminders', 'Client profiles, notes, preferences, and history', 'Payments, deposits, tips, and reporting in one view', 'Marketing tools that turn great service into repeat visits'].map(item => <li key={item}>{item}</li>)}</ul><button onClick={trial} className="landing-button landing-button-lime mt-8 focus-ring" data-testid="button-landing-payments-trial">Start free trial <ArrowRight size={15} /></button></Reveal><Reveal delay={1}><div className="relative mx-auto w-full max-w-[570px] rounded-[1.5rem] bg-[#eeeaff] p-5 sm:p-10"><div className="landing-app-card rounded-lg p-4 sm:p-6"><div className="flex items-center justify-between border-b border-[#171422]/10 pb-4"><span className="font-mono text-[9px] font-bold tracking-[.15em]">MUSE / PAYMENTS</span><CircleCheck className="text-[#7258dc]" size={18} /></div><p className="mt-8 text-[10px] text-[#171422]/50">Today’s revenue</p><p className="mt-1 text-4xl font-bold tracking-[-.06em]">$2,846.50</p><div className="mt-7 flex h-24 items-end gap-2">{[32, 45, 39, 62, 52, 76, 69, 88, 80].map((height, index) => <span key={index} className={`flex-1 rounded-t-sm ${index === 7 ? 'bg-[#7258dc]' : 'bg-[#d9eb63]'}`} style={{ height: `${height}%` }} />)}</div></div><div className="landing-stat absolute bottom-5 right-3 bg-white p-3 sm:bottom-9 sm:right-5"><p className="font-mono text-lg font-bold">+31%</p><p className="text-[9px] text-[#171422]/55">repeat bookings</p></div></div></Reveal></div></section>

      <section id="clients" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1160px] items-center gap-12 lg:grid-cols-[1.1fr_.9fr]"><Reveal><div className="landing-visual relative"><img src="/muse-service.jpg" alt="Stylist creating a thoughtful client experience" className="aspect-[1.08] w-full object-cover" /><div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg bg-[#171422]/78 p-3 text-white backdrop-blur"><span className="eyebrow text-white/65">Client book / 248 profiles</span><Heart size={15} className="text-[#d9eb63]" /></div></div></Reveal><Reveal delay={1}><span className="eyebrow text-[#7258dc]">The details clients remember</span><h2 className="landing-display mt-5">Make every visit feel like <em>their favourite one.</em></h2><p className="mt-6 text-sm leading-6 text-[#171422]/62 sm:text-base">Keep every preference, formula, note, and thank-you in one place. The more your team knows, the more personal the experience becomes.</p><div className="mt-8 grid grid-cols-2 gap-5 border-t border-[#171422]/15 pt-5"><div><p className="font-mono text-3xl font-bold">14</p><p className="mt-1 text-xs text-[#171422]/52">visits remembered</p></div><div><p className="font-mono text-3xl font-bold">4.9</p><p className="mt-1 text-xs text-[#171422]/52">average rating</p></div></div></Reveal></div></section>

      <section id="marketing" className="landing-section-lilac px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1160px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]"><Reveal><span className="eyebrow text-[#7258dc]">The growth loop</span><h2 className="landing-display mt-5">The most popular marketplace to <em>grow your business.</em></h2><p className="mt-6 text-sm leading-6 text-[#171422]/62 sm:text-base">Get discovered by new clients, then give them a reason to come back. MUSE connects the first search to the next appointment.</p><div className="mt-7 flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-white px-3 py-2">New client discovery</span><span className="rounded-full bg-[#d9eb63] px-3 py-2">Repeat visits</span></div></Reveal><Reveal delay={1}><div className="relative mx-auto min-h-[290px] w-full max-w-[560px] rounded-[1.5rem] bg-[#dcd4ff] p-5 sm:min-h-[380px] sm:p-9"><div className="landing-app-card absolute left-[9%] top-[12%] w-[64%] rotate-[-4deg] p-4 sm:p-6"><div className="flex items-center justify-between"><span className="font-mono text-[8px] font-bold">MUSE MARKETPLACE</span><Search size={13} /></div><div className="mt-5 grid grid-cols-2 gap-2"><div className="h-28 overflow-hidden rounded bg-[#eeeaff]"><img src="/muse-pos.jpg" alt="Salon discovery listing" className="h-full w-full object-cover" /></div><div className="h-28 overflow-hidden rounded bg-[#f8d8e9]"><img src="/muse-service.jpg" alt="Beauty service listing" className="h-full w-full object-cover" /></div></div><p className="mt-3 text-xs font-bold">Find your new favourite</p></div><LandingPhone marketplace /></div></Reveal></div></section>

      <section id="stories" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto max-w-[980px]"><Reveal><div className="text-center"><span className="eyebrow text-[#7258dc]">Notes from the chair</span><div className="mt-5 flex justify-center text-[#7258dc]"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div><blockquote className="landing-display mx-auto mt-6 max-w-[840px]">“MUSE gave me my evenings back — and my clients can feel that I’m more present.”</blockquote><p className="mt-7 text-xs font-bold">Nina Sato · Founder, Northside studio</p></div></Reveal></div></section>

      <section id="pricing" className="border-y border-[#171422]/10 bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto max-w-[850px]"><Reveal><div className="text-center"><span className="eyebrow text-[#7258dc]">Simple, transparent pricing</span><h2 className="landing-display mt-5">Start with a clear <em>yes.</em></h2><div className="mx-auto mt-7 inline-flex rounded-full border border-[#171422]/15 bg-[#eeeaff] p-1"><button onClick={() => setAnnual(false)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${!annual ? 'bg-[#171422] text-white' : 'text-[#171422]/60'}`} data-testid="button-landing-monthly">Monthly</button><button onClick={() => setAnnual(true)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${annual ? 'bg-[#171422] text-white' : 'text-[#171422]/60'}`} data-testid="button-landing-annual">Annual <span className="ml-1 text-[#7258dc]">save 20%</span></button></div></div></Reveal><Reveal delay={1}><div className="landing-app-card mx-auto mt-10 max-w-[700px] p-6 sm:p-10"><div className="flex flex-col justify-between gap-5 border-b border-[#171422]/12 pb-7 sm:flex-row"><div><span className="eyebrow text-[#7258dc]">Studio plan</span><h3 className="mt-3 text-2xl font-bold">Everything to run beautifully.</h3><p className="mt-2 text-sm text-[#171422]/55">No setup fees. No surprise add-ons.</p></div><div><span className="font-mono text-5xl font-bold tracking-[-.08em]">${annual ? '31' : '39'}</span><span className="text-xs text-[#171422]/50"> / month</span><p className="mt-1 text-[10px] text-[#7258dc]">{annual ? 'billed annually' : 'billed monthly'}</p></div></div><div className="grid gap-3 py-7 sm:grid-cols-2">{['Branded booking webpage', 'Stripe payments + built-in POS', 'Client notes + history', 'Review management', 'Loyalty rewards', 'Unlimited team calendars'].map(item => <p className="flex items-center gap-2 text-sm" key={item}><Check size={15} className="text-[#7258dc]" />{item}</p>)}</div><button onClick={trial} className="landing-button landing-button-ink w-full focus-ring" data-testid="button-landing-pricing-trial">Start free for 14 days <ArrowRight size={15} /></button></div></Reveal></div></section>

      <section id="faq" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1050px] gap-10 lg:grid-cols-[.7fr_1.3fr]"><Reveal><span className="eyebrow text-[#7258dc]">Questions, answered</span><h2 className="landing-display mt-5">A little more <em>clarity.</em></h2><p className="mt-5 max-w-[260px] text-sm leading-6 text-[#171422]/60">Still curious? We are real people, and we would love to talk it through.</p><button onClick={demo} className="landing-button landing-button-outline mt-6 focus-ring" data-testid="button-landing-faq-demo">Talk to our team <ArrowRight size={15} /></button></Reveal><Reveal delay={1}><div className="border-t border-[#171422]/15">{faqs.map(([question, answer], index) => <div key={question} className="border-b border-[#171422]/15"><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="focus-ring flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-bold" aria-expanded={openFaq === index} data-testid={`button-landing-faq-${index}`}><span>{question}</span><ChevronDown size={17} className={`shrink-0 transition-transform ${openFaq === index ? 'rotate-180 text-[#7258dc]' : 'text-[#171422]/45'}`} /></button><div className={`grid transition-[grid-template-rows,opacity] duration-300 ${openFaq === index ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><p className="min-h-0 overflow-hidden pr-8 text-sm leading-6 text-[#171422]/60">{answer}</p></div></div>)}</div></Reveal></div></section>

      <section className="relative overflow-hidden bg-[#7258dc] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-10"><div className="absolute -right-24 -top-36 h-[430px] w-[430px] rounded-full border-[58px] border-white/15" /><div className="relative mx-auto max-w-[930px] text-center"><Reveal><span className="eyebrow text-white/75">Your next chapter looks good on you</span><h2 className="landing-display mt-5 text-white">Run a business that feels as good as it looks.</h2><p className="mx-auto mt-6 max-w-[430px] text-sm leading-6 text-white/75">Come see what a calmer, clearer business can do for your craft.</p><div className="mt-8 flex flex-wrap justify-center gap-2"><button onClick={trial} className="landing-button landing-button-lime focus-ring" data-testid="button-landing-final-trial">Start free trial <ArrowRight size={15} /></button><button onClick={demo} className="landing-button border border-white/45 text-white hover:bg-white hover:text-[#171422] focus-ring" data-testid="button-landing-final-demo">Book a demo <ArrowUpRight size={15} /></button></div></Reveal></div></section>
    </main>
    <footer className="landing-footer px-5 py-12 sm:px-8 lg:px-10"><div className="mx-auto max-w-[1160px]"><div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-10 md:flex-row"><div><LandingLogo /><p className="mt-5 max-w-[255px] text-sm leading-6 text-white/55">The complete business platform for ambitious beauty, wellness, and fitness professionals.</p></div><div className="grid grid-cols-2 gap-x-12 gap-y-7 text-sm sm:grid-cols-3"><div><p className="eyebrow mb-4 text-white/35">Product</p><div className="space-y-3"><a href="#overview">Overview</a><a href="#booking" className="block">Booking</a><a href="#payments" className="block">Payments</a></div></div><div><p className="eyebrow mb-4 text-white/35">Company</p><div className="space-y-3"><a href="#stories" className="block">Stories</a><a href="#pricing" className="block">Pricing</a><button onClick={demo} className="block text-left" data-testid="button-landing-footer-contact">Contact</button></div></div><div><p className="eyebrow mb-4 text-white/35">For your business</p><div className="space-y-3"><a href={businessRoute('salon')} className="block">Salon software</a><a href={businessRoute('spa')} className="block">Spa software</a><a href={businessRoute('barber')} className="block">Barber software</a></div></div></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[11px] text-white/35 sm:flex-row"><span>© 2025 MUSE Technologies, Inc.</span><span>Made for the detail-obsessed.</span></div></div></footer>
    <ConversionModal mode={modal} onClose={() => setModal(null)} />
  </div>;
}

function App() {
  const businessMatch = businessGroups.flatMap((group) => group.items.map((businessItem) => ({ businessItem, group }))).find(({ businessItem }) => window.location.pathname.endsWith(`/pro/${businessItem.slug}-software`));
  if (businessMatch) return <BusinessTypePage businessItem={businessMatch.businessItem} group={businessMatch.group} />;
  return <HomePage />;
}

export default App;