import { createActions } from 'redux-actions';
import CountriesService from '../../services/CountriesService';

const {
  requestCountries,
  receiveCountries,
  updateSelectedCountries,
} = createActions({
  REQUEST_COUNTRIES: undefined,
  RECEIVE_COUNTRIES: countries => ({countries}),
  UPDATE_SELECTED_COUNTRIES: selectedCountries => ({ selectedCountries }),
});

const fetchCountries = () => (dispatch) => {
  dispatch(requestCountries());
  return CountriesService.getCountries()
    .then(countries => dispatch(receiveCountries(countries)));
};

export {
  requestCountries,
  receiveCountries,
  fetchCountries,
  updateSelectedCountries,
};
