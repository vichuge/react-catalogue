import { changeFilter } from '../redux/actions';

it('return Pokemons list', () => {
  const p = changeFilter('gen-1');
  expect(p).toStrictEqual({ payload: 'gen-1', type: 'CHANGE_FILTER' });
  expect(p).not.toStrictEqual({ payload: 'gen-2', type: 'CHANGE_FILTER' });
});
