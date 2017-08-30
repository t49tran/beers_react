import { createActions } from 'redux-actions';

const {
  updateSearchType,
  updateSearchKeyword,
  updateSelectedCountry,
  updateSelectedCategory,
  updateSelectedStyle,
} = createActions({
  UPDATE_SEARCH_TYPE: search_type => ({ search_type }),
  UPDATE_SEARCH_KEYWORD: search_keyword => ({ search_keyword }),
  UPDATE_SELECTED_COUNTRY: selected_country => ({ selected_country }),
  UPDATE_SELECTED_CATEGORY: selected_category => ({ selected_category }),
  UPDATE_SELECTED_STYLE: selected_style => ({ selected_style }),
});

export {
  updateSearchType,
  updateSearchKeyword,
  updateSelectedCountry,
  updateSelectedCategory,
  updateSelectedStyle,
};
