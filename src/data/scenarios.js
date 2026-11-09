// Names, times and counts used by the interactive demos.

export const CLINIC = "Riverside Cardiology";

export const CALL_LINES = [
  { id: "l1", who: "vocalis", text: `${CLINIC}, this is Vocalis. How can I help?` },
  {
    id: "l2",
    who: "caller",
    parts: [
      { t: "It’s my " },
      { t: "third call", tag: "friction" },
      { t: " about my Holter monitor — " },
      { t: "insurance still hasn’t approved it.", tag: "intent" },
    ],
  },
  {
    id: "l3",
    who: "vocalis",
    text: "I’m sorry you’ve had to call again. Could I take your name and date of birth?",
  },
  { id: "l4", who: "caller", note: "Maria gives her name and date of birth" },
  {
    id: "l5",
    who: "vocalis",
    text: "Thank you, Maria. I’m texting you a link for your insurance details, and I’ve booked your consult for Tuesday at 10:30.",
  },
];

export const UNDERSTAND_CARDS = {
  intent: {
    label: "Intent",
    value: "Insurance follow-up",
    detail: "Maria is waiting on an approval for a Holter monitor.",
  },
  friction: {
    label: "Friction",
    value: "Repeat contact",
    detail: "Her third call about the same open item.",
  },
  next: {
    label: "Next Step",
    value: "Collect insurance details and book the consult",
    detail: "The insurance link goes to Maria’s phone. Staff get the summary.",
  },
};

export const ACT_SCENARIOS = [
  {
    id: "insurance",
    label: "Insurance Follow-Up",
    request: { title: "Holter monitor — insurance pending", meta: "Third call · Maria R." },
    task: "Send the insurance link; flag the call for staff review",
    slot: { day: 1, row: 3, label: "Tue 10:30 AM · EP consult" },
    status: "Consult booked",
  },
  {
    id: "reschedule",
    label: "Reschedule Request",
    request: { title: "Move Thursday follow-up", meta: "Caller prefers mornings · James T." },
    task: "Offer open mornings, then confirm the new appointment",
    slot: { day: 3, row: 1, label: "Thu 9:30 AM · Follow-up" },
    status: "Appointment rescheduled",
  },
  {
    id: "afterhours",
    label: "After-Hours Message",
    request: { title: "Refill question left at 7:42 PM", meta: "Caller asked for a call back · Priya N." },
    task: "Queue a callback for opening time, with the call summary",
    slot: { day: 0, row: 0, label: "Mon 9:00 AM · Callback" },
    status: "Callback queued for the morning",
  },
];

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const WEEK_ROWS = ["9:00", "9:30", "10:00", "10:30", "11:00"];
// Static occupancy (1 = already scheduled)
export const WEEK_BUSY = [
  [0, 1, 1, 0, 0],
  [1, 0, 1, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 0, 0, 0, 1],
  [0, 0, 1, 1, 0],
];

export const SLOT_LABELS = [
  "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00",
];

export const INSIGHT_REASONS = [
  {
    id: "insurance",
    label: "Insurance Questions",
    values: [1, 2, 2, 3, 5, 8, 12, 14, 9, 5, 3, 2, 2, 2, 1, 1, 1],
    recommendation:
      "Insurance questions bunch up in the late morning. Collecting insurance details by text earlier in the call, and clearing open items before 11, would shorten the queue.",
  },
  {
    id: "scheduling",
    label: "Scheduling Requests",
    values: [6, 8, 7, 5, 4, 4, 3, 3, 2, 3, 4, 5, 5, 4, 3, 2, 2],
    recommendation:
      "Scheduling requests peak as the day opens and ease off by midday. Offering open slots in the first reply gets these calls booked before the front desk is at full speed.",
  },
  {
    id: "afterhours",
    label: "After-Hours Messages",
    values: [9, 5, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3],
    recommendation:
      "Messages left overnight are waiting when the doors open. A callback list with every call summarized lets staff start with the most urgent ones.",
  },
];
