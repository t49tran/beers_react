import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleBeer } from '../actions/single_beer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import Footer from './Footer';
import SingleBeerBanner from './beer/SingleBeerBanner';
import BeerQuoteForm from './beer/BeerQuoteForm';

class SingleBeer extends React.Component {
  static get propTypes() {
    return {
      beer: React.PropTypes.object.isRequired,
      isFetching: React.PropTypes.bool.isRequired,
      lastUpdated: React.PropTypes.number,
      dispatch: React.PropTypes.func.isRequired,
      beerId: React.PropTypes.string,
      beerName: React.PropTypes.string,
    };
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchSingleBeer(params.beerId));
  }

  render() {
    const {beer, isFetching, lastUpdated} = this.props;

    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <SingleBeerBanner beer={beer} />
          <BeerQuoteForm beer={beer} />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { singleBeers } = state;

  const {
    isFetching = true,
    lastUpdated,
    beer = {},
  } = singleBeers[ownProps.params.beerId] || {};

  return {
    beer,
    isFetching,
    lastUpdated
  }
};

export default connect(mapStateToProps)(SingleBeer);
