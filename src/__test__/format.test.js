import {
  formatName, formatNumber, idFromUrl, cleanFlavorText,
} from '../utils/format';

describe('formatName', () => {
  it('capitalizes regular names', () => {
    expect(formatName('bulbasaur')).toBe('Bulbasaur');
  });

  it('turns hyphens into spaces for multi-word names', () => {
    expect(formatName('iron-valiant')).toBe('Iron Valiant');
    expect(formatName('tapu-koko')).toBe('Tapu Koko');
  });

  it('handles special punctuation', () => {
    expect(formatName('mr-mime')).toBe('Mr. Mime');
    expect(formatName('nidoran-f')).toBe('Nidoran ♀');
    expect(formatName('ho-oh')).toBe('Ho-Oh');
    expect(formatName('farfetchd')).toBe('Farfetch’d');
  });
});

describe('helpers', () => {
  it('pads the national number', () => {
    expect(formatNumber(7)).toBe('#0007');
    expect(formatNumber(1025)).toBe('#1025');
  });

  it('extracts the id from an API url', () => {
    expect(idFromUrl('https://pokeapi.co/api/v2/pokemon-species/150/')).toBe(150);
  });

  it('cleans flavor text control characters', () => {
    expect(cleanFlavorText('A strange\fseed was\nplanted')).toBe('A strange seed was planted');
  });
});
