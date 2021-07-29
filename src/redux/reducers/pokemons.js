import { ALL_POKEMONS, CHANGE_STATUS } from '../actionTypes';

const initialState = {
  count: 0,
  next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
  previous: null,
  results: [],
  status: false,
};

const setTrue = (obj1) => {
  const t = {
    ...obj1,
    status: true,
  };
  return t;
};

const pokemons = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POKEMONS:
      return setTrue(action.payload);
    case CHANGE_STATUS:
      console.log('CHANGE_STATUS');
      return initialState;
    default:
      return { ...state };
  }
};

export default pokemons;
