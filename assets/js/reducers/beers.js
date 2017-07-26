import {
  REQUEST__SUGGESTION_BEERS,
  RECEIVE__SUGGESTION_BEERS,
  REQUEST__BEERS_RESULT,
  RECEIVE__BEERS_RESULT,
} from '../actions/beers';

const suggestion_beers = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
  case REQUEST__SUGGESTION_BEERS:
    return {
      ...state,
      isFetching: true,
      items: [],
    };
  case RECEIVE__SUGGESTION_BEERS:
    return {
      ...state,
      isFetching: false,
      items: action.suggestion_beers,
      lastUpdated: action.receivedAt,
    };
  default:
    return state;
  }
};

// Redux Reducer: suggestion beers
export const getSuggestionBeers = (state = { }, action) => {
  switch (action.type) {
  case REQUEST__SUGGESTION_BEERS:
  case RECEIVE__SUGGESTION_BEERS:
    return {
      ...state,
      ['default']: suggestion_beers(state, action),
    };
  default:
    return state;
  }
};

const beer_results = (state = {
  isFetching: false,
  beers: [],
}, action) => {
  switch (action.type) {
  case REQUEST__BEERS_RESULT:
    return {
      ...state,
      isFetching: true,
      beers: [],
    };
  case RECEIVE__BEERS_RESULT:
    return {
      ...state,
      isFetching: false,
      beers: action.beer_results,
      lastUpdated: action.receivedAt,
    };
  default:
    return state;
  }
};

// Redux Reducer: beer results
export const getBeerResults = (state = { }, action) => {
  switch (action.type) {
  case REQUEST__BEERS_RESULT:
  case RECEIVE__BEERS_RESULT:
    return {
      ...state,
      ['default']: beer_results(state, action),
    };
  default:
    return state;
  }
};
