export interface ServiceItem {
  id: string;
  name: string;
  category: 'medical' | 'fumigation' | 'training' | 'rentals';
  shortDesc: string;
  fullDesc: string;
  features: string[];
}

export interface ClientPartner {
  name: string;
  category: 'Education' | 'Corporate & Environment' | 'Hospitality & Venue' | 'Sports' | 'International Manufacturing';
  location: string;
  description?: string;
}

export interface Accreditation {
  name: string;
  abbr?: string;
  region: string;
  role: string;
}

export const COMPANY_INFO = {
  name: "Bright Light Integrated Services",
  shortName: "BRILIS",
  rcNumber: "8162390",
  yearEstablished: 2018,
  slogan: "A Brighter, Pest-Free Environment for a Better Life",
  tagline: "Your Training & Event Support Partner",
  foundingLocation: "Lagos State, Nigeria (Alagbado founding headquarters)",
  headquarters: "64 Aseese Road, by Transformer bustop, off Arewa bustop, off Lagos Ibadan Expressway, Ogun State.",
  branches: [
    { state: "Ogun State", role: "Current Headquarters", address: "64 Aseese Road by Transformer bustop, off Arewa bustop, off Lagos Ibadan Expressway" },
    { state: "Lagos State", role: "Founding Hub", address: "Alagbado, Lagos State" },
    { state: "Benue State", role: "Regional Branch", address: "Benue State, Nigeria" }
  ],
  phones: ["08080397177", "09017061403", "08121573471"],
  whatsapp: "2349017061403",
  emails: ["brightlightintservices@gmail.com", "support@brightlight.com.ng"],
  socials: {
    facebook: "Bright Light integrated Services",
    instagram: "Brilight2024"
  },
  mission: "To transform service delivery for total client satisfaction while raising world-class professionals through our top-notch training model.",
  vision: "To be the leading and most trusted agency in our core sectors, setting the standard as a role model for excellence in service delivery.",
  coreValues: [
    { letter: "S", title: "Sustainability", desc: "Eco-friendly, durable, and forward-looking solutions across healthcare and pest management." },
    { letter: "H", title: "Honesty", desc: "Absolute transparency, authentic certified products, and uncompromising integrity with clients." },
    { letter: "I", title: "Innovation", desc: "Leveraging cutting-edge diagnostic analyzers, modern equipment, and contemporary methodologies." },
    { letter: "P", title: "Professionalism", desc: "Disciplined execution by licensed personnel adhering strictly to international standards." },
    { letter: "T", title: "Trust", desc: "A track record of reliability, zero quackery, and long-standing corporate client relationships." },
    { letter: "E", title: "Excellent Delivery", desc: "Prompt response, punctuality, and meticulous attention to every operational detail." },
    { letter: "Q", title: "Quality Assurance", desc: "Adherence to ISO 9001:2015 QMS standards with certified equipment and genuine supplements." }
  ],
  subAgencies: [
    {
      name: "Bright Professional Training Consult",
      focus: "Internationally licensed and accredited healthcare training agency providing BLS, ACLS, First Aid, Disaster Management, and Healthcare Assistant level certifications with UK CPD recognition.",
      accreditations: ["CPD (United Kingdom)", "NHCPS (United Kingdom)", "NAOH (United States)", "ASHP Nigeria", "Healthcare Federation of Nigeria"]
    },
    {
      name: "QRFS Global Resources",
      focus: "Specialized resource management, corporate rental solutions, logistics, and merchandise supply for institutions and large-scale events."
    }
  ],
  ceo: {
    name: "Dr. Okezie Eze Miracle",
    qualifications: "PhD, ACLS, CFA",
    title: "C.E.O / Director",
    bio: "Dr. Okezie Eze Miracle is a seasoned healthcare professional with over 10 years of experience in Community Health, Medicine, First Aid, Public Health, Healthcare Management, Medical Equipment Procurement/Logistics, Transport and I.T. He holds qualifications in Health/Medical and Integrative Medicine, as well as a Doctorate in Healthcare Management. He also holds an International Certificate in Advanced Cardiovascular Life Support (ACLS) from the Postgraduate Institute of Medicine, USA, and is an Accredited Advanced Cardiac Life Support Provider certified by the Advanced Medical Certification Board, United Kingdom.",
    certifications: [
      "Doctorate in Healthcare Management",
      "Advanced Cardiovascular Life Support (ACLS) - Postgraduate Institute of Medicine, USA",
      "Accredited ACLS Provider - Advanced Medical Certification Board, UK",
      "Advanced Chronic Disease Management",
      "Environmental Management System (EMS) ISO 14001:2005",
      "Quality Management System (QMS) ISO 9001:2015",
      "World Safety Organization HSE Level 1, 2 & 3",
      "Fire Fighting and Safety",
      "International Diplomacy & Conflict Resolution",
      "Digital Nursing & Medical Social Work"
    ],
    memberships: [
      "Nigerian Red Cross Society (NCRS)",
      "Pest Control Association of Nigeria",
      "Association of Community Health Practitioners of Nigeria",
      "Association of Integrative Medicine Practitioners of Nigeria",
      "African Society of Health Practitioners",
      "Hypertension Society of Nigeria"
    ],
    impact: "Trained over 200 individuals and organizations, participated in numerous community medical outreaches, and served as keynote speaker at prominent Health and Environmental Seminars."
  },
  usps: [
    {
      number: "01",
      title: "4-in-1 Integrated Solution Under One Roof",
      description: "We consolidate Fumigation, Medical & Healthcare, Professional Training, and Equipment Rentals into one trusted agency — saving you time, overhead, and the friction of juggling multiple disjointed vendors."
    },
    {
      number: "02",
      title: "Certified Professionals & Quality Assured Products",
      description: "From licensed fumigators and registered medical personnel to NAFDAC/standard-approved health supplements and drugs — all services meet stringent safety protocols. No quack, no fake."
    },
    {
      number: "03",
      title: "Affordable, Preventive & Results-Driven Approach",
      description: "We focus on prevention before cure. Whether it is pest eradication, early diagnostic check-ups with Quantum Body Analysis, or life-saving emergency training, we deliver visible, durable results."
    },
    {
      number: "04",
      title: "Community-Focused with Free Value-Added Services",
      description: "We genuinely invest in public wellness. Initiatives like our Free Monday Health Consultations in partnership with the Healthy Attitude Club ensure healthcare access for community members."
    },
    {
      number: "05",
      title: "Reliable, Professional & Prompt Nationwide Dispatch",
      description: "Recognized for rapid deployment, seamless outreach coordination, and pristine rental equipment. We deliver punctually across Ogun, Lagos, Benue, and client sites nationwide."
    }
  ],
  targetPests: [
    { name: "Mosquitoes", risk: "Malaria & Dengue vector control via thermal fogging" },
    { name: "Rodents & Rats", risk: "Lassa fever prevention and cable/food damage control" },
    { name: "Termites & Wood Borers", risk: "Structural timber, ceiling beam and roofing protection" },
    { name: "Cockroaches & Ants", risk: "Kitchen, canteen, and pantry hygiene sanitation" },
    { name: "Reptiles & Snakes", risk: "Perimeter chemical barrier and repellent application" },
    { name: "Scorpions & Spiders", risk: "Crevice misting, dusting, and attic clearance" },
    { name: "Crickets & Crawling Pests", risk: "Foundation perimeter and drain extermination" }
  ],
  services: {
    medical: [
      {
        id: "med-consult",
        title: "Health & Medical Consultations",
        desc: "Holistic clinical assessments, preventive healthcare advisories, and targeted wellness counseling led by qualified healthcare professionals."
      },
      {
        id: "med-outreach",
        title: "Medical Outreach Planning & Management",
        desc: "Turnkey planning and field execution of community and corporate health outreaches, including screening stations, medical staff, and drug distribution."
      },
      {
        id: "med-procure",
        title: "Medical Procurement Services",
        desc: "State-of-the-art diagnostic and clinical equipment procurement for hospitals, clinics, labs, and agencies, sourced directly from verified international partners in China (Sugama Super Union, Jiangsu Medlead) and Turkey (Mespa Global)."
      },
      {
        id: "med-seminars",
        title: "Health & Wellness Seminars / Facilitations",
        desc: "Corporate health talks, workplace wellness seminars, chronic disease management, and ergonomic health workshops for organizations."
      },
      {
        id: "med-quantum",
        title: "Quantum Body Analyzing & Full Check-ups",
        desc: "Comprehensive bio-resonance body analysis providing detailed reports on cardiovascular, organ, and metabolic systems to facilitate timely preventive intervention."
      },
      {
        id: "med-supplements",
        title: "Health Supplements & Treatment Drugs",
        desc: "Supply of authentic, quality-assured dietary supplements, emergency medication, and approved healthcare formulations."
      }
    ],
    fumigation: [
      {
        id: "fum-pest",
        title: "Fumigation & Pest Control Services",
        desc: "Thorough eradication of mosquitoes, termites, rodents, cockroaches, and bedbugs using advanced, low-toxicity eco-friendly techniques."
      },
      {
        id: "fum-custom",
        title: "Customized Property Pest Plans",
        desc: "Tailored treatment and barrier protection strategies designed for residential estates, schools, warehouses, hotels, and corporate offices."
      },
      {
        id: "fum-hygiene",
        title: "Pathogen & Allergen Reduction",
        desc: "Deep disinfection protocols that reduce airborne allergens, fungi, and dangerous pathogens, improving indoor environmental air quality."
      },
      {
        id: "fum-disease",
        title: "Vector-Borne Disease Prevention",
        desc: "Targeted extermination cycles designed to prevent deadly transmissions of malaria, dengue fever, and rodent-borne illnesses."
      }
    ],
    training: [
      {
        id: "trn-firstaid",
        title: "First Aid & Emergency Management",
        desc: "Comprehensive hands-on training on workplace first response, wound triage, fracture stabilization, choking rescue, and incident command."
      },
      {
        id: "trn-bls-acls",
        title: "BLS & Advanced Cardio Life Support (ACLS)",
        desc: "Internationally certified Basic Life Support and ACLS training covering CPR, automated external defibrillator (AED) usage, and acute cardiac arrest protocols."
      },
      {
        id: "trn-assistant",
        title: "Healthcare Assistant Level Certifications",
        desc: "Structured foundational healthcare assistant training for clinic support staff, nursing aides, care assistants, and health facility workers."
      },
      {
        id: "trn-disaster",
        title: "Disaster Management & Workplace HSE",
        desc: "Occupational safety drill design, evacuation protocols, fire safety procedures, and hazard control for corporate workplaces and factories."
      }
    ],
    rentals: [
      {
        id: "rnt-projectors",
        title: "Projectors & Large Projector Screen Rentals",
        desc: "High-lumen multimedia projectors and high-definition portable screens for conferences, church programs, corporate seminars, and screenings."
      },
      {
        id: "rnt-pa",
        title: "Public Address Systems",
        desc: "Complete sound engineering packages including clarity microphones, portable amplifiers, outdoor speakers, and audio mixers."
      },
      {
        id: "rnt-furniture",
        title: "Chairs & Tables",
        desc: "Neat, modern, and sturdy chairs and banquet/conference tables available in flexible quantities for corporate meetings, receptions, and seminars."
      },
      {
        id: "rnt-hall",
        title: "Training & Seminar Facilities",
        desc: "Conducive, air-conditioned, and fully equipped training halls featuring comfortable seating, optimal lighting, and multimedia projection setups."
      },
      {
        id: "rnt-vehicles",
        title: "Corporate Cars & Bus Fleet Rentals",
        desc: "Well-maintained corporate sedans, executive vans, and buses with licensed professional drivers for staff transport, corporate excursions, and event logistics."
      }
    ]
  },
  clients: [
    { name: "World Health Organization", category: "International Manufacturing", location: "Global / Nigeria", description: "International health outreach collaborations and health standard guidelines." },
    { name: "Sugama Super Union Group", category: "International Manufacturing", location: "Yangzhou City, Jiangsu Province, China", description: "Strategic medical equipment and clinical consumables supply partner." },
    { name: "Jiangsu Medlead Technology Co. Ltd", category: "International Manufacturing", location: "Wujin District, Changzhou, Jiangsu, China", description: "Precision healthcare technology and medical instruments supplier." },
    { name: "Mespa Global", category: "International Manufacturing", location: "Sariyer, Istanbul, Turkey", description: "Hospital furniture, patient examination beds, and clinical equipment partner." },
    { name: "Diamond Resources & Environmental Service", category: "Corporate & Environment", location: "Nigeria", description: "Joint environmental safety and facility sanitation initiatives." },
    { name: "Magnetic Health Analyzer Ltd", category: "Corporate & Environment", location: "Nigeria", description: "Quantum resonance diagnostic technology distribution." },
    { name: "Inspired Network Africa", category: "Corporate & Environment", location: "Nigeria", description: "Youth empowerment and corporate seminar facilitations." },
    { name: "Golden Star Hotel", category: "Hospitality & Venue", location: "Ibafo, Ogun State", description: "Comprehensive hospitality fumigation and hygiene maintenance." },
    { name: "Christ Embassy National Camp", category: "Hospitality & Venue", location: "Aseese, Off Lagos-Ibadan Expressway, Ogun State", description: "Large-scale facility pest management and event rental solutions." },
    { name: "Tai Solarin University of Education (TASUED)", category: "Education", location: "Ijagun, Ogun State", description: "Institutional pest management and health awareness support." },
    { name: "Esther Memorial International School", category: "Education", location: "Ogun State", description: "Regular school fumigation, hygiene audits, and student first aid talks." },
    { name: "Bennissant Private School", category: "Education", location: "Ago Palace Way, Okota, Lagos", description: "Campus fumigation and staff emergency preparedness workshops." },
    { name: "Christ the King Redeemers School", category: "Education", location: "Ago Palace Way, Okota, Lagos", description: "School facility sanitization and health inspection support." },
    { name: "Green Safety Limited", category: "Corporate & Environment", location: "Nigeria", description: "Collaborative occupational health and industrial safety projects." },
    { name: "Inspired Football Academy", category: "Sports", location: "Nigeria", description: "Sports medical emergency support, athlete first-aid, and event transport." }
  ] as ClientPartner[],
  accreditations: [
    { name: "Nigerian Red Cross Society", abbr: "NCRS", region: "Nigeria", role: "Official Member & Certified Emergency First Aid Trainer" },
    { name: "World Safety Organisation", abbr: "WSO", region: "International", role: "HSE Level 1, 2 & 3 Certified Safety Provider" },
    { name: "Medic First Aid", abbr: "MFA", region: "International", role: "Accredited Cardiopulmonary Resuscitation & Emergency Training" },
    { name: "Association of Community Health Practitioners", abbr: "ACHPN", region: "Nigeria", role: "Registered Community Healthcare Practice" },
    { name: "CPD Continuing Professional Development", abbr: "CPD UK", region: "United Kingdom", role: "Internationally Recognized CPD Training Provider" },
    { name: "National Healthcare Provider Solutions", abbr: "NHCPS", region: "United Kingdom", role: "Accredited Life Support & Healthcare Curriculum" },
    { name: "National Association of Healthcare Trainers", abbr: "NAOH", region: "United States", role: "Accredited Healthcare Training Organization" },
    { name: "Advanced Medical Certification Board", abbr: "AMCB", region: "United Kingdom", role: "Accredited Advanced Cardiac Life Support Provider" },
    { name: "African Society of Healthcare Providers", abbr: "ASHP", region: "Pan-Africa", role: "Registered Healthcare Provider Member" },
    { name: "Small & Medium Enterprise Development Agency of Nigeria", abbr: "SMEDAN", region: "Federal Republic of Nigeria", role: "Officially Registered Corporate Enterprise" },
    { name: "La Plage Meta Verse", abbr: "LPMV", region: "International", role: "Affiliated Virtual Learning & Digital Training Partner" },
    { name: "Association of Integrative Medicine Practitioners of Nigeria", abbr: "AIMPN", region: "Nigeria", role: "Certified Integrative & Preventative Medical Body" },
    { name: "Bright Institute of Healthcare", abbr: "BIH", region: "Nigeria", role: "Vocational Health & Assistant Certification Body" },
    { name: "The Hypertension Society of Nigeria", abbr: "THSN", region: "Nigeria", role: "Active Member & Cardiovascular Health Advocate" }
  ] as Accreditation[]
};
