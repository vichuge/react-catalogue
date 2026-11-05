import { CHANGE_FILTER, RESET_FILTER } from '../actionTypes';

export const initialState = {
  generation: 'All',
  type: 'All',
  query: '',
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return { ...state, ...action.payload };
    case RESET_FILTER:
      return initialState;
    default:
      return state;
  }
};

export default filter;
