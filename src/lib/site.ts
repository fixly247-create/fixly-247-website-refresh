import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  HeartHandshake,
  Headset,
  Mail,
  MessageSquareText,
  MessagesSquare,
  PhoneCall,
  PiggyBank,
  ShieldCheck,
  SlidersHorizontal,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import clanLogo from "@/assets/clients/clan-group-logo.png";
import exitRealtyLogo from "@/assets/clients/exit-realty-prime-logo.png";
import installGuysLogo from "@/assets/clients/the-install-guys-logo.png";
import powerwingLogo from "@/assets/clients/powerwing-logo.png";

export const CONTACT = {
  phoneDisplay: "+1 315 300 7069",
  phoneHref: "tel:+13153007069",
  whatsappDisplay: "+1 510 585 4190",
  email: "fixly247@gmail.com",
  emailHref: "mailto:fixly247@gmail.com",
} as const;

export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/15105854190",
  facebook: "https://www.facebook.com/share/1EiHZgT7M9/",
  instagram: "https://www.instagram.com/fixly247?xtok=MXFxczNwZjZteWJvZA==",
} as const;

/** Client logos for the homepage "Our Clients" strip. `shape` balances wide vs. tall marks optically. */
export const CLIENTS: { name: string; src: string; width: number; height: number; shape: "wide" | "tall" }[] = [
  { name: "The Install Guys", src: installGuysLogo, width: 525, height: 351, shape: "tall" },
  { name: "Powerwing", src: powerwingLogo, width: 470, height: 164, shape: "wide" },
  { name: "EXIT Realty Prime", src: exitRealtyLogo, width: 596, height: 334, shape: "tall" },
  { name: "CLAN Group of Companies", src: clanLogo, width: 534, height: 198, shape: "wide" },
];

export const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/why-choose-us", label: "Why Choose Us" },
  { to: "/contact", label: "Contact Us" },
] as const;

export type NavPath = (typeof NAV_ITEMS)[number]["to"];

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    title: "Customer Support",
    description:
      "Professional assistance to handle customer inquiries and provide a positive customer experience.",
    icon: Headset,
    points: ["Customer inquiries", "Friendly, consistent tone", "Positive experiences"],
  },
  {
    title: "Email Support",
    description:
      "Managing customer emails, inquiries, responses and follow-ups professionally.",
    icon: Mail,
    points: ["Inbox management", "Clear written replies", "Timely follow-ups"],
  },
  {
    title: "Live Chat Support",
    description:
      "Real-time assistance to help website visitors and customers get timely answers.",
    icon: MessagesSquare,
    points: ["Website visitors", "Real-time answers", "Smooth hand-offs"],
  },
  {
    title: "Call Handling",
    description:
      "Professional inbound and outbound call handling to keep your business communication organized.",
    icon: PhoneCall,
    points: ["Inbound calls", "Outbound calls", "Organised communication"],
  },
  {
    title: "Ticket Management",
    description:
      "Managing customer support tickets, tracking requests and helping resolve issues efficiently.",
    icon: Ticket,
    points: ["Ticket tracking", "Request updates", "Efficient resolution"],
  },
  {
    title: "Appointment Setting",
    description:
      "Contacting prospects, following up and scheduling appointments for your business.",
    icon: CalendarCheck,
    points: ["Prospect outreach", "Follow-ups", "Scheduled appointments"],
  },
  {
    title: "Business Outsourcing",
    description:
      "Flexible remote assistance to support everyday business operations and reduce workload.",
    icon: BriefcaseBusiness,
    points: ["Remote assistance", "Everyday operations", "Reduced workload"],
  },
];

export const REASONS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Professional Communication",
    description:
      "Every email, chat and call is handled with a polished, courteous tone that reflects well on your brand.",
    icon: MessageSquareText,
  },
  {
    title: "Reliable Support",
    description:
      "We show up consistently, so your customers always have someone ready to help them.",
    icon: ShieldCheck,
  },
  {
    title: "Customer-Focused Approach",
    description:
      "We listen first, understand the need, and resolve it with genuine care for the customer.",
    icon: HeartHandshake,
  },
  {
    title: "Flexible Business Solutions",
    description:
      "Choose the services you need and adjust them as your business changes and grows.",
    icon: SlidersHorizontal,
  },
  {
    title: "Dedicated Service",
    description:
      "We learn your business, your products and your voice so we can represent you properly.",
    icon: BadgeCheck,
  },
  {
    title: "Affordable Support Solutions",
    description:
      "Professional support without the cost and overhead of building an in-house team.",
    icon: PiggyBank,
  },
];

export const STEPS = [
  {
    title: "Tell Us Your Business Needs",
    description:
      "Share how your business works, who your customers are and where you need support.",
  },
  {
    title: "Choose Your Support Services",
    description: "Select email, live chat, call handling or outsourcing — or a combination.",
  },
  {
    title: "Let Fixly 247 Handle Your Customer Communication",
    description:
      "We take care of your customers while you focus on running and growing your business.",
  },
];
