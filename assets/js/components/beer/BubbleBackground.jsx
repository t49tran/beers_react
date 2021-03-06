import React from 'react';
import _ from 'lodash';
import shortid from 'shortid';

import BeerBubble from './BeerBubble';

const BubbleBackground = function BubbleBackground() {
  const { noOfBubbles = 30 } = this.props;
  const bubbles = _.range(0, noOfBubbles).map(() => ({
    x: _.random(0, window.innerWidth),
    y: _.random(0, window.innerHeight),
    speed: _.random(window.innerWidth / noOfBubbles, (window.innerWidth * 2) / noOfBubbles),
    radius: 25,
    id: shortid.generate(),
  }));

  return (
    <div className="bubbles-background">
      {bubbles.map((elm, i) =>
        (<BeerBubble
          key={elm.id}
          bubbleId={elm.id}
          y={elm.y}
          x={elm.x}
          speed={elm.speed}
          radius={elm.radius}
        />),
      )}
    </div>
  );
};

export default BubbleBackground;
