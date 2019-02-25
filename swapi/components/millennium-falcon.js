import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ItemDisplay from './item-display';

class MillenniumFalcon extends React.PureComponent {
	static propTypes = {
		onChooseEndpoint: PropTypes.func.isRequired,
		onToggleItem: PropTypes.func.isRequired,
		onBuyEntity: PropTypes.func.isRequired,
		list: PropTypes.arrayOf(
			PropTypes.shape({
				url: PropTypes.string.isRequired
			})
		).isRequired,
		money: PropTypes.number.isRequired
	};

	renderStarWarsResourceButton(endpoint, title, isLoading) {
		return (
			<button
				disabled={isLoading}
				onClick={() => this.props.onChooseEndpoint(endpoint)}
				className="btn btn-danger"
			>
				{title}
			</button>
		);
	}

	renderItems(list) {
		return (
			<div>
				<button
					className="btn btn-default btn-xs"
					type="button"
					onClick={() => this.props.onSortListData(this.props.endpoint)}
				>
					Sort by name <i className="fa fa-sort-down fa-lg" title="Sort" />
				</button>
				<table className="table">
					<tbody>
						{list.map(item => (
							<tr key={item.url}>
								<td>
									<ItemDisplay
										item={item}
										onToggleItem={this.props.onToggleItem}
										onBuyEntity={this.props.onBuyEntity}
										isAvailable={this.getAvailableState(item)} // Get availability state here to avoid excessive rerendering
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}

	getAvailableState(item) {
		const { money } = this.props;
		if (item.kind === 'people') {
			return money >= item.mass;
		} else if (item.kind === 'starships') {
			return money >= item.cost_in_credits;
		}
	}

	render() {
		const { loading, list } = this.props;

		const iconClass = classNames('fa', {
			'fa-refresh': loading,
			'fa-spin': loading,
			'fa-star': !loading
		});

		return (
			<div>
				<p>
					<i className={iconClass} /> What do you want to see?
				</p>
				<div className="btn-group">
					<button
						className="btn btn-default"
						onClick={() => this.props.onAddMoney(22867000)}
					>
						Collect a lot of credits (if waiting isn't your thing)
					</button>
				</div>
				<br />
				<div className="btn-group">
					{this.renderStarWarsResourceButton('people', 'People', loading)}
					{this.renderStarWarsResourceButton('starships', 'Starships', loading)}
					{this.renderStarWarsResourceButton('films', 'Films', loading)}
				</div>
				<br />
				<br />
				{this.renderItems(list)}
			</div>
		);
	}
}

export default MillenniumFalcon;
