import ReactDOM from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';

import reducer from './reducers';
import App from './components/App';
import Breweries from './components/Breweries';
import GlobalMap from './components/GlobalMap';
import SingleBeer from './components/SingleBeer';

require('./../styles/main.sass');

const middleware = [thunk];

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/breweries" component={Breweries} />
      <Route path="/global-map" component={GlobalMap} />
      <Route path="/beer/:beerName/:beerId" component={SingleBeer} />
    </Router>
  </Provider>,
  document.getElementById('container'),
);
