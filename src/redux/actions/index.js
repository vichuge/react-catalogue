import {
  POKEDEX_REQUEST,
  POKEDEX_SUCCESS,
  POKEDEX_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  CHANGE_FILTER,
  RESET_FILTER,
} from '../actionTypes';
import { fetchPokedexIndex, fetchPokemonDetail } from '../../api/pokeapi';

export const changeFilter = (changes) => ({ type: CHANGE_FILTER, payload: changes });
export const resetFilter = () => ({ type: RESET_FILTER });

export const loadPokedex = () => async (dispatch, getState) => {
  const { status } = getState().pokemons;
  if (status === 'loading' || status === 'succeeded') return;
  dispatch({ type: POKEDEX_REQUEST });
  try {
    const items = await fetchPokedexIndex();
    dispatch({ type: POKEDEX_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: POKEDEX_FAILURE, payload: error.message });
  }
};

export const loadProfile = (id) => async (dispatch, getState) => {
  const entry = getState().profile[id];
  if (entry && (entry.status === 'loading' || entry.status === 'succeeded')) return;
  dispatch({ type: PROFILE_REQUEST, payload: { id } });
  try {
    const data = await fetchPokemonDetail(id);
    dispatch({ type: PROFILE_SUCCESS, payload: { id, data } });
  } catch (error) {
    dispatch({ type: PROFILE_FAILURE, payload: { id, error: error.message } });
  }
};
