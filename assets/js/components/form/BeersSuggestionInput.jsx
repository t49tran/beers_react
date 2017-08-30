import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import { fetchSuggestionBeersIfNeeded } from '../../actions/beers';
import { updateSearchKeyword } from '../../actions/beer_form';
import SuggtionBeersList from './SuggestionBeersList';

class BeersSuggestionInput extends React.Component {
  static get propTypes() {
    return {
      suggestion_beers: React.PropTypes.array,
      updateSearchKeyword: React.PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      suggestion_beers: [],
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      show_suggestion: false,
      beer_text: '',
    };
    this.searchSuggestions = this.searchSuggestions.bind(this);
    this.beerSelect = this.beerSelect.bind(this);
  }

  componentDidMount() {
    // Event listener to close the suggestion when click outside
    document.addEventListener('click', (event) => {
      if (this.wrapper.contains(event.target)) return;

      this.setState({ show_suggestion: false });
    });

    // Event listener to close the suggestion when press Escape
    document.addEventListener('keyup', (event) => {
      if (event.keyCode !== 27) return;

      this.setState({ show_suggestion: false });
    });
  }

  beerSelect(beer) {
    this.setState({ beer_text: beer.name });
  }

  searchSuggestions(event) {
    const newState = { beer_text: event.target.value };

    if (event.target.value !== undefined && event.target.value !== '' && event.target.value.length > 3) {
      const { dispatch } = this.props;

      // Dispatch a function thanks to thunk middleware
      dispatch(fetchSuggestionBeersIfNeeded(event.target.value));
      newState.show_suggestion = true;
    }

    this.props.beerChange('beer', event.target.value);
    this.setState(newState);
  }


  render() {
    const {
      suggestion_beers,
    } = this.props;

    const show_list = suggestion_beers.length > 0 && this.state.show_suggestion;
    return (
      <div className={ this.props.className } ref={(wrapper) => { this.wrapper = wrapper; }}
      >
        <Input
          value={this.state.beer_text}
          onChange={this.searchSuggestions}
          placeholder="Name, description, etc ..."
        />
        <SuggtionBeersList
          beerSelect={this.beerSelect}
          beers={suggestion_beers}
          display={show_list}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { getSuggestionBeers } = state || {};

  return getSuggestionBeers;
};

const mapDispatchToProps = (dispatch) => ({
  updateSearchKeyword: search_keyword => dispatch(updateSearchKeyword(search_keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BeersSuggestionInput);
