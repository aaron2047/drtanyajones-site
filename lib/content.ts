// All copy marked placeholder: true must be replaced with verified content before launch.
export const site = {
  name: "Dr. Tanya O. Jones",
  tagline: "Leadership strategist. U.S. Army veteran. Convener of policy and leadership forums.",
  // From the Digital Presence Review: verified-in-audit credentials only. Titles, awards and impact numbers are
  // intentionally omitted until sourced (see audit section 07).
  credentials: [
    "U.S. Army veteran",
    "Former Department of Defense professional",
    "Founder, Interactive Advocacy",
    "Creator, GLOW Framework",
  ],
};

export const formats = [
  { title: "Closed-door policy roundtable", detail: "Small, invitation-only dialogue between grassroots leaders and policymakers.", placeholder: true },
  { title: "Convening keynote + facilitated forum", detail: "Opening keynote followed by a structured, outcome-driven working session.", placeholder: true },
  { title: "Executive and institutional conversation", detail: "Moderated discussion tailored to government, international and institutional hosts.", placeholder: true },
  { title: "Panel and fireside", detail: "Dr. Jones as panelist, moderator or fireside guest.", placeholder: true },
];

export const topics = [
  { title: "Policy influence", detail: "Bridging grassroots groups with global policymakers, regional bodies and intergovernmental agencies." },
  { title: "Human rights and equity", detail: "Healthcare, disability rights and religious freedom as universal human rights, not commodities." },
  { title: "Serving military and veteran communities", detail: "Safety, accountability and lasting cultural change for those who served." },
  { title: "Safer schools, workplaces and public institutions", detail: "Proactive violence prevention through engagement, empowerment and transformation (A.C.T©)." },
  { title: "Women's leadership and governance", detail: "Placeholder topic. Confirm wording with Dr. Jones.", placeholder: true },
  { title: "Faith and values in public life", detail: "Placeholder topic. Confirm wording with Dr. Jones.", placeholder: true },
];

export const outcomes = [
  "A shared problem statement agreed by every stakeholder in the room",
  "Prioritized recommendations tied to named owners",
  "A short written summary the host can circulate within days",
];

export const faqs = [
  { q: "Who hosts a Policy & Leadership Forum?", a: "Government bodies, international and intergovernmental organizations, universities, associations and institutions. [PLACEHOLDER: confirm host types.]" },
  { q: "How far in advance should we reach out?", a: "[PLACEHOLDER: confirm lead time, e.g. 8 to 12 weeks for convenings.]" },
  { q: "Can Dr. Jones travel internationally?", a: "[PLACEHOLDER: confirm travel and virtual availability.]" },
  { q: "What are the speaking fees?", a: "[PLACEHOLDER: fee policy pending. Paid forum and keynote inquiries are routed separately from pro-bono requests.]" },
  { q: "What do you need from the host?", a: "A short brief on audience, goals, date and format. The inquiry form below captures this so we can reply with a proposal." },
  { q: "Do you provide a one-sheet or press kit?", a: "[PLACEHOLDER: link to forum one-sheet and press kit once approved.]" },
];

export const inquiryTypes = [
  { value: "forum", label: "Policy & Leadership Forum" },
  { value: "keynote", label: "Keynote or panel" },
  { value: "training", label: "Training quote (Interactive Advocacy)" },
  { value: "probono", label: "Pro-bono request" },
  { value: "other", label: "Something else" },
] as const;
