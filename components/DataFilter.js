import React, { Component, PropTypes } from 'react'
import $ from 'jquery';
import ChartSelector from './ChartSelector'
import DateSelector from './DateSelector'
import DateRange from './DateRange'
import MainChart from './MainChart'
import moment from 'moment';
import * as action from '../actions/'
import { connect } from 'react-redux'
import { createStore } from 'redux'
import { createSelector } from 'reselect'
import { Router, Route, Link, browserHistory } from 'react-router'

var text;

class DataFilter extends Component{
	shouldIUpdateThe(oldProps, newProps) {
		console.log("shouldIUpdateThe")
		console.log("Old Props", oldProps)
		console.log("New Props", newProps)

		if(oldProps.params!=newProps.params) {
			var startAfterEnd = false;
			var endBeforeStart = false;
			var startDate = newProps.params.startDate;
			var endDate = newProps.params.endDate;

			console.log(moment(newProps.fetchedData[0].date).format('MM-DD-YYYY'))

			if(oldProps.params.endDate!=endDate) {
				console.log("We are changing endDate")
				if(moment(endDate).isSameOrAfter(moment())) {
					endDate = moment().format('MM-DD-YYYY');
				}
				if(moment(endDate, "MM-DD-YYYY").isSameOrBefore(moment(newProps.fetchedData[0].date).format('MM-DD-YYYY'))) {
					endDate = moment(newProps.fetchedData[0].data).format('MM-DD-YYYY');
				}
				if(moment(endDate).isBefore(moment(startDate))) {
					endBeforeStart = true;
				}
			}
			if(oldProps.params.startDate!=startDate) {
				console.log("We are changing startDate")
				if(moment(startDate).isSameOrAfter(moment())) {
					startDate = moment().format('MM-DD-YYYY');
				}
				if(moment(startDate, "MM-DD-YYYY").isSameOrBefore(moment(newProps.fetchedData[0].date).format('MM-DD-YYYY'))) {
					startDate = moment(newProps.fetchedData[0].data).format('MM-DD-YYYY');
				}
				if(moment(startDate).isAfter(moment(endDate))) {
					startAfterEnd = true;
				}
			}

			if(startAfterEnd == true) {
				// startDate = newProps.params.startDate
				endDate = startDate;
			}
			if(endBeforeStart == true) {
				startDate = newProps.params.endDate;
				// endDate = newProps.params.endDate
			}

			var editedProps = {
				...newProps,
				params: {
					chartSelector: newProps.params.chartSelector,
					startDate: startDate,
					endDate: endDate,
				},
				status: "noError"
			}

			this.props.updateFromParams(editedProps);

			// var editedProps = {
			// 	...newProps,
			// 	params: {
			// 		chartSelector: newProps.params.chartSelector,
			// 		startDate: startDate,
			// 		endDate: endDate,
			// 	},
			// 	status: "noError"
			// }
			// console.log(editedProps)
			// this.props.updateFromParams(editedProps);
		}
	}

	componentWillReceiveProps(newProps) {
		// console.log("componentWillReceiveProps")
		// console.log(newProps)
		var keys = [];
		var chart = false;
		var startFound = false;
		var endFound = false;
		var startDate = moment(newProps.params.startDate).isValid();
		var endDate = moment(newProps.params.endDate).isValid();
		for(var j=0;j<newProps.fetchedData.length-1;j++) {
			if(moment(newProps.params.startDate).format('MM-DD-YYYY') == moment(newProps.fetchedData[j].date).format('MM-DD-YYYY')) {
				startFound = true;
			}
			if(moment(newProps.params.startDate).format('MM-DD-YYYY') == moment(newProps.fetchedData[j].date).format('MM-DD-YYYY')) {
				endFound = true;
			}
		}

		for(var k in newProps.fetchedData[0]) {keys.push(k)}
		for(var i=1;i<9;i++) {
			if(keys[i] === newProps.params.chartSelector ) {
				chart = true;
			}
		}

		// console.log(chart, startDate, endDate, startFound, endFound)
		if(!chart || !startDate || !endDate || !startFound || !endFound) {
			if(this.props.status=="error" || !this.props.fetchedData.length){
				return;
			}
			this.props.invalidError();
			return
		}
		this.shouldIUpdateThe(this.props, newProps)
	}

	componentDidMount() {
		// console.log("componentDidMount Params",this.props.params)
		if(!this.props.filteredData.length) {
			this.props.fetchData();
		}
		if(this.props.params.chartSelector!=null && this.props.params.startDate!=null && this.props.params.endDate!=null) {
			this.props.updateFromParams(this.props);
		}
		else{
			var newUrl = "/#/"+this.props.chartSelector+"/"+this.props.startDate+"/"+this.props.endDate
			browserHistory.push(newUrl);
		}
		// console.log("componentDidMount Props", this.props)
	};
	// shouldComponentUpdate(nextProps) {
		// console.log("shouldComponentUpdate Params", this.props.params)
		// console.log("shouldComponentUpdate Props", this.props)
		// console.log("Next Params Start", nextProps.params.startDate,"Next Params End", nextProps.params.endDate);
		// console.log("Current Props Start", this.props.params.startDate ,"Current Props End",this.props.params.endDate);
		// console.log(nextProps.params.startDate == this.props.startDate && nextProps.params.endDate == this.props.endDate)
		// if(nextProps.params.startDate == this.props.params.startDate && nextProps.params.endDate == this.props.params.endDate) {
		// 	console.log('SHOULD NOT UPDATE');
		// 	return false;
		// } else {
		// 	console.log('SHOULD UPDATE');
		// 	return true;
		// }
	// };
	// componentWillUpdate(nextProps) {
	// 	// var previousHistory;
	// 	// browserHistory.listen(location => {
	// 	// 	previousHistory = location
	// 	// 	console.log("Previous History", previousHistory, "Current Location", location)
	// 	// 	if(previousHistory != location) {
	// 	// 		console.log("Not Previous History")
	// 			if(this.props.params.chartType!=null && this.props.params.startDate!=null && this.props.params.endDate!=null) {
	// 				// if(moment(this.props.params.startDate).isAfter(moment())) {
	// 				// 	this.props.invalidError();
	// 				// 	return;
	// 				// }
	// 				// if(moment(this.props.params.startDate).isAfter(moment(this.props.params.endDate))) {
	// 				// 	console.log("Start after end")
	// 				// 	this.props.params.endDate = moment(this.props.params.startDate).format('MM-DD-YYYY');
	// 				// } else {
	// 				// 	this.props.params.endDate = moment(this.props.params.endDate).format('MM-DD-YYYY');
	// 				// }
	// 				// if(moment(this.props.params.endDate).isBefore(moment(this.props.params.startDate))) {
	// 				// 	console.log("End before start")
	// 				// 	this.props.params.startDate = moment(this.props.params.endDate).format('MM-DD-YYYY');
	// 				// } else {
	// 				// 	this.props.params.startDate = moment(this.props.params.startDate).format('MM-DD-YYYY');
	// 				// }
	//
	// 				// console.log("componentDidUpdate Params", this.props.params);
	// 				console.log("ComponentWillUpdate", nextProps.params)
	// 				this.props.updateFromParams(nextProps.params);
	// 				// getVisibleData(nextProps);
	//
	// 				// console.log("componentDidUpdate Props", this.props)
	//
	// 				// var keys = [];
	// 				// var chart = false;
	// 				// var startDate = moment(this.props.params.startDate).isValid();
	// 				// var endDate = moment(this.props.params.endDate).isValid();
	// 				// for(var k in this.props.fetchedData[0]) {keys.push(k)}
	// 				// for(var i=1;i<9;i++) {
	// 				// 	if(keys[i] === this.props.params.chartType ) {
	// 				// 		chart = true;
	// 				// 	}
	// 				// }
	// 				// // moment(this.props.params.startDate).isAfter(moment(this.props.params.endDate)) || moment(this.props.params.endDate).isBefore(moment(this.props.params.startDate)
	// 				// if(chart==false || startDate==false || endDate==false ) {
	// 				// 	if(this.props.status=="error" || !this.props.fetchedData.length){
	// 				// 		return;
	// 				// 	}
	// 				// 	this.props.invalidError();
	// 				// 	return
	// 				// }
	// 			}
	// 		// }
	// 	// });
	// };

	render() {
		return (
			<div className="row">
                <div className="wrapper">
                    <section className="mainchartcontainer">
                        <div className="charttop">Statistics
                            <div className="totaldata">
								{text}
							</div>
                        </div>
                        <div className="topofmainchart">
							<ChartSelector
								chartType={this.props.chartSelector}
								handleChange={(e) => this.props.updateChartSelector(e.target.value, this.props)} />
							<DateSelector
								dateType={this.props.dateSelector}
								handleChange={(e) => this.props.updateDateSelector(e.target.value, this.props)} />
							<DateRange
								startDate={this.props.startDate}
								endDate={this.props.endDate}
								handleStartChange={(moment) => this.props.updateStartDate(moment, this.props)}
								handleEndChange={(moment) => this.props.updateEndDate(moment, this.props)} />
						</div>
						<div id="mainchart">
							<MainChart
							filteredData={this.props.filteredData}
							chartType={this.props.chartSelector}
							status={this.props.status}
							/>
						</div>
					</section>
					<section className="piechartcontainer">
					<div id="piechart">
						<Link to="/stats/"><button className="btn btn-info" role="button">See More Detailed Stats</button></Link>
					</div>
					</section>
				</div>
			</div>
		)
	}
};

// render() {
// 	console.log("Render Function", this.props)
// 	let { startDate } = this.props
// 	// if (this.props.params.startDate)
// 		// startDate = this.props.params.startDate
// 	return (
// 		<div className="row">
// 			<div className="wrapper">
// 				<section className="mainchartcontainer">
// 					<div className="charttop">Statistics
// 						<div className="totaldata">
// 							{text}
// 						</div>
// 					</div>
// 					<div className="topofmainchart">
// 						<ChartSelector
// 							chartType={this.props.chartSelector}
// 							handleChange={(e) => this.props.updateChartSelector(e.target.value, this.props)} />
// 						<DateSelector
// 							dateType={this.props.dateSelector}
// 							handleChange={(e) => this.props.updateDateSelector(e.target.value, this.props)} />
// 						<DateRange
// 							startDate={startDate}
// 							endDate={this.props.endDate}
// 							handleStartChange={(moment) => this.props.updateStartDate(moment, this.props)}
// 							handleEndChange={(moment) => this.props.updateEndDate(moment, this.props)} />
// 					</div>
// 					<div id="mainchart">
// 						<MainChart
// 						filteredData={this.props.filteredData}
// 						chartType={this.props.chartSelector}
// 						status={this.props.status}
// 						/>
// 					</div>
// 				</section>
// 				<section className="piechartcontainer">
// 				<div id="piechart">
// 					<Link to="/stats/"><button className="btn btn-info" role="button">See More Detailed Stats</button></Link>
// 				</div>
// 				</section>
// 			</div>
// 		</div>
// 	)
// }
// };

const getVisibleData = createSelector(
	[(state) => state.fetchedData, (state) => state], (data, filters) => {
		if (!data) return []
	    var filteredData = data.filter(item => {
			if(moment(item.date).isSameOrAfter(moment(filters.startDate)) && moment(item.date).isSameOrBefore(moment(filters.endDate)))
				return true;
		})
		var filteredData = $.map(filteredData, function(n,i){
			return [[ moment(n.date).format('MM-DD-YYYY'), Number(n[filters.chartSelector]) ]];
		});
		var sum = 0;
		var date;
		var parts;
		var chartname = filters.chartSelector;
		//Set date text values
	    if(filters.dateSelector == "last90") {
	        date = "last 90 days";
	    }
	    if(filters.dateSelector == "last30") {
	        date = "last 30 days";
	    }
	    if(filters.dateSelector == "lastmonth") {
	        date = "last month";
	    }
	    if(filters.dateSelector == "lifetime") {
	        date = "lifetime";
	    }

		if(filters.chartSelector.indexOf("total_")===0) {
	        chartname = filters.chartSelector.split("total_").pop();
	        chartname = "total " + chartname + " as of " + filteredData[filteredData.length-1][0];
			sum = filteredData[filteredData.length-1][1];
	    }
		else{
			for(var i = 0, len = filteredData.length; i < len; i++) {
		    	sum += filteredData[i][1];
			}
			chartname = filters.chartSelector;
		}

	    var parts = sum.toString().split(".");
	    if(parts[1]!==undefined) {
	        var decimal = parts[1];
	        parts[1] = decimal.slice(0,2);
	        parts[0] = "$"+parts[0];
	    }
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    parts = (parts.join("."));

		text = parts+" "+chartname+" "+date;

	    if(filters.dateSelector == "lifetime")
	        text = parts+" "+date+" "+chartname;
	    if(filters.dateSelector == "customrange")
	        text =  parts+" total "+chartname;
	    if(filters.chartSelector.indexOf("total_")===0)
	        text = parts+" "+chartname;

		return filteredData;
	}
)

export default connect(
(state) => {
		return {
		...state.data,
		filteredData: getVisibleData(state.data)
		}
	},
	(dispatch) => ({
		fetchData: () => {
			dispatch(action.fetchData())
		},
		updateFromParams: (props) => {
			dispatch(action.changeFromParams(props.params))

			var newUrl = "/#/"+props.params.chartSelector+"/"+props.params.startDate+"/"+props.params.endDate
			browserHistory.push(newUrl);
			// var finalProps = {start: props.params.startDate, end: props.params.endDate }
			// this.updateStartDate(props.params.startDate, props);
			// this.updateEndDate(props.params.endDate, props);
			// dispatch(action.changeStartDate(finalProps))
		},
		updateChartSelector: (chart,props) => {
			dispatch(action.changeChart(chart))
			var newUrl = "/#/"+chart+"/"+props.startDate+"/"+props.endDate
			browserHistory.push(newUrl);
		},
		updateDateSelector: (date,props) => {
			var start;
			var end;
			if(date==='last30'){
				start = moment().subtract(29, 'days').format('MM-DD-YYYY'),
				end = moment().format('MM-DD-YYYY')
			}
			if(date==='last90'){
				start = moment().subtract(89, 'days').format('MM-DD-YYYY'),
				end = moment().format('MM-DD-YYYY')
			}
			if(date==='lastmonth'){
				start =  moment().subtract(1, 'months').date(1).format('MM-DD-YYYY'),
				end =  moment().date(0).format('MM-DD-YYYY')
			}
			if(date==='lifetime'){
				start = moment(props.fetchedData[0].date).format('MM-DD-YYYY'),
				end = moment().format('MM-DD-YYYY')
			}

			var date = {date,start,end}
			dispatch(action.changeDate(date))

			var newUrl = "/#/"+props.chartSelector+"/"+start+"/"+end
			browserHistory.push(newUrl);
		},
		updateStartDate: (start, props) => {
			var end;
			if(start.isAfter(moment(props.endDate))) {
				end = start;
			} else {
				end = props.endDate;
			}

			start = moment(start).format('MM-DD-YYYY')
			end = moment(end).format('MM-DD-YYYY')
			var date = {start,end}

			dispatch(action.changeStartDate(date))

			var newUrl = "/#/"+props.chartSelector+"/"+start+"/"+end
			browserHistory.push(newUrl);
		},
		updateEndDate: (end, props) => {
			var start;
			if(end.isBefore(moment(props.startDate))) {
				start = end;
			} else {
				start = props.startDate;
			}

			start = moment(start).format('MM-DD-YYYY')
			end = moment(end).format('MM-DD-YYYY')
			var date = {start,end}

			dispatch(action.changeEndDate(date))

			var newUrl = "/#/"+props.chartSelector+"/"+start+"/"+end
			browserHistory.push(newUrl);
		},
		invalidError: () => {
			dispatch(action.invalidParam())
		},
	}),
)(DataFilter)
