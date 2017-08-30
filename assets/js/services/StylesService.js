import Promise from 'bluebird';
import _ from 'lodash';
import { API_SOURCE } from '../config.js';

let stylesLookup = {};

function getStyles(query) {
  const queryKey = JSON.stringify(query);

  if (stylesLookup[queryKey] && !_(stylesLookup[queryKey]).isEmpty())
    return Promise.resolve(stylesLookup[queryKey]);

  const api_endpoint = (query && query.categoryId) ? `${API_SOURCE}styles/categories/${query.categoryId}` : `${API_SOURCE}styles/all`;
  return fetch(api_endpoint)
    .then(response => response.json())
    .then(styles => {
      stylesLookup[queryKey] = styles;
      return Promise.resolve(styles);
    });
}

const StylesService = {
  getStyles,
};

export default StylesService;
