import pokemons, { initialState as pokemonsInitial } from '../redux/reducers/pokemons';
import profile from '../redux/reducers/profile';
import filter, { initialState as filterInitial } from '../redux/reducers/filter';
import * as types from '../redux/actionTypes';
import { changeFilter, resetFilter } from '../redux/actions';

describe('pokemons reducer', () => {
  it('tracks the loading lifecycle', () => {
    const loading = pokemons(pokemonsInitial, { type: types.POKEDEX_REQUEST });
    expect(loading.status).toBe('loading');
    const done = pokemons(loading, { type: types.POKEDEX_SUCCESS, payload: [{ id: 1 }] });
    expect(done).toEqual({ status: 'succeeded', items: [{ id: 1 }], error: null });
    const failed = pokemons(loading, { type: types.POKEDEX_FAILURE, payload: 'offline' });
    expect(failed.status).toBe('failed');
    expect(failed.error).toBe('offline');
  });
});

describe('profile reducer', () => {
  it('caches each Pokémon by id', () => {
    let state = profile(undefined, { type: types.PROFILE_REQUEST, payload: { id: 1 } });
    expect(state[1].status).toBe('loading');
    state = profile(state, { type: types.PROFILE_SUCCESS, payload: { id: 1, data: { name: 'bulbasaur' } } });
    state = profile(state, { type: types.PROFILE_REQUEST, payload: { id: 4 } });
    expect(state[1]).toEqual({ status: 'succeeded', data: { name: 'bulbasaur' }, error: null });
    expect(state[4].status).toBe('loading');
  });
});

describe('filter reducer', () => {
  it('merges partial changes', () => {
    const state = filter(filterInitial, changeFilter({ generation: 'gen-3' }));
    expect(state).toEqual({ ...filterInitial, generation: 'gen-3' });
    expect(filter(state, changeFilter({ query: 'mud' }))).toEqual({ generation: 'gen-3', type: 'All', query: 'mud' });
  });

  it('resets', () => {
    expect(filter({ generation: 'gen-1', type: 'fire', query: 'x' }, resetFilter())).toEqual(filterInitial);
  });
});
