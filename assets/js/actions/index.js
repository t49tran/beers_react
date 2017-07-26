import { API_SOURCE } from '../config';

export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES';
export const RECEIVE_COUNTRIES = 'RECEIVE_COUNTRIES';
export const requestCountries = () => ({
  type: REQUEST_COUNTRIES,
});
export const receiveCountries = json => ({
  type: RECEIVE_COUNTRIES,
  countries: json,
  receivedAt: Date.now(),
});

const fetchCountries = () => (dispatch) => {
  dispatch(requestCountries());
  return fetch(`${API_SOURCE}countries/all`)
    .then(response => response.json())
    .then(json => dispatch(receiveCountries(json)));
};

const shouldFetchCountries = (state) => {
  const countries = state.getCountries;

  return !countries || !countries.isFetching;
};

export const fetchCountriesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchCountries(getState())) {
    return dispatch(fetchCountries());
  }
};
