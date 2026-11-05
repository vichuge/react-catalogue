import { POKEDEX_REQUEST, POKEDEX_SUCCESS, POKEDEX_FAILURE } from '../actionTypes';

export const initialState = {
  status: 'idle',
  items: [],
  error: null,
};

const pokemons = (state = initialState, action) => {
  switch (action.type) {
    case POKEDEX_REQUEST:
      return { ...state, status: 'loading', error: null };
    case POKEDEX_SUCCESS:
      return { status: 'succeeded', items: action.payload, error: null };
    case POKEDEX_FAILURE:
      return { ...state, status: 'failed', error: action.payload };
    default:
      return state;
  }
};

export default pokemons;
