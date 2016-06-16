import React, { PropTypes } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

var DateRange = React.createClass ({
	render: function() {
		return (
			<div id="datepicker">
				<DatePicker
					maxDate = {moment()}
					dateFormat='MM-DD-YYYY'
					selected={moment(this.props.startDate)}
					startDate={moment(this.props.startDate)}
					endDate={moment(this.props.endDate)}
					onChange={this.props.handleStartChange} />
				<span className="input-group-addon">to</span>
				<DatePicker
					maxDate = {moment()}
					dateFormat='MM-DD-YYYY'
					selected={moment(this.props.endDate)}
					startDate={moment(this.props.startDate)}
					endDate={moment(this.props.endDate)}
					onChange={this.props.handleEndChange} />
			</div>
		)
	}
});

DateRange.propTypes = {
	startDate: PropTypes.string.isRequired,
	endDate: PropTypes.string.isRequired
}

export default DateRange
