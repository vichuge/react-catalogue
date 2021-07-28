import { combineReducers } from 'redux';

import pokemonsReducer from './pokemons';
import profileReducer from './profile';

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  profile: profileReducer,
});

export default rootReducer;
