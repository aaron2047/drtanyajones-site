// Interactive Advocacy training programs. Wording from interactiveadvocacy.com (Nov 2026), typos fixed.
export type Program = {
  slug: string;
  title: string;
  summary: string;
  detail?: string;
  includes?: string[];
  session?: string;
  audience?: string;
};

export const dontJustStandThere = {
  title: "Don't Just Stand There! Series©",
  kicker: "Full immersive theatrical performance-based training · Comedy, Drama",
  body: "The Don't Just Stand There! (Series)© Live Stage Performance sparks conversations about healthy relationships, challenging toxic norms, and creating a culture of prevention. This research-driven training production targets violence prevention through theatrical storytelling.",
  topics: ["Sexual Assault Prevention", "Domestic Violence", "Suicide Prevention", "Mental Health Awareness", "Respect and Safe Spaces", "Unconscious Bias", "Human Trafficking", "Workplace Violence Dynamics"],
};

export const programs: Program[] = [
  {
    slug: "human-rights-awareness",
    title: "Human Rights Awareness",
    summary: "Champion human rights and create a more equitable world. Our live training sessions on human rights awareness empower individuals and organizations to understand, uphold, and promote all people's fundamental rights and dignity.",
    detail: "Join us in raising awareness about human rights. Our live training programs provide immersive experiences that empower individuals and organizations to promote human rights, equality for all, and create environments free of discrimination. Let's work together to foster a culture of dignity and respect.",
    includes: ["(2) SME facilitators", "(2) Edutainers", "Post-training survey", "Curated scripts"],
    session: "One 90-minute immersive training with question and answer (same day)",
    audience: "25 to 250 people",
  },
  {
    slug: "domestic-violence",
    title: "Domestic Violence",
    summary: "Break the cycle of domestic violence. Our live training sessions offer a comprehensive approach to understanding and addressing domestic violence. Gain the knowledge and skills to support survivors, intervene effectively, and create safer environments for all.",
    detail: "Interactive Advocacy uses interactive performance-based (IPB) theater, scripted and impromptu sessions, to engage our audience, foster dialogue, and implement solutions that create a culture of care. (Comedy, Drama)",
    includes: ["(2) SME facilitators", "(6-8) Edutainers", "Post-training survey", "Curated scripts", "Certificate of completion"],
    session: "Two 90-minute immersive trainings with question and answer (same day)",
    audience: "50 to 600 people",
  },
  {
    slug: "suicide-prevention",
    title: "Suicide Prevention",
    summary: "Save lives with our suicide prevention training. Our live sessions provide the tools and strategies to recognize warning signs, initiate conversations, and offer support. Let's make a difference and create a community that values mental health and well-being together.",
    includes: ["(2) SME facilitators", "(4) Edutainers", "Post-training survey", "Curated scripts"],
    session: "One 90-minute immersive training with question and answer (same day)",
    audience: "50 to 600 people",
  },
  {
    slug: "sexual-assault-prevention",
    title: "Sexual Assault Prevention",
    summary: "Join us in the fight against sexual assault. Our live training programs provide immersive experiences that empower individuals and organizations to prevent and respond effectively to sexual assault. Let's create a culture of consent, respect, and empowerment together.",
  },
  {
    slug: "mental-health-awareness",
    title: "Mental Health Awareness",
    summary: "Promote mental health and foster a supportive environment. Our live training sessions enhance understanding of mental health, reduce stigma, and equip participants with practical strategies for self-care and supporting others. Let's create a world where mental health matters.",
  },
];

export const iaFaqs = [
  { q: "What is violence prevention training?", a: "Violence prevention training is an evidence-based program that equips individuals and organizations to recognize early warning signs of harm, intervene safely, and prevent escalation before incidents occur." },
  { q: "What is trauma-informed education?", a: "Trauma-informed education is an approach that helps organizations understand the impact of trauma and respond with practices that promote safety, trust, and emotional well-being." },
  { q: "What is bystander intervention?", a: "Bystander intervention is the practice of recognizing potentially harmful situations and taking safe, appropriate action to prevent harm or de-escalate risk." },
  { q: "How do I book a trauma-informed education session in the US?", a: "Organizations in the US can book a trauma-informed education session by requesting a consultation through the training quote form on this page. We work with each organization to understand their needs, audience, and goals, and then design a tailored session that can be delivered virtually or in person depending on location and scope. Sessions are immersive, practical, and aligned with trauma-informed principles that promote safety, trust, and engagement." },
  { q: "How does trauma-informed education help build safe spaces?", a: "Trauma-informed education equips individuals and organizations with a deeper understanding of how trauma affects behavior, communication, and decision-making. This awareness allows participants to respond with empathy, reduce harmful interactions, and create environments grounded in safety, trust, and accountability. Over time, this approach strengthens organizational culture and supports healthier, more respectful relationships across teams and communities." },
  { q: "Where can I host a performance-based sexual assault prevention presentation in North Carolina?", a: "Interactive Advocacy delivers performance-based sexual assault prevention presentations in partnership with universities, colleges, corporate organizations, community groups, and public service agencies across North Carolina. These immersive sessions are most effective in environments that prioritize education, culture change, and safety awareness, including higher education campuses, training conferences, and organizational development programs. Each presentation is adapted to the specific needs and context of the host institution." },
  { q: "How can immersive storytelling support sexual assault prevention?", a: "Immersive storytelling engages participants emotionally and cognitively in real-world scenarios. It helps individuals recognize risk, understand consequences, and develop empathy for those affected by harm. By making learning experiential and memorable, it improves retention, encourages reflection, and strengthens safe intervention behaviors in real-life situations." },
];

// "Tanya's Journey to Empower Through Training Tools": four of the ten panels on the current site, unchanged.
export const toolStory = [
  { t: "Inspiration strikes", d: "Tanya's inspiration struck while crafting and utilizing training tools in her office. A thought-provoking question presented by a friend ignited her deep reflection on her path in the world of advocacy. Driven and determined to make a more significant impact, she embarked on a journey of innovation with a mission to reach a broader audience and create meaningful change." },
  { t: "A proud moment", d: "During a national conference, Tanya's vision manifested into a reality. A gentleman approached her table, filled with joy as he witnessed the birth of \"This Is Not A Game™.\" Fondly reminiscing about attending one of Tanya's previous trainings, he expressed his pride in seeing the tool she had used for his training years earlier now transformed into a widely accessible resource." },
  { t: "Real-world impact", d: "Recognizing the seriousness of the subject matter, she emphasized that these tools were not mere games. They incorporate real-world scenarios, addressing complex topics such as sexual assault, harassment, consent, resiliency, diversity, and more." },
  { t: "Guided by experience", d: "Drawing from her personal experience with trauma and over 20 years of teaching and training experience, Tanya always sought innovative and impactful ways to engage her audience. Guided by theory-driven psychodramatic techniques, her training tools provide education, support, and empowerment for trauma victims." },
];
