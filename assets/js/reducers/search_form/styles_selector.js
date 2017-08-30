import { handleActions } from 'redux-actions';
import {
  requestStyles,
  receiveStyles,
  updateSelectedStyles,
} from '../../actions/search_form/styles_selector';

const stylesSelectorReducer = handleActions({
  [requestStyles]: state => ({
    ...state,
    isFetching: true,
    styles: [],
  }),
  [receiveStyles]: (state, action) => ({
    ...state,
    isFetching: false,
    styles: action.payload.styles,
  }),
  [updateSelectedStyles]: (state, action) => ({
    ...state,
    selectedStyles: action.payload.selectedStyles,
  }),
}, {});

export default stylesSelectorReducer;
