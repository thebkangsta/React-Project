import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Chart } from 'react-google-charts'
import C3Chart from 'react-c3js'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment'

// const options = {
// 	backgroundColor: 'none',
// 	chartArea: {
// 		left: 100,
// 		top: 120,
// 		right: 50,
// 		width: '90%'
// 	},
// 	legend: 'none',
// 	height: 500,
// 	pointSize: 5,
// 	pointShape: 'circle'
// };

class MainChart extends Component {
	render() {
		var chartname;
		var filteredData = this.props.filteredData;

		if(this.props.chartType.indexOf("total_")===0) {
	        chartname = this.props.chartType.split("total_").pop();
	    } else {
	        chartname = this.props.chartType;
	    }
	    chartname = chartname.charAt(0).toUpperCase() + chartname.slice(1);

		var data = {
			names: {
				value: chartname,
			},
			json: filteredData,
			keys: {
            	x: 'date',
				value: ['value'],
			},
			size: {
				height: 10,
				width: 200,
			},

		};
		var padding = {
			left: 60,
			right: 20,
		};
		const point = {
			r: 2.5,
		};
		var axis = {
        	x: {
				label: 'Date',
            	type: 'timeseries',
				tick: {
    				format: function (x) {
						return moment(x).format('MM-DD-YYYY');
					}
    			}
        	},
			y: {
    			label: chartname,
				tick: {
					format: function(x) {
						if(chartname=='Earnings'){
							return d3.format("$,")(x)
						}
						else {return d3.format(",")(x)}
					}
				}
			},
    	}

		return (
			<C3Chart data={data} axis={axis} padding={padding} point={point} />
		)

		// // RENDER EMPTY CHART
		// if(this.props.status=="error"){
		// 	let data = [
		//         ['' , ''],
		//         [0 , 0],
	    // 	];
		// 	return <Chart
		// 		chartType="LineChart"
		// 		data = {data}
		// 		options={options}
		// 		graph_id="MainDataChart"
		// 		width={"100%"}
		// 		height={"400px"}
		// 		legend_toggle={true} />
		// }
		// var chartname;
		// if(this.props.chartType.indexOf("total_")===0) {
	    //     chartname = this.props.chartType.split("total_").pop();
	    // } else {
	    //     chartname = this.props.chartType;
	    // }
	    // chartname = chartname.charAt(0).toUpperCase() + chartname.slice(1);
		// var columns = [
		// 	{
		// 		'type': 'string',
		// 		'label' : 'Date'
		// 	},
		// 	{
		// 		'type' : 'number',
		// 		'label' : chartname
		// 	}
		// ];
		// return (
		// 	<div>
		// 		{this.props.filteredData.length && <Chart
		// 			chartType="LineChart"
		// 			columns = {columns}
		// 			rows={this.props.filteredData}
		// 			options={options}
		// 			graph_id="MainDataChart"
		// 			width={"100%"}
		// 			height={"400px"}
		// 			legend_toggle={true} />
		// 		}
		// 	</div>
		// )
	}
}

MainChart.propTypes = {
	filteredData: PropTypes.array.isRequired,
	chartType: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
}

export default MainChart
