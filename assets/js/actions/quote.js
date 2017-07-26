import sendQuote from '../services/QuoteService';

export const SUBMITTING_QUOTE = 'SUBMITTING_QUOTE';
export const SUBMITTED_QUOTE = 'SUBMITTED_QUOTE';
export const SUBMIT_QUOTE_FAILED = 'SUBMIT_QUOTE_FAILED';

// Redux action send quote
export const submittingQuoteAction = quote => ({
  type: SUBMITTING_QUOTE,
  data: quote,
});

// Redux action submit quote
export const submittedQuoteAction = (data, isError = false) => ({
  type: SUBMITTED_QUOTE,
  data,
  isError,
  receivedAt: Date.now(),
});

const postQuote = quote => (dispatch) => {
  dispatch(submittingQuoteAction(quote));

  return sendQuote(quote)
    .then(response => response.json())
    .then(data => dispatch(submittedQuoteAction(data.quote)))
    .catch(err => dispatch(submittedQuoteAction(err, true)));
};

export const submitQuote = quote => dispatch => dispatch(postQuote(quote));
