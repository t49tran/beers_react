import React from 'react';
import BubbleBackground from './BubbleBackground';
import SingleBeerTile from './SingleBeerTile';
import RelatedBeers from './RelatedBeers';

const SingleBeerBanner = function SingleBeerBanner(props) {
  const { beer } = props;

  return (
    <div className="beer__banner">
      <BubbleBackground />
      <SingleBeerTile beer={beer} />
      <RelatedBeers beer={beer} />
    </div>
  );
};

SingleBeerBanner.propTypes = {
  beer: React.PropTypes.object.isRequired,
};

export default SingleBeerBanner;
