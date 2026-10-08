export interface LegalMaxim {
  latin: string;
  translation: string;
  explanation: string;
  illustration: string;
  category: 'Contract Law' | 'Criminal Law' | 'Tort Law' | 'Equity & Trusts' | 'Property Law' | 'Family Law' | 'Evidence' | 'Constitutional & Public Law' | 'Civil Procedure' | 'Statutory Interpretation';
  page: number;
}

export interface BookEdition {
  id: string;
  name: string;
  badge?: string;
  format: 'Paperback' | 'Hardcover' | 'Digital eBook' | 'Bundle';
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  inStock: boolean;
  isPopular?: boolean;
}

export const BOOK_INFO = {
  title: "LEGAL MAXIMS SIMPLIFIED",
  subtitle: "A Practical Guide For Everyone",
  author: "Sharon O. Olaniyi",
  authorBio: "Sharon Olaniyi is a legal scholar, educator, and the founder of LEX Mentors, a community redefining how the next generation of lawyers approach the study of law. Driven by a deep conviction that legal education should be accessible, practical, and empowering, she has dedicated herself to equipping law students with the tools, strategies, and confidence they need to excel. A proud alumna and former student leader at Osun State University, she served as the Assistant General Secretary of the Law Students' Society and Vice President (Administration) of the Association of Campus Journalists.",
  forewordAuthor: "Professor the Rt Hon Mojeed Olujinmi A. Alabi",
  forewordAuthorTitle: "PhD Political Science, PhD Law, BL • Professor & Provost, College of Law, Osun State University",
  forewordQuote: "It is written in simple and plain English as a practical guide for law students, law teachers, lawyers and other persons that are interested in knowing the law. The book is rich, and a broad spectrum of legal practitioners, law teachers, law students and everyone interested in understanding the law in context will find it handy as a companion worth the price.",
  isbn: "978-978-68-2634-9",
  publisher: "Elegraph Publishing",
  publisherEmail: "elegraphpublishing@gmail.com",
  publisherInstagram: "@elegraphpublishing",
  authorEmail: "olaniyisharon02@gmail.com",
  authorPhone: "+234 904 840 2122",
  authorWhatsapp: "2349048402122",
  socialLinkedinFacebook: "@Sharon Olaniyi",
  community: "LEX MENTORS",
  pagesCount: "343+",
  maximsCount: "1100+",
  copyrightYear: 2026,
};

export const EDITIONS: BookEdition[] = [
  {
    id: "paperback",
    name: "Standard Paperback Edition",
    format: "Paperback",
    badge: "Most Popular",
    price: 8500,
    originalPrice: 10000,
    description: "High quality matte black softcover with crisp acid-free cream pages. Portable, durable, and designed for rigorous classroom and courtroom study.",
    features: [
      "Full 343+ page comprehensive text",
      "Over 1,100+ Latin maxims explained in plain English",
      "Relatable Nigerian & common law case illustrations",
      "Subject index (Contracts, Criminal, Tort, Equity, etc.)",
      "Foreword by Prof. Mojeed Olujinmi Alabi",
      "Eligible for nationwide doorstep delivery"
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: "hardcover",
    name: "Deluxe Hardcover Collector's Edition",
    format: "Hardcover",
    badge: "Prestige Edition",
    price: 15000,
    originalPrice: 18000,
    description: "Luxury casebound hardcover with gold-embossed spine detailing, protective matte velvet coating, and sewn ribbon bookmark for practitioners and law libraries.",
    features: [
      "Rigid luxury hardbound cover with satin black drape finish",
      "Embossed spine lettering & gold-accented legal emblem",
      "Integrated silk ribbon bookmark",
      "All 1,100+ maxims with full cross-referencing",
      "Hand-signed author bookplate by Sharon Olaniyi (upon request)",
      "High priority packaging & nationwide delivery"
    ],
    inStock: true
  },
  {
    id: "digital",
    name: "Instant Digital eBook (PDF + ePub)",
    format: "Digital eBook",
    badge: "Instant Access",
    price: 5000,
    originalPrice: 6500,
    description: "Read immediately on your smartphone, tablet, Kindle, or laptop. Fully searchable with hyperlinked alphabetical and subject indexes.",
    features: [
      "Instant email delivery within 60 seconds of order",
      "High-resolution interactive PDF + ePub formats",
      "Searchable text & hyperlinked subject index",
      "Highlight & annotate friendly on iPad, Android & Kindle",
      "Lifetime digital access & free future errata updates",
      "Zero shipping fee worldwide"
    ],
    inStock: true
  },
  {
    id: "student_bundle",
    name: "Law Student Study Group Bundle",
    format: "Bundle",
    badge: "Best Value • Save 25%",
    price: 22500,
    originalPrice: 30500,
    description: "Perfect for moot court teams, study circles, and peer revision groups. Contains 3 Paperback copies plus complimentary instant digital access for all members.",
    features: [
      "3 Paperback copies for you and your study partners",
      "1 Complimentary Digital eBook license (instant download)",
      "Free membership invite to LEX MENTORS study sessions",
      "Discounted campus delivery or group shipping",
      "Great preparation for Bar Exams & University Finals"
    ],
    inStock: true
  },
  {
    id: "chambers_pack",
    name: "Chambers & Institutional Pack (10 Copies)",
    format: "Bundle",
    badge: "For Law Firms & Faculties",
    price: 70000,
    originalPrice: 85000,
    description: "Equip your firm's junior associates, interns, or faculty library with copies of this authoritative practical guide.",
    features: [
      "10 Standard Paperback copies",
      "Complimentary Digital eBook pack for 10 users",
      "Personalised bookplate inscription from Sharon Olaniyi",
      "Official corporate invoice for tax & expense reporting",
      "Free priority delivery across Nigeria"
    ],
    inStock: true
  }
];

export const NIGERIAN_STATES = [
  { name: "Lagos", fee: 1500, estimate: "1 - 2 business days" },
  { name: "Abuja (FCT)", fee: 2000, estimate: "2 - 3 business days" },
  { name: "Osun (Osogbo, Ife, etc.)", fee: 1200, estimate: "1 - 2 business days" },
  { name: "Oyo (Ibadan, Ogbomoso)", fee: 1500, estimate: "1 - 2 business days" },
  { name: "Ogun (Abeokuta, Sagamu)", fee: 1500, estimate: "1 - 2 business days" },
  { name: "Ondo (Akure, Ondo City)", fee: 1800, estimate: "2 - 3 business days" },
  { name: "Ekiti (Ado-Ekiti)", fee: 1800, estimate: "2 - 3 business days" },
  { name: "Kwara (Ilorin)", fee: 2000, estimate: "2 - 3 business days" },
  { name: "Rivers (Port Harcourt)", fee: 2500, estimate: "2 - 4 business days" },
  { name: "Edo (Benin City)", fee: 2000, estimate: "2 - 3 business days" },
  { name: "Delta (Asaba, Warri)", fee: 2200, estimate: "2 - 4 business days" },
  { name: "Enugu", fee: 2400, estimate: "2 - 4 business days" },
  { name: "Anambra (Awka, Onitsha)", fee: 2400, estimate: "2 - 4 business days" },
  { name: "Imo (Owerri)", fee: 2400, estimate: "2 - 4 business days" },
  { name: "Abia (Aba, Umuahia)", fee: 2500, estimate: "2 - 4 business days" },
  { name: "Akwa Ibom (Uyo)", fee: 2500, estimate: "3 - 4 business days" },
  { name: "Cross River (Calabar)", fee: 2500, estimate: "3 - 5 business days" },
  { name: "Kano", fee: 2500, estimate: "3 - 4 business days" },
  { name: "Kaduna", fee: 2500, estimate: "3 - 4 business days" },
  { name: "Plateau (Jos)", fee: 2500, estimate: "3 - 4 business days" },
  { name: "Benue (Makurdi)", fee: 2500, estimate: "3 - 4 business days" },
  { name: "Other Nigerian States", fee: 2800, estimate: "3 - 5 business days" },
  { name: "Campus Pickup (UNIOSUN / UI / UNILAG / OAU)", fee: 0, estimate: "Campus Hub (Free)" },
  { name: "International Shipping (UK / US / Canada / Ghana)", fee: 14000, estimate: "5 - 9 business days via DHL" },
];

export const BANK_DETAILS = {
  bankName: "Guaranty Trust Bank (GTBank)",
  accountName: "LEX MENTORS / ELEGRAPH PUBLISHING",
  accountNumber: "0245891334",
  secondaryBank: {
    bankName: "Zenith Bank Plc",
    accountName: "SHARON OLANIYI",
    accountNumber: "2201948371",
  }
};

export const PROMO_CODES: Record<string, { type: 'percent' | 'flat'; value: number; label: string }> = {
  "LEXMENTORS": { type: 'percent', value: 10, label: "10% Lex Mentors Member Discount" },
  "LAWSTUDENT": { type: 'percent', value: 15, label: "15% Law Student Privilege" },
  "UNIOSUN": { type: 'flat', value: 1000, label: "₦1,000 Osun State University Law Discount" },
  "JUSTICE": { type: 'flat', value: 500, label: "₦500 Welcome Voucher" }
};

export const SAMPLE_MAXIMS: LegalMaxim[] = [
  {
    latin: "Ab initio",
    translation: "From the beginning",
    explanation: "This maxim means something is void right from the start, not just later on. If an agreement or act is illegal or fundamentally wrong, the law treats it as if it never existed.",
    illustration: "If someone makes a contract to sell stolen goods, that contract is void ab initio—it was never valid from the beginning.",
    category: "Contract Law",
    page: 19
  },
  {
    latin: "Actus non facit reum nisi mens sit rea",
    translation: "The act is not culpable unless the mind is guilty",
    explanation: "This maxim means a person is not criminally liable unless there is both a wrongful act (actus reus) and a guilty mind (mens rea). Both elements must be present for most crimes.",
    illustration: "If someone accidentally takes another's umbrella thinking it is theirs, there is no crime, since there was no guilty mind—actus non facit reum nisi mens sit rea.",
    category: "Criminal Law",
    page: 22
  },
  {
    latin: "Audi alteram partem",
    translation: "Hear the other side",
    explanation: "This maxim means that no one should be judged or have a decision made against them without a fair chance to present their case. It is a fundamental principle of natural justice.",
    illustration: "Before a school expels a student, the student must be given a chance to explain their side—audi alteram partem.",
    category: "Constitutional & Public Law",
    page: 28
  },
  {
    latin: "Caveat emptor",
    translation: "Let the buyer beware",
    explanation: "This maxim places the responsibility on buyers to examine goods or property before purchase. The seller is not bound to disclose patent defects that a reasonable inspection would reveal.",
    illustration: "A buyer of a used car cannot claim defects they could have discovered through ordinary inspection—caveat emptor.",
    category: "Contract Law",
    page: 37
  },
  {
    latin: "Damnum absque injuria",
    translation: "Damage without legal injury",
    explanation: "This maxim means that a person may suffer actual loss or harm, but if no legal right is violated, the law provides no remedy. The existence of damage alone is not enough to create liability; the harm must infringe a legally protected interest.",
    illustration: "If a new supermarket opens beside Mama Kemi's small shop and she loses customers, she has suffered damage. But since the competitor did nothing unlawful, it is damnum absque injuria.",
    category: "Tort Law",
    page: 46
  },
  {
    latin: "De minimis non curat lex",
    translation: "The law does not concern itself with trifles",
    explanation: "The courts do not waste time on petty or insignificant matters that have no substantial effect. This principle ensures judicial resources are reserved for serious disputes and prevents the legal system from being clogged with trivial claims.",
    illustration: "If Chika sues her neighbour because his tree drops three mango leaves into her compound, the court may dismiss it under the principle of de minimis non curat lex.",
    category: "Tort Law",
    page: 47
  },
  {
    latin: "Delegatus non potest delegare",
    translation: "A delegate cannot delegate",
    explanation: "A person entrusted with authority cannot pass it on to another unless expressly permitted by the delegator or governing statute.",
    illustration: "If the state governor delegates specific statutory powers to a commissioner, that commissioner cannot re-delegate those powers to a director unless authorized by statute.",
    category: "Constitutional & Public Law",
    page: 55
  },
  {
    latin: "Dura lex sed lex",
    translation: "The law is harsh, but it is the law",
    explanation: "The law must be obeyed even if it seems severe in a particular case. Judicial justice is based on established rules rather than personal sentiment or sympathy.",
    illustration: "If James is sentenced for a strict drug offence despite pleading hardship, the judge may remark dura lex sed lex.",
    category: "Constitutional & Public Law",
    page: 57
  },
  {
    latin: "Ejusdem generis",
    translation: "Of the same kind or nature",
    explanation: "A cardinal rule of statutory interpretation: where general words follow specific words in a statute, the general words are interpreted to include only things of the same kind as the specific words.",
    illustration: "If a law prohibits 'guns, knives, and other weapons', the phrase 'other weapons' will be interpreted to mean items similar to guns and knives, not broad substances like acid or poison.",
    category: "Statutory Interpretation",
    page: 61
  },
  {
    latin: "Ex dolo malo non oritur actio",
    translation: "No action arises from fraud",
    explanation: "The law does not allow a person to base a legal claim on his own wrongful or fraudulent conduct. Fraud vitiates all transactions and cannot be the foundation of a lawful right.",
    illustration: "If Musa tricks someone into signing a fake contract, he cannot later sue to enforce it in a court of law.",
    category: "Contract Law",
    page: 63
  },
  {
    latin: "Fiat justitia ruat caelum",
    translation: "Let justice be done though the heavens fall",
    explanation: "Justice must be upheld regardless of the practical consequences, social standing, or external political pressure. It underscores judicial courage and impartiality.",
    illustration: "A judge convicts a prominent and wealthy businessman despite intense political threats—justice must prevail.",
    category: "Constitutional & Public Law",
    page: 64
  },
  {
    latin: "Habeas corpus",
    translation: "You shall have the body (writ to produce a prisoner)",
    explanation: "A cornerstone writ of constitutional liberty ordering that a detained individual be brought before court so the judge can assess whether their detention is lawful.",
    illustration: "If police arrest Chinedu without formal charge and keep him in custody for weeks, his lawyer applies for habeas corpus to compel the authorities to justify his detention.",
    category: "Constitutional & Public Law",
    page: 84
  },
  {
    latin: "Ignorantia juris non excusat",
    translation: "Ignorance of the law is no excuse",
    explanation: "A person cannot escape legal liability simply by claiming they did not know the law. Everyone is presumed to know the law, ensuring certainty and uniformity.",
    illustration: "If Tunde drives against traffic on a one-way street in Lagos and tells LASTMA officials he did not know it was wrong, he will still be penalized.",
    category: "Criminal Law",
    page: 94
  },
  {
    latin: "In dubio pro reo",
    translation: "In doubt, favor the accused",
    explanation: "If there is any reasonable doubt regarding the guilt of the accused, the benefit of that doubt must go to the accused. It protects against wrongful convictions.",
    illustration: "If a witness cannot clearly identify whether it was Yemi or another person who stole a phone in the market, the court will acquit Yemi because of the doubt.",
    category: "Criminal Law",
    page: 98
  },
  {
    latin: "In pari delicto potior est conditio defendentis",
    translation: "In equal fault, the defendant's position is stronger",
    explanation: "When both parties are equally at fault in an illegal transaction, the court will assist neither. The defendant resisting enforcement prevails because courts will not enforce illegal claims.",
    illustration: "If Musa and Chinedu enter into an illegal gambling contract and Musa sues to collect his winnings, the court will dismiss the case.",
    category: "Contract Law",
    page: 95
  },
  {
    latin: "In propria causa nemo judex",
    translation: "No one should be a judge in his own cause",
    explanation: "The twin pillar of natural justice (nemo judex in causa sua). A person who has a personal interest or bias in a matter cannot preside over it.",
    illustration: "If a magistrate's brother is involved in a land dispute, the magistrate must recuse himself because he cannot be neutral.",
    category: "Constitutional & Public Law",
    page: 97
  },
  {
    latin: "Nemo dat quod non habet",
    translation: "No one can give what he does not have",
    explanation: "A foundational principle of property and commercial law: a person cannot transfer a better title to goods than they themselves possess.",
    illustration: "If Tunde steals a power generator and sells it cheaply to Chinedu, Chinedu cannot claim ownership because Tunde had no title to pass. The true owner can reclaim it.",
    category: "Property Law",
    page: 143
  },
  {
    latin: "Nemo moriturus praesumitur mentiri",
    translation: "A man will not meet his Maker with a lie in his mouth",
    explanation: "The evidentiary basis for dying declarations. A person in immediate expectation of death is presumed to speak the truth, making their statement admissible in evidence.",
    illustration: "A man mortally shot during a robbery whispers to the police before dying: 'It was Segun that shot me.' That statement may be admitted as truthful evidence.",
    category: "Evidence",
    page: 162
  },
  {
    latin: "Nemo tenetur seipsum accusare",
    translation: "No one is bound to accuse himself",
    explanation: "The fundamental constitutional right against self-incrimination. A suspect cannot be forced or tortured into admitting guilt and has the right to remain silent.",
    illustration: "When police arrest Chika, they cannot torture him into confession; he has the constitutional right to remain silent until his counsel is present.",
    category: "Constitutional & Public Law",
    page: 163
  },
  {
    latin: "Pacta sunt servanda",
    translation: "Agreements must be kept",
    explanation: "The bedrock of modern contract and international law: valid agreements solemnly entered into create binding legal obligations that courts must enforce.",
    illustration: "If two parties agree on the sale of a vehicle and one fails to deliver after receiving payment, the other may sue for specific performance or damages.",
    category: "Contract Law",
    page: 169
  },
  {
    latin: "Qui facit per alium facit per se",
    translation: "He who acts through another does the act himself",
    explanation: "The governing rule of agency and vicarious liability: actions performed by an authorized agent within their mandate are legally considered the acts of the principal.",
    illustration: "An employee signs a sales contract within their employment duties; the company is bound by it as if the CEO signed it personally.",
    category: "Commercial Law" as any,
    page: 195
  },
  {
    latin: "Res ipsa loquitur",
    translation: "The thing speaks for itself",
    explanation: "An evidentiary doctrine in the law of negligence: when an accident is of a kind that does not ordinarily occur without negligence, the occurrence itself raises a rebuttable presumption of negligence.",
    illustration: "If a surgeon leaves a pair of medical scissors inside a patient's abdomen during surgery, res ipsa loquitur—negligence is obvious on the face of the facts.",
    category: "Tort Law",
    page: 204
  },
  {
    latin: "Res judicata",
    translation: "A matter already judged",
    explanation: "Once a competent court has finally determined a dispute between parties, neither party can reopen or re-litigate the same claim or cause of action.",
    illustration: "If a land dispute between family heads has been concluded by final judgment of the Supreme Court, the defeated party cannot file a fresh suit on identical facts.",
    category: "Civil Procedure",
    page: 204
  },
  {
    latin: "Salus populi suprema lex",
    translation: "The welfare of the people is the supreme law",
    explanation: "The overarching objective of the legal order and governance: the well-being, safety, and health of society take precedence over narrow private advantages in times of public emergency.",
    illustration: "Mandatory public health curfews or flood evacuation orders prioritize the lives of all citizens over individual property convenience.",
    category: "Constitutional & Public Law",
    page: 215
  },
  {
    latin: "Ubi jus, ibi remedium",
    translation: "Where there is a right, there is a remedy",
    explanation: "Every recognized substantive legal right carries an avenue for enforcement or redress through the courts. Without remedies, declared rights are mere illusions.",
    illustration: "If a woman in Ibadan is unlawfully dismissed from employment, the legal system guarantees her the right to sue for wrongful dismissal and recover compensation.",
    category: "Equity & Trusts",
    page: 249
  },
  {
    latin: "Vigilantibus non dormientibus jura subveniunt",
    translation: "The law aids the vigilant, not those who sleep on their rights",
    explanation: "Legal rights must be asserted promptly. Parties who delay unreasonably without valid cause may find their claims barred by statutes of limitation or equitable laches.",
    illustration: "If a landlord ignores tenant arrears for over 10 years without action, their subsequent lawsuit may be barred because they slept on their legal remedies.",
    category: "Equity & Trusts",
    page: 270
  },
  {
    latin: "Volenti non fit injuria",
    translation: "To one who consents, no injury is done",
    explanation: "A complete defence in tort law: a person who willingly and knowingly consents to take on a known risk cannot subsequently maintain a claim for injury arising from that risk.",
    illustration: "A professional boxer who enters the boxing ring cannot sue his opponent in battery for blows sustained during the legitimate sporting bout.",
    category: "Tort Law",
    page: 281
  }
];

export const SUBJECT_CATEGORIES = [
  "All Categories",
  "Contract Law",
  "Criminal Law",
  "Tort Law",
  "Equity & Trusts",
  "Property Law",
  "Family Law",
  "Evidence",
  "Constitutional & Public Law",
  "Civil Procedure",
  "Statutory Interpretation"
] as const;

export const TESTIMONIALS = [
  {
    name: "Dr. Babatunde Adeleke",
    role: "Senior Lecturer in Jurisprudence & Commercial Law",
    institution: "Faculty of Law, University of Ibadan",
    comment: "Sharon Olaniyi has accomplished what few legal textbooks manage to do: she has rescued ancient Latin maxims from the dusty shelves of abstraction and grounded them in concrete everyday realities. For students preparing for university exams and the Nigerian Law School, this is an indispensable companion.",
    rating: 5
  },
  {
    name: "Barrister Folashade Alabi, LL.M",
    role: "Managing Partner & Commercial Litigator",
    institution: "Lagos Bar Association",
    comment: "As litigators, we cite maxims to sharpen our submissions and persuade judges. What makes this book unique is the clarity of each illustration—no fluff, no needless legalese. Prof. Mojeed Alabi's foreword is spot on: it is a companion well worth every kobo.",
    rating: 5
  },
  {
    name: "Chukwudi Nwachukwu",
    role: "400L Law Student & Moot Court President",
    institution: "University of Lagos (UNILAG)",
    comment: "I used to panic whenever Latin maxims showed up in Contract or Tort exam questions. Legal Maxims Simplified breaks down the concepts with illustrations featuring local Nigerian scenarios that stick immediately in your memory. My grades improved drastically!",
    rating: 5
  },
  {
    name: "Amina Yusuf",
    role: "LEX Mentors Community Member & Aspiring Barrister",
    institution: "Ahmadu Bello University (ABU Zaria)",
    comment: "The practical guide format is revolutionary. Reading the breakdown of 'Nemo dat quod non habet' and 'Audi alteram partem' made me fall in love with legal philosophy. A must-have for every law fresher and law library.",
    rating: 5
  }
];

export const FAQS = [
  {
    question: "How long does physical book delivery take across Nigeria?",
    answer: "Deliveries within Lagos, Ibadan, and Osogbo take 1–2 business days. Abuja, Port Harcourt, Enugu, and major state capitals take 2–3 business days. Remote locations take 3–5 business days via trusted logistics partners (GIG Logistics, Speedaf, and DHL). Tracking information will be sent via SMS and WhatsApp once dispatched."
  },
  {
    question: "How does the Digital eBook edition work?",
    answer: "Immediately upon placing your order or confirmation of bank transfer, an instant download link is generated on-screen and also sent to your email. You receive both high-resolution interactive PDF and ePub formats suitable for smartphones, tablets, Kindles, and PCs."
  },
  {
    question: "Can universities, student groups, or law firms make bulk orders?",
    answer: "Yes! We offer our 'Study Group Bundle' (3 copies + eBook) and 'Institutional Pack' (10 copies + 10 eBooks + custom author note). For larger orders exceeding 20 copies for faculty bookshops or chamber libraries, please click the WhatsApp chat button or email olaniyisharon02@gmail.com for custom institutional discounts."
  },
  {
    question: "Can I pay by Direct Bank Transfer instead of a card?",
    answer: "Absolutely! We provide direct Nigerian bank transfer details (GTBank and Zenith Bank). You can generate your custom Order Reference on the checkout page, make the transfer, and instantly send your receipt via WhatsApp to +234 904 840 2122 for immediate clearance."
  },
  {
    question: "Can I get an author-signed copy with a personalized note?",
    answer: "Yes! When ordering either the Paperback or Deluxe Hardcover edition, simply check the 'Request author signature / inscription' box on the order form and include the recipient's name or a short note. Sharon Olaniyi will hand-sign your copy before shipping."
  }
];
