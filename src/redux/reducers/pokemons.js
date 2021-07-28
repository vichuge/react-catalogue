import { ALL_POKEMONS } from '../actionTypes';

const initialState = {
  count: 0,
  next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
  previous: null,
  results: [],
};

const pokemons = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POKEMONS:
      return action.payload;
    default:
      return { ...state };
  }
};

export default pokemons;