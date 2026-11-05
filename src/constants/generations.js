// National Pokédex ranges for every main-series generation.
const generations = [
  {
    id: 'gen-1', label: 'Gen I', region: 'Kanto', from: 1, to: 151,
  },
  {
    id: 'gen-2', label: 'Gen II', region: 'Johto', from: 152, to: 251,
  },
  {
    id: 'gen-3', label: 'Gen III', region: 'Hoenn', from: 252, to: 386,
  },
  {
    id: 'gen-4', label: 'Gen IV', region: 'Sinnoh', from: 387, to: 493,
  },
  {
    id: 'gen-5', label: 'Gen V', region: 'Unova', from: 494, to: 649,
  },
  {
    id: 'gen-6', label: 'Gen VI', region: 'Kalos', from: 650, to: 721,
  },
  {
    id: 'gen-7', label: 'Gen VII', region: 'Alola', from: 722, to: 809,
  },
  {
    id: 'gen-8', label: 'Gen VIII', region: 'Galar', from: 810, to: 905,
  },
  {
    id: 'gen-9', label: 'Gen IX', region: 'Paldea', from: 906, to: 1025,
  },
];

export const TOTAL_POKEMON = generations[generations.length - 1].to;

export const generationOf = (id) => generations.find((g) => id >= g.from && id <= g.to);

export default generations;
