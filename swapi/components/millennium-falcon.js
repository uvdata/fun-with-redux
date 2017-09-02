import React from 'react';
import ItemDisplay from './item-display';
import DarkSide from './dark-side';

export default class MillenniumFalcon extends React.PureComponent {

	static propTypes = {
		onExpandToggle: React.PropTypes.func.isRequired,
		selectTarget: React.PropTypes.func.isRequired,
		expandedItems: React.PropTypes.arrayOf(React.PropTypes.string),
		list: React.PropTypes.arrayOf(React.PropTypes.shape({
			url: React.PropTypes.string.isRequired,
		})).isRequired,
		side: React.PropTypes.string,
		endpoint: React.PropTypes.string,
		loading: React.PropTypes.bool.isRequired,
		target: React.PropTypes.string
	};

	render() {
		const { loading, list, onExpandToggle, expandedItems, side, endpoint, selectTarget, target } = this.props;

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
			<div className="row">
				<div className="col-xs-6">
					<table className="table">
						<tbody>
						{list.sort(sortByName).map((item) => (
							<tr key={item.url}>
								<td>
									<ItemDisplay isExpanded={expandedItems.indexOf(item.url) !== -1}
												 onExpandToggle={onExpandToggle}
												 selectTarget={selectTarget}
												 loading={loading} >
										{item}
									</ItemDisplay>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
				{
					side === 'dark' && endpoint !== 'films' && list.length
						? <DarkSide loading={loading} target={target} />
						: ''
				}
			</div>
		);
	}
}
