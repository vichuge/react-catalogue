import { combineReducers } from 'redux';

import pokemonsReducer from './pokemons';
import profileReducer from './profile';
import filterReducer from './filter';

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  profile: profileReducer,
  filter: filterReducer,
});

export default rootReducer;
