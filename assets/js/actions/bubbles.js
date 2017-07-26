export const SAVE__BUBBLE = 'REGISTER__BUBBLE';

// Redux Action: register bubble information
export const saveBubble = bubbleInfo => ({
  type: SAVE__BUBBLE,
  ...bubbleInfo,
});

export const registerBubble = bubbleInfo => dispatch => dispatch(saveBubble(bubbleInfo));
