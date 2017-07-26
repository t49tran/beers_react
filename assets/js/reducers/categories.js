import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
} from '../actions/categories';

const categories = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return {
      ...state,
      isFetching: true,
      items: [],
    };
  case RECEIVE_CATEGORIES:
    return {
      ...state,
      isFetching: false,
      items: action.categories,
      lastUpdated: action.receivedAt,
    };
  default:
    return state || {
      ...state,
      isFetching: false,
      items: [],
      lastUpdated: action.receivedAt,
    };
  }
};

const getCategories = (state = { }, action) => {
  switch (action.type) {
  case RECEIVE_CATEGORIES:
  case REQUEST_CATEGORIES:
    return {
      ...state,
      ['default']: categories(state, action),
    };
  default:
    return state;
  }
};

export default getCategories;
