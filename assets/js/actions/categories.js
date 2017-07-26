import { API_SOURCE } from '../config';

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const CATEGORY_SELECTED = 'CATEGORY_SELECTED';
export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

export const receiveCategories = json => ({
  type: RECEIVE_CATEGORIES,
  categories: json,
  receivedAt: Date.now(),
});

const fetchCategories = () => (dispatch) => {
  dispatch(requestCategories());
  return fetch(`${API_SOURCE}categories/all`)
    .then(response => response.json())
    .then(json => dispatch(receiveCategories(json)));
};

const shouldFetchCategories = (state) => {
  const categories = state.getCategories;

  return !categories || !categories.isFetching;
};

export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchCategories(getState())) {
    return dispatch(fetchCategories());
  }
};
