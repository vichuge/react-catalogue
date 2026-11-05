import setupStore from '../redux/store';
import { loadPokedex, loadProfile } from '../redux/actions';
import * as api from '../api/pokeapi';

jest.mock('../api/pokeapi');

describe('async actions', () => {
  afterEach(() => jest.resetAllMocks());

  it('loads the pokédex only once', async () => {
    api.fetchPokedexIndex.mockResolvedValue([{ id: 1, name: 'bulbasaur', types: ['grass'] }]);
    const store = setupStore();
    await store.dispatch(loadPokedex());
    await store.dispatch(loadPokedex());
    expect(api.fetchPokedexIndex).toHaveBeenCalledTimes(1);
    expect(store.getState().pokemons.items).toHaveLength(1);
  });

  it('stores errors so the UI can offer a retry', async () => {
    api.fetchPokedexIndex.mockRejectedValue(new Error('offline'));
    const store = setupStore();
    await store.dispatch(loadPokedex());
    expect(store.getState().pokemons).toMatchObject({ status: 'failed', error: 'offline' });
  });

  it('caches profiles', async () => {
    api.fetchPokemonDetail.mockResolvedValue({ id: 4, name: 'charmander' });
    const store = setupStore();
    await store.dispatch(loadProfile(4));
    await store.dispatch(loadProfile(4));
    expect(api.fetchPokemonDetail).toHaveBeenCalledTimes(1);
    expect(store.getState().profile[4].data.name).toBe('charmander');
  });
});
