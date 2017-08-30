import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  fetchCategories,
  updateSelectedCategories,
} from '../../actions/search_form/categories_selector';
import DropdownPicker from '../DropdownPicker';

class CategoriesSelector extends React.Component {
  static get propTypes() {
    return {
      selectedCategories: React.PropTypes.array,
      categories: React.PropTypes.array.isRequired,
    };
  }

  static get defaultProps() {
    return {
      selectedCategories: [],
    }
  }

  constructor(props) {
    super(props);

    this.checkCategory = this.checkCategory.bind(this);
    this.isCategorySelected = this.isCategorySelected.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  checkCategory(event) {
    const { selectedCategories } = this.props;
    const category = event.target.value;
    if (category === undefined) return;

    const updateSelectedCategories = selectedCategories.lastIndexOf(category) >= 0 ?
      _.remove(selectedCategories, (value) => (category === value)) : [...selectedCategories, category];

    this.props.updateSelectedCategories(updateSelectedCategories);
  }

  isCategorySelected(category) {
    const { selectedCategories } = this.props;

    return selectedCategories.lastIndexOf(category) >= 0;
  }

  render() {
    const {
      categories,
      selectedCategories,
    } = this.props;

    console.log(categories, selectedCategories);
    return (
      <div className="select__wrapper--categories">
        <DropdownPicker
          placeholder="Beer Categories"
          elements={ categories }
          isSelected={ this.isCategorySelected }
          updateSelectedList={ this.checkCategory }
        >
        </DropdownPicker>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { categoriesSelectorReducer } = state || {};

  return categoriesSelectorReducer;
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
  updateSelectedCategories: selectedCategories => dispatch(updateSelectedCategories(selectedCategories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSelector);
