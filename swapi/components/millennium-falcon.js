import React from 'react';
import classNames from 'classnames';
import ItemDisplay from './item-display';

export default class MillenniumFalcon extends React.PureComponent {

	static propTypes = {
		onChooseEndpoint: React.PropTypes.func.isRequired,
		onExpandToggle: React.PropTypes.func.isRequired,
		expandedItems: React.PropTypes.arrayOf(React.PropTypes.string),
		list: React.PropTypes.arrayOf(React.PropTypes.shape({
			url: React.PropTypes.string.isRequired,
		})).isRequired,
		side: React.PropTypes.string,
	};

	render() {
		const { loading, list, onChooseEndpoint, onExpandToggle, expandedItems } = this.props;

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
		}

		return (
			<div>
				<p><i className={iconClass} /> What do you want to see?</p>
				<div className="btn-group">
					<button disabled={loading} onClick={() => onChooseEndpoint('people')} className="btn btn-danger">
						People
					</button>
					<button disabled={loading} onClick={() => onChooseEndpoint('films')} className="btn btn-danger">
						Films
					</button>
				</div>
				<br /><br />
				<table className="table">
					<tbody>
						{list.sort(sortByName).map((item) => (
							<tr key={item.url}>
								<td>
									<ItemDisplay isExpanded={expandedItems.indexOf(item.url) != -1} onExpandToggle={onExpandToggle}>{item}</ItemDisplay>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}
