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

export const CONTACT = {
  phoneDisplay: "+923021001781",
  phoneHref: "tel:+923021001781",
  whatsappDisplay: "+923021001781",
  email: "fixly247@gmail.com",
  emailHref: "mailto:fixly247@gmail.com",
} as const;

export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/923021001781",
  facebook: "https://www.facebook.com/share/1EiHZgT7M9/",
  instagram: "https://www.instagram.com/fixly247?xtok=MXFxczNwZjZteWJvZA==",
} as const;

export const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/experience", label: "Our Experience" },
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

export type Experience = {
  company: string;
  detail: string;
  role: string;
  current: boolean;
  tags: string[];
  points: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    company: "Powerwing",
    detail: "Shopify Store",
    role: "Ongoing Customer Support Management",
    current: true,
    tags: ["E-commerce", "Customer Support"],
    points: [
      "Currently managing customer inquiries.",
      "Handling ongoing customer support requests.",
      "Supporting the store's everyday customer communication.",
    ],
  },
  {
    company: "Exit Realty Prime",
    detail: "Mr. Qureshi",
    role: "Real Estate Agent",
    current: true,
    tags: ["Real Estate", "Cold Calling"],
    points: [
      "Contacting potential property sellers through cold calling.",
      "Discussing their property selling plans and interest.",
      "Following up with prospects about future selling opportunities.",
    ],
  },
  {
    company: "The Install Guys",
    detail: "TV Installation Company",
    role: "Inbound Calls & Email Support",
    current: false,
    tags: ["Inbound Calls", "Email Support"],
    points: [
      "Handled incoming customer calls.",
      "Responded to email inquiries.",
      "Assisted customers with TV installation services and appointments.",
    ],
  },
  {
    company: "US-Based TV Service Provider",
    detail: "",
    role: "Cold Calling & Sales Closing",
    current: false,
    tags: ["Cold Calling", "Sales"],
    points: [
      "Reached potential customers through cold calling.",
      "Explained services and answered customer questions.",
      "Helped close sales.",
    ],
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
