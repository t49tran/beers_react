import Promise from 'bluebird';
import _ from 'lodash';
import { API_SOURCE } from '../config';

let allCategories = [];

const getCategories = () => {
  if (!_(allCategories).isEmpty()) return Promise.resolve(allCategories);

  return fetch(`${API_SOURCE}categories/all`)
    .then(response => response.json())
    .then((categories) => {
      allCategories = categories;
      return Promise.resolve(allCategories);
    })
    .catch(err => Promise.reject(err));
};

const CategoriesService = {
  getCategories,
};

export default CategoriesService;
