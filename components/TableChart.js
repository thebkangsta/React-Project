import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class TableChart extends Component {
	render = ({ ...all } = this.props) => {
		// RENDER EMPTY CHART
		const products = all.filteredData
		var name = all.chartSelector.replace(/_/g, ' ');

		return (
			<div>
				<BootstrapTable data={products} striped={true} hover={true}>
				    <TableHeaderColumn dataField="date" isKey={true} dataAlign="center" dataSort={true}>Date</TableHeaderColumn>
				    <TableHeaderColumn dataField="value" dataSort={true} dataAlign="center" className="capitalize">{name}</TableHeaderColumn>
				</BootstrapTable>
			</div>
		)
	}
}

TableChart.propTypes = {
	filteredData: PropTypes.array.isRequired,
}

export default connect(
	(state) => ({
		...state.data
	})
)(TableChart)
