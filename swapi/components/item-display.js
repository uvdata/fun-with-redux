import React from 'react';
import PropTypes from 'prop-types';

const fontAwesomeIconMap = {
	starships: 'space-shuttle',
	people: 'user',
	films: 'film'
};

class ItemDisplay extends React.PureComponent {
	static propTypes = {
		item: PropTypes.shape({
			url: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			kind: PropTypes.string.isRequired,
			expanded: PropTypes.bool.isRequired
		})
	};

	getFontAwesomeIcon(kind) {
		return fontAwesomeIconMap[kind] || 'question-circle';
	}

	render() {
		const {
			item: { name, kind, url, expanded },
			onToggleItem
		} = this.props;

		return (
			<span>
				<button
					className="btn btn-xs btn-default"
					onClick={() => onToggleItem(kind, url)}
					aria-label={expanded ? 'Collapse' : 'Expand'}
				>
					{expanded ? (
						<i className="fa fa-chevron-circle-up" />
					) : (
						<i className="fa fa-chevron-circle-down" />
					)}
				</button>{' '}
				<i className={'fa fa-' + this.getFontAwesomeIcon(kind)} />
				{name}
				{expanded ? (
					<pre>{JSON.stringify(this.props.item, null, 4)}</pre>
				) : null}
			</span>
		);
	}
}
export default ItemDisplay;
