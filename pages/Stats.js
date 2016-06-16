import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import DetailedStats from '../components/DetailedStats'
import ErrorMessages from '../components/ErrorMessages'

class Stats extends Component {
	render() {
		console.log(this.props)
		return (
			<div>
				<ErrorMessages />
				<DetailedStats params={this.props.params} />
			</div>
		)
	}
}

export default Stats
