import React from 'react';
import ItemDisplay from './item-display';

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
		kills: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		revive: React.PropTypes.func.isRequired,
	};

	render() {
		const { list, onExpandToggle, expandedItems, side, selectTarget, kills, revive } = this.props;
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
			<div className="col-xs-6">
				<table className="table">
					<tbody>
					{list.sort(sortByName).map((item) => (
						<tr key={item.url}>
							<td>
								<ItemDisplay isExpanded={expandedItems.indexOf(item.url) !== -1}
											 onExpandToggle={onExpandToggle}
											 selectTarget={selectTarget}
											 kills={kills} side={side}
											 revive={revive}>
									{item}
								</ItemDisplay>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		);
	}
}
