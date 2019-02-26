import React from 'react';
import PropTypes from 'prop-types';
import BuyEntityButton from './buttons/buy-entity-button';

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
		isAvailable: PropTypes.bool.isRequired
	};

	getFontAwesomeIcon(kind) {
		return fontAwesomeIconMap[kind] || 'question-circle';
	}

	handleToggleItem = () => {
		const {
			item: { kind, url },
			onToggleItem
		} = this.props;
		onToggleItem(kind, url);
	};

	render() {
		const {
			item: { name, kind, expanded },
			item,
			isAvailable,
			onBuyEntity
		} = this.props;

		return (
			<span>
				<button
					className="btn btn-xs btn-default"
					onClick={this.handleToggleItem}
					aria-label={expanded ? 'Collapse' : 'Expand'}
				>
					{expanded ? (
						<i className="fa fa-chevron-circle-up" />
					) : (
						<i className="fa fa-chevron-circle-down" />
					)}
				</button>
				<i className={'fa fa-' + this.getFontAwesomeIcon(kind)} />
				{name}
				<span className="pull-right">
					<BuyEntityButton
						onBuyEntity={onBuyEntity}
						item={item}
						isAvailable={isAvailable}
					/>
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
