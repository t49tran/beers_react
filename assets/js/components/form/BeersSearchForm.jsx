import React from 'react';
import { InputGroup, Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import SearchTypeSelect from './SearchTypeSelect';
import CountriesSelector from '../CountriesSelector';
import CategoriesSelector from '../CategoriesSelector';
import BeersSuggestionInput from './BeersSuggestionInput';
import { searchBeersIfNeeded } from '../../actions/beers';
import { DEFAULT_SEARCH_TYPE } from '../../config';

class BeersSearchForm extends React.Component {
  static get propTypes() {
    return {
      keyword: React.PropTypes.string,
      selectedSearchType: React.PropTypes.object,
      selectedStyle: React.PropTypes.object,
      selectedCountry: React.PropTypes.object,
      selectedCategory: React.PropTypes.object,
      searchBeers: React.PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      selectedSearchType: DEFAULT_SEARCH_TYPE,
      selectedStyle: {},
      selectedCategory: {},
      selectedCountry: {},
      keyword: '',
    };
  }

  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search() {
    const { dispatch } = this.props;
    const {
      selectedCountry,
      selectedCategory,
      selectedStyle,
      keyword,
      selectedSearchType,
     } = this.props;

    this.props.searchBeers({
      selectedCountry,
      selectedCategory,
      selectedStyle,
      keyword,
      selectedSearchType,
    });
  }

  render() {
    const searchTypes = [
      {name: 'Beers', value: 'beers'},
      {name: 'Breweries', value: 'breweries'},
    ];

    const { selectedSearchType } = this.props;

    const isBeerSearch = (selectedSearchType === 'beers');

    return (
      <div className="beer_search_form">
        <div className="input-group--primary">
          <SearchTypeSelect searchTypes={searchTypes} />
          <BeersSuggestionInput className="search__wrapper search__wrapper__suggestion" />
          <div className="search__wrapper__submit">
            <Button onClick={this.search} className="beer_search_form__submit"> Let&apos;s go </Button>
          </div>
        </div>
        <InputGroup className="input-group--secondary">
          <CountriesSelector className="select__transparent select__country form-control" />
          <CategoriesSelector className="select__transparent select__category form-control" />
        </InputGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchFormOptions } = state;

  const {
    selectedSearchType,
    selectedCountry,
    selectedCategory,
    selectedStyle,
    keyword,
  } = searchFormOptions || {};

  return {
    selectedSearchType,
    selectedCountry,
    selectedCategory,
    selectedStyle,
    keyword,
  };
};

const mapDispatchToProps = (dispatch) => ({
  searchBeers: (searchCriterias) => {dispatch(searchBeersIfNeeded(searchCriterias))},
});

export default connect(mapStateToProps, mapDispatchToProps)(BeersSearchForm);
