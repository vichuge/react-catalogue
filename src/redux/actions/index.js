import { ADD_POKEMON, GET_POKEMON, ALL_POKEMONS } from '../actionTypes';

export const allPokemons = (all) => ({ type: ALL_POKEMONS, payload: all });

export const getPokemon = (pokemonId) => ({
  type: GET_POKEMON,
  payload: pokemonId,
});

export const addPokemon = (pokemon) => ({
  type: ADD_POKEMON,
  payload: pokemon,
});

export const getPokemons = () => async (dispatch) => {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const response = await fetch(url);
    const data = await response.json();
    dispatch(allPokemons(data));
    return true;
  } catch (error) {
    return 'Error!';
  }
};
