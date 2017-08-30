import React from 'react';
import { connect } from 'react-redux';
import { fetchCountries, updateSelectedCountries } from '../../actions/search_form/countries_selector';
import DropdownPicker from '../DropdownPicker';

class CountriesSelector extends React.Component {
  static get propTypes() {
    return {
      selectedCountries: React.PropTypes.array,
      countries: React.PropTypes.array.isRequired,
    };
  }

  static get defaultProps() {
    return {
      selectedCountries: [],
    };
  }

  static get dropdownSettings() {
    return {
      maxHeight: '200px',
    };
  }

  constructor(props) {
    super(props);

    this.checkCountry = this.checkCountry.bind(this);
    this.isCountrySelected = this.isCountrySelected.bind(this);
  }

  componentDidMount() {
    this.props.fetchCountries();
  }

  isCountrySelected(country) {
    const { selectedCountries } = this.props;

    return selectedCountries.lastIndexOf(country) >= 0;
  }

  checkCountry(event) {
    const { countries, selectedCountries } = this.props;
    const country = event.target.value;

    const updatedSelectedCountries = selectedCountries.lastIndexOf(country) >= 0 ?
      _.remove(selectedCountries, (value) => (country === value)) : [...selectedCountries, country];

    this.props.updateSelectedCountries(updatedSelectedCountries);
  }

  render() {
    const {
      countries,
      selectedCountries,
    } = this.props;

    const isEmpty = countries.length === 0;

    return (
      <div className="select__wrapper--country">
        <DropdownPicker
          placeholder="Countries"
          elements={ countries.map(elm => ({
            value: elm.code,
            label: elm.name,
          })) }
          selectedElements={ selectedCountries }
          updateSelectedList={ this.checkCountry }
          isSelected={ this.isCountrySelected }
          dropdownSettings = { CountriesSelector.dropdownSettings }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { countriesSelectorReducer } = state || {};

  return countriesSelectorReducer;
};

const mapDispatchToProps = (dispatch) => ({
  updateSelectedCountries: countries => dispatch(updateSelectedCountries(countries)),
  fetchCountries: () => dispatch(fetchCountries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountriesSelector);
