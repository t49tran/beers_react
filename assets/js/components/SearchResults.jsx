import React from 'react';
import { Row, Col } from 'reactstrap';
import BeerTile from './beer/BeerTile';
import {connect} from 'react-redux';


class SearchResults extends React.Component {
  static get propTypes() {
    return {
      beers: React.PropTypes.array
    };
  }

  render() {
    const {beers, isFetching, lastUpdated} = this.props;
    return (
      <div className="search-results container">
        <Row>
          {beers.map((beer, i) =>
            <Col sm="12" md="4" key={beer.id}>
              <BeerTile beer={beer} />
            </Col>
          )}
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {getBeerResults} = state;
  const {
    isFetching,
    lastUpdated,
    beers: beers
  } = getBeerResults['default'] || {
    isFetching: true,
    beers: []
  };

  return {
    beers,
    isFetching,
    lastUpdated
  }
};

export default connect(mapStateToProps)(SearchResults);