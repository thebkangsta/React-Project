import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import configureStore from './store/configureStore'
import { Router, Route, browserHistory, IndexRoute, hashHistory } from 'react-router'
import Analytics from './pages/Analytics'
import Stats from './pages/Stats'

export default (
	<Route path="/" component={Analytics}>
		<Route path="/(:chartType/:startDate/:endDate)">
			<IndexRoute component={Analytics}></IndexRoute>
		</Route>
		<Route path="stats/(:chartType/:startDate/:endDate)" component={Stats}></Route>
	</Route>
)
