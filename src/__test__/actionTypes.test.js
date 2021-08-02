import {
  ALL_POKEMONS,
  GET_POKEMON,
  RESTART_PROFILE,
  CHANGE_FILTER,
  CHANGE_STATUS,
} from '../redux/actionTypes';

describe('return ALL_POKEMONS', () => {
  it('return ALL_POKEMONS', () => {
    expect(ALL_POKEMONS).toBe('ALL_POKEMONS');
  });
  it('return ALL_POKEMONS', () => {
    expect(ALL_POKEMONS).not.toBe('');
  });
});

describe('return GET_POKEMON', () => {
  it('return GET_POKEMON', () => {
    expect(GET_POKEMON).toBe('GET_POKEMON');
  });
  it('return GET_POKEMON', () => {
    expect(GET_POKEMON).not.toBe('');
  });
});

describe('return RESTART_PROFILE', () => {
  it('return RESTART_PROFILE', () => {
    expect(RESTART_PROFILE).toBe('RESTART_PROFILE');
  });
  it('return RESTART_PROFILE', () => {
    expect(RESTART_PROFILE).not.toBe('');
  });
});

describe('return CHANGE_FILTER', () => {
  it('return CHANGE_FILTER', () => {
    expect(CHANGE_FILTER).toBe('CHANGE_FILTER');
  });
  it('return CHANGE_FILTER', () => {
    expect(CHANGE_FILTER).not.toBe('');
  });
});

describe('return CHANGE_STATUS', () => {
  it('return CHANGE_STATUS', () => {
    expect(CHANGE_STATUS).toBe('CHANGE_STATUS');
  });
  it('return CHANGE_STATUS', () => {
    expect(CHANGE_STATUS).not.toBe('');
  });
});
