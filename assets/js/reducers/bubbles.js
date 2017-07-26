import moment from 'moment';
import {
  SAVE__BUBBLE,
} from '../actions/bubbles';

const isBubbleCollided = (state, bubble) => {
  const bubbles = state;

  const collided = Object.keys(bubbles)
    .map(elm => bubbles[elm])
    .reduce((c, elm) => {
      if (c || elm.bubbleId === bubble.bubbleId) return c;

      const centres_distance = Math.sqrt(((elm.x - bubble.x) ** 2) + ((elm.y - bubble.y) ** 2));

      c = centres_distance <= elm.radius + bubble.radius;

      return c;
    }, false);

  return collided;
};

// Redux Reducer: save bubble
const bubbles = (state = { }, action) => {
  const bubbleData = {
    x: action.x,
    y: action.y,
    radius: action.radius,
    lastUpdated: moment().unix(),
    bubbleId: action.bubbleId,
  };

  const visible = isBubbleCollided(state, bubbleData);

  switch (action.type) {
  case SAVE__BUBBLE:
    return {
      ...state,
      [action.bubbleId]: {
        visible,
        ...bubbleData,
      },
    };
  default:
    return state;
  }
};

export default bubbles;
