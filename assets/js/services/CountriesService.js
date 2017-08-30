import Promise from 'bluebird';
import _ from 'lodash';
import { API_SOURCE } from '../config';

let allCountries = [];

const getCountries = () => {
  if (!_(allCountries).isEmpty()) return Promise.resolve(allCountries);

  return fetch(`${API_SOURCE}countries/all`)
    .then(response => response.json())
    .then((countries) => {
      allCountries = countries;
      return Promise.resolve(allCountries);
    })
    .catch(err => Promise.reject(err));
};

const CountriesService = {
  getCountries,
};

export default CountriesService;
