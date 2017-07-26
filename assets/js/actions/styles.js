import { API_SOURCE } from '../config';

export const REQUEST_STYLES = 'REQUEST_STYLES';
export const RECEIVE_STYLES = 'RECEIVE_STYLES';

export const requestStyles = () => ({
  type: REQUEST_STYLES,
});

export const receiveStyles = json => ({
  type: RECEIVE_STYLES,
  styles: json,
  receivedAt: Date.now(),
});

const fetchStyles = selected_category => (dispatch) => {
  dispatch(requestStyles());

  const end_point = selected_category ?
    `${API_SOURCE}styles/categories/${selected_category}` : `${API_SOURCE}styles/all`;

  return fetch(end_point)
    .then(response => response.json())
    .then(json => dispatch(receiveStyles(json)));
};

const shouldFetchStyles = (state) => {
  const styles = state.styles;

  return !styles || !styles.isFetching;
};

export const fetchStylesIfNeeded = selected_category => (dispatch, getState) => {
  if (shouldFetchStyles(getState())) {
    return dispatch(fetchStyles(selected_category));
  }
};
