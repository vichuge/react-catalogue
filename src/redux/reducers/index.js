import { combineReducers } from 'redux';

import pokemonsReducer from './pokemons';

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
});

export default rootReducer;
