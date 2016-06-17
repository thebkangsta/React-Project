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
		if(!this.props.filteredData.length){
			return null
		}
		var chartName = this.props.chartType;
		var chartNameTotal = "total_"+this.props.chartType;
		var filteredData = this.props.filteredData;

		const data = {
			names: {
				views: 'Views',
				subscribers: 'Subscribers',
				videos: 'Videos',
				earnings: 'Earnings',
				total_views: 'Total Views',
				total_subscribers: 'Total Subscribers',
				total_videos: 'Total Videos',
				total_earnings: 'Total Earnings',

			},
			json: filteredData,
			keys: {
            	x: 'date',
				value: [this.props.chartType, chartNameTotal],

			},
			order: 'asc',
			colors: {
				total_views: '#86c5ef',
				total_subscribers: '#86c5ef',
				total_videos: '#86c5ef',
				total_earnings: '#86c5ef',

			},
			size: {
				height: 10,
				width: 200,
			},
			axes: {
				views: 'y',
				subscribers: 'y',
				videos: 'y',
				earnings: 'y',
				total_views: 'y2',
				total_subscribers: 'y2',
				total_videos: 'y2',
				total_earnings: 'y2',
			},
			types: {
				views: 'spline',
				subscribers: 'spline',
				videos: 'spline',
				earnings: 'spline',
            	total_views: 'bar',
				total_subscribers: 'bar',
				total_videos: 'bar',
				total_earnings: 'bar',
			},
        }

		const zoom = {
			enabled: true,
		}

		const padding = {
			left: 50,
			right: 50,
		}

		const point = {
			r: 2.5,
		}

		const axis = {
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
    			// label: chartName,
				padding: {
					bottom: 100,
				},
				min: 0,
				tick: {
					format: function(x) {
						if(chartName=='earnings'){
							return d3.format("$s,")(x)
						}
						else {return d3.format("s,")(x)}
					}
				}
			},
			y2: {
				max: Number(this.props.filteredData[this.props.filteredData.length-1][chartNameTotal]),
				min: Number(this.props.filteredData[0][chartNameTotal]),
				// label: chartNameTotal,
				padding: {
					top: 700,
				},
            	show: true,
				tick: {
					format: function(x) {
						if(chartName=='earnings'){
							return d3.format("$s,")(x)
						}
						else {
							return d3.format("s,")(x)
						}
					}
				}
        	},
    	}

		const tooltip = {
			format: {
    			value: function (value, ratio, id, index) {
					if(chartName=='earnings'){
						return d3.format("$,.2fs")(value)
					}
					else {
						return d3.format(",")(value)
					}
				}
			}
		}

		return (
			<C3Chart data={data}
				axis={axis}
				padding={padding}
				point={point}
				tooltip={tooltip}
				zoom={zoom}
			/>
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
