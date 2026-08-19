import { Shield, Activity, Zap, Terminal } from "lucide-react";

export const PACKAGES = [
  {
    id: "PKG-001",
    title: "Basic Care Pack",
    desc: "Essential protection for your EV",
    price: "₹999",
    oldPrice: "₹2,000",
    save: "Save 50%",
    tag: "Launch Offer",
    validity: "Valid for 365 days from activation",
    icon: Shield,
    img: "/packages/basic-care.png",
    longDesc: "The Basic Care Pack provides essential diagnostic and maintenance services for your EV. Ideal for annual checkups and ensuring your vehicle is running efficiently.",
    features: [
      "Comprehensive Diagnostic Scan",
      "Battery Health Check",
      "Tyre Pressure & Tread Inspection",
      "Fluid Level Top-up (Brake, Coolant)",
      "Basic Exterior Wash"
    ],
  },
  {
    id: "PKG-002",
    title: "Smart Protect Pack",
    desc: "Comprehensive protection & diagnostics",
    price: "₹2,999",
    oldPrice: "₹6,000",
    save: "Save 50%",
    tag: "Most Popular",
    validity: "Valid for 365 days from activation",
    icon: Activity,
    img: "/packages/smart-protect.png",
    longDesc: "Our Smart Protect Pack is the most comprehensive protection package for daily drivers. It includes deep diagnostic scans and software updates to keep your EV at peak performance.",
    features: [
      "Everything in Basic Care",
      "Firmware & Software Updates",
      "Brake Pad & Rotor Inspection",
      "Suspension & Steering Check",
      "HVAC System Cleaning & Top-up"
    ],
  },
  {
    id: "PKG-003",
    title: "Complete EV Health Pack",
    desc: "The ultimate EV health package",
    price: "₹4,499",
    oldPrice: "₹9,000",
    save: "Save 50%",
    tag: "Premium Offer",
    validity: "Valid for 365 days from activation",
    icon: Zap,
    img: "/packages/complete-health.png",
    longDesc: "The Complete EV Health Pack offers total peace of mind. Every single component of your electric vehicle is thoroughly inspected, cleaned, and optimized.",
    features: [
      "Everything in Smart Protect",
      "High Voltage Battery Deep Scan",
      "Motor & Drivetrain Lubrication",
      "Premium Interior Detailing",
      "Priority Roadside Assistance"
    ],
  },
  {
    id: "PKG-004",
    title: "Fleet Maintenance Pack",
    desc: "Bulk service for fleet operators",
    price: "₹7,499",
    oldPrice: "₹15,000",
    save: "Save 50%",
    tag: "Enterprise",
    validity: "Valid for 365 days from activation",
    icon: Terminal,
    img: "/packages/fleet-maintenance.png",
    longDesc: "Designed for commercial fleets, this package ensures maximum uptime for your vehicles. Fast turnarounds, priority servicing, and detailed fleet health reports.",
    features: [
      "Dedicated Account Manager",
      "On-site Diagnostic Support",
      "Fleet Telematics Integration",
      "Bulk Replacement Discounts",
      "24/7 Priority Support"
    ],
  }
];
