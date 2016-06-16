import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import DataFilter from '../components/DataFilter'
import ErrorMessages from '../components/ErrorMessages'

class Analytics extends Component {
	render() {
		return (
			<div>
				<ErrorMessages />
				<DataFilter params={this.props.params} />
			</div>
		)
	}
}

export default Analytics
