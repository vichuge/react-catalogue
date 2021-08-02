import { CHANGE_FILTER } from '../redux/actionTypes';
import filter from '../redux/reducers/filter';

it('return filter data', () => {
  const f = filter('All', {
    type: CHANGE_FILTER,
    payload: 'gen-3',
  });
  const f2 = filter('All', {
    type: '',
    payload: 'gen-2',
  });
  expect(f).toBe('gen-3');
  expect(f).not.toBe('gen-2');
  expect(f2).toBe('All');
  expect(f2).not.toBe('');
});
