import $beerService from '../services/BeersService';

export const REQUEST__SINGLE_BEER = 'REQUEST_SINGLE_BEER';
export const RECEIVE__SINGLE_BEER = 'RECEIVE_SINGLE_BEER';
export const NOT_FOUND__SINGLE_BEER = 'NOT_FOUND_SINGLE_BEER';

// Redux Action: request beer search results
export const requestSingleBeer = beer_id => ({
  type: REQUEST__SINGLE_BEER,
  beer_id,
});

// Redux Action: receive beer search results
export const receiveSingleBeer = (beer_id, json) => ({
  type: RECEIVE__SINGLE_BEER,
  beer: json,
  receivedAt: Date.now(),
  beer_id,
});

export const notFoundSingleBeer = beer_id => ({
  type: NOT_FOUND__SINGLE_BEER,
  beer_id,
});

// call isomorphic http request to fetch the beers
const fetchBeer = beer_id => (dispatch) => {
  dispatch(requestSingleBeer(beer_id));

  return $beerService.find(beer_id)
    .then(json => dispatch(receiveSingleBeer(beer_id, json)))
    .catch(() => dispatch(notFoundSingleBeer(beer_id)));
};

export const fetchSingleBeer = beer_id => dispatch => dispatch(fetchBeer(beer_id));
