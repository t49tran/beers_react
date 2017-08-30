import { handleActions } from 'redux-actions';

import {
  requestCountries,
  receiveCountries,
  updateSelectedCountries,
} from '../../actions/search_form/countries_selector';

const countriesSelectorReducer = handleActions({
  [requestCountries]: state => ({
    ...state,
    isFetching: true,
    countries: [],
  }),
  [receiveCountries]: (state, action) => ({
    ...state,
    isFetching: false,
    countries: action.payload.countries,
  }),
  [updateSelectedCountries]: (state, action) => ({
    ...state,
    selectedCountries: action.payload.selectedCountries,
  })
}, { countries: [] });

export default countriesSelectorReducer;