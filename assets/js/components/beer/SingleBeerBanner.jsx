import React from 'react';
import BubbleBackground from './BubbleBackground';
import SingleBeerTile from './SingleBeerTile';
import RelatedBeers from './RelatedBeers';

class SingleBeerBanner extends React.Component {
  render() {
    const { beer } = this.props;

    return (
      <div className="beer__banner">
        <BubbleBackground />
        <SingleBeerTile beer={beer}></SingleBeerTile>
        <RelatedBeers beer={beer}></RelatedBeers>
      </div>
    );
  }
}

export default SingleBeerBanner;
