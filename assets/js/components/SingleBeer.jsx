import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { fetchSingleBeer } from '../actions/single_beer';
import Header from './Header';
import Footer from './Footer';
import SingleBeerBanner from './beer/SingleBeerBanner';
import BeerQuoteForm from './beer/BeerQuoteForm';

class SingleBeer extends React.Component {
  static get propTypes() {
    return {
      beer: React.PropTypes.object.isRequired,
      dispatch: React.PropTypes.func.isRequired,
      params: React.PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      params: {},
    };
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchSingleBeer(params.beerId));
  }

  render() {
    const { beer } = this.props;

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
    beer = {},
  } = singleBeers[ownProps.params.beerId] || {};

  return {
    beer,
  };
};

export default connect(mapStateToProps)(SingleBeer);
