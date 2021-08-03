import {
  ALL_POKEMONS,
  GET_POKEMON,
  RESTART_PROFILE,
  CHANGE_FILTER,
  CHANGE_STATUS,
} from '../actionTypes';

export const allPokemons = (all) => ({ type: ALL_POKEMONS, payload: all });
export const getPokemon = (data) => ({ type: GET_POKEMON, payload: data });
export const restartProfile = () => ({ type: RESTART_PROFILE });

export const getPokemons = (profile) => async (dispatch) => {
  try {
    let url = '';
    switch (profile) {
      case 'All':
        url = 'https://pokeapi.co/api/v2/pokemon?limit=386';
        break;
      case 'gen-1':
        url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
        break;
      case 'gen-2':
        url = 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=151';
        break;
      case 'gen-3':
        url = 'https://pokeapi.co/api/v2/pokemon/?limit=135&offset=251';
        break;
      default:
        url = 'https://pokeapi.co/api/v2/pokemon?limit=386';
    }
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

export const changeFilter = (category) => ({
  type: CHANGE_FILTER,
  payload: category,
});

export const pkmnChangeStatus = () => ({ type: CHANGE_STATUS });
