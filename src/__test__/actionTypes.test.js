import {
  ALL_POKEMONS,
  GET_POKEMON,
  RESTART_PROFILE,
  CHANGE_FILTER,
  CHANGE_STATUS,
} from '../redux/actionTypes';

it('return ALL_POKEMONS', () => {
  expect(ALL_POKEMONS).toBe('ALL_POKEMONS');
  expect(ALL_POKEMONS).not.toBe('');
});

it('return GET_POKEMON', () => {
  expect(GET_POKEMON).toBe('GET_POKEMON');
  expect(GET_POKEMON).not.toBe('');
});

it('return RESTART_PROFILE', () => {
  expect(RESTART_PROFILE).toBe('RESTART_PROFILE');
  expect(RESTART_PROFILE).not.toBe('');
});

it('return CHANGE_FILTER', () => {
  expect(CHANGE_FILTER).toBe('CHANGE_FILTER');
  expect(CHANGE_FILTER).not.toBe('');
});

it('return CHANGE_STATUS', () => {
  expect(CHANGE_STATUS).toBe('CHANGE_STATUS');
  expect(CHANGE_STATUS).not.toBe('');
});
