import { filterPokemons } from '../redux/selectors';
import { initialState } from '../redux/reducers/filter';
import { sampleItems } from './testUtils';

const ids = (list) => list.map((p) => p.id);

describe('filterPokemons', () => {
  it('returns everything with the default filter', () => {
    expect(filterPokemons(sampleItems, initialState)).toHaveLength(sampleItems.length);
  });

  it('filters by generation', () => {
    expect(ids(filterPokemons(sampleItems, { ...initialState, generation: 'gen-2' }))).toEqual([152]);
    expect(ids(filterPokemons(sampleItems, { ...initialState, generation: 'gen-9' }))).toEqual([906]);
  });

  it('filters by type', () => {
    expect(ids(filterPokemons(sampleItems, { ...initialState, type: 'grass' }))).toEqual([1, 152, 906]);
  });

  it('combines generation and type', () => {
    expect(ids(filterPokemons(sampleItems, { generation: 'gen-1', type: 'grass', query: '' }))).toEqual([1]);
  });

  it('searches by name, display name and number', () => {
    expect(ids(filterPokemons(sampleItems, { ...initialState, query: 'PIKA' }))).toEqual([25]);
    expect(ids(filterPokemons(sampleItems, { ...initialState, query: 'mr. mime' }))).toEqual([122]);
    expect(ids(filterPokemons(sampleItems, { ...initialState, query: '#15' }))).toEqual([152]);
  });
});
