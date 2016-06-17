import * as types from '../constants/DateFilter'
import axios from 'axios'

export const fetchData = () => (dispatch) => {
	axios.get('http://localhost/Laravel-Project/server.php/dashboard/data')
		.then((response) => {
			dispatch({
				type: 'FETCH_DONE',
				response: response.data
			})
		}).catch(function (response) {
    		dispatch({
				type: 'FETCH_ERROR',
				message: response.statusText,
				status: "error"
			})
		});
}

export function changeChart(chart) {
  return { type: types.CHANGE_CHARTSELECTOR, chart }
}

export function changeDate(date) {
  return { type: types.CHANGE_DATESELECTOR, date }
}

export function changeStartDate(start) {
  return { type: types.CHANGE_STARTDATE, start}
}

export function changeEndDate(end) {
  return { type: types.CHANGE_ENDDATE, end }
}

export function changeFromParams(params) {
	return { type: types.CHANGE_FROM_PARAMS, params}
}

export function invalidParam() {
	return { type: types.INVALID_ERROR, message: "Invalid Parameter", status: "error"}
}
