import {
  SET_VIEW_TYPE,
  GET_VIEW_TYPE,
} from './constants';

export function setViewType(value) {
  return {
    type: SET_VIEW_TYPE,
    value,
  };
}

export function getViewType() {
  return {
    type: GET_VIEW_TYPE,
  };
}
