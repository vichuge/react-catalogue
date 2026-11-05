import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from '../actionTypes';

// Detail data cached by Pokémon id, so going back and forth never refetches.
const profile = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, [action.payload.id]: { status: 'loading', data: null, error: null } };
    case PROFILE_SUCCESS:
      return { ...state, [action.payload.id]: { status: 'succeeded', data: action.payload.data, error: null } };
    case PROFILE_FAILURE:
      return { ...state, [action.payload.id]: { status: 'failed', data: null, error: action.payload.error } };
    default:
      return state;
  }
};

export default profile;
