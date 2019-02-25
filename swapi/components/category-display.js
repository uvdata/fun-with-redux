import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class CategoryDisplay extends React.PureComponent {

	static propTypes = {
		onChooseEndpoint: PropTypes.func.isRequired,
		children: PropTypes.shape({
			key: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		}).isRequired,
		endpoint: PropTypes.string,
		loading: PropTypes.bool.isRequired,
	};

	handleChooseEndpoint = () => this.props.onChooseEndpoint(this.props.children.key);

	render() {
		const { children: { key, name }, loading, endpoint } = this.props;

		const getEndpointButtonClassNames = classNames('btn', {
			'btn-default': key !== endpoint,
			'btn-success': key === endpoint
		});

		return (<button disabled={loading} onClick={this.handleChooseEndpoint} className={getEndpointButtonClassNames}>{name}</button>);
	}
}
