import { API_SOURCE } from '../config';

let breweryResults = {};

const getBreweriesQueryUrl = (query) => {
  let parameters_string = [];

  if (query !== undefined && query.keyword !== undefined) {
    parameters_string.push(`keyword=${query.keyword}`);
  }

  if (query !== undefined && query.country !== undefined) {
    parameters_string.push(`country=${query.country}`);
  }

  return `${API_SOURCE}/search/breweries?${parameters_string.join('&')}`;
}

const searchBreweries = (query) => {
  const key = JSON.stringify(query);

  if (breweryResults[key] !== undefined) return Promise.resolve(breweryResults[key]);

  const brewery_url = getBreweriesQueryUrl(query);

  return fetch(brewery_url)
    .then(response => response.json())
    .then((data) => {
      breweryResults[key] = data;
      return Promise.resolve(data);
    })
    .catch(err => Promise.reject(err));
}

const BreweriesService = {
  searchBreweries,
};

export default BreweriesService;
