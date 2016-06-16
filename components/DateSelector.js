import React, { PropTypes } from 'react'

var DateSelector = React.createClass ({
	render: function() {
		return (
			<div>
				<form>
					<select id="dateselector" onChange={this.props.handleChange} value={this.props.dateType}>
						<option id="customrange" value="customrange" disabled>Custom Range</option>
						<option value="last30" defaultValue>Last 30 Days</option>
						<option value="lastmonth">Last Month</option>
						<option value="last90">Last 90 Days</option>
						<option value="lifetime">Lifetime</option>
					</select>
				</form>
			</div>
		)
	}
});

DateSelector.propTypes = {
	dateType: PropTypes.string.isRequired
}

export default DateSelector
