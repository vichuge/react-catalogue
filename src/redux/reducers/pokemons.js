import { ADD_POKEMON, GET_POKEMON } from '../actionTypes';

const result = [];

const initialState = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const wData = await response.json();
    wData.results.map((p, i) => (result.push({
      id: i + 1,
      name: p.name,
      url: p.url,
    })));
    // wData.results.map((p) => (console.log(p)));
    return wData;
  } catch (error) {
    return 'Error!';
  }
};
initialState();
console.log(result);

const getPokemonFetch = async (id) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = response.json();
    const result = [];
    data.map((pokemon) => (result.push({
      id: pokemon.id,
      name: pokemon.forms.name,
    })));
    return result;
  } catch (error) {
    return 'Error!';
  }
};

const pokemons = (state = result, action) => {
  switch (action.type) {
    case GET_POKEMON:
      return [getPokemonFetch(action.payload)];
    case ADD_POKEMON:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default pokemons;
