import {CHANGE_CHARTSELECTOR, CHANGE_DATESELECTOR, CHANGE_STARTDATE, CHANGE_ENDDATE, CHANGE_FROM_PARAMS, INVALID_ERROR} from '../constants/DateFilter'
import moment from 'moment';
import { Router, Route, Link, browserHistory } from 'react-router'

const startDate = moment().subtract(29, 'days').format('MM-DD-YYYY')
const endDate = moment().format('MM-DD-YYYY')

const initialState = {
	status: "noError",
	errorMessage: "",
	fetchedData: [],
    chartSelector: "views",
    dateSelector: "last30",
	startDate: startDate,
	endDate: endDate
}

export default function filter(state = initialState, action) {
	switch (action.type) {
    	case 'FETCH_DONE':
    	return {
			...state,
			fetchedData: action.response.data
        }

		case 'FETCH_ERROR':
		return {
			...state,
			status: action.status,
			errorMessage: action.message
		}

		case INVALID_ERROR:
		return {
			...state,
			status: "error",
			errorMessage: action.message
		}

    	case CHANGE_CHARTSELECTOR:
    	return {
			...state,
			chartSelector: action.chart,
			status: "noError"
        }

		case CHANGE_DATESELECTOR:
		return {
			...state,
		    dateSelector: action.date.date,
			startDate: action.date.start,
			endDate: action.date.end,
			status: "noError"
		}

		case CHANGE_STARTDATE:
    	return {
			...state,
		    startDate: action.start.start,
			endDate: action.start.end,
			dateSelector: "customrange",
			status: "noError"
        }

		case CHANGE_ENDDATE:
    	return {
			...state,
			startDate: action.end.start,
			endDate: action.end.end,
			dateSelector: "customrange",
			status: "noError"
        }

		case CHANGE_FROM_PARAMS:
		// console.log("UPDATE FROM PARAMS", action)
		// console.log("ACTION INFO", action.params.chartSelector)
		// console.log("Original State", state)
		// let newstate = state
		// newstate['chartSelector']=action.params.chartType
		// newstate['dateSelector']="customrange"
		// newstate['startDate']=action.params.startDate
		// newstate['endDate']=action.params.endDate
		// newstate['status']="noError"
		// console.log("New State", newstate)
		// return newstate
		// return {
		// 	...state,
		// 	chartSelector: action.chartSelector,
		// 	startDate: action.startDate,
		// 	dateSelector: "customrange",
		// 	endDate: action.endDate,
		// 	status: "noError",
		// }
		return {
			...state,
			chartSelector: action.params.chartSelector,
			startDate: action.params.startDate,
			dateSelector: "customrange",
			endDate: action.params.endDate,
			status: "noError",
		}

		default:
    		return state
	}
}
