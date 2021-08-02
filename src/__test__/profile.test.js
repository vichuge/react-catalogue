import { GET_POKEMON, RESTART_PROFILE } from '../redux/actionTypes';
import profile from '../redux/reducers/profile';

const initialState = {
  status: false,
};

it('return profile data', () => {
  const p = profile(initialState, {
    type: GET_POKEMON,
    payload: {
      name: 'bulbasaur',
      type: 'grass',
    },
  });
  expect(p).toStrictEqual({ name: 'bulbasaur', status: true, type: 'grass' });
  expect(p).not.toStrictEqual({ name: 'bulbasaur', status: false, type: 'grass' });
});

it('restart profile', () => {
  const p = profile(initialState, {
    type: RESTART_PROFILE,
    payload: {
      name: 'bulbasaur',
      type: 'grass',
    },
  });
  expect(p).toStrictEqual(initialState);
});
