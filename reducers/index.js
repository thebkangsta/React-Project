import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import data from './Data'

const rootReducer = combineReducers({
	routing: routerReducer,
	data
})

export default rootReducer
