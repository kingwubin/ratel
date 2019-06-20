import {
  SET_VIEW_TYPE,
  GET_VIEW_TYPE,
} from './constants';

const defaultState = {
  viewType: 1,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_VIEW_TYPE:
      return {
        viewType: action.value,
      };
    case GET_VIEW_TYPE:
      return state;
    default:
      return state;
  }
};
