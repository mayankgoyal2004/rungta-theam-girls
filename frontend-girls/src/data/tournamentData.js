export const TOURNAMENT_INFO = {
  title: "Rungta Premier League 5.0",
  edition: "5.0",
  subtitle: "State Level Inter School Cricket Tournament for Girls",
  organizer: "Sanjay Rungta Group of Institutions, Bhilai",
  motto: "Let the minds bloom",
  dates: "21st October to 04th November 2026",
  venue: "RSR RCET Cricket Ground, Sanjay Rungta Group of Institutions, Bhilai (C.G.)",
  entryFee: "₹500",
  entryFeeDetails: "Per Team (Squad of 11 to 15 Players)",
  contactNumbers: ["9229 111 555", "9229 111 666"],
  whatsappNumber: "919229111555",
  ageGroup: "Under 18 Years (School Girls)",
  ballType: "Tennis Ball (Heavy Duty)",
  matchType: "Day Matches Only",
};

export const PRIZES_DATA = {
  mainPrizes: [
    {
      id: "winner",
      place: "CHAMPION / WINNER",
      amount: "₹21,000",
      scholarship: "₹5,100",
      scholarshipLabel: "Per Player Scholarship",
      icon: "trophy",
      badge: "CHAMPIONSHIP TROPHY",
      bgGradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
      borderColor: "border-amber-400",
      glowColor: "shadow-amber-500/20",
      highlight: true,
      perks: [
        "Grand Championship Trophy & Medals",
        "₹21,000 Cash Prize for School Team",
        "₹5,100 Educational Scholarship Per Player",
        "Free Media Coverage & Certificate of Honor"
      ]
    },
    {
      id: "runner-up",
      place: "RUNNER UP",
      amount: "₹11,000",
      scholarship: "₹3,100",
      scholarshipLabel: "Per Player Scholarship",
      icon: "medal",
      badge: "SILVER TROPHY",
      bgGradient: "from-slate-300/20 via-slate-400/10 to-transparent",
      borderColor: "border-slate-300",
      glowColor: "shadow-slate-400/20",
      highlight: false,
      perks: [
        "Runner-Up Cup & Silver Medals",
        "₹11,000 Cash Prize for School Team",
        "₹3,100 Educational Scholarship Per Player",
        "Merit Certificates for All Players"
      ]
    },
    {
      id: "second-runner-up",
      place: "2ND RUNNER UP",
      amount: "₹5,100",
      scholarship: "₹2,100",
      scholarshipLabel: "Per Player Scholarship",
      icon: "award",
      badge: "BRONZE TROPHY",
      bgGradient: "from-orange-500/20 via-amber-600/10 to-transparent",
      borderColor: "border-orange-400",
      glowColor: "shadow-orange-500/20",
      highlight: false,
      perks: [
        "3rd Place Trophy & Bronze Medals",
        "₹5,100 Cash Prize for School Team",
        "₹2,100 Educational Scholarship Per Player",
        "Certificate of Athletic Excellence"
      ]
    }
  ],

  individualAwards: [
    {
      title: "Women of the Series",
      amount: "₹2,100",
      desc: "Player with outstanding all-round performance throughout RPL 5.0",
      icon: "star",
      category: "Special Star Award"
    },
    {
      title: "Hit Me - Celebration Award",
      amount: "Special Prize",
      desc: "Most entertaining match moment, longest six, or celebration of the tournament",
      icon: "zap",
      category: "Celebration"
    },
    {
      title: "25 Runs Milestone",
      amount: "₹251",
      desc: "Awarded to every batter scoring 25 runs in an innings",
      icon: "target",
      category: "Batting Excellence"
    },
    {
      title: "Hat Trick Sixes",
      amount: "₹251",
      desc: "Awarded to any batter hitting 3 consecutive sixes",
      icon: "flame",
      category: "Power Hitting"
    },
    {
      title: "Hat-Trick Wickets",
      amount: "₹501",
      desc: "Awarded to any bowler claiming 3 consecutive dismissals",
      icon: "crosshair",
      category: "Bowling Excellence"
    },
    {
      title: "Half Century (50 Runs)",
      amount: "₹501",
      desc: "Awarded to every batter achieving 50 runs milestone",
      icon: "trending-up",
      category: "Milestone"
    }
  ],

  scholarships: [
    {
      title: "Winner Player Scholarship",
      amount: "₹5,100",
      scope: "Awarded to all playing members of the winning team",
      badge: "Winner"
    },
    {
      title: "Runner-Up Player Scholarship",
      amount: "₹3,100",
      scope: "Awarded to all playing members of the runner-up squad",
      badge: "Runner-Up"
    },
    {
      title: "Semifinalist Player Scholarship",
      amount: "₹2,100",
      scope: "Awarded to players reaching the tournament semi-finals",
      badge: "Semi-Finalist"
    },
    {
      title: "Participant Player Scholarship",
      amount: "₹1,100",
      scope: "Awarded to all verified registered participants of RPL 5.0",
      badge: "All Participants"
    }
  ]
};

export const TOURNAMENT_FORMAT = [
  {
    stage: "Stage 01",
    name: "Knockout Prelims",
    overs: "5 Overs",
    oversCount: 5,
    description: "High-intensity fast-paced 5-over knockout cricket matches. Only winners advance to next round.",
    date: "21 Oct - 29 Oct 2026",
    badge: "Knockout"
  },
  {
    stage: "Stage 02",
    name: "Semi Finals",
    overs: "6 Overs",
    oversCount: 6,
    description: "Top school squads compete in 6-over semi-final battles to enter the grand final.",
    date: "30 Oct - 02 Nov 2026",
    badge: "Semi Final"
  },
  {
    stage: "Stage 03",
    name: "Grand Finale",
    overs: "6 Overs",
    oversCount: 6,
    description: "The ultimate 6-over championship match followed by live prize distribution ceremony.",
    date: "04 Nov 2026",
    badge: "Championship"
  }
];

export const RULES_LIST = [
  {
    id: "01",
    title: "Tennis Ball Cricket",
    desc: "This tournament will strictly be played with premium approved heavy tennis balls."
  },
  {
    id: "02",
    title: "Fresh Ball Per Inning",
    desc: "Each individual inning will start with a brand-new ball provided by match officials."
  },
  {
    id: "03",
    title: "5-Over Knockout Prelims",
    desc: "Preliminary & knockout matches will be conducted as 5 overs per side contests."
  },
  {
    id: "04",
    title: "Semi-Final & Final: 6 Overs",
    desc: "Semi-Finals and Grand Final will be 6 overs per side. Teams must report 30 min prior to scheduled time."
  },
  {
    id: "05",
    title: "Umpire's Decision is Final",
    desc: "On-field umpire's decisions are conclusive and binding. Dissent will lead to disciplinary penalties."
  },
  {
    id: "06",
    title: "LBW & Leg Byes Excluded",
    desc: "LBW (Leg Before Wicket) and Leg Byes rules are not applicable for this tournament."
  },
  {
    id: "07",
    title: "Strict Single Team Eligibility",
    desc: "A player who has registered and played in one team cannot play for any other team in the tournament."
  },
  {
    id: "08",
    title: "Chucking Strictly Prohibited",
    desc: "Illegal bowling actions (chucking/throwing) are strictly disallowed and will incur immediate no-ball calls."
  },
  {
    id: "09",
    title: "Mandatory School ID & Aadhaar",
    desc: "All players must produce original School ID cards and Aadhaar cards at the registration verification desk."
  },
  {
    id: "10",
    title: "Uniform Sports Kit",
    desc: "All participants are required to wear team sports uniforms and the necessary sports gear throughout the event."
  },
  {
    id: "11",
    title: "Organizers' Discretion",
    desc: "The organizing committee reserves complete rights to amend match timings, rules or schedule based on weather/ground conditions."
  },
  {
    id: "12",
    title: "Age Criterion Compliance",
    desc: "Tournament is exclusively for school girls under 18 years of age. Cutoff verification is mandatory."
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Rungta Cricket Ground & Practice Nets",
    category: "Campus Facility",
    src: "/images/ground-facility.jpg",
    alt: "Rungta Cricket Ground Nets and green turf pitch"
  },
  {
    id: 2,
    title: "Intense Net Practice Session",
    category: "Training",
    src: "/images/nets-batsman.jpg",
    alt: "Batsman taking stance in Rungta blue practice nets"
  },
  {
    id: 3,
    title: "Match Day Batting Masterclass",
    category: "Tournament Action",
    src: "/images/match-action.jpg",
    alt: "Young batsman playing a sweep shot at Rungta Public School ground"
  },
  {
    id: 4,
    title: "Academy Coach Mentoring Bowlers",
    category: "Coaching",
    src: "/images/academy-coaching.jpg",
    alt: "Cricket academy coach giving live feedback to young bowler at stumps"
  },
  {
    id: 5,
    title: "RPL 5.0 Official Banner & Launch",
    category: "Tournament Flyer",
    src: "/images/rpl-poster.png",
    alt: "Rungta Premier League 5.0 Official Poster & Tournament Guidelines"
  }
];

export const FAQ_DATA = [
  {
    q: "Who is eligible to participate in RPL 5.0?",
    a: "Any school girls team with players studying in recognized schools under 18 years of age are eligible. Each player must submit valid School ID and Aadhaar card."
  },
  {
    q: "What is the team registration fee and how do we pay?",
    a: "The registration fee is ₹500 per team. You can submit your team details through our online registration form and finalize payment via UPI / cash at the campus sports office."
  },
  {
    q: "How many players can be registered in a squad?",
    a: "A team can register between 11 to 15 players (11 playing + up to 4 reserves/substitutes), plus 1 coach/manager."
  },
  {
    q: "What are the overs per match in each stage?",
    a: "Knockouts & Prelims are 5 overs a side; Semi-Finals and the Grand Finale are 6 overs a side."
  },
  {
    q: "What kind of ball is used?",
    a: "The tournament will be played using standard high-grade heavy tennis cricket balls. A new ball is provided for each inning."
  },
  {
    q: "Where is the venue and what facilities are provided?",
    a: "The tournament takes place at RSR RCET Cricket Ground, Sanjay Rungta Group of Institutions, Bhilai. Teams get access to professional turf nets, hydration stations, first-aid medical support, and official commentary."
  }
];
