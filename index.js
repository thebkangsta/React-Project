import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Router, Route, useRouterHistory, IndexRoute } from 'react-router';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore';

import Analytics from './pages/Analytics'
import Stats from './pages/Stats'

require('react-datepicker/dist/react-datepicker.css');
require('./public/main.css');
require('./public/c3.min.css');

const store = configureStore();
const history = syncHistoryWithStore(useRouterHistory(createHashHistory)({queryKey: false}), store);

const router = (
	<Provider store={store}>
	    <Router history={history}>
	    	<Route path="/(:chartSelector/:startDate/:endDate)">
	        	<IndexRoute component={Analytics}></IndexRoute>
	    	</Route>
			<Route path="stats/(:chartSelector/:startDate/:endDate)" component={Stats}></Route>
	    </Router>
	</Provider>
)

render(
	router,
	document.getElementById('root')
)
