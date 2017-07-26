import {
  REQUEST_COUNTRIES,
  RECEIVE_COUNTRIES,
} from '../actions';

const countries = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
  case REQUEST_COUNTRIES:
    return {
      ...state,
      isFetching: true,
      items: [],
    };
  case RECEIVE_COUNTRIES:
    return {
      ...state,
      isFetching: false,
      items: action.countries,
      lastUpdated: action.receivedAt,
    };
  default:
    return state;
  }
};

const getCountries = (state = { }, action) => {
  switch (action.type) {
  case RECEIVE_COUNTRIES:
  case REQUEST_COUNTRIES:
    return {
      ...state,
      ['default']: countries(state, action),
    };
  default:
    return state;
  }
};

export default getCountries;
