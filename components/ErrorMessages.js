import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

class ErrorMessages extends Component {
	render() {
		if(this.props.status=="error") {
			return (
				<Alert bsStyle="danger" id="messages">
					<strong>Whoops!</strong> {this.props.errorMessage}
				</Alert>
			)
		}
		else {
			return (
				<div>
				</div>
			)
		}
	}
}

export default connect(
	(state) => ({
		...state.data
	})
)(ErrorMessages)
