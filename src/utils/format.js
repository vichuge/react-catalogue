// Species whose API name keeps a meaningful hyphen or needs special punctuation.
const specialNames = {
  'nidoran-f': 'Nidoran ♀',
  'nidoran-m': 'Nidoran ♂',
  'mr-mime': 'Mr. Mime',
  'mime-jr': 'Mime Jr.',
  'mr-rime': 'Mr. Rime',
  'ho-oh': 'Ho-Oh',
  'porygon-z': 'Porygon-Z',
  'type-null': 'Type: Null',
  'jangmo-o': 'Jangmo-o',
  'hakamo-o': 'Hakamo-o',
  'kommo-o': 'Kommo-o',
  'wo-chien': 'Wo-Chien',
  'chien-pao': 'Chien-Pao',
  'ting-lu': 'Ting-Lu',
  'chi-yu': 'Chi-Yu',
  farfetchd: 'Farfetch’d',
  sirfetchd: 'Sirfetch’d',
  flabebe: 'Flabébé',
};

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const formatName = (name = '') => specialNames[name]
  || name.split('-').map(capitalize).join(' ');

export const formatNumber = (id) => `#${String(id).padStart(4, '0')}`;

export const idFromUrl = (url = '') => Number(url.split('/').filter(Boolean).pop());

// Strips the form-feed / soft hyphen characters the PokéAPI flavor text contains.
export const cleanFlavorText = (text = '') => text
  .replace(/[\f\n\r­]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
