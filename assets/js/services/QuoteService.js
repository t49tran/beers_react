import { CRM_SOURCE } from '../config';

const sendQuote = quote => fetch(CRM_SOURCE, {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ quote }),
});


export default sendQuote;
