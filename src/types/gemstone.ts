export type GemstoneType =
  | 'Ruby'
  | 'Emerald'
  | 'Blue Sapphire'
  | 'Yellow Sapphire'
  | 'Pearl'
  | 'Red Coral'
  | 'Hessonite'
  | 'Cats Eye'
  | 'Diamond'
  | 'Opal'
  | 'Amethyst'
  | 'Citrine'
  | 'Garnet'
  | 'Turquoise'
  | 'Peridot'
  | 'Aquamarine'
  | 'Tanzanite'
  | 'Tourmaline'
  | 'Moonstone'
  | 'Iolite'
  | 'White Sapphire'
  | 'Fire Opal'
  | 'Pitambari Neelam'
  | 'White Coral'
  | 'Yellow Topaz'
  | 'Zircon'
  | 'Alexandrite'
  | 'Burmese Ruby'
  | 'Colombian Emerald'
  | 'Cornflower Blue Sapphire'
  | 'Kashmir Sapphire'
  | 'No Oil Emerald'
  | 'Panjshir Emerald'
  | 'Padparadscha Sapphire'
  | 'Paraiba Tourmaline'
  | 'Pigeon Blood Ruby'
  | 'Pink Sapphire'
  | 'Royal Blue Sapphire'
  | 'Vivid Green Emerald'
  | 'Amber'
  | 'Ametrine'
  | 'Blue Topaz'
  | 'Kyanite'
  | 'Lapis Lazuli'
  | 'Moldavite'
  | 'Star Ruby'
  | 'Spinel'
  | 'Blue Zircon';

export type GemstoneOrigin =
  | 'Sri Lanka (Ceylon)'
  | 'Myanmar (Burma)'
  | 'Mozambique'
  | 'Zambia'
  | 'Colombia'
  | 'Australia'
  | 'Ethiopia'
  | 'Madagascar'
  | 'Tanzania'
  | 'India (Kashmir)'
  | 'Thailand'
  | 'Brazil'
  | 'Russia'
  | 'Nigeria'
  | 'Afghanistan'
  | 'Mexico';

export type CertificationLab = 'GIA' | 'IGI' | 'GRS' | 'Gubelin' | 'IIGJ' | 'GSI' | 'AIGS' | 'ITLGR' | 'AGR' | 'ICA Gemlab';
export type QualityTier = 'Entry' | 'Premium' | 'Collector';
export type GemstoneCategoryTaxonomy = 'Zodiac / Vedic' | 'Popular Gemstones' | 'Premium / Rare Collection' | 'Other Stones';
export type ShoppingPurpose = 'Career' | 'Wealth' | 'Love' | 'Protection' | 'Confidence' | 'Spirituality';

export type GemstoneCut = 'Faceted' | 'Cabochon' | 'Carved';
export type GemstoneShape = 'Oval' | 'Cushion' | 'Round' | 'Pear' | 'Octagonal' | 'Heart' | 'Marquise' | 'Rectangle' | 'Fancy';
export type GemstoneTreatment = 'Untreated (100% Natural)' | 'Heated' | 'Oiled' | 'Minor Oil' | 'Glass-filled' | 'Diffused';
export type MetalOption = 'Silver (925 Sterling)' | 'Panchdhatu' | '14K Yellow Gold' | '18K Yellow Gold' | '22K Yellow Gold' | 'Rose Gold';

export interface GemstoneMarketItem {
  id: string;
  name: string;
  slug: string;
  gemstoneType: GemstoneType;
  alternativeName?: string;
  categoryTaxonomy: GemstoneCategoryTaxonomy;
  origin: GemstoneOrigin;
  carat: number;
  ratti: number;
  price: number;
  pricePerCarat: number;
  color: string;
  colorIntensity?: string;
  clarity: string;
  treatment: GemstoneTreatment;
  certificationLab: CertificationLab;
  certificateNumber: string;
  shape: GemstoneShape;
  cuttingStyle: GemstoneCut;
  dimensions?: string;
  productType: 'Loose Gemstone' | 'Ring' | 'Pendant';
  availability: 'In Stock' | 'Call for Price' | 'Out of Stock';
  stock: number;
  sku: string;
  images: string[];
  description: string;
  astrologicalPlanet: string;
  associatedRashi: string[];
  traditionalBenefits: string[];
  wearingFinger: string;
  recommendedMetal: MetalOption;
  recommendedDay: string;
  mantra: string;
  careInstructions?: string;
  qualityTier: QualityTier;
  purposeTags: ShoppingPurpose[];
}

export interface AstrologyRecommendationInput {
  fullName: string;
  dob: string;
  tob: string;
  pob: string;
  primaryGoal: 'Career' | 'Business' | 'Relationships' | 'Education' | 'Confidence' | 'Spirituality' | 'General Wellbeing';
  weightKg?: number;
}

export interface AstrologyRecommendationResult {
  primaryGemstone: GemstoneType;
  alternativeGemstone: GemstoneType;
  rulingPlanet: string;
  userRashi: string;
  nakshatra: string;
  suggestedCaratRange: string;
  suggestedMetal: MetalOption;
  suggestedFinger: string;
  suggestedWearingDay: string;
  traditionalMantra: string;
  astrologicalReasoning: string;
  disclaimer: string;
  recommendedProducts: string[];
}

export interface CustomJewelleryRequest {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  jewelryType: 'Ring' | 'Pendant' | 'Bracelet' | 'Earrings' | 'Necklace' | 'Custom Piece';
  metal: MetalOption;
  gemstoneType: GemstoneType;
  ringSize?: string;
  budgetRange?: string;
  notes?: string;
  imageFileName?: string;
  status: 'Submitted' | 'Under Review' | 'Design Approved' | 'In Crafting' | 'Completed';
  createdAt?: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProducts?: any[];
}

export interface AdminAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockItemsCount: number;
  pendingCustomRequests: number;
}
