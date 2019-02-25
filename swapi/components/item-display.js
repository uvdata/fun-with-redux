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
		}),
		onToggleItem: PropTypes.func.isRequired,
		onBuyEntity: PropTypes.func.isRequired,
		currentMoney: PropTypes.number.isRequired
	};

	getFontAwesomeIcon(kind) {
		return fontAwesomeIconMap[kind] || 'question-circle';
	}

	render() {
		const {
			item: { name, kind, url, expanded },
			item,
			onToggleItem,
			currentMoney
		} = this.props;

		let isAvailable = undefined;
		if (kind === 'people') {
			isAvailable = currentMoney >= item.mass;
		} else if (kind === 'starships') {
			isAvailable = currentMoney >= item.cost_in_credits;
		}

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
				<span className="pull-right">
					<button
						disabled={currentMoney < item.mass}
						onClick={() => this.props.onBuyEntity(item, kind)}
						className={`btn btn-xs btn-${isAvailable ? 'success' : 'default'}`}
						title={
							isAvailable
								? `Buy ${item.name}`
								: `You can't afford ${item.name} yet`
						}
					>
						Buy {name}
					</button>
				</span>
				{expanded ? (
					<div>
						<pre>{JSON.stringify(item, null, 4)}</pre>
					</div>
				) : null}
			</span>
		);
	}
}
export default ItemDisplay;
