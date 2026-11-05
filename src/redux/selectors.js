import generations from '../constants/generations';
import { formatName } from '../utils/format';

const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const filterPokemons = (items, { generation, type, query }) => {
  const gen = generations.find((g) => g.id === generation);
  const q = normalize(query.trim().replace(/^#/, ''));
  const numeric = /^\d+$/.test(q) ? Number(q) : null;

  return items.filter((p) => {
    if (gen && (p.id < gen.from || p.id > gen.to)) return false;
    if (type !== 'All' && !p.types.includes(type)) return false;
    if (!q) return true;
    if (numeric !== null) return String(p.id).startsWith(String(numeric));
    return normalize(p.name).includes(q) || normalize(formatName(p.name)).includes(q);
  });
};

export const selectFilteredPokemons = (state) => filterPokemons(state.pokemons.items, state.filter);

export const selectNeighbours = (state, id) => {
  const { items } = state.pokemons;
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) return { prev: null, next: null };
  return { prev: items[index - 1] || null, next: items[index + 1] || null };
};
