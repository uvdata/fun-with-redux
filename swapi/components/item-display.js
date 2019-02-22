import React from 'react';
import PropTypes from 'prop-types';

const fontAwesomeIconMap = {
	starships: 'space-shuttle',
	people: 'user',
	films: 'film'
};

class ItemDisplay extends React.PureComponent {
	static propTypes = {
		children: PropTypes.shape({
			url: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			kind: PropTypes.string.isRequired
		})
	};

	state = {
		isExpanded: false
	};

	handleExpandToggle = () => {
		this.setState(state => ({ isExpanded: !state.isExpanded }));
	};

	getFontAwesomeIcon(kind) {
		return fontAwesomeIconMap[kind] || 'question-circle';
	}

	render() {
		const { name, kind, onExpandToggle } = this.props;
		const { isExpanded } = this.state;

		return (
			<span>
				<button
					className="btn btn-xs btn-default"
					onClick={this.handleExpandToggle}
					aria-label={isExpanded ? 'Collapse' : 'Expand'}
				>
					{isExpanded ? (
						<i className="fa fa-chevron-circle-up" />
					) : (
						<i className="fa fa-chevron-circle-down" />
					)}
				</button>{' '}
				<i className={'fa fa-' + this.getFontAwesomeIcon(kind)} />
				{name}
				{isExpanded ? (
					<pre>{JSON.stringify(this.props.children, null, 4)}</pre>
				) : null}
			</span>
		);
	}
}
export default ItemDisplay;
