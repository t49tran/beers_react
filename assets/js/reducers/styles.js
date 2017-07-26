import {
  REQUEST_STYLES, RECEIVE_STYLES,
} from '../actions/styles';

const styles = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
  case REQUEST_STYLES:
    return {
      ...state,
      isFetching: true,
      items: [],
    };
  case RECEIVE_STYLES:
    return {
      ...state,
      isFetching: false,
      items: action.styles,
      lastUpdated: action.receivedAt,
    };
  default:
    if (state === undefined) {
      return {
        ...state,
        isFetching: false,
        items: [],
        lastUpdated: action.receivedAt,
      };
    }
    return state;
  }
};

export default (state = { }, action) => {
  switch (action.type) {
  case RECEIVE_STYLES:
  case REQUEST_STYLES:
    return {
      ...state,
      ['default']: styles(state, action),
    };
  default:
    return state;
  }
};
