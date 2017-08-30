import { createActions } from 'redux-actions';
import StylesService from '../../services/StylesService';

const {
  requestStyles,
  receiveStyles,
  updateSelectedStyles,
} = createActions({
  REQUEST_STYLES: undefined,
  RECEIVE_STYLES: styles => ({ styles }),
  UPDATE_SELECTED_STYLES: selectedStyles => ({ selectedStyles }),
});

const fetchStyles = query => (dispatch) => {
  dispatch(requestStyles());
  return StylesService.getStyles(query)
    .then(styles => dispatch(receiveStyles(styles)));
};

export {
  requestStyles,
  receiveStyles,
  fetchStyles,
  updateSelectedStyles,
};
