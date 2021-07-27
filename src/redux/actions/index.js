import { ADD_POKEMON, GET_POKEMON } from '../actionTypes';

export const getPokemon = (pokemonId) => ({
  type: GET_POKEMON,
  payload: pokemonId,
});

export const addPokemon = (pokemon) => ({
  type: ADD_POKEMON,
  payload: pokemon,
});
