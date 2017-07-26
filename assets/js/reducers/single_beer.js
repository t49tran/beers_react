import {
  REQUEST__SINGLE_BEER,
  RECEIVE__SINGLE_BEER,
  NOT_FOUND__SINGLE_BEER,
} from '../actions/single_beer';

// Redux Reducer: beer results
const singleBeers = (state = { }, action) => {
  switch (action.type) {
  case REQUEST__SINGLE_BEER:
    return {
      ...state,
      [action.beer_id]: {
        beer: action.beer,
        isFetching: false,
        beerNotFound: true,
      },
    };
  case RECEIVE__SINGLE_BEER:
    return {
      ...state,
      [action.beer_id]: {
        beer: action.beer,
        isFetching: false,
        beerNotFound: false,
      },
    };
  case NOT_FOUND__SINGLE_BEER:
    return {
      ...state,
      [action.beer_id]: {
        beer: action.beer,
        isFetching: false,
        beerNotFound: true,
      },
    };
  default:
    return state;
  }
};

export default singleBeers;
