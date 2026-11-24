// Interactive Advocacy team. Summaries are condensed from each person's bio on interactiveadvocacy.com/team (Nov 2026).
// Before launch: each person approves their card and photo.
export type Member = { slug: string; name: string; role: string; line: string; bio: string[]; photo?: string; link?: string };

export const leadership: Member[] = [
  {
    slug: "tanya-jones", name: "Dr. Tanya O. Jones", role: "Founder and Chief Executive Officer",
    line: "U.S. Army veteran and former Department of Defense professional; President, North Carolina Veterans Business Association.",
    bio: ["Dr. Jones founded Interactive Advocacy to bring violence-prevention training beyond traditional methods, blending storytelling, lived experience, drama, comedy and audience engagement."],
    photo: "/images/portrait-about.jpg", link: "/about",
  },
  {
    slug: "neal-gaulden", name: "Neal Gaulden", role: "Advisory Board Member and Project Manager",
    line: "CEO, GMG Consultants; former Command Managed Equal Opportunity Coordinator.",
    bio: [
      "Neal provides business management best practices and process improvement programs for Interactive Advocacy. He served as a Command Managed Equal Opportunity Coordinator and as President of the Diversity Outreach Committee.",
      "He holds a degree in Business and Marketing, certifications in Project Management and Contract Management, and has served as a Warranted Contracting Officer. He completed Executive Leadership and Effective Management courses at the Naval Facilities Institute and the Naval Leader Development Program.",
    ],
  },
];

export const facilitators: Member[] = [
  {
    slug: "desmond-robinson", name: "Desmond Robinson", role: "Facilitator",
    line: "Retired 21-year Army combat medic; former Brigade and Installation SARC and HQ Air Force SAPR Operations Specialist.",
    bio: [
      "Desmond has championed the Army SHARP and Air Force SAPR programs since 2011, serving as a Victim Advocate, a Brigade SARC with the Army, and an Installation SARC at Joint Base San Antonio, and later as SAPR Operations Specialist for Headquarters Air Force.",
      "A combat veteran, he has presented at the National Organization for Victim Assistance (NOVA) conference, including a training on resiliency for victim advocates and emergency workers.",
    ],
    photo: "/images/team/desmond-robinson.jpg",
  },
  {
    slug: "kimberly-henry", name: "Kimberly Henry, LMSW", role: "Facilitator and Collaborative Partner",
    line: "Licensed social worker; Sexual Assault Prevention and Response Specialist with the U.S. Navy and Air Force.",
    bio: [
      "Kimberly is a social worker and advocate for interpersonal violence prevention, particularly within the military community. She holds a Master's degree in Social Work with a concentration in Military Policy and Programs.",
      "As CEO of The GOLD Beacon, PLLC, she consults for nonprofit organizations on strategic planning for sustainability and positive change.",
    ],
    photo: "/images/team/kimberly-henry.jpg",
  },
  {
    slug: "nicole-snell", name: "Nicole Snell", role: "Facilitator and Collaborative Partner",
    line: "Sexual assault prevention and self-defense expert; programs at more than 90 Navy installations, including the Pentagon.",
    bio: [
      "Nicole is an award-winning international speaker and trainer specializing in sexual assault prevention education, gender-based violence prevention and boundary-setting training. She is CEO of Girls Fight Back, founder of Outdoor Defense, and a lead instructor with IMPACT Personal Safety and IMPACT Global.",
      "She has presented at more than 400 events worldwide for colleges, high schools, the U.S. military and Fortune 500 companies, and has been featured in Women's Health Magazine and on Spectrum 1 News.",
    ],
  },
  {
    slug: "andrea-mckie", name: "Dr. Andrea McKie", role: "Author, Educator and Facilitator",
    line: "Retired Navy veteran; Doctorate in Education; Licensed Clinical Drug and Alcohol Counselor; founder of Sisters in Arms.",
    bio: [
      "Dr. McKie is an award-winning instructor, published author and researcher whose interest in violence prevention was sharpened over ten years of work in the federal government.",
      "She founded the nonprofit Sisters in Arms, focused on restoration and the prevention of violence in the lives of women and girls in underserved communities. She holds a Doctorate in Education with a specialization in Organizational Leadership.",
    ],
    photo: "/images/team/andrea-mckie.jpg",
  },
  {
    slug: "nissi-hamilton", name: "Dr. Nissi Hamilton", role: "Collaborative Partner, Educator and Speaker",
    line: "Award-winning human trafficking prevention expert, veteran and global humanitarian.",
    bio: [
      "Dr. Hamilton is an award-winning expert in human trafficking who brings lived experience to her advocacy. She works toward the decriminalization of human trafficking, poverty and homelessness among minors.",
      "She led the nation's first political campaign against human trafficking when she ran for office in Houston, Texas.",
    ],
    photo: "/images/team/nissi-hamilton.jpg",
  },
  {
    slug: "lakeydra-houston", name: "Lakeydra Houston", role: "Facilitator and Collaborative Partner",
    line: "Certified ASSIST and resiliency trainer; 7+ years in domestic violence, sexual assault prevention and mental health.",
    bio: [
      "Lakeydra's community outreach includes work with high school students and veterans on professional and personal development. She holds a Bachelor's degree in Leadership and is pursuing a Master's in Social Work specializing in military and trauma.",
      "She is a member of American Corporate Partners, Merging Vets & Players, Veteran Counseling Veterans, and The KEY Mentor group.",
    ],
    photo: "/images/team/lakeydra-houston.jpg",
  },
];

// Everyone else on the current team page, by name only.
export const network = {
  partners: ["Aaron Stone", "Chris Moffitt", "Dr. Charleson Gaines", "Dr. Monique Douglas", "Montez Alford"],
  edutainers: ["Asha Devi", "Celine Dirkes", "Chanda Davetas", "David Schifter", "Ella Bennett", "Johnny Kavanagh", "Kate Franklin", "K'jawn Colin", "Patrick Brandt", "Trevor Capel", "Wesley Gonzalez", "Willow Lautenberg"],
  staff: ["Omar Hemmings, Sales Manager"],
};
