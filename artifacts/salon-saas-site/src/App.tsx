import { useEffect, useRef, useState, type ReactNode } from 'react';
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

function CTA({ children, onClick, variant = 'dark', testId, className = '' }: { children: ReactNode; onClick?: () => void; variant?: 'dark' | 'light' | 'coral' | 'outline'; testId: string; className?: string }) {
  const styles = {
    dark: 'bg-[#292328] text-white hover:bg-[#44343d]',
    light: 'bg-white text-[#292328] hover:bg-[#fff4ef]',
    coral: 'bg-[#ed5a52] text-white hover:bg-[#db494b]',
    outline: 'border border-current text-[#292328] hover:bg-[#292328] hover:text-white',
  };
  return <button onClick={onClick} className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${styles[variant]} ${className}`} data-testid={testId}>{children}</button>;
}

function ConversionModal({ mode, onClose }: { mode: ModalMode; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (!mode) { setSent(false); setEmail(''); }
  }, [mode]);
  if (!mode) return null;
  const demo = mode === 'demo';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#292328]/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="modal-conversion">
      <div className="relative w-full max-w-md rounded-3xl bg-[#fffaf7] p-7 shadow-2xl sm:p-10">
        <button onClick={onClose} className="focus-ring absolute right-5 top-5 rounded-full p-2 text-[#292328]/50 hover:bg-[#292328]/10" aria-label="Close" data-testid="button-close-modal"><X size={19} /></button>
        {sent ? (
          <div className="py-5 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dbe8dc] text-[#3b754b]"><CircleCheck size={28} /></div><h2 className="serif mt-6 text-4xl">{demo ? 'We’ll be in touch.' : 'You’re on your way.'}</h2><p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#292328]/65">{demo ? 'A MUSE guide will send a few times to your inbox shortly.' : 'Check your inbox for a welcome note and your first step toward a calmer studio.'}</p><CTA onClick={onClose} testId="button-close-success" className="mt-7">Back to MUSE</CTA></div>
        ) : (
          <><span className="eyebrow text-[#ed5a52]">{demo ? 'A closer look' : '14 days on us'}</span><h2 className="serif mt-4 max-w-sm text-4xl leading-[.93]">{demo ? 'Let’s make space for what matters.' : 'Your best business day starts here.'}</h2><p className="mt-4 text-sm leading-6 text-[#292328]/65">{demo ? 'Tell us where you are in your studio journey and a MUSE guide will walk you through the details.' : 'No card. No awkward setup. Just two generous weeks to see how MUSE feels in your hands.'}</p><form onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSent(true); }} className="mt-7"><label htmlFor="modal-email" className="eyebrow text-[#292328]/50">Work email</label><input id="modal-email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@yourstudio.com" className="focus-ring mt-2 w-full rounded-xl border border-[#292328]/15 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#ed5a52]" data-testid="input-modal-email" /><CTA variant="coral" testId="button-submit-modal" className="mt-3 w-full">{demo ? 'Request my demo' : 'Start my free trial'} <ArrowRight size={16} /></CTA></form><p className="mt-4 text-center text-[11px] text-[#292328]/45">No credit card required.</p></>
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
          <a href={homeHash('#stories')} className="focus-ring text-[#292328]/60 hover:text-[#292328]" data-testid="link-header-sales">Talk to sales</a>
          <a href={homeHash('#faq')} className="focus-ring text-[#292328]/60 hover:text-[#292328]" data-testid="link-header-help">Help center</a>
          <button onClick={onDemo} className="focus-ring text-[#292328]/75 hover:text-[#ed5a52]" data-testid="button-header-login">Log in</button>
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
          <button onClick={() => { closeMenus(); onDemo(); }} className="rounded-full border border-[#292328]/20 px-3 py-3 text-xs font-bold" data-testid="button-mobile-login">Log in</button>
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

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute('content');
    document.title = `${businessItem.label} software | MUSE`;
    descriptionTag?.setAttribute('content', content.description);
    return () => {
      document.title = previousTitle;
      if (previousDescription) descriptionTag?.setAttribute('content', previousDescription);
    };
  }, [businessItem.label, content.description]);

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
                  <button onClick={demo} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#292328]" data-testid="button-business-demo">Talk to sales <ArrowUpRight size={16} /></button>
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

function App() {
  const [modal, setModal] = useState<ModalMode>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [annual, setAnnual] = useState(false);
  const trial = () => setModal('trial');
  const demo = () => setModal('demo');

  const businessMatch = businessGroups.flatMap((group) => group.items.map((businessItem) => ({ businessItem, group }))).find(({ businessItem }) => window.location.pathname.endsWith(`/pro/${businessItem.slug}-software`));
  if (businessMatch) return <BusinessTypePage businessItem={businessMatch.businessItem} group={businessMatch.group} />;

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[#fffaf7] text-[#292328]">
      <div className="promo-bar flex min-h-9 items-center justify-center gap-3 bg-[#292328] px-4 py-2 text-center text-[11px] font-semibold text-white sm:text-xs"><span className="hidden text-white/45 sm:inline line-through">$49</span><span>$39/month for your first 3 months</span><span className="hidden text-white/60 sm:inline">·</span><span className="hidden text-white/60 sm:inline">We’ll make the switch easy.</span><button onClick={trial} className="focus-ring rounded-full bg-[#ed5a52] px-3 py-1 text-[10px] font-bold hover:bg-[#f37969]" data-testid="button-promo-trial">Try for free <ArrowRight className="ml-1 inline" size={11} /></button></div>

      <SiteHeader onTrial={trial} onDemo={demo} />

      <main>
        <section className="hero-gradient relative overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-24 lg:px-10">
          <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
          <div className="relative mx-auto max-w-[980px] text-center text-white">
            <Reveal><span className="eyebrow text-white/70">The salon business platform</span><h1 className="serif mx-auto mt-5 max-w-[900px] text-[3.7rem] leading-[.88] tracking-[-.035em] sm:text-[5.8rem] lg:text-[7rem]">Salon software that keeps your business <em>polished.</em></h1><p className="mx-auto mt-7 max-w-[570px] text-sm leading-6 text-white/80 sm:text-base">MUSE keeps every part of your salon running smoothly — from the first booking to the final thank-you.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><CTA onClick={trial} variant="dark" testId="button-hero-trial">Start free trial <ArrowRight size={16} /></CTA><button onClick={demo} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#292328]" data-testid="button-hero-demo">Book a demo <ArrowUpRight size={16} /></button></div></Reveal>
            <Reveal delay={1}><div className="hero-media mx-auto mt-14 h-[300px] max-w-[900px] sm:h-[420px]"><img src="/muse-hero.jpg" alt="Salon owner using MUSE at the front desk" className="h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-[#292328]/30 to-transparent" /><HeroProductPanel /><div className="hero-stat absolute bottom-[-8%] right-[-2%] hidden w-[190px] rounded-2xl bg-[#f4c9bd] p-4 text-left text-[#292328] shadow-xl sm:block"><BarChart3 size={18} /><p className="mt-6 text-[10px] font-semibold uppercase tracking-[.12em] text-[#292328]/55">This month</p><p className="mt-1 font-mono text-3xl font-bold">+28.4%</p><p className="mt-1 text-[10px] text-[#292328]/60">repeat bookings</p></div></div></Reveal>
          </div>
        </section>

        <section className="border-b border-[#292328]/10 bg-white px-5 py-7 sm:px-8 lg:px-10"><div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6"><p className="eyebrow text-[#292328]/45">Loved by ambitious beauty businesses</p><div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-bold tracking-[.06em] text-[#292328]/55 sm:gap-x-10"><span>FOLK BEAUTY</span><span className="font-serif text-base font-normal tracking-normal">lune / house</span><span>STUDIO ORO</span><span className="font-serif text-base font-normal tracking-normal">Serein</span><span>FORM + FIELD</span></div></div></section>

        <section id="overview" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto max-w-[1280px]"><Reveal><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><span className="eyebrow text-[#ed5a52]">A complete salon operating system</span><h2 className="serif mt-5 max-w-[700px] text-5xl leading-[.9] tracking-[-.02em] sm:text-6xl">Everything your salon needs to <em className="text-[#ed5a52]">run, grow, and shine.</em></h2></div><p className="max-w-[300px] text-sm leading-6 text-[#292328]/60">The tools your team needs, connected in one clear place. Less patchwork. More polish.</p></div></Reveal><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{ icon: CalendarDays, title: 'Book beautifully', copy: 'A booking webpage that feels like your brand and works while you sleep.' }, { icon: CreditCard, title: 'Get paid simply', copy: 'Stripe payments and a built-in POS for deposits, tips, and checkout.' }, { icon: UsersRound, title: 'Know your clients', copy: 'Every note, formula, preference, and follow-up right where you need it.' }, { icon: MessageCircle, title: 'Keep them coming', copy: 'Reviews, rewards, and SMS marketing that feels personal.' }].map((item, index) => { const Icon = item.icon; return <Reveal key={item.title} delay={(index % 3) + 1}><a href={['#booking', '#payments', '#clients', '#marketing'][index]} className="feature-tile focus-ring group block min-h-[250px] border border-[#292328]/15 p-6 transition hover:-translate-y-1 hover:border-[#ed5a52]" data-testid={`card-overview-${index}`}><Icon size={25} strokeWidth={1.6} className="text-[#ed5a52]" /><h3 className="mt-16 text-xl font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#292328]/60">{item.copy}</p><ArrowUpRight size={17} className="mt-5 opacity-0 transition group-hover:opacity-100" /></a></Reveal>; })}</div></div></section>

        <section id="booking" className="bg-[#f2e8e6] px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2"><Reveal><div className="story-image relative ml-auto max-w-[590px]"><img src="/muse-service.jpg" alt="Stylist working with a salon client" className="aspect-[1.03] w-full object-cover" /><div className="image-caption absolute bottom-5 left-5 right-5 flex items-end justify-between text-white"><span className="eyebrow">Booking / Client experience</span><span className="rounded-full bg-white/20 p-2 backdrop-blur"><ArrowUpRight size={16} /></span></div></div></Reveal><Reveal delay={1}><span className="eyebrow text-[#ed5a52]">Booking that feels like you</span><h2 className="serif mt-5 max-w-[520px] text-5xl leading-[.9] sm:text-6xl">Your front desk, <em>always open.</em></h2><p className="mt-6 max-w-[470px] text-base leading-7 text-[#292328]/65">Turn a first click into a feeling with a booking webpage that looks like your studio, shows real-time availability, and fills itself while you work.</p><ul className="mt-7 space-y-3 text-sm font-semibold">{['Branded booking webpage', 'Automated reminders and confirmations', 'Online deposits and cancellation protection'].map(item => <li key={item} className="flex items-center gap-2"><Check size={16} className="text-[#ed5a52]" />{item}</li>)}</ul><a href="#pricing" className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#ed5a52]" data-testid="link-booking-pricing">See how it works <ArrowRight size={16} /></a></Reveal></div></section>

        <section id="payments" className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]"><Reveal><span className="eyebrow text-[#ed5a52]">Payments, without the pause</span><h2 className="serif mt-5 max-w-[520px] text-5xl leading-[.9] sm:text-6xl">A smoother checkout is a <em>better goodbye.</em></h2><p className="mt-6 max-w-[450px] text-base leading-7 text-[#292328]/65">Take deposits, cards, tips, and contactless payments in one graceful flow. Stripe-powered behind the scenes, beautifully simple in front of them.</p><div className="mt-8 grid max-w-[440px] grid-cols-2 gap-3"><div className="border border-[#292328]/15 bg-[#fffaf7] p-4"><CreditCard size={19} className="text-[#ed5a52]" /><p className="mt-8 text-sm font-bold">Built-in POS</p><p className="mt-1 text-xs leading-5 text-[#292328]/55">Checkout, tips, and reports together.</p></div><div className="border border-[#292328]/15 bg-[#fffaf7] p-4"><Zap size={19} className="text-[#ed5a52]" /><p className="mt-8 text-sm font-bold">Stripe powered</p><p className="mt-1 text-xs leading-5 text-[#292328]/55">Secure payments that just work.</p></div></div></Reveal><Reveal delay={1}><div className="story-image relative max-w-[650px] lg:ml-auto"><img src="/muse-pos.jpg" alt="Client paying at a salon checkout" className="aspect-[1.14] w-full object-cover" /><div className="payment-card absolute bottom-5 right-5 w-[210px] bg-white p-4 shadow-xl sm:w-[250px]"><div className="flex items-center justify-between"><span className="eyebrow text-[#292328]/50">Payment complete</span><CircleCheck size={18} className="text-[#3b754b]" /></div><p className="mt-4 text-2xl font-bold">$186.00</p><div className="mt-3 flex items-center justify-between text-[10px] text-[#292328]/50"><span>Gloss + cut · Lila M.</span><span>•••• 1834</span></div></div></div></Reveal></div></section>

        <section id="clients" className="bg-[#292328] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.1fr_.9fr]"><Reveal><div className="client-ui max-w-[640px] bg-[#4a3943] p-5 sm:p-7"><div className="flex items-center justify-between border-b border-white/15 pb-4"><span className="eyebrow text-white/50">Client book / 248 profiles</span><UsersRound size={18} className="text-[#f4c9bd]" /></div><div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/10 pb-5"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9bcae] text-xs font-bold text-[#292328]">LM</div><div><p className="text-sm font-bold">Lila Morgan</p><p className="text-xs text-white/50">Last visit · 12 days ago</p></div><span className="rounded-full bg-[#9bb895] px-2 py-1 text-[9px] font-bold text-[#292328]">Loyal</span></div><div className="mt-5 grid grid-cols-3 gap-2 text-center"><div className="bg-white/5 p-3"><p className="font-mono text-xl text-[#f4c9bd]">14</p><p className="mt-1 text-[9px] text-white/45">visits</p></div><div className="bg-white/5 p-3"><p className="font-mono text-xl text-[#f4c9bd]">$1.8k</p><p className="mt-1 text-[9px] text-white/45">lifetime value</p></div><div className="bg-white/5 p-3"><p className="font-mono text-xl text-[#f4c9bd]">4.9</p><p className="mt-1 text-[9px] text-white/45">review score</p></div></div><div className="mt-5 border-t border-white/10 pt-4"><p className="eyebrow text-white/40">Latest note</p><p className="mt-2 text-xs leading-5 text-white/70">“Prefers warm tones. Ask about Lisbon trip next visit.”</p></div></div></Reveal><Reveal delay={1}><span className="eyebrow text-[#f4c9bd]">Client care, remembered</span><h2 className="serif mt-5 max-w-[520px] text-5xl leading-[.9] sm:text-6xl">Make every visit feel like <em>their favourite one.</em></h2><p className="mt-6 max-w-[460px] text-base leading-7 text-white/65">Keep every preference, formula, note, and thank-you in one place. Add loyalty rewards and thoughtful SMS marketing when it’s time to bring them back.</p><div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold text-[#f4c9bd]"><span className="flex items-center gap-2 border border-white/15 px-3 py-2"><Heart size={14} /> Client management</span><span className="flex items-center gap-2 border border-white/15 px-3 py-2"><Gift size={14} /> Loyalty rewards</span><span className="flex items-center gap-2 border border-white/15 px-3 py-2"><Send size={14} /> SMS marketing</span></div></Reveal></div></section>

        <section id="marketing" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto max-w-[1280px]"><Reveal><div className="border-b border-[#292328]/15 pb-10"><span className="eyebrow text-[#ed5a52]">The growth loop</span><h2 className="serif mt-5 max-w-[720px] text-5xl leading-[.9] sm:text-6xl">Good service gets remembered. MUSE helps it get <em>shared.</em></h2></div></Reveal><div className="mt-10 grid gap-5 md:grid-cols-3"><Reveal delay={1}><div className="border border-[#292328]/15 p-6"><Star className="text-[#ed5a52]" fill="currentColor" size={22} /><p className="mt-12 text-xl font-bold">Reviews that arrive naturally</p><p className="mt-3 text-sm leading-6 text-[#292328]/60">Prompt happy clients at the moment they’re most likely to say something lovely.</p></div></Reveal><Reveal delay={2}><div className="border border-[#292328]/15 bg-[#f2e8e6] p-6"><Gift className="text-[#ed5a52]" size={22} /><p className="mt-12 text-xl font-bold">Rewards with a point of view</p><p className="mt-3 text-sm leading-6 text-[#292328]/60">Create loyalty moments that feel generous, not like a discount bin.</p></div></Reveal><Reveal delay={3}><div className="border border-[#292328]/15 p-6"><MessageCircle className="text-[#ed5a52]" size={22} /><p className="mt-12 text-xl font-bold">Marketing that sounds human</p><p className="mt-3 text-sm leading-6 text-[#292328]/60">Send a seasonal note, a birthday wish, or an opening to your waitlist in a few clicks.</p></div></Reveal></div></div></section>

        <section className="bg-[#ed5a52] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_auto]"><Reveal><span className="eyebrow text-white/70">Proof in the numbers</span><h2 className="serif mt-5 max-w-[720px] text-5xl leading-[.9] sm:text-7xl">More calm behind the scenes. More room to <em>grow.</em></h2></Reveal><Reveal delay={1}><div className="grid grid-cols-2 gap-7 border-t border-white/25 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><div><p className="font-mono text-5xl font-bold tracking-[-.08em]">+31%</p><p className="mt-2 max-w-[115px] text-xs leading-5 text-white/75">repeat bookings after 90 days</p></div><div><p className="font-mono text-5xl font-bold tracking-[-.08em]">4.9/5</p><p className="mt-2 max-w-[115px] text-xs leading-5 text-white/75">average client rating</p></div></div></Reveal></div></section>

        <section id="stories" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.8fr_1.2fr]"><Reveal><span className="eyebrow text-[#ed5a52]">Notes from the chair</span><h2 className="serif mt-5 max-w-[430px] text-5xl leading-[.9] sm:text-6xl">The best tools leave more room for <em>people.</em></h2></Reveal><Reveal delay={1}><blockquote className="border-l-4 border-[#ed5a52] pl-6 sm:pl-10"><div className="flex text-[#ed5a52]"><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /></div><p className="serif mt-6 max-w-[700px] text-4xl leading-[.95] sm:text-5xl">“MUSE gave me my evenings back — and my clients can feel that I’m more present.”</p><footer className="mt-7 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4c9bd] text-xs font-bold">NS</span><span><strong className="block text-sm">Nina Sato</strong><span className="text-xs text-[#292328]/55">Founder, Northside studio</span></span></footer></blockquote></Reveal></div></section>

        <section id="pricing" className="border-y border-[#292328]/10 bg-[#f2e8e6] px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto max-w-[1050px]"><Reveal><div className="text-center"><span className="eyebrow text-[#ed5a52]">Pricing that makes sense</span><h2 className="serif mt-5 text-5xl leading-[.9] sm:text-6xl">Start with a clear <em>yes.</em></h2><div className="mx-auto mt-7 inline-flex rounded-full border border-[#292328]/15 bg-white p-1"><button onClick={() => setAnnual(false)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${!annual ? 'bg-[#292328] text-white' : 'text-[#292328]/60'}`} data-testid="button-pricing-monthly">Monthly</button><button onClick={() => setAnnual(true)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${annual ? 'bg-[#292328] text-white' : 'text-[#292328]/60'}`} data-testid="button-pricing-annual">Annual <span className="ml-1 text-[#ed5a52]">save 20%</span></button></div></div></Reveal><Reveal delay={1}><div className="mx-auto mt-12 max-w-[800px] border border-[#292328]/20 bg-white p-7 sm:p-10"><div className="flex flex-col justify-between gap-5 border-b border-[#292328]/15 pb-7 sm:flex-row sm:items-start"><div><span className="eyebrow text-[#ed5a52]">Studio plan</span><h3 className="mt-2 text-2xl font-bold">Everything to run beautifully.</h3><p className="mt-2 text-sm text-[#292328]/55">No setup fees. No surprise add-ons.</p></div><div className="text-left sm:text-right"><span className="font-mono text-5xl font-bold tracking-[-.08em]">${annual ? '31' : '39'}</span><span className="text-sm text-[#292328]/50"> / month</span><p className="mt-1 text-[11px] text-[#ed5a52]">{annual ? 'billed annually' : 'billed monthly'}</p></div></div><div className="grid gap-3 py-7 sm:grid-cols-2">{['Branded booking webpage', 'Stripe payments + built-in POS', 'Client notes + history', 'Review management', 'Loyalty rewards', 'SMS marketing campaigns', 'Unlimited team calendars', 'Concierge onboarding'].map(item => <p key={item} className="flex items-center gap-2 text-sm"><Check size={15} className="text-[#ed5a52]" />{item}</p>)}</div><CTA onClick={trial} variant="coral" testId="button-pricing-trial" className="w-full">Start free for 14 days <ArrowRight size={16} /></CTA></div></Reveal></div></section>

        <section id="faq" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><div className="mx-auto grid max-w-[1050px] gap-12 lg:grid-cols-[.75fr_1.25fr]"><Reveal><span className="eyebrow text-[#ed5a52]">Questions, answered</span><h2 className="serif mt-5 text-5xl leading-[.9] sm:text-6xl">A little more <em>clarity.</em></h2><p className="mt-5 max-w-[260px] text-sm leading-6 text-[#292328]/60">Still curious? We’re real people, and we’d love to talk it through.</p><button onClick={demo} className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#ed5a52]" data-testid="button-faq-demo">Talk to our team <ArrowRight size={16} /></button></Reveal><Reveal delay={1}><div className="border-t border-[#292328]/15">{faqs.map(([question, answer], index) => <div key={question} className="border-b border-[#292328]/15"><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="focus-ring flex w-full items-center justify-between gap-5 py-6 text-left text-sm font-bold sm:text-base" aria-expanded={openFaq === index} data-testid={`button-faq-${index}`}><span>{question}</span><ChevronDown size={18} className={`shrink-0 transition-transform ${openFaq === index ? 'rotate-180 text-[#ed5a52]' : 'text-[#292328]/45'}`} /></button><div className={`grid transition-[grid-template-rows,opacity] duration-300 ${openFaq === index ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><p className="min-h-0 overflow-hidden pr-8 text-sm leading-6 text-[#292328]/60">{answer}</p></div></div>)}</div></Reveal></div></section>

        <section className="closing-gradient relative overflow-hidden px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-10"><div className="closing-ring" /><div className="relative mx-auto max-w-[1000px] text-center"><Reveal><span className="eyebrow text-white/70">Your next chapter looks good on you</span><h2 className="serif mt-5 text-6xl leading-[.86] tracking-[-.03em] sm:text-8xl">Run a salon that feels as good as it looks.</h2><p className="mx-auto mt-7 max-w-[470px] text-sm leading-6 text-white/75">Come see what a calmer, clearer business can do for your craft.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><CTA onClick={trial} variant="light" testId="button-final-trial">Start free trial <ArrowRight size={16} /></CTA><button onClick={demo} className="focus-ring rounded-full border border-white/45 px-5 py-3 text-sm font-bold hover:bg-white hover:text-[#292328]" data-testid="button-final-demo">Book a demo</button></div></Reveal></div></section>
      </main>

      <footer className="bg-[#292328] px-5 py-12 text-white sm:px-8 lg:px-10"><div className="mx-auto max-w-[1280px]"><div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-10 md:flex-row"><div><Logo light /><p className="mt-5 max-w-[240px] text-sm leading-6 text-white/55">The complete business platform for ambitious beauty professionals.</p></div><div className="grid grid-cols-2 gap-x-14 gap-y-7 text-sm sm:grid-cols-3"><div><p className="eyebrow mb-4 text-white/35">Product</p><div className="space-y-3 text-white/65"><a href="#overview" className="block hover:text-white">Overview</a><a href="#booking" className="block hover:text-white">Booking</a><a href="#payments" className="block hover:text-white">Payments & POS</a></div></div><div><p className="eyebrow mb-4 text-white/35">Company</p><div className="space-y-3 text-white/65"><a href="#stories" className="block hover:text-white">Stories</a><a href="#pricing" className="block hover:text-white">Pricing</a><button onClick={demo} className="block text-left hover:text-white" data-testid="button-footer-contact">Contact</button></div></div><div><p className="eyebrow mb-4 text-white/35">Social</p><div className="flex gap-2"><a href="#stories" className="rounded-full border border-white/20 p-2 hover:border-white/60" aria-label="Instagram" data-testid="link-instagram"><Heart size={14} /></a><a href="#stories" className="rounded-full border border-white/20 p-2 hover:border-white/60" aria-label="LinkedIn" data-testid="link-linkedin"><Zap size={14} /></a></div></div></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[11px] text-white/35 sm:flex-row"><span>© 2025 MUSE Technologies, Inc.</span><div className="flex gap-5"><a href="#faq" className="hover:text-white">Privacy</a><a href="#faq" className="hover:text-white">Terms</a><span>Made for the detail-obsessed.</span></div></div></div></footer>
      <ConversionModal mode={modal} onClose={() => setModal(null)} />
    </div>
  );
}

export default App;