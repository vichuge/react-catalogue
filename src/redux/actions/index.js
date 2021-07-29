import {
  ALL_POKEMONS,
  GET_POKEMON,
  RESTART_PROFILE,
  CHANGE_FILTER,
} from '../actionTypes';

export const allPokemons = (all) => ({ type: ALL_POKEMONS, payload: all });
export const getPokemon = (data) => ({ type: GET_POKEMON, payload: data });
export const restartProfile = () => ({ type: RESTART_PROFILE });

export const getPokemons = () => async (dispatch) => {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const response = await fetch(url);
    const data = await response.json();
    // const list = [];
    data.results.map(async (pokemon, index) => {
      const response = await fetch(pokemon.url);
      const dataOne = await response.json();
      // console.log(dataOne.types[1].type.name);
      // data.results[index].types = [];
      for (let i = 0; i < dataOne.types.length; i += 1) {
        // data.results[index].types.push(dataOne.types[i].type.name);
        if (i === 0) { data.results[index].type1 = dataOne.types[i].type.name; }
        if (i === 1) { data.results[index].type2 = dataOne.types[i].type.name; }
      }
      // data.results[index].types = dataOne.types;
    });
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
