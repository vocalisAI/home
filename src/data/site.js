export const CONTACT_EMAIL = "meetvocalis@gmail.com";
export const DEMO_HREF = "/#contact";

export const FEATURES = [
  { id: "voice-receptionist", tab: "answer", label: "Voice Receptionist" },
  { id: "call-intelligence", tab: "understand", label: "Call Intelligence" },
  { id: "scheduling-follow-up", tab: "act", label: "Scheduling & Follow-Up" },
  { id: "clinic-insights", tab: "improve", label: "Clinic Insights" },
];

export const NAV = [
  {
    label: "Product",
    items: [
      { to: "/product?feature=voice-receptionist", label: "Voice Receptionist", note: "Answer Every Call" },
      { to: "/product?feature=call-intelligence", label: "Call Intelligence", note: "Understand Each Request" },
      { to: "/product?feature=scheduling-follow-up", label: "Scheduling & Follow-Up", note: "Turn Requests into Next Steps" },
      { to: "/product?feature=clinic-insights", label: "Clinic Insights", note: "See Recurring Problems" },
      { to: "/security", label: "Security & Privacy", note: "How We Approach Data" },
    ],
  },
  {
    label: "For Clinics",
    items: [
      { to: "/workflows#appointment-requests", label: "Appointment Requests" },
      { to: "/workflows#insurance-follow-up", label: "Insurance Follow-Up" },
      { to: "/workflows#after-hours", label: "After-Hours Coverage" },
      { to: "/workflows#staff-handoff", label: "Staff Handoff" },
    ],
  },
  { label: "Pricing", to: "/pricing" },
  {
    label: "Company",
    items: [
      { to: "/about", label: "About Vocalis" },
      { to: "/about#why-the-name", label: "Why the Name" },
      { to: "/#contact", label: "Contact" },
    ],
  },
];

// Old public in-page anchors on `/` -> new destinations.
export const LEGACY_HASHES = {
  "#pricing": "/pricing",
  "#security": "/security",
  "#hipaa": "/security",
  "#about": "/about",
  "#team": "/about",
  "#faq": "/pricing#faq",
  "#benefits": "/product",
  "#features": "/product",
  "#capabilities": "/product",
  "#demo": "/product",
  "#multilingual": "/product",
};
