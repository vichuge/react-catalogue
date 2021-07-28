import { GET_POKEMON } from '../actionTypes';

const initialState = {
  status: false,
};

const setTrue = (obj1) => {
  const t = {
    ...obj1,
    status: true,
  };
  return t;
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON:
      return setTrue(action.payload);
    default:
      return state;
  }
};

export default profile;
