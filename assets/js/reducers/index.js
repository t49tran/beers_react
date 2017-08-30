import { combineReducers } from 'redux';
import countriesSelectorReducer from './search_form/countries_selector';
import categoriesSelectorReducer from './search_form/categories_selector';
import stylesSelectorReducer from './search_form/styles_selector';
import singleBeers from './single_beer';
import bubbles from './bubbles';
import { getSuggestionBeers, getBeerResults } from './beers';
import quote from './quote';

const rootReducer = combineReducers({
  countriesSelectorReducer,
  categoriesSelectorReducer,
  stylesSelectorReducer,
  getSuggestionBeers,
  getBeerResults,
  singleBeers,
  bubbles,
  quote,
});

export default rootReducer;
