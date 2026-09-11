export interface RashiDetail {
  id: string;
  slug: string;
  nameEn: string;
  nameHi: string;
  symbol: string;
  element: string;
  modality: string;
  rulingPlanet: string;
  description: string;
  recommendedRudraksha: string;
  recommendedGemstone: string;
  recommendedYantra: string;
  recommendedBracelet: string;
  recommendedPuja: string;
  whyTheseProducts: string;
  imageUrl: string;
  seoTitle: string;
  seoDescription: string;
  faqs: { question: string; answer: string }[];
}

export const RASHI_LIST: RashiDetail[] = [
  {
    id: 'rashi-1',
    slug: 'mesh',
    nameEn: 'Aries',
    nameHi: 'Mesh (मेष)',
    symbol: '♈',
    element: 'Fire',
    modality: 'Cardinal',
    rulingPlanet: 'Mars (Mangal Dev)',
    description: 'Dynamic, courageous, and energetic. Mesh Rashi native is governed by fiery Mangal, requiring vitality control and protection against impulsiveness.',
    recommendedRudraksha: '3 Mukhi Rudraksha & 6 Mukhi Rudraksha',
    recommendedGemstone: 'Red Coral (Moonga) & Red Carnelian',
    recommendedYantra: 'Mangal Yantra',
    recommendedBracelet: 'Red Carnelian & Lava Energy Bracelet',
    recommendedPuja: 'Mangal Shanti Puja & Rudrabhishek',
    whyTheseProducts: 'Red Coral and 3 Mukhi Rudraksha pacify Mangal Dosha, boosting courage while curbing unnecessary anger and bodily heat.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Mesh Rashi (Aries) Vedic Products & Astrological Remedies | Veda Store',
    seoDescription: 'Authentic 3 Mukhi Rudraksha, Red Coral gemstone, and Vedic Mangal Yantra curated for Mesh Rashi (Aries) from Kashi.',
    faqs: [
      {
        question: 'Which Rudraksha is best for Mesh Rashi (Aries)?',
        answer: 'Traditionally, 3 Mukhi Rudraksha (ruled by Agni Dev and Mars) is highly recommended for Mesh Rashi to enhance energy and confidence.'
      },
      {
        question: 'Can Mesh Rashi wear Red Coral?',
        answer: 'Yes! Red Coral (Moonga) is the primary gemstone for Mars, providing strength, leadership, and protection against accidents.'
      }
    ]
  },
  {
    id: 'rashi-2',
    slug: 'vrishabh',
    nameEn: 'Taurus',
    nameHi: 'Vrishabh (वृषभ)',
    symbol: '♉',
    element: 'Earth',
    modality: 'Fixed',
    rulingPlanet: 'Venus (Shukra Dev)',
    description: 'Grounded, artistic, patient, and lover of luxury. Vrishabh Rashi thrives under Venusian harmony, prosperity, and emotional stability.',
    recommendedRudraksha: '6 Mukhi Rudraksha & 7 Mukhi Rudraksha',
    recommendedGemstone: 'Diamond / White Zircon & Opal',
    recommendedYantra: 'Shree Yantra & Shukra Yantra',
    recommendedBracelet: 'Rose Quartz & White Aura Quartz Bracelet',
    recommendedPuja: 'Mahalakshmi Puja & Gauri Shankar Puja',
    whyTheseProducts: '6 Mukhi (Kartikeya/Venus) and 7 Mukhi (Mahalakshmi) bring financial stability, artistic charm, and marital peace.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Vrishabh Rashi (Taurus) Gemstones & Rudraksha Remedies | Veda Store',
    seoDescription: 'Discover Venusian remedies for Vrishabh Rashi: 6 Mukhi Nepalese Rudraksha, White Zircon, and Shree Yantra.',
    faqs: [
      {
        question: 'Which gemstone balances Venus for Vrishabh Rashi?',
        answer: 'Natural Diamond or lab-certified White Zircon and Opal are traditionally recommended for Vrishabh Rashi to attract wealth and love.'
      }
    ]
  },
  {
    id: 'rashi-3',
    slug: 'mithun',
    nameEn: 'Gemini',
    nameHi: 'Mithun (मिथुन)',
    symbol: '♊',
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercury (Budh Dev)',
    description: 'Intellectual, communicative, adaptable, and inquisitive. Governed by Budh, Mithun Rashi benefits from sharp focus and mental clarity.',
    recommendedRudraksha: '4 Mukhi Rudraksha & 10 Mukhi Rudraksha',
    recommendedGemstone: 'Emerald (Panna) & Peridot',
    recommendedYantra: 'Budh Yantra & Saraswati Yantra',
    recommendedBracelet: 'Green Jade & Citrine Bracelet',
    recommendedPuja: 'Ganesh Puja & Saraswati Puja',
    whyTheseProducts: '4 Mukhi (Lord Brahma) and Emerald strengthen intellect, business communication, and speech fluency.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Mithun Rashi (Gemini) Vedic Guidance & Products | Veda Store',
    seoDescription: 'Shop 4 Mukhi Rudraksha, Emerald (Panna), and Budh Yantra for Mithun Rashi (Gemini). Lab-certified from Kashi.',
    faqs: [
      {
        question: 'Why is 4 Mukhi Rudraksha effective for Mithun Rashi?',
        answer: '4 Mukhi represents Lord Brahma and Mercury energy, aiding quick comprehension, public speaking, and creative writing.'
      }
    ]
  },
  {
    id: 'rashi-4',
    slug: 'kark',
    nameEn: 'Cancer',
    nameHi: 'Kark (कर्क)',
    symbol: '♋',
    element: 'Water',
    modality: 'Cardinal',
    rulingPlanet: 'Moon (Chandra Dev)',
    description: 'Intuitive, emotional, nurturing, and empathetic. Governed by Chandra, Kark Rashi needs emotional composure and peace of mind.',
    recommendedRudraksha: '2 Mukhi Rudraksha (Ardhanarishvara)',
    recommendedGemstone: 'Natural Pearl (Moti) & Moonstone',
    recommendedYantra: 'Chandra Yantra',
    recommendedBracelet: 'Howlite & Moonstone Bracelet',
    recommendedPuja: 'Shivling Jal Abhishekam & Chandra Shanti Puja',
    whyTheseProducts: '2 Mukhi Rudraksha and South Sea Pearl soothe emotional fluctuations, anxiety, and moon dosha.',
    imageUrl: 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Kark Rashi (Cancer) Moon Remedies & Rudraksha | Veda Store',
    seoDescription: 'Find authentic 2 Mukhi Rudraksha, Natural Pearl (Moti), and Chandra Yantra for Kark Rashi.',
    faqs: [
      {
        question: 'Which Rudraksha brings emotional peace to Kark Rashi?',
        answer: '2 Mukhi Rudraksha is governed by Moon and Lord Shiva-Parvati, bringing peace, relationship stability, and mental calm.'
      }
    ]
  },
  {
    id: 'rashi-5',
    slug: 'singh',
    nameEn: 'Leo',
    nameHi: 'Singh (सिंह)',
    symbol: '♌',
    element: 'Fire',
    modality: 'Fixed',
    rulingPlanet: 'Sun (Surya Dev)',
    description: 'Regal, confident, magnetic, and protective. Singh Rashi is powered by Surya Dev, benefiting from leadership radiance and solar vitality.',
    recommendedRudraksha: '12 Mukhi Rudraksha & 1 Mukhi Rudraksha',
    recommendedGemstone: 'Ruby (Manik) & Sunstone',
    recommendedYantra: 'Surya Yantra & Gayatri Yantra',
    recommendedBracelet: 'Pyrite & Sunstone Bracelet',
    recommendedPuja: 'Surya Arghya Puja & Aditya Hrudayam Paath',
    whyTheseProducts: '12 Mukhi Rudraksha (12 Adityas) and Ruby elevate social prestige, administrative success, and physical stamina.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Singh Rashi (Leo) Solar Remedies & Products | Veda Store',
    seoDescription: 'Explore 12 Mukhi Nepalese Rudraksha, Ruby (Manik), and Pyrite for Singh Rashi (Leo) at Veda Store.',
    faqs: [
      {
        question: 'What is the signature gemstone for Singh Rashi?',
        answer: 'Ruby (Manik) is the primary gemstone for Surya Dev, granting authority, vitality, and career elevation.'
      }
    ]
  },
  {
    id: 'rashi-6',
    slug: 'kanya',
    nameEn: 'Virgo',
    nameHi: 'Kanya (कन्या)',
    symbol: '♍',
    element: 'Earth',
    modality: 'Mutable',
    rulingPlanet: 'Mercury (Budh Dev)',
    description: 'Analytical, practical, diligent, and health-conscious. Governed by Budh, Kanya Rashi benefits from nervous system calm and practical wisdom.',
    recommendedRudraksha: '4 Mukhi Rudraksha & 10 Mukhi Rudraksha',
    recommendedGemstone: 'Emerald (Panna) & Green Tourmaline',
    recommendedYantra: 'Kuber Yantra & Budh Yantra',
    recommendedBracelet: 'Green Aventurine & Fluorite Bracelet',
    recommendedPuja: 'Vishnu Sahasranama Puja & Ganesh Puja',
    whyTheseProducts: '4 Mukhi and Emerald enhance analytical decision making, commercial success, and mental tranquility.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Kanya Rashi (Virgo) Vedic Remedies & Gemstones | Veda Store',
    seoDescription: 'Shop lab-certified Emerald (Panna), 4 Mukhi Rudraksha, and Green Aventurine for Kanya Rashi.',
    faqs: [
      {
        question: 'Which Rudraksha helps Kanya Rashi in business and career?',
        answer: '4 Mukhi Rudraksha combined with 10 Mukhi Rudraksha protects against commercial loss and enhances focus.'
      }
    ]
  },
  {
    id: 'rashi-7',
    slug: 'tula',
    nameEn: 'Libra',
    nameHi: 'Tula (तुला)',
    symbol: '♎',
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Venus (Shukra Dev)',
    description: 'Balanced, diplomatic, refined, and aesthetic. Tula Rashi native seeks harmony in relationships, business partnerships, and finances.',
    recommendedRudraksha: '6 Mukhi Rudraksha & 13 Mukhi Rudraksha',
    recommendedGemstone: 'White Zircon / Diamond & Opal',
    recommendedYantra: 'Shree Yantra',
    recommendedBracelet: 'Rose Quartz & Amethyst Bracelet',
    recommendedPuja: 'Lakshmi Puja & Gauri Shankar Puja',
    whyTheseProducts: '6 Mukhi (Venus) and Rose Quartz align emotional aura, fostering marital harmony and attracting affluence.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Tula Rashi (Libra) Venus Remedies & Jewelry | Veda Store',
    seoDescription: 'Authentic 6 Mukhi Rudraksha, Opal, Zircon, and Shree Yantra for Tula Rashi (Libra). Delivered from Kashi.',
    faqs: [
      {
        question: 'How does 6 Mukhi Rudraksha assist Tula Rashi?',
        answer: '6 Mukhi is ruled by Kartikeya and Venus, granting willpower, artistic talent, and protection against financial debt.'
      }
    ]
  },
  {
    id: 'rashi-8',
    slug: 'vrishchik',
    nameEn: 'Scorpio',
    nameHi: 'Vrishchik (वृश्चिक)',
    symbol: '♏',
    element: 'Water',
    modality: 'Fixed',
    rulingPlanet: 'Mars (Mangal Dev)',
    description: 'Intense, intuitive, transformative, and deeply loyal. Governed by Mangal, Vrishchik Rashi requires aura shielding and emotional balance.',
    recommendedRudraksha: '3 Mukhi Rudraksha & 9 Mukhi Rudraksha',
    recommendedGemstone: 'Red Coral (Moonga) & Yellow Sapphire',
    recommendedYantra: 'Durga Bisa Yantra & Mangal Yantra',
    recommendedBracelet: 'Black Obsidian & Red Jasper Bracelet',
    recommendedPuja: 'Rudra Abhishekam & Durga Saptashati',
    whyTheseProducts: '3 Mukhi clears past karma, while Red Coral and Black Obsidian guard against negative energies.',
    imageUrl: 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Vrishchik Rashi (Scorpio) Astrological Remedies | Veda Store',
    seoDescription: 'Shop 3 Mukhi Rudraksha, Red Coral, and protective Obsidian for Vrishchik Rashi at Veda Store.',
    faqs: [
      {
        question: 'Which Rudraksha provides protection for Vrishchik Rashi?',
        answer: '9 Mukhi (Maa Durga) paired with 3 Mukhi (Agni Dev) provides powerful aura protection and emotional strength.'
      }
    ]
  },
  {
    id: 'rashi-9',
    slug: 'dhanu',
    nameEn: 'Sagittarius',
    nameHi: 'Dhanu (धनु)',
    symbol: '♐',
    element: 'Fire',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter (Guru Dev)',
    description: 'Philosophical, optimistic, visionary, and truth-seeking. Dhanu Rashi is guided by Guru Dev, thriving under wisdom and spiritual expansion.',
    recommendedRudraksha: '5 Mukhi Rudraksha & 11 Mukhi Rudraksha',
    recommendedGemstone: 'Yellow Sapphire (Pukhraj) & Citrine',
    recommendedYantra: 'Guru Yantra & Kuber Yantra',
    recommendedBracelet: 'Citrine & Sodalite Bracelet',
    recommendedPuja: 'Brihaspati Puja & Satyanarayan Katha',
    whyTheseProducts: 'Yellow Sapphire and 5 Mukhi Rudraksha enhance higher education, spiritual wisdom, financial fortune, and family harmony.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Dhanu Rashi (Sagittarius) Jupiter Remedies | Veda Store',
    seoDescription: 'Discover Yellow Sapphire (Pukhraj), 5 Mukhi Rudraksha, and Guru Yantra for Dhanu Rashi.',
    faqs: [
      {
        question: 'What is the primary gemstone for Dhanu Rashi?',
        answer: 'Yellow Sapphire (Pukhraj) is the ruling gemstone for Jupiter (Guru), attracting prosperity, wisdom, and good fortune.'
      }
    ]
  },
  {
    id: 'rashi-10',
    slug: 'makar',
    nameEn: 'Capricorn',
    nameHi: 'Makar (मकर)',
    symbol: '♑',
    element: 'Earth',
    modality: 'Cardinal',
    rulingPlanet: 'Saturn (Shani Dev)',
    description: 'Disciplined, pragmatic, ambitious, and resilient. Governed by Shani Dev, Makar Rashi native benefits from patience and karmic protection.',
    recommendedRudraksha: '7 Mukhi Rudraksha & 14 Mukhi Rudraksha',
    recommendedGemstone: 'Blue Sapphire (Neelam) & Amethyst',
    recommendedYantra: 'Shani Yantra & Mahamrityunjay Yantra',
    recommendedBracelet: 'Amethyst & Tiger Eye Bracelet',
    recommendedPuja: 'Shani Shanti Puja & Hanuman Chalisa Paath',
    whyTheseProducts: '7 Mukhi (Mahalakshmi) and Amethyst neutralize Shani Sade Sati challenges, granting career discipline and wealth.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Makar Rashi (Capricorn) Saturn Remedies | Veda Store',
    seoDescription: 'Find authentic 7 Mukhi Rudraksha, Amethyst, Blue Sapphire, and Shani Yantra for Makar Rashi.',
    faqs: [
      {
        question: 'Which Rudraksha reduces Shani Sade Sati effects for Makar Rashi?',
        answer: '7 Mukhi Rudraksha (ruled by Shani & Mahalakshmi) and 14 Mukhi Rudraksha (Devamani) neutralize Saturn doshas.'
      }
    ]
  },
  {
    id: 'rashi-11',
    slug: 'kumbh',
    nameEn: 'Aquarius',
    nameHi: 'Kumbh (कुंभ)',
    symbol: '♒',
    element: 'Air',
    modality: 'Fixed',
    rulingPlanet: 'Saturn (Shani Dev)',
    description: 'Humanitarian, progressive, original, and intellectual. Kumbh Rashi is governed by Shani Dev, benefiting from focus and high-vibration clarity.',
    recommendedRudraksha: '7 Mukhi Rudraksha & 11 Mukhi Rudraksha',
    recommendedGemstone: 'Blue Sapphire (Neelam) & Lapis Lazuli',
    recommendedYantra: 'Shani Yantra & Shree Yantra',
    recommendedBracelet: 'Lapis Lazuli & Amethyst Bracelet',
    recommendedPuja: 'Hanuman Puja & Rudrabhishek',
    whyTheseProducts: '11 Mukhi (Lord Hanuman) and Lapis Lazuli empower focus, divine wisdom, and protection against obstacle transits.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Kumbh Rashi (Aquarius) Shanti Remedies | Veda Store',
    seoDescription: 'Shop 7 Mukhi Rudraksha, 11 Mukhi Rudraksha, Lapis Lazuli, and Shani Yantra for Kumbh Rashi.',
    faqs: [
      {
        question: 'Why is 11 Mukhi Rudraksha suited for Kumbh Rashi?',
        answer: '11 Mukhi represents the eleven Rudras (Lord Hanuman), instilling mental stamina, fearlessness, and devotion.'
      }
    ]
  },
  {
    id: 'rashi-12',
    slug: 'meen',
    nameEn: 'Pisces',
    nameHi: 'Meen (मीन)',
    symbol: '♓',
    element: 'Water',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter (Guru Dev)',
    description: 'Empathetic, compassionate, artistic, and deeply spiritual. Meen Rashi native is guided by Guru Dev, needing spiritual grounding and mental peace.',
    recommendedRudraksha: '5 Mukhi Rudraksha & Gauri Shankar Rudraksha',
    recommendedGemstone: 'Yellow Sapphire (Pukhraj) & Aquamarine',
    recommendedYantra: 'Guru Yantra & Vishnu Yantra',
    recommendedBracelet: 'Clear Quartz & Aquamarine Bracelet',
    recommendedPuja: 'Vishnu Sahasranama Puja & Satyanarayan Katha',
    whyTheseProducts: 'Yellow Sapphire and 5 Mukhi Rudraksha align spiritual intuition with material stability and peaceful relationships.',
    imageUrl: 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&q=80&w=600',
    seoTitle: 'Meen Rashi (Pisces) Vedic Guidance & Products | Veda Store',
    seoDescription: 'Explore Yellow Sapphire, 5 Mukhi Nepalese Rudraksha, and Vishnu Yantra for Meen Rashi (Pisces).',
    faqs: [
      {
        question: 'Which gemstone brings good luck to Meen Rashi?',
        answer: 'Yellow Sapphire (Pukhraj) is the primary gemstone for Jupiter, enhancing divine wisdom, spiritual expansion, and wealth.'
      }
    ]
  }
];
