import { createActions } from 'redux-actions';
import CategoriesService from '../../services/CategoriesService';

const {
  requestCategories,
  receiveCategories,
  updateSelectedCategories,
} = createActions({
  REQUEST_CATEGORIES: undefined,
  RECEIVE_CATEGORIES: categories => ({ categories }),
  UPDATE_SELECTED_CATEGORIES: selectedCategories => ({ selectedCategories }),
});

const fetchCategories = () => (dispatch) => {
  console.log('HERE');
  dispatch(requestCategories());

  return CategoriesService.getCategories()
    .then(categories => dispatch(receiveCategories(categories)));
};

export {
  fetchCategories,
  requestCategories,
  receiveCategories,
  updateSelectedCategories,
};
