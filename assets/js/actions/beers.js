import $beerService from '../services/BeersService';

export const REQUEST__SUGGESTION_BEERS = 'REQUEST_SUGGESTION_BEERS';
export const RECEIVE__SUGGESTION_BEERS = 'RECEIVE_SUGGESTION_BEERS';
export const REQUEST__BEERS_RESULT = 'REQUEST_BEERS_RESULT';
export const RECEIVE__BEERS_RESULT = 'RECEIVE_BEERS_RESULT';

// Redux Action: request suggestion beers
export const requestSuggestionBeers = () => ({
  type: REQUEST__SUGGESTION_BEERS,
});

// Redux Action: receive suggestion beers
export const receiveSuggestionBeers = json => ({
  type: RECEIVE__SUGGESTION_BEERS,
  suggestion_beers: json,
  receivedAt: Date.now(),
});

// Redux Action: request beer search results
export const requestBeerResults = () => ({
  type: REQUEST__BEERS_RESULT,
});

// Redux Action: receive beer search results
export const receiveBeerResults = json => ({
  type: RECEIVE__BEERS_RESULT,
  beer_results: json,
  receivedAt: Date.now(),
});

// call isomorphic http request to fetch the suggestion list
const fetchSuggestionBeers = query => (dispatch) => {
  dispatch(requestSuggestionBeers());

  return $beerService.search(query)
    .then(json => dispatch(receiveSuggestionBeers(json)));
};

// call isomorphic http request to fetch the beers
const searchBeersResult = query => (dispatch) => {
  dispatch(requestBeerResults());

  return $beerService.search(query.beer, query)
    .then(json => dispatch(receiveBeerResults(json)));
};

// Check if fetch suggestion beers action should be dispatched
const shouldFetchSuggestionBeers = (state) => {
  const suggestion_beers = state.getSuggestionBeers;

  return !suggestion_beers || !suggestion_beers.isFetching;
};

// Check if search beers action should be dispatched
const shouldSearchBeers = (state) => {
  const beer_results = state.getBeerResults;

  return !beer_results || !beer_results.isFetching;
};

export const fetchSuggestionBeersIfNeeded = query => (dispatch, getState) => {
  if (shouldFetchSuggestionBeers(getState())) {
    return dispatch(fetchSuggestionBeers(query));
  }
};

export const searchBeersIfNeeded = query => (dispatch, getState) => {
  if (shouldSearchBeers(getState())) {
    return dispatch(searchBeersResult(query));
  }
};
