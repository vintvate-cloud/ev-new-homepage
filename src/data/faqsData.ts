export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES = [
  "All FAQs",
  "Booking & Doorstep Service",
  "Battery Health & Warranty",
  "Franchise & Investment",
  "Spare Parts & Compatibility",
  "Payment & Invoicing",
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: "FAQ-01",
    category: "Booking & Doorstep Service",
    question: "How does doorstep EV service work?",
    answer: "Our certified mobile technician arrives at your home or office in an equipped mobile service van. They perform 32-point diagnostics, battery checks, fluid top-ups, and minor repairs on the spot.",
  },
  {
    id: "FAQ-02",
    category: "Booking & Doorstep Service",
    question: "How can I track the live status of my service?",
    answer: "You can track your service status in real-time by entering your Booking ID or Mobile Number on our Track Service page (/track). You will see live stage updates from initial inspection to final quality checks.",
  },
  {
    id: "FAQ-03",
    category: "Battery Health & Warranty",
    question: "How is the State of Health (SOH) of my battery calculated?",
    answer: "We perform individual cell-level voltage telemetry, internal resistance checks, and thermal stress testing using Autobot OS diagnostic scanners to provide an accurate SOH percentage certificate.",
  },
  {
    id: "FAQ-04",
    category: "Battery Health & Warranty",
    question: "What warranty do you offer on replacement parts and repairs?",
    answer: "All genuine OEM spare parts carry up to 3 years warranty depending on the component (e.g. 3 years on Lithium Battery Packs, 2 years on Controllers/Motors, 1 year on tyres). Services carry a 30-day workmanship guarantee.",
  },
  {
    id: "FAQ-05",
    category: "Franchise & Investment",
    question: "What are the requirements to start a My EV Service franchise?",
    answer: "Depending on the chosen tier (Garage, Centre, or Hub), you need 500 to 2,000+ sq ft workshop space, an initial investment starting from ₹5 Lakhs, and a passion for electric mobility. We provide full training, tools, and Autobot OS software.",
  },
  {
    id: "FAQ-06",
    category: "Franchise & Investment",
    question: "How long does it take to get a franchise operational?",
    answer: "The onboarding process takes 14 to 30 days from initial application submission to site inspection, technician master certification, signages installation, and live booking dispatch.",
  },
  {
    id: "FAQ-07",
    category: "Spare Parts & Compatibility",
    question: "Are your spare parts genuine OEM components?",
    answer: "Yes, 100% of our spare parts are sourced directly from certified OEM manufacturing facilities and tested for high-voltage isolation safety and CAN-bus protocol compatibility.",
  },
  {
    id: "FAQ-08",
    category: "Payment & Invoicing",
    question: "What payment methods do you accept?",
    answer: "We accept Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), Net Banking, and Cash on Delivery / Doorstep Payment after service completion.",
  },
];
