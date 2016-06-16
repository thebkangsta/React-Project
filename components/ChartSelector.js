import React, { PropTypes } from 'react'

var ChartSelector = React.createClass ({
	render: function() {
		return (
			<div>
				<form>
					<select id="chartselector" onChange={this.props.handleChange} value={this.props.chartType}>
						<option value="views" defaultValue>Views</option>
						<option value="subscribers">Subscribers</option>
						<option value="videos">Videos</option>
						<option value="earnings">Earnings</option>
						<option value="total_views">Total Views</option>
						<option value="total_subscribers" >Total Subscribers</option>
						<option value="total_videos">Total Videos</option>
						<option value="total_earnings">Total Earnings</option>
					</select>
				</form>
			</div>
		)
	}
});

ChartSelector.propTypes = {
  chartType: PropTypes.string.isRequired
}

export default ChartSelector
