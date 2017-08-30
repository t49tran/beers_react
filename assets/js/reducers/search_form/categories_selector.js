import { handleActions } from 'redux-actions';

import {
  requestCategories,
  receiveCategories,
  updateSelectedCategories,
} from '../../actions/search_form/categories_selector';

const categoriesSelectorReducer = handleActions({
  [requestCategories]: state => ({
    ...state,
    isFetching: true,
    categories: [],
  }),
  [receiveCategories]: (state, action) => ({
    ...state,
    isFetching: false,
    categories: action.payload.categories,
  }),
  [updateSelectedCategories]: (state, action) => ({
    ...state,
    selectedCategories: action.payload.selectedCategories,
  })
}, { categories: [] });

export default categoriesSelectorReducer;
