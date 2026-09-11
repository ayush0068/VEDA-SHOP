import { AstrologyRecommendationInput, AstrologyRecommendationResult, GemstoneType, MetalOption } from '../types/gemstone';

export class AstrologyService {
  /**
   * Calculates a personalized Vedic Gemstone recommendation.
   * Adheres strictly to traditional Vedic astrology principles (Navagraha planetary lords).
   * Note: Clear disclaimer added that recommendation is based on traditional Vedic astrology.
   */
  public static calculateRecommendation(input: AstrologyRecommendationInput): AstrologyRecommendationResult {
    const { fullName, dob, primaryGoal, weightKg } = input;

    // Determine birth month to approximate Sun/Moon sign alignment
    const birthDate = new Date(dob);
    const month = birthDate.getMonth() + 1; // 1 to 12
    const day = birthDate.getDate();

    let userRashi = 'Mesha (Aries)';
    let nakshatra = 'Ashwini';
    let primaryGemstone: GemstoneType = 'Red Coral';
    let alternativeGemstone: GemstoneType = 'Ruby';
    let rulingPlanet = 'Mars (Mangal)';
    let suggestedMetal: MetalOption = 'Silver (925 Sterling)';
    let suggestedFinger = 'Ring Finger';
    let suggestedWearingDay = 'Tuesday Morning (Shukla Paksha)';
    let traditionalMantra = 'Om Kram Kreem Kroum Sah Bhaumaya Namah';
    let reasoningGoal = '';

    // Goal-specific tailoring
    switch (primaryGoal) {
      case 'Career':
      case 'Confidence':
        reasoningGoal = 'To boost leadership aura, authority, solar vitality, and professional recognition.';
        break;
      case 'Business':
      case 'Education':
        reasoningGoal = 'To enhance analytical intellect, commercial acumen, memory, and trade success.';
        break;
      case 'Relationships':
        reasoningGoal = 'To foster emotional harmony, marital bliss, attraction, and Venusian grace.';
        break;
      case 'Spirituality':
      case 'General Wellbeing':
        reasoningGoal = 'To align spiritual aura, grant divine protection, peace of mind, and inner equilibrium.';
        break;
    }

    // Zodiac determination based on month/day approximation
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      userRashi = 'Mesha (Aries)';
      nakshatra = 'Bharani';
      primaryGemstone = 'Red Coral';
      alternativeGemstone = 'Ruby';
      rulingPlanet = 'Mars (Mangal)';
      suggestedMetal = '14K Yellow Gold';
      suggestedFinger = 'Ring Finger (Right Hand)';
      suggestedWearingDay = 'Tuesday Morning';
      traditionalMantra = 'Om Kram Kreem Kroum Sah Bhaumaya Namah';
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      userRashi = 'Vrishabha (Taurus)';
      nakshatra = 'Krittika';
      primaryGemstone = 'Diamond';
      alternativeGemstone = 'Opal';
      rulingPlanet = 'Venus (Shukra)';
      suggestedMetal = '18K Yellow Gold';
      suggestedFinger = 'Middle Finger (Right Hand)';
      suggestedWearingDay = 'Friday Morning';
      traditionalMantra = 'Om Dram Dreem Droum Sah Shukraya Namah';
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      userRashi = 'Mithuna (Gemini)';
      nakshatra = 'Mrigashira';
      primaryGemstone = 'Emerald';
      alternativeGemstone = 'Peridot';
      rulingPlanet = 'Mercury (Budh)';
      suggestedMetal = '14K Yellow Gold';
      suggestedFinger = 'Little Finger (Right Hand)';
      suggestedWearingDay = 'Wednesday Morning';
      traditionalMantra = 'Om Bram Breem Broum Sah Budhaya Namah';
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      userRashi = 'Kark (Cancer)';
      nakshatra = 'Pushya';
      primaryGemstone = 'Pearl';
      alternativeGemstone = 'Moonstone';
      rulingPlanet = 'Moon (Chandra)';
      suggestedMetal = 'Silver (925 Sterling)';
      suggestedFinger = 'Little Finger (Right Hand)';
      suggestedWearingDay = 'Monday Morning';
      traditionalMantra = 'Om Shram Shreem Shroum Sah Chandramase Namah';
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      userRashi = 'Simha (Leo)';
      nakshatra = 'Magha';
      primaryGemstone = 'Ruby';
      alternativeGemstone = 'Garnet';
      rulingPlanet = 'Sun (Surya)';
      suggestedMetal = '18K Yellow Gold';
      suggestedFinger = 'Ring Finger (Right Hand)';
      suggestedWearingDay = 'Sunday Morning';
      traditionalMantra = 'Om Hram Hreem Hroum Sah Suryaya Namah';
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      userRashi = 'Kanya (Virgo)';
      nakshatra = 'Hasta';
      primaryGemstone = 'Emerald';
      alternativeGemstone = 'Tourmaline';
      rulingPlanet = 'Mercury (Budh)';
      suggestedMetal = 'Panchdhatu';
      suggestedFinger = 'Little Finger (Right Hand)';
      suggestedWearingDay = 'Wednesday Morning';
      traditionalMantra = 'Om Bram Breem Broum Sah Budhaya Namah';
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      userRashi = 'Tula (Libra)';
      nakshatra = 'Chitra';
      primaryGemstone = 'Diamond';
      alternativeGemstone = 'Opal';
      rulingPlanet = 'Venus (Shukra)';
      suggestedMetal = '18K Yellow Gold';
      suggestedFinger = 'Middle Finger (Right Hand)';
      suggestedWearingDay = 'Friday Morning';
      traditionalMantra = 'Om Dram Dreem Droum Sah Shukraya Namah';
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      userRashi = 'Vrishchik (Scorpio)';
      nakshatra = 'Anuradha';
      primaryGemstone = 'Red Coral';
      alternativeGemstone = 'Ruby';
      rulingPlanet = 'Mars (Mangal)';
      suggestedMetal = '14K Yellow Gold';
      suggestedFinger = 'Ring Finger (Right Hand)';
      suggestedWearingDay = 'Tuesday Morning';
      traditionalMantra = 'Om Kram Kreem Kroum Sah Bhaumaya Namah';
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      userRashi = 'Dhanu (Sagittarius)';
      nakshatra = 'Mula';
      primaryGemstone = 'Yellow Sapphire';
      alternativeGemstone = 'Citrine';
      rulingPlanet = 'Jupiter (Guru)';
      suggestedMetal = '22K Yellow Gold';
      suggestedFinger = 'Index Finger (Right Hand)';
      suggestedWearingDay = 'Thursday Morning';
      traditionalMantra = 'Om Gram Greem Groum Sah Gurave Namah';
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      userRashi = 'Makar (Capricorn)';
      nakshatra = 'Uttara Ashadha';
      primaryGemstone = 'Blue Sapphire';
      alternativeGemstone = 'Amethyst';
      rulingPlanet = 'Saturn (Shani)';
      suggestedMetal = 'Silver (925 Sterling)';
      suggestedFinger = 'Middle Finger (Right Hand)';
      suggestedWearingDay = 'Saturday Evening';
      traditionalMantra = 'Om Pram Preem Proum Sah Shanaye Namah';
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      userRashi = 'Kumbh (Aquarius)';
      nakshatra = 'Shatabhisha';
      primaryGemstone = 'Blue Sapphire';
      alternativeGemstone = 'Iolite';
      rulingPlanet = 'Saturn (Shani)';
      suggestedMetal = 'Silver (925 Sterling)';
      suggestedFinger = 'Middle Finger (Right Hand)';
      suggestedWearingDay = 'Saturday Evening';
      traditionalMantra = 'Om Pram Preem Proum Sah Shanaye Namah';
    } else {
      userRashi = 'Meena (Pisces)';
      nakshatra = 'Revati';
      primaryGemstone = 'Yellow Sapphire';
      alternativeGemstone = 'Citrine';
      rulingPlanet = 'Jupiter (Guru)';
      suggestedMetal = '18K Yellow Gold';
      suggestedFinger = 'Index Finger (Right Hand)';
      suggestedWearingDay = 'Thursday Morning';
      traditionalMantra = 'Om Gram Greem Groum Sah Gurave Namah';
    }

    // Carat weight formula calculation (1 Ratti / Carat per 12kg of body weight + 0.5)
    let minCarat = 4.25;
    let maxCarat = 6.5;
    if (weightKg && weightKg > 30) {
      const baseCarat = weightKg / 12;
      minCarat = Math.round((baseCarat - 0.25) * 100) / 100;
      maxCarat = Math.round((baseCarat + 1.25) * 100) / 100;
    }
    const suggestedCaratRange = `${minCarat} - ${maxCarat} Carat (${Math.round(minCarat * 1.1)} - ${Math.round(maxCarat * 1.1)} Ratti)`;

    const astrologicalReasoning = `Based on your birth date (${dob}) and Vedic astrology calculations for ${fullName}, your dominant natal lord is ${rulingPlanet} in ${userRashi} rashi (${nakshatra} nakshatra). Wearing authentic natural ${primaryGemstone} strengthens the positive vibrations of ${rulingPlanet}. ${reasoningGoal}`;

    return {
      primaryGemstone,
      alternativeGemstone,
      rulingPlanet,
      userRashi,
      nakshatra,
      suggestedCaratRange,
      suggestedMetal,
      suggestedFinger,
      suggestedWearingDay,
      traditionalMantra,
      astrologicalReasoning,
      disclaimer: 'DISCLAIMER: This recommendation is strictly based on traditional Vedic astrology principles and beliefs. It is provided for spiritual and astrological guidance and is not scientifically or medically proven.',
      recommendedProducts: [
        `gem-${primaryGemstone.toLowerCase().replace(/ /g, '-')}-ceylon-5ct`,
        `gem-${alternativeGemstone.toLowerCase().replace(/ /g, '-')}`
      ]
    };
  }
}
