import React from 'react';
import { fetchSuggestionBeersIfNeeded } from '../../actions/beers';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import SuggtionBeersList from './SuggestionBeersList';

class BeersSuggestionInput extends React.Component{
  static get propTypes() {
    return {
      beers: React.PropTypes.array,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
        show_suggestion : false,
        beer_text: '',
    };
    this.searchSuggestions = this.searchSuggestions.bind(this);
    this.beerSelect = this.beerSelect.bind(this);
  }

  componentDidMount() {
    // Event listener to close the suggestion when click outside
    document.addEventListener('click', (event) => {
      if (!this.wrapper.contains(event.target)) {
        this.setState({show_suggestion:false});
      }
    });

    // Event listener to close the suggestion when press Escape
    document.addEventListener('keyup',(event) => {
      if (event.keyCode === 27) {
        this.setState({show_suggestion:false});
      }
    });
  }

  beerSelect(beer) {
    this.setState({beer_text:beer.name});
  }

  searchSuggestions(event) {
    let newState = {beer_text:event.target.value};

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
      isFetching,
      lastUpdated,
    } = this.props;

    const show_list = suggestion_beers.length > 0 && this.state.show_suggestion;
    return (
      <div ref={(wrapper) => this.wrapper = wrapper} className="suggestion__wrapper">
        <Input value={this.state.beer_text} onChange={this.searchSuggestions} placeholder="Name, description, etc ..." />
        <SuggtionBeersList beerSelect={this.beerSelect} beers={suggestion_beers} display={show_list} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { getSuggestionBeers } = state;
  const {
    isFetching,
    lastUpdated,
    items: suggestion_beers
  } = getSuggestionBeers['default'] || {
    isFetching: true,
    items: []
  };

  return {
    suggestion_beers,
    isFetching,
    lastUpdated,
  }
};

export default connect(mapStateToProps)(BeersSuggestionInput);
