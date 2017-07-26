import { combineReducers } from 'redux';
import getStyles from './styles';
import getCountries from './countries';
import getCategories from './categories';
import singleBeers from './single_beer';
import bubbles from './bubbles';
import { getSuggestionBeers, getBeerResults } from './beers';
import quote from './quote';

const rootReducer = combineReducers({
  getCountries,
  getCategories,
  getStyles,
  getSuggestionBeers,
  getBeerResults,
  singleBeers,
  bubbles,
  quote,
});

export default rootReducer;
