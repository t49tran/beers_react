import React from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import updateSearchType  from '../../actions/beer_form';

class SearchTypeSelect extends React.Component {
  static get propTypes() {
    return {
      searchTypes: React.PropTypes.array,
    }
  }

  static get defaultProps() {
    return {
      searchTypes: [],
    }
  }

  constructor(props) {
    super(props);

    this.updateSearchType = this.updateSearchType.bind(this);
  }

  updateSearchType(event) {
    this.props.updateSearchType(event.target.value);
  }

  render() {
    const {
      searchTypes,
      selectedSearchType,
    } = this.props;

    return (
      <div className="select__wrapper--country">
          <select
            onChange={this.updateSearchType}
            className="select__search_type form-control"
            value={selectedSearchType}
          >
            {searchTypes.map(searchType =>
              (
                <option
                  key={shortid.generate()}
                  value={searchType.code}
                >
                  {searchType.name}
                </option>
              )
            )}
          </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { searchFormOptions = {} } = state;

  const { selectedSearchType } = searchFormOptions;

  return { selectedSearchType };
};

const mapDispatchToProps = (dispatch) => ({
  updateSearchType: searchType => dispatch(updateSearchType(searchType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTypeSelect);
