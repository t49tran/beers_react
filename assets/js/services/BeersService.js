import _ from 'lodash';
import Promise from 'bluebird';
import { API_SOURCE } from '../config';

class BeersService {
  constructor() {
    this.lookUpResults = { };
    this.endPoints = {
      search: () => `${API_SOURCE}search/beers`,
      find: id => `${API_SOURCE}beers/${id}`,
    };
  }

  getSuggestion(key) {
    return this.search(key);
  }

  search(key, opts) {
    const defaultOpts = {
      page: 1,
      per_page: 20,
      sort_order: 'ASC',
      sort: 'name',
    };

    opts = _.assign(defaultOpts, opts);
    if (this.lookUpResults[JSON.stringify(opts)] !== undefined) {
      return Promise.resolve(this.lookUpResults[JSON.stringify(opts)]);
    }

    return fetch(this.prepareSearchUrl(key, opts))
    .then((response) => {
      this.lookUpResults[JSON.stringify(opts)] = response.json();
      return this.lookUpResults[JSON.stringify(opts)];
    });
  }

  prepareSearchUrl(key, opts) {
    let search_url = `${this.endPoints.search()}?page=${opts.page}&per_page=${opts.per_page}&sort=${opts.sort}&sort_order=${opts.sort_order}`;

    if (key !== undefined) {
      search_url += `&key=${key}`;
    }

    if (opts.category !== undefined && opts.category !== '') {
      search_url += `&cat=${opts.category}`;
    }

    if (opts.country !== undefined && opts.country !== '') {
      search_url += `&country=${opts.country}`;
    }

    if (opts.style !== undefined && opts.style !== '') {
      search_url += `&style=${opts.style}`;
    }

    return search_url;
  }

  find(beer_id) {
    if (this.lookUpResults[`SINGLE_${beer_id}`]) {
      return this.lookUpResults[`SINGLE_${beer_id}`];
    }

    return fetch(this.endPoints.find(beer_id))
    .then((response) => {
      this.lookUpResults[`SINGLE_${beer_id}`] = response.json();
      return this.lookUpResults[`SINGLE_${beer_id}`];
    });
  }
}

const $beersService = new BeersService();

export default $beersService;
