export interface City {
  id: string;
  name: string;
  jp: string;
}

// Matches the {#id} anchors on the H3 city headings inside The Cities section
// of japan-2024.mdx. Kept here (rather than threaded through as MDX props,
// which the heading-override mechanism doesn't support) so JapanH3.astro and
// RailNav.astro share one source of truth.
export const CITIES: City[] = [
  { id: 'tokyo', name: 'Tokyo', jp: '東京' },
  { id: 'osaka', name: 'Osaka', jp: '大阪' },
  { id: 'kyoto', name: 'Kyoto', jp: '京都' },
  { id: 'nara', name: 'Nara', jp: '奈良' },
  { id: 'kobe', name: 'Kobe', jp: '神戸' },
  { id: 'hiroshima', name: 'Hiroshima', jp: '広島' },
  { id: 'miyajima', name: 'Miyajima', jp: '宮島' },
  { id: 'hakone', name: 'Hakone', jp: '箱根' },
];

export const CITY_IDS = new Set(CITIES.map((c) => c.id));
