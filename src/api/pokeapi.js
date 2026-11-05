import { TOTAL_POKEMON } from '../constants/generations';
import { typeNames } from '../constants/types';
import { cleanFlavorText, idFromUrl } from '../utils/format';

const API = 'https://pokeapi.co/api/v2';
const SPRITES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
const CACHE_KEY = 'pokedex-index-v2';
const CACHE_TTL = 1000 * 60 * 60 * 24 * 7; // one week

export const spriteUrl = (id) => `${SPRITES}/${id}.png`;
export const artworkUrl = (id, shiny = false) => `${SPRITES}/other/official-artwork/${shiny ? 'shiny/' : ''}${id}.png`;

const getJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
};

const readCache = () => {
  try {
    const cached = JSON.parse(window.localStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.savedAt < CACHE_TTL) return cached.items;
  } catch (e) {
    // Storage can be unavailable (private mode) – just fetch again.
  }
  return null;
};

const writeCache = (items) => {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), items }));
  } catch (e) {
    // Ignore quota / privacy errors, the cache is only an optimisation.
  }
};

/**
 * Loads the full national dex (id, name, types) with 19 lightweight requests
 * instead of one request per Pokémon, and caches the result locally.
 */
export const fetchPokedexIndex = async () => {
  const cached = readCache();
  if (cached) return cached;

  const [species, ...typeResults] = await Promise.all([
    getJson(`${API}/pokemon-species?limit=${TOTAL_POKEMON}`),
    ...typeNames.map((type) => getJson(`${API}/type/${type}`).catch(() => null)),
  ]);

  const typesById = {};
  typeResults.forEach((typeData) => {
    if (!typeData) return;
    typeData.pokemon.forEach(({ slot, pokemon }) => {
      const id = idFromUrl(pokemon.url);
      if (id > TOTAL_POKEMON) return;
      typesById[id] = typesById[id] || [];
      typesById[id][slot - 1] = typeData.name;
    });
  });

  const items = species.results.map(({ name, url }) => {
    const id = idFromUrl(url);
    return { id, name, types: (typesById[id] || []).filter(Boolean) };
  }).sort((a, b) => a.id - b.id);

  // Only cache complete data, so a flaky type request is retried next visit.
  if (typeResults.every(Boolean)) writeCache(items);
  return items;
};

const flattenEvolutions = (chain) => {
  const stages = [];
  const walk = (node, depth) => {
    stages[depth] = stages[depth] || [];
    stages[depth].push({ id: idFromUrl(node.species.url), name: node.species.name });
    node.evolves_to.forEach((next) => walk(next, depth + 1));
  };
  walk(chain, 0);
  return stages;
};

const englishEntry = (entries = []) => entries.find((e) => e.language.name === 'en');

/** Loads and normalises everything the detail screen needs. */
export const fetchPokemonDetail = async (id) => {
  const [pokemon, species] = await Promise.all([
    getJson(`${API}/pokemon/${id}`),
    getJson(`${API}/pokemon-species/${id}`),
  ]);

  let evolutions = [];
  if (species.evolution_chain) {
    try {
      const chain = await getJson(species.evolution_chain.url);
      evolutions = flattenEvolutions(chain.chain);
    } catch (e) {
      evolutions = [];
    }
  }

  const flavor = [...species.flavor_text_entries].reverse()
    .find((entry) => entry.language.name === 'en');
  const genus = englishEntry(species.genera);
  const { showdown } = pokemon.sprites.other;

  return {
    id: pokemon.id,
    name: species.name,
    genus: genus ? genus.genus : '',
    flavor: flavor ? cleanFlavorText(flavor.flavor_text) : '',
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    baseExperience: pokemon.base_experience,
    types: pokemon.types.map((t) => t.type.name),
    abilities: pokemon.abilities.map((a) => ({ name: a.ability.name, hidden: a.is_hidden })),
    stats: pokemon.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    cry: pokemon.cries && (pokemon.cries.latest || pokemon.cries.legacy),
    captureRate: species.capture_rate,
    genderRate: species.gender_rate,
    habitat: species.habitat ? species.habitat.name : null,
    isLegendary: species.is_legendary,
    isMythical: species.is_mythical,
    sprites: {
      animated: (showdown && showdown.front_default) || null,
      animatedShiny: (showdown && showdown.front_shiny) || null,
      artwork: artworkUrl(pokemon.id),
      artworkShiny: artworkUrl(pokemon.id, true),
    },
    evolutions,
  };
};
