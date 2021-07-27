import { ADD_POKEMON, GET_POKEMON, ALL_POKEMONS } from '../actionTypes';

export const allPokemons = () => ({ type: ALL_POKEMONS });

export const getPokemon = (pokemonId) => ({
  type: GET_POKEMON,
  payload: pokemonId,
});

export const addPokemon = (pokemon) => ({
  type: ADD_POKEMON,
  payload: pokemon,
});

export const getPokemons = () => (
  async (dispatch) => {
    dispatch(getPokemons);
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    return fetch(url).then((result) => result.json());
  }
);
