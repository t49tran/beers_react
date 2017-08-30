import React from 'react';

class SuggestionBeersList extends React.Component {
  static get propTypes() {
    return {
      beers: React.PropTypes.array,
      display: React.PropTypes.bool,
      beerSelect: React.PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      beers: [],
      display: false,
    };
  }

  render() {
    const {
      beerSelect,
      display,
    } = this.props;
    const className = `${display ? 'show' : 'hide'} beersSuggestionList`;

    return (
      <div className={className}>
        {this.props.beers.map(beer =>
          (<div
            onClick={() => beerSelect(beer)}
            role="button"
            tabIndex={0}
            className="beerSuggestionEntry"
            key={beer.id}
          >
            {beer.name}
          </div>
          ),
        )}
      </div>
    );
  }
}

export default SuggestionBeersList;
