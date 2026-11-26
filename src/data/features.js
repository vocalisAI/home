export const SHOWCASE = [
  {
    id: "answer",
    tab: "Answer",
    feature: "voice-receptionist",
    title: "Answering after hours",
    body: "Vocalis answers in your clinic’s name, day or night, in more than 50 languages, and takes more than 20 calls at once.",
  },
  {
    id: "understand",
    tab: "Understand",
    feature: "call-intelligence",
    title: "What the caller needs",
    body: "Select a phrase in the caller’s own words to see what Vocalis pulls out of it: what they want, what has gone wrong, and what should happen next.",
  },
  {
    id: "act",
    tab: "Act",
    feature: "scheduling-follow-up",
    title: "Booking and follow-up",
    body: "Pick a situation. Vocalis books or moves the appointment, sends the insurance link, or leaves a callback ready for the morning.",
  },
  {
    id: "improve",
    tab: "Improve",
    feature: "clinic-insights",
    title: "When patients call back",
    body: "Choose a call reason to see when those calls arrive and what your clinic could change first.",
  },
];

export const PRODUCT_FEATURES = [
  {
    id: "voice-receptionist",
    label: "Voice Receptionist",
    tab: "answer",
    benefit: "Phone coverage around the clock",
    capabilities: [
      "Picks up 24/7, including weekends and holidays, and handles more than 20 calls at once.",
      "Speaks more than 50 languages and answers questions from your clinic’s own knowledge base.",
      "Transfers calls to staff according to your clinic’s rules and includes a summary.",
    ],
    scenario:
      "Two patients call at once while the front desk is busy at the counter. Vocalis answers both, handles the parking question from your knowledge base, and passes a refill request to staff with a note.",
  },
  {
    id: "call-intelligence",
    label: "Call Intelligence",
    tab: "understand",
    benefit: "Call summaries for the front desk",
    capabilities: [
      "Names what the caller wants and what is getting in the way.",
      "Writes a short summary, so no one replays the recording or asks the caller to repeat themselves.",
      "Proposes the next step for your team.",
    ],
    scenario:
      "A caller mentions it is their third call about a pending insurance approval. Vocalis logs the request, marks it as a repeat contact, and suggests a follow-up for staff.",
  },
  {
    id: "scheduling-follow-up",
    label: "Scheduling & Follow-Up",
    tab: "act",
    benefit: "Appointments and reminders",
    capabilities: [
      "Books, reschedules and cancels appointments in your clinic’s calendar.",
      "Sends reminder texts, and a link for patients to share insurance details.",
      "Connects with your EHR and scheduling system, and fills cancelled slots from the waitlist.",
    ],
    scenario:
      "A patient needs to move a Thursday follow-up. Vocalis offers an open morning, books the new time, and sends a confirmation.",
  },
  {
    id: "clinic-insights",
    label: "Clinic Insights",
    tab: "improve",
    benefit: "Call volume and repeat requests",
    capabilities: [
      "Groups calls by reason, so repeat questions stand out.",
      "Shows what time of day requests build up.",
      "Suggests changes to try, in plain language.",
    ],
    scenario:
      "Insurance questions cluster in the late morning. The clinic decides to collect insurance details earlier in the call, then checks the pattern again next month.",
  },
];

export const WORKFLOWS = [
  {
    id: "insurance-follow-up",
    when: "Mon, 10:05 AM",
    title: "Insurance follow-up",
    blurb: "Collect insurance details for a pending approval.",
    situation: "Maria has called twice about coverage for a Holter monitor. Her approval is still pending.",
    call: "“It’s my third call about my Holter monitor. Insurance still hasn’t approved it.”",
    record: "Insurance follow-up note",
    outcome: "Awaiting insurer approval",
    fields: [
      ["Reason", "Third call about the same approval"],
      ["During the call", "Vocalis confirms Maria’s name and date of birth, then texts her a link for her insurance details."],
      ["Calendar", "Consult booked for Tuesday at 10:30 AM"],
    ],
    note: "Staff can see the details once Maria submits them. Her insurer decides coverage.",
  },
  {
    id: "appointment-requests",
    when: "Mon, 2:30 PM",
    title: "Appointment change",
    blurb: "Find another time and send the patient a confirmation.",
    situation: "Maria can’t make Tuesday’s consult. The receptionist is helping someone at the counter.",
    call: "“Do you have a morning appointment on another day?”",
    record: "Calendar change",
    outcome: "Consult rescheduled",
    fields: [
      ["Original visit", "Tuesday at 10:30 AM"],
      ["New time", "Vocalis offers an available morning that fits the clinic’s booking rules."],
      ["Confirmation", "Maria gets a confirmation. The new time and a note about the change appear on the clinic calendar."],
    ],
  },
  {
    id: "after-hours",
    when: "Mon, 7:42 PM",
    title: "After-hours callback",
    blurb: "Leave the morning staff a callback number and a reason.",
    situation: "The insurance link hasn’t arrived. Maria calls again after the office closes.",
    call: "“I never got the text. Could someone call me tomorrow?”",
    record: "Morning callback list",
    outcome: "Due at opening",
    fields: [
      ["Caller", "Maria · number confirmed during the call"],
      ["Reason", "Insurance link missing"],
      ["Staff follow-up", "Call Maria when the clinic opens. Her message is attached to the callback."],
    ],
    note: "For urgent medical needs, Vocalis follows the clinic’s emergency instructions.",
  },
  {
    id: "staff-handoff",
    when: "Tue, 8:15 AM",
    title: "Transfer to the front desk",
    blurb: "Give staff the earlier call notes when they pick up.",
    situation: "The office is open. Maria calls back and asks for a person.",
    call: "“Can I talk to someone from the team?”",
    record: "Transfer summary",
    outcome: "Front desk",
    fields: [
      ["Earlier calls", "Pending Holter approval, rescheduled consult and an insurance link that didn’t arrive"],
      ["At pickup", "The receptionist receives the summary with the call. Maria can pick up where she left off."],
    ],
  },
];

export const DATA_PATH = [
  { label: "Incoming call", text: "The patient dials your clinic’s number." },
  { label: "Call record", text: "It handles the call and records the request." },
  { label: "Staff review", text: "Staff receive the request. Booked visits appear on the calendar." },
  { label: "Clinic dashboard", text: "Call trends appear in your clinic dashboard." },
];

export const PLATFORM_SPECS = [
  ["Availability", "24/7, including weekends and holidays"],
  ["Capacity", "More than 20 calls at the same time"],
  ["Languages", "More than 50"],
  ["Scheduling", "Automated booking, rescheduling and cancellation"],
  ["Systems", "EHR and calendar integration"],
  ["Follow-up", "Reminder texts and waitlist backfill"],
  ["Staff handoff", "Warm transfer with a call summary"],
];
