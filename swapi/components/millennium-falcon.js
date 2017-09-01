import React from 'react';
import classNames from 'classnames';
import ItemDisplay from './item-display';
import DarkSide from './dark-side';

export default class MillenniumFalcon extends React.PureComponent {

	static propTypes = {
		onChooseEndpoint: React.PropTypes.func.isRequired,
		onExpandToggle: React.PropTypes.func.isRequired,
		joinTheDarkSide: React.PropTypes.func.isRequired,
		hireBoba: React.PropTypes.func.isRequired,
		expandedItems: React.PropTypes.arrayOf(React.PropTypes.string),
		list: React.PropTypes.arrayOf(React.PropTypes.shape({
			url: React.PropTypes.string.isRequired,
		})).isRequired,
		side: React.PropTypes.string,
		endpoint: React.PropTypes.string,
		loading: React.PropTypes.bool.isRequired
	};

	render() {
		const {
			loading, list, onChooseEndpoint, onExpandToggle, expandedItems,
			side, endpoint, joinTheDarkSide, hireBoba
		} = this.props;

		const iconClass = classNames('fa', {
			'fa-refresh': loading,
			'fa-spin': loading,
			'fa-star': !loading,
		});

		const sortByName = (a, b) => {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}

			return 0;
		};

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-6">
						<p><i className={iconClass} /> Welcome to the Dark side.</p>
						<div className="btn-group">
							<button disabled={loading} onClick={() => onChooseEndpoint('people')} className="btn btn-danger">
								Load Contracts
							</button>
							<button disabled={loading} onClick={() => onChooseEndpoint('films')} className="btn btn-danger">
								Films
							</button>
						</div>
						{' '}
					</div>

				</div>

				<div className="row">
					<div className="col-xs-6">
						<table className="table">
							<tbody>
							{list.sort(sortByName).map((item) => (
								<tr key={item.url}>
									<td>
										<ItemDisplay isExpanded={expandedItems.indexOf(item.url) !== -1}
													 onExpandToggle={onExpandToggle}>
											{item}
										</ItemDisplay>
									</td>
								</tr>
							))}
							</tbody>
						</table>
					</div>
					<DarkSide loading={loading}
							  side={side}
							  endpoint={endpoint}
							  joinTheDarkSide={joinTheDarkSide}
							  hireBoba={hireBoba} />
				</div>
			</div>
		);
	}
}
