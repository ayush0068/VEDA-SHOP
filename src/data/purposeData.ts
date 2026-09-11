export interface PurposeInfo {
  id: string;
  slug: string;
  name: string;
  hindiName: string;
  icon: string;
  tagline: string;
  heroImage: string;
  description: string;
  whatItMeans: string;
  recommendedRudraksha: string[];
  recommendedGemstones: string[];
  recommendedYantras: string[];
  recommendedPuja: string[];
  faqs: { question: string; answer: string }[];
}

export const PURPOSE_LIST: PurposeInfo[] = [
  {
    id: 'wealth',
    slug: 'wealth',
    name: 'Wealth & Prosperity',
    hindiName: 'धन एवं समृद्धि',
    icon: 'Coins',
    tagline: 'Attract financial abundance, business expansion, and sustainable stability.',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    description: 'In Vedic tradition, wealth (Artha) is one of the four key pursuits of human life. Aligning your energy with Venusian & Mahalakshmi vibration brings prosperity and removes financial blockages.',
    whatItMeans: 'Vedic wealth remedies focus on clearing obstacles created by malefic planetary placement and enhancing positive money flow through blessed items from Kashi.',
    recommendedRudraksha: ['7 Mukhi Rudraksha (Mahalakshmi)', '13 Mukhi Rudraksha (Kamdev & Indradev)', 'Gauri Shankar Rudraksha'],
    recommendedGemstones: ['Natural Citrine', 'Yellow Sapphire (Pukhraj)', 'Emerald (Panna)'],
    recommendedYantras: ['Shree Yantra', 'Kuber Yantra'],
    recommendedPuja: ['Lakshmi Kuber Puja', 'Mahalakshmi Abhishekam'],
    faqs: [
      {
        question: 'Which Rudraksha is best suited for wealth creation?',
        answer: 'Traditionally, 7 Mukhi Rudraksha represents Goddess Mahalakshmi and is considered most beneficial for business growth, financial harmony, and debt relief.'
      },
      {
        question: 'How does Shree Yantra assist in business prosperity?',
        answer: 'Shree Yantra creates sacred geometry energy grid in home or workspace, attracting positive aura and removing financial stagnancy.'
      }
    ]
  },
  {
    id: 'protection',
    slug: 'protection',
    name: 'Protection & Aura Shielding',
    hindiName: 'सुरक्षा एवं कवच',
    icon: 'Shield',
    tagline: 'Shield yourself from negative energies, evil eye, and environmental stress.',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    description: 'Protection in Vedic wisdom comes from strengthening your personal aura field. Energized Rudraksha and protective gemstones create an impenetrable vibration shield.',
    whatItMeans: 'Whether facing workplace jealousy, bad luck, or emotional vulnerability, protective Vedic items maintain your inner equilibrium.',
    recommendedRudraksha: ['9 Mukhi Rudraksha (Maa Durga)', '10 Mukhi Rudraksha (Lord Vishnu)', 'Nepali Siddha Kavach'],
    recommendedGemstones: ['Black Tourmaline', 'Black Obsidian', 'Tiger Eye'],
    recommendedYantras: ['Mahamrityunjay Yantra', 'Durga Bisa Yantra'],
    recommendedPuja: ['Rudra Abhishekam', 'Durga Saptashati Paath'],
    faqs: [
      {
        question: 'Can 9 Mukhi Rudraksha shield against fear and negative eyes?',
        answer: 'Yes, 9 Mukhi represents Goddess Durga in her nine forms, granting fearlessness and protective divine energy.'
      }
    ]
  },
  {
    id: 'career',
    slug: 'career',
    name: 'Career & Professional Growth',
    hindiName: 'करियर एवं उन्नति',
    icon: 'Briefcase',
    tagline: 'Unlock promotions, leadership authority, job stability, and career breakthroughs.',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
    description: 'Surya (Sun) and Budha (Mercury) govern leadership and intellect. Aligning with their energies boosts confidence, decision-making, and professional success.',
    whatItMeans: 'Career advancement requires clarity of focus, eloquence, and divine grace during crucial job transitions and interviews.',
    recommendedRudraksha: ['12 Mukhi Rudraksha (Surya Dev)', '1 Mukhi Rudraksha', '6 Mukhi Rudraksha (Kartikeya)'],
    recommendedGemstones: ['Ruby (Manik)', 'Emerald (Panna)', 'Blue Sapphire (Neelam)'],
    recommendedYantras: ['Surya Yantra', 'Saraswati Yantra'],
    recommendedPuja: ['Surya Puja', 'Ganesh Puja'],
    faqs: [
      {
        question: 'Why is 12 Mukhi Rudraksha recommended for executives and leaders?',
        answer: '12 Mukhi Rudraksha is blessed by the 12 Adityas (Sun God), instilling radiance, leadership authority, and public recognition.'
      }
    ]
  },
  {
    id: 'marriage',
    slug: 'marriage',
    name: 'Marriage & Relationship Harmony',
    hindiName: 'विवाह एवं संबंध',
    icon: 'Heart',
    tagline: 'Attract loving partnerships, resolve marital friction, and foster emotional warmth.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    description: 'Venus (Shukra) and Jupiter (Guru) govern marital bliss and soulmate connection. Sacred Shiv-Parvati symbols restore warmth and trust.',
    whatItMeans: 'Traditional Vedic solutions help heal emotional wounds, reduce conflicts in relationships, and invite suitable life partners.',
    recommendedRudraksha: ['Gauri Shankar Rudraksha', '2 Mukhi Rudraksha (Ardhanarishvara)', '13 Mukhi Rudraksha'],
    recommendedGemstones: ['Rose Quartz', 'Natural Diamond / White Zircon', 'Yellow Sapphire'],
    recommendedYantras: ['Gauri Shankar Yantra', 'Kamdev Yantra'],
    recommendedPuja: ['Gauri Shankar Puja', 'Swayamvara Parvathi Puja'],
    faqs: [
      {
        question: 'What makes Gauri Shankar Rudraksha essential for marital harmony?',
        answer: 'Gauri Shankar is two naturally joined Rudraksha beads representing Lord Shiva and Goddess Parvati, symbolizing absolute unity and devotion.'
      }
    ]
  },
  {
    id: 'peace',
    slug: 'peace',
    name: 'Peace of Mind & Health',
    hindiName: 'शांति एवं स्वास्थ्य',
    icon: 'Smile',
    tagline: 'Soothe anxiety, cultivate deep inner stillness, and enhance vital energy.',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    description: 'Chandra (Moon) controls the mind and emotional stability. Balancing lunar vibrations calms hyperactive thoughts and induces restful sleep.',
    whatItMeans: 'Vedic herbs, beads, and calming crystals balance the nervous system and clear mental clutter.',
    recommendedRudraksha: ['2 Mukhi Rudraksha', '5 Mukhi Rudraksha', '3 Mukhi Rudraksha (Agni Dev - clears trauma)'],
    recommendedGemstones: ['Natural Pearl (Moti)', 'Moonstone', 'Amethyst'],
    recommendedYantras: ['Chandra Yantra', 'Mahamrityunjay Yantra'],
    recommendedPuja: ['Chandra Shanti Puja', 'Ayush Homa'],
    faqs: [
      {
        question: 'How does 5 Mukhi Rudraksha support physical and mental wellbeing?',
        answer: '5 Mukhi Rudraksha balances the five elements (Pancha Tattva) in the human body, soothing blood pressure and mental restlessness.'
      }
    ]
  },
  {
    id: 'meditation',
    slug: 'meditation',
    name: 'Meditation & Higher Consciousness',
    hindiName: 'ध्यान एवं साधना',
    icon: 'Sparkles',
    tagline: 'Deepen your dhyana, activate subtle chakras, and experience spiritual bliss.',
    heroImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200',
    description: 'For seekers of spiritual realization, high-vibration Nepali Rudraksha malas stabilize meditation postures and expand awareness.',
    whatItMeans: 'Aligning with the ancient yogic heritage of Kashi transforms daily practice into profound inner silence.',
    recommendedRudraksha: ['14 Mukhi Rudraksha (Devamani)', '1 Mukhi Rudraksha', '108 Bead Nepalese 5 Mukhi Mala'],
    recommendedGemstones: ['Amethyst', 'Clear Quartz', 'Lapis Lazuli'],
    recommendedYantras: ['Shree Yantra', 'Shiv Yantra'],
    recommendedPuja: ['Shivratri Abhishekam', 'Rudra Homa'],
    faqs: [
      {
        question: 'Why do sadhakas wear a 108 Rudraksha Mala during mantra japa?',
        answer: '108 is a sacred cosmic ratio. Counting 108 beads during Japa aligns individual consciousness with universal energy cycles.'
      }
    ]
  },
  {
    id: 'spiritual-growth',
    slug: 'spiritual-growth',
    name: 'Spiritual Growth & Wisdom',
    hindiName: 'आध्यात्मिक विकास एवं ज्ञान',
    icon: 'BookOpen',
    tagline: 'Expand higher knowledge, Vedic learning, intuition, and divine guidance.',
    heroImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1200',
    description: 'Lord Brahma and Saraswati govern divine intellect and Vedic study. Energized items clear confusion and elevate intuition.',
    whatItMeans: 'Ideal for students, researchers, astrologers, and spiritual seekers seeking profound clarity.',
    recommendedRudraksha: ['4 Mukhi Rudraksha (Lord Brahma)', '11 Mukhi Rudraksha (Lord Hanuman)', '6 Mukhi Rudraksha'],
    recommendedGemstones: ['Yellow Sapphire', 'Emerald', 'Fluorite'],
    recommendedYantras: ['Saraswati Yantra', 'Gayatri Yantra'],
    recommendedPuja: ['Saraswati Puja', 'Gayatri Japam'],
    faqs: [
      {
        question: 'How does 4 Mukhi Rudraksha help in memory and concentration?',
        answer: '4 Mukhi represents Lord Brahma, the creator of Vedas. It enhances memory power, articulate speech, and intellectual absorption.'
      }
    ]
  },
  {
    id: 'planetary-balance',
    slug: 'planetary-balance',
    name: 'Planetary Balance & Navgraha Shanti',
    hindiName: 'ग्रह शांति एवं नवग्रह संतुलन',
    icon: 'Compass',
    tagline: 'Harmonize planetary doshas (Sade Sati, Rahu/Ketu transit) in your kundli.',
    heroImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200',
    description: 'Navgrahas influence key milestones of life. Authentic Vedic remedies neutralize malefic planetary influences while amplifying benefic planets.',
    whatItMeans: 'Kundli-driven astrological recommendations tailored for Sade Sati, Mangal Dosha, and Mahadasha transitions.',
    recommendedRudraksha: ['Navgraha Rudraksha Mala', '8 Mukhi (Rahu)', '9 Mukhi (Ketu)', '14 Mukhi (Saturn)'],
    recommendedGemstones: ['Navratna Bracelet / Ring', 'Hessonite (Gomed)', 'Cat\'s Eye (Lahsuniya)'],
    recommendedYantras: ['Navgraha Yantra'],
    recommendedPuja: ['Navgraha Shanti Puja', 'Satyanarayan Katha'],
    faqs: [
      {
        question: 'What is Navratna and who can wear it?',
        answer: 'Navratna incorporates 9 sacred gemstones representing all nine celestial planets. It balances overall planetary energy for general wellbeing.'
      }
    ]
  }
];
