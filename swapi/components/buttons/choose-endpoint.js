import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ChooseEndpoint extends Component {
	static propTypes = {
		endpoint: PropTypes.string.isRequired,
		isLoading: PropTypes.bool.isRequired,
		onChooseEndpoint: PropTypes.func.isRequired,
		title: PropTypes.string.isRequired
	};

	handleChooseEndpoint = () => {
		this.props.onChooseEndpoint(this.props.endpoint);
	};
	render() {
		const { title, isLoading } = this.props;
		return (
			<button
				disabled={isLoading}
				onClick={this.handleChooseEndpoint}
				className="btn btn-danger"
			>
				{title}
			</button>
		);
	}
}

export default ChooseEndpoint;
