import { GEMSTONE_CATALOG_DATA, GemstoneItem } from '../data/gemstoneCatalogData';

/**
 * Normalized shape every gemstone "tile" is rendered from on the
 * /gemstones/view-all page. Whether a tile came from local demo data
 * or a real Shopify product, it always looks like this by the time
 * it reaches the UI — so the page component never needs to know
 * where the data actually came from.
 */
export interface GemstoneTile {
  id: string;
  slug: string;
  name: string;
  image: string;
  colorLabel: string; // raw descriptive color, e.g. "Deep Royal Blue"
  colorFamily: string; // normalized bucket used for filtering + the tile's backdrop color, e.g. "Blue"
  planet: string; // short planet name, e.g. "Saturn" ('' if not applicable)
  zodiacSigns: string[]; // short zodiac names, e.g. ["Capricorn", "Aquarius"]
  themeColor: string; // saturated brand color for this gem's card backdrop (glossy studio-light gradient)
}

// One saturated color per color family — used to build a glossy, studio-light backdrop
// (color → near-white band → color, top to bottom) behind every tile's gemstone image.
const COLOR_FAMILY_THEMES: Record<string, string> = {
  Blue: '#3E6FB0',
  Red: '#B23A55',
  Green: '#3E8A5C',
  Yellow: '#E8A93B',
  Orange: '#D9824A',
  Purple: '#7C58AC',
  Pink: '#C85A93',
  White: '#B9B0A0',
  Teal: '#3E9C93',
  Multicolor: '#CC9A3E',
  Default: '#D9A94E'
};

/** Builds the exact glossy "color → light → color" vertical gradient used behind each tile's gem. */
export function buildTileGradient(themeColor: string): string {
  return `linear-gradient(180deg, ${themeColor} 0%, #FDFBF6 50%, ${themeColor} 100%)`;
}

/** Maps a free-text color description (from the data) to a normalized filter/theme bucket. */
function getColorFamily(colorLabel: string, gemstoneType: string): string {
  const text = `${colorLabel} ${gemstoneType}`.toLowerCase();
  if (text.includes('multicolor') || text.includes('rainbow')) return 'Multicolor';
  if (text.includes('pink') || text.includes('rose')) return 'Pink';
  if (text.includes('teal') || text.includes('turquoise')) return 'Teal';
  if (text.includes('blue') || text.includes('indigo') || text.includes('sapphire')) return 'Blue';
  if (
    text.includes('red') ||
    text.includes('ruby') ||
    text.includes('crimson') ||
    text.includes('wine') ||
    text.includes('flame')
  )
    return 'Red';
  if (text.includes('green') || text.includes('emerald') || text.includes('olive')) return 'Green';
  if (
    text.includes('yellow') ||
    text.includes('golden') ||
    text.includes('gold') ||
    text.includes('sun') ||
    text.includes('citrine')
  )
    return 'Yellow';
  if (text.includes('orange') || text.includes('honey') || text.includes('cinnamon') || text.includes('amber'))
    return 'Orange';
  if (text.includes('purple') || text.includes('violet')) return 'Purple';
  if (
    text.includes('white') ||
    text.includes('clear') ||
    text.includes('colorless') ||
    text.includes('pearl') ||
    text.includes('ivory') ||
    text.includes('milky')
  )
    return 'White';
  return 'Default';
}

/** Shortens data strings like "Saturn (Shani)" or "Capricorn (Makar)" down to just "Saturn" / "Capricorn". */
function shortLabel(value?: string): string {
  if (!value) return '';
  return value.split('(')[0].trim();
}

/**
 * Optional per-gemstone image override, used ONLY on the "View All Gemstones" tile grid.
 *
 * By default every tile uses `gem.image` from GEMSTONE_CATALOG_DATA (src/data/gemstoneCatalogData.ts) —
 * so it already shows an image for every card out of the box.
 *
 * If you'd rather use your own photo for a specific gemstone on THIS page (without changing the
 * image used everywhere else on the site — detail page, featured strip, etc.), drop your file in
 * /public/images/gemstones-page/all/ and add one line here, keyed by the gemstone's slug:
 *
 *   'blue-sapphire': '/images/gemstones-page/all/blue-sapphire.png',
 *   'ruby': '/images/gemstones-page/all/ruby.png',
 *
 * Any slug not listed here just falls back to gem.image automatically — nothing else to configure.
 */
const TILE_IMAGE_OVERRIDES: Record<string, string> = {
    'blue-sapphire': '/images/gemstones-page/all/BlueSapphire.png',
    'yellow-sapphire': '/images/gemstones-page/all/YellowSapphire.png',
    'red-coral': '/images/gemstones-page/all/RedCoral.png',
    'cat-eye': '/images/gemstones-page/all/CatsEye.png',
    'hessonite': '/images/gemstones-page/all/Hessonite.png',
    'pearl': '/images/gemstones-page/all/Pearl.png',
    'ruby': '/images/gemstones-page/all/Ruby.png',
    'emerald': '/images/gemstones-page/all/Emerald.png',
    'diamond': '/images/gemstones-page/all/Diamond.png',
    'garnet': '/images/gemstones-page/all/Garnet.png',
    'peridot': '/images/gemstones-page/all/Peridot.png',
    'citrine': '/images/gemstones-page/all/Citrine.png',
    'amethyst': '/images/gemstones-page/all/Amethyst.png',
    'aquamarine': '/images/gemstones-page/all/AquaMarine.png',
    'blue-topaz': '/images/gemstones-page/all/BlueTopaz.png',
    'blue-zircon': '/images/gemstones-page/all/BlueZircon.png',
    'alexandrite': '/images/gemstones-page/all/Alexandrite.png',
    'amber': '/images/gemstones-page/all/Amber.png',
    'ametrine': '/images/gemstones-page/all/Ametrine.png',
    'burmese-ruby': '/images/gemstones-page/all/BurmeseRuby.png',
};

function mapCatalogItemToTile(gem: GemstoneItem): GemstoneTile {
  const colorFamily = getColorFamily(gem.color, gem.gemstoneType);
  const themeColor = COLOR_FAMILY_THEMES[colorFamily] || COLOR_FAMILY_THEMES.Default;

  return {
    id: gem.id,
    slug: gem.slug,
    name: gem.name,
    image: TILE_IMAGE_OVERRIDES[gem.slug] || gem.image,
    colorLabel: gem.color,
    colorFamily,
    planet: shortLabel(gem.associatedPlanet),
    zodiacSigns: (gem.associatedZodiacSigns || []).map(shortLabel),
    themeColor
  };
}

/**
 * ---------------------------------------------------------------------
 * DATA SOURCE — swap this when Shopify is connected.
 * ---------------------------------------------------------------------
 * This is the ONLY function that needs to change. Replace the body with
 * a real call to your Shopify Storefront/Admin API, e.g.:
 *
 *   const products = await shopifyClient.product.fetchAll();
 *   return products.map(mapShopifyProductToGemstoneTile);
 *
 * As long as whatever you return matches the GemstoneTile shape above,
 * every component that consumes getAllGemstoneTiles() below (filters,
 * grid, cards) keeps working exactly as it does today with demo data.
 * ---------------------------------------------------------------------
 */
async function fetchGemstoneTilesFromSource(): Promise<GemstoneTile[]> {
  // Demo/local data for now (GEMSTONE_CATALOG_DATA in src/data/gemstoneCatalogData.ts).
  return GEMSTONE_CATALOG_DATA.map(mapCatalogItemToTile);
}

/** Public entry point used by the "View All Gemstones" page. */
export async function getAllGemstoneTiles(): Promise<GemstoneTile[]> {
  return fetchGemstoneTilesFromSource();
}

/** Distinct, sorted filter option lists — derived live from whatever data source is active. */
export function getGemstoneFilterOptions(tiles: GemstoneTile[]) {
  const colors = Array.from(new Set(tiles.map((t) => t.colorFamily))).sort();
  const planets = Array.from(new Set(tiles.map((t) => t.planet).filter(Boolean))).sort();
  const zodiacSigns = Array.from(new Set(tiles.flatMap((t) => t.zodiacSigns).filter(Boolean))).sort();
  return { colors, planets, zodiacSigns };
}