import { ALL_POKEMONS, GET_POKEMON } from '../actionTypes';

export const allPokemons = (all) => ({ type: ALL_POKEMONS, payload: all });
export const getPokemon = (data) => ({ type: GET_POKEMON, payload: data });

export const getPokemons = () => async (dispatch) => {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const response = await fetch(url);
    const data = await response.json();
    dispatch(allPokemons(data));
    return true;
  } catch (error) {
    return error;
  }
};

export const getProfile = (id) => async (dispatch) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const response = await fetch(url);
    const data = await response.json();
    dispatch(getPokemon(data));
    return true;
  } catch (error) {
    return error;
  }
};
