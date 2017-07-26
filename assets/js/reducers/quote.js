import {
  SUBMITTING_QUOTE,
  SUBMITTED_QUOTE,
} from '../actions/quote';

const quote = (state = { }, action) => {
  switch (action.type) {
  case SUBMITTING_QUOTE:
    return {
      ...state,
      isSubmitting: true,
    };
  case SUBMITTED_QUOTE:
    return {
      ...state,
      isError: action.isError,
      quote: action.data,
      error: action.isError ? action.data : {},
      isSubmitting: false,
    };
  default:
    return state;
  }
};

export default quote;
