export interface TimelineItem {
  year: string;
  title: string;
  body: string;
}

export interface LeadershipMember {
  name: string;
  title: string;
  role: string;
  initials: string;
  gradient: string;
}

export interface RoadmapPhase {
  phase: string;
  period: string;
  title: string;
  goal: string;
  items: string[];
}

export const ABOUT_STATS = [
  { target: 10, suffix: "+", label: "Years of EV Research & Ecosystem", color: "text-[#00D084]" },
  { target: 15000, suffix: "+", label: "Learners Trained in EV Technologies", color: "text-emerald-400" },
  { target: 300, suffix: "+", label: "Workshops & Technical Programs", color: "text-teal-400" },
  { target: 10, suffix: "+", label: "Engineering Institutional Partners", color: "text-[#00D084]" },
  { target: 25, suffix: "+", label: "Corporate Industry Collaborations", color: "text-emerald-400" },
  { target: 10, suffix: "+", label: "EV Technology OEM Partners", color: "text-teal-400" },
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2017",
    title: "The Beginning of the EV Journey",
    body: "Our journey into electric mobility began with research and early initiatives focused on understanding the emerging EV technology landscape and the opportunities within the ecosystem.",
  },
  {
    year: "2018",
    title: "EV Awareness & Training Programs",
    body: "We started conducting EV awareness programs and technical workshops for engineering students and industry professionals. These programs helped introduce EV technology fundamentals to a wider audience.",
  },
  {
    year: "2019",
    title: "Institutional Collaborations",
    body: "Partnerships with engineering institutions began to support EV skill development programs and practical training initiatives. These collaborations helped bridge the gap between academia and emerging EV industry requirements.",
  },
  {
    year: "2020",
    title: "Development of EV Learning Infrastructure",
    body: "Focus shifted towards creating hands-on EV learning solutions and lab infrastructure for institutions to support practical EV technology education.",
  },
  {
    year: "2021",
    title: "Expansion of Industry Ecosystem",
    body: "Our network expanded through collaborations with EV startups, technology companies, and ecosystem stakeholders to support training, awareness, and industry development.",
  },
  {
    year: "2022-2023",
    title: "Building the Autobot EV Ecosystem",
    body: "Development began on an integrated EV ecosystem combining training platforms, infrastructure solutions, and technology systems.",
  },
  {
    year: "2024",
    title: "Development of Autobot OS",
    body: "Our team developed Autobot OS, an AI-powered digital platform designed to automate EV service operations and support scalable EV service businesses.",
  },
  {
    year: "2025",
    title: "Launch of MY EV SERVICE",
    body: "The MY EV SERVICE concept was launched to create a multi-brand EV service network across India, providing professional service infrastructure for electric vehicles.",
  },
  {
    year: "2026",
    title: "National Network Expansion",
    body: "The focus now is on expanding the MY EV SERVICE network across major Tier 1 cities, Tier 2 and Tier 3 markets, enabling entrepreneurs to participate in the EV ecosystem.",
  },
];

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: "Ashwini Tiwary",
    title: "Co-Founder & CEO",
    role: "EV Technology & Strategy",
    initials: "AT",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Kunal Gupta",
    title: "Co-Founder & COO",
    role: "Ecosystem & Skill Development",
    initials: "KG",
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    name: "Dr. R. A. Panda",
    title: "Chief Technical Advisor",
    role: "EV Powertrain & Battery Systems",
    initials: "RP",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    name: "Sanjay Sharma",
    title: "Head of Business Expansion",
    role: "Franchise & Network Operations",
    initials: "SS",
    gradient: "from-teal-600 to-emerald-700",
  },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    period: "2025 – 2026",
    title: "Ecosystem Foundation",
    goal: "Establish standard operational platforms and local training modules.",
    items: [
      "Launch MY EV SERVICE pilot hubs",
      "Deploy Autobot OS v1 core features",
      "Certify first 1,000 technician graduates",
      "Initiate engineering college partner programs",
    ],
  },
  {
    phase: "Phase 2",
    period: "2027 – 2028",
    title: "Network Expansion",
    goal: "Expand service centers in Tier 2 and Tier 3 regions to support regional networks.",
    items: [
      "Open regional distribution nodes",
      "Deploy battery diagnostics updates",
      "Onboard micro-fleet delivery logistics partners",
      "Establish spare parts distribution centers",
    ],
  },
  {
    phase: "Phase 3",
    period: "2029 – 2030",
    title: "Predictive Tech Integration",
    goal: "Deploy machine learning diagnostics models to forecast vehicle health.",
    items: [
      "AI predictive battery life modules",
      "Fleet dispatch routing platforms",
      "Direct integrations with EV OEM dashboards",
      "Autonomous roadside assistant routing",
    ],
  },
];

export const DUAL_PILLARS = [
  {
    title: "Autobot Engineers India",
    subtitle: "EV Engineering & Skill Ecosystem",
    description: "Focuses on EV technology benchmark research, engineering tools, digital skill validation, and academic program collaborations. Over the years, Autobot Engineers has laid the technological foundation for EV diagnostics and workforce certification.",
    points: [
      "Developing EV testing lab equipment and validation systems",
      "EV technology benchmarking and parts cataloging",
      "High-voltage safety & troubleshooting workshops",
      "Institutional collaborations with engineering colleges",
      "Technician training curricula and digital credentials",
      "Industry awareness and green-energy initiatives",
    ],
  },
  {
    title: "Autobot Emobility Business Solution",
    subtitle: "Infrastructure Platforms & Digital OS",
    description: "Responsible for operations platforms, franchise business models, logistics frameworks, and corporate integration solutions for the EV servicing sector.",
    points: [
      "Development of Autobot OS, an AI-powered operations center",
      "Execution and deployment of the MY EV SERVICE brand network",
      "Supply chain systems and multi-brand parts distribution",
      "Building enterprise integration APIs for OEMs and fleet partners",
    ],
  },
];
