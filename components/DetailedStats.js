import React from 'react'
import $ from 'jquery';
import ChartSelector from './ChartSelector'
import DateSelector from './DateSelector'
import DateRange from './DateRange'
import TableChart from './TableChart'
import moment from 'moment';
import * as action from '../actions/'
import { connect } from 'react-redux'
import { createStore } from 'redux'
import { Router, Route, Link, browserHistory } from 'react-router'

var DetailedStats = React.createClass({
	componentDidMount() {
		if(!this.props.filteredData.length) {
			this.props.fetchData();
		}
		if(this.props.params.chartType!=null || this.props.params.startDate!=null || this.props.params.endDate!=null) {
			this.props.updateFromParams(this.props.params);
		}
		else{
			var newUrl = "/#/stats/"+this.props.chartSelector+"/"+moment(this.props.startDate).format('MM-DD-YYYY')+"/"+moment(this.props.endDate).format('MM-DD-YYYY')
			browserHistory.push(newUrl);
		}
	},
	componentDidUpdate() {
		var keys = [];
		var chart = false;
		var startDate = moment(this.props.params.startDate,"MM-DD-YYYY").isValid();
		var endDate = moment(this.props.params.endDate,"MM-DD-YYYY").isValid();
		for(var k in this.props.fetchedData[0]) {keys.push(k)}
		for(var i=1;i<9;i++) {
			if(keys[i] === this.props.params.chartType ) {
				chart = true;
			}
		}
		if(chart==false || startDate==false || endDate==false) {
			if(this.props.status=="error" || !this.props.fetchedData.length){
				return;
			}
			this.props.invalidError();
			return
		}
	},
	render: function() {
		return (
			<div className="row">
                <div className="wrapper">
                    <section className="mainchartcontainer">
                        <div className="charttop">Statistics</div>
						<div id="mainchart">
							<TableChart filteredData={this.props.filteredData}/>
						</div>
					</section>
					<section className="piechartcontainer">
					<div id="piechart">
						<Link to="/"><button className="btn btn-info" role="button">Change Data</button></Link>
					</div>
					</section>
				</div>
			</div>
		)
	}
});

const getVisibleData = (data, filters) => {
    var filteredData = data.filter(item => {
		if(moment(item.date).isSameOrAfter(filters.startDate.format('YYYY-MM-DD')) && moment(item.date).isSameOrBefore(filters.endDate.format('YYYY-MM-DD')))
			return true
	})
	var filteredData = $.map(filteredData, function(n,i){
		var number = n[filters.chartSelector]
		var parts = number.toString().split(".");
	    if(parts[1]!==undefined) {
	        var decimal = parts[1];
	        parts[1] = decimal.slice(0,2);
	        parts[0] = "$"+parts[0];
	    }
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    parts = (parts.join("."));
		return [{ date: moment(n.date).format('MM-DD-YYYY'), value: parts }];
	});
	return filteredData;
}

export default connect(
	(state) => ({
		...state.data,
		filteredData: getVisibleData(state.data.fetchedData, state.data)
	}),
	(dispatch) => ({
		fetchData: () => {
			dispatch(action.fetchData())
		},
		updateFromParams: (params) => {
			dispatch(action.changeFromParams(params))
		},
		invalidError: () => {
			dispatch(action.invalidParam())
		},
	}),
)(DetailedStats)
