import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ItemDisplay from './item-display';

class MillenniumFalcon extends React.PureComponent {
	static propTypes = {
		onChooseEndpoint: PropTypes.func.isRequired,
		onToggleItem: PropTypes.func.isRequired,
		onBuyEntity: PropTypes.func.isRequired,
		onLoadFromLocalStorage: PropTypes.func.isRequired,
		list: PropTypes.arrayOf(
			PropTypes.shape({
				url: PropTypes.string.isRequired
			})
		).isRequired,
		side: PropTypes.string
	};

	componentDidMount() {
		setInterval(() => {
			this.update();
		}, 1000);
		this.props.onLoadFromLocalStorage(localStorage.getItem('redux-money'));
	}

	// Runs once every second
	update() {
		this.props.onGenerateMoney();
		localStorage.setItem('redux-money', this.props.money);
	}

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
				<a onClick={() => this.props.onSortListData(this.props.endpoint)}>
					{' '}
					<i
						className="fa fa-sort-down fa-2x"
						title="Sort"
						style={{ cursor: 'pointer' }}
					/>
				</a>
				<table className="table">
					<tbody>
						{list.map(item => (
							<tr key={item.url}>
								<td>
									<ItemDisplay
										item={item}
										onToggleItem={this.props.onToggleItem}
										onBuyEntity={this.props.onBuyEntity}
										currentMoney={this.props.money}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
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
					{this.renderStarWarsResourceButton('films', 'Films', loading)}
					{this.renderStarWarsResourceButton('starships', 'Starships', loading)}
				</div>
				<br />
				<br />
				{this.renderItems(list)}
			</div>
		);
	}
}

export default MillenniumFalcon;
