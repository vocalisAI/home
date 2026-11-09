export const SHOWCASE = [
  {
    id: "answer",
    tab: "Answer",
    feature: "voice-receptionist",
    title: "Picked Up on the First Ring, at Any Hour.",
    body: "Vocalis answers in your clinic’s name, day or night, in more than 50 languages, and takes more than 20 calls at once.",
  },
  {
    id: "understand",
    tab: "Understand",
    feature: "call-intelligence",
    title: "Every Call Becomes a Short, Readable Record.",
    body: "Select a phrase in the caller’s own words to see what Vocalis pulls out of it: what they want, what has gone wrong, and what should happen next.",
  },
  {
    id: "act",
    tab: "Act",
    feature: "scheduling-follow-up",
    title: "Book the Visit and Send the Confirmation.",
    body: "Pick a situation. Vocalis books or moves the appointment, sends the insurance link, or leaves a callback ready for the morning.",
  },
  {
    id: "improve",
    tab: "Improve",
    feature: "clinic-insights",
    title: "See Where Calls Pile Up, and Why.",
    body: "Choose a call reason to see when those calls arrive and what your clinic could change first.",
  },
];

export const PRODUCT_FEATURES = [
  {
    id: "voice-receptionist",
    label: "Voice Receptionist",
    tab: "answer",
    benefit: "Answers Every Call, Day or Night.",
    capabilities: [
      "Picks up 24/7, including weekends and holidays, and handles more than 20 calls at once.",
      "Speaks more than 50 languages and answers questions from your clinic’s own knowledge base.",
      "Hands the call to a person when that is the right next step, with a summary of what was said.",
    ],
    scenario:
      "Two patients call at once while the front desk is busy at the counter. Vocalis answers both, handles the parking question from your knowledge base, and passes a refill request to staff with a note.",
  },
  {
    id: "call-intelligence",
    label: "Call Intelligence",
    tab: "understand",
    benefit: "Turns Each Call into a Record Your Team Can Use.",
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
    benefit: "Books the Visit, Then Follows Through.",
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
    benefit: "Shows Where Patient Access Breaks Down.",
    capabilities: [
      "Groups calls by reason, so repeat questions stand out.",
      "Shows what time of day requests build up.",
      "Suggests changes to try, in plain language.",
    ],
    scenario:
      "Insurance questions cluster in the late morning. The clinic decides to collect insurance details earlier in the call, then checks the pattern again next month.",
  },
];

// Listed in the order Maria's calls happen, so the Workflows page reads as one week.
export const WORKFLOWS = [
  {
    id: "insurance-follow-up",
    when: "Monday, 10:05 AM",
    title: "Recurring Insurance Questions",
    blurb: "Send the insurance link and give staff the history of the call.",
    situation: "Maria is calling for the third time about a Holter monitor approval. Each time, she has had to start over.",
    call: "“It’s my third call about my Holter monitor — insurance still hasn’t approved it.”",
    does: "Vocalis takes her name and date of birth, texts her a link for her insurance details, and books the consult for Tuesday at 10:30.",
    sees: "A call summary marked as a repeat contact, the insurance details once Maria submits them, and the consult on the calendar.",
    note: "Vocalis collects the details. The approval is still the insurer’s decision.",
  },
  {
    id: "appointment-requests",
    when: "Monday, 2:30 PM",
    title: "Rescheduling a Visit",
    blurb: "Book, move or cancel a visit without a hold queue.",
    situation: "Tuesday has stopped working for Maria. The front desk is with someone at the counter.",
    call: "“Could I move my consult to a morning instead? Tuesday doesn’t work anymore.”",
    does: "Vocalis checks the calendar, offers an open morning, books the new time and sends a confirmation.",
    sees: "The new appointment on the calendar, with a one-line note about the change.",
    note: "Booking follows your clinic’s appointment rules.",
  },
  {
    id: "after-hours",
    when: "Monday, 7:42 PM",
    title: "After-Hours Calls",
    blurb: "Answer at 7 PM and leave a callback ready for 8 AM.",
    situation: "The clinic is closed, and the text with the insurance link never reached Maria’s phone.",
    call: "“I never got the text with the insurance link. Could someone call me tomorrow?”",
    does: "Vocalis answers, confirms her number, and queues a callback for opening time with the whole call summarized.",
    sees: "A callback at the top of the morning list, already written up.",
    note: "Vocalis handles administrative requests. For urgent medical needs, callers are directed to your clinic’s emergency guidance.",
  },
  {
    id: "staff-handoff",
    when: "Tuesday, 8:15 AM",
    title: "Handing a Call to Your Team",
    blurb: "Pass the caller to staff with the summary already written.",
    situation: "Maria reaches the line again, and this time she would rather talk to a person.",
    call: "“Can I talk to someone from the team?”",
    does: "Vocalis transfers the call and passes along a summary of her earlier calls.",
    sees: "A staff member who answers already knowing the history, so Maria doesn’t start over.",
    note: "Warm handoffs pass the conversation summary to staff, so patients don’t have to repeat themselves.",
  },
];

export const DATA_PATH = [
  { label: "A Patient Calls", text: "They reach your clinic’s number." },
  { label: "Vocalis Answers", text: "It handles the call and records the request." },
  { label: "Your Team Follows Up", text: "The request lands on your calendar and with your staff." },
  { label: "Patterns Show Up", text: "Call trends appear in your clinic dashboard." },
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
