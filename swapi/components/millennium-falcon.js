import React from 'react';
import classNames from 'classnames';
import ItemDisplay from './item-display';

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
		endpoint: React.PropTypes.string
	};

	state = {
		target: ''
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

		const changeTarget = (e) => {
			this.setState({
				target: e.target.value
			});
		};

		const sendBoba = () => {
			hireBoba(this.state.target);

			this.setState({
				target: ''
			});
		};

		const isBobaAvailable = () => {
			return loading || side !== 'dark' || endpoint !== 'people';
		};

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

				{' '}

				<button disabled={loading || side === 'dark'} onClick={() => joinTheDarkSide()}
						className="btn btn-danger">
					Join the Dark Side
				</button>
				{' '}
				<input disabled={isBobaAvailable()} type="text" placeholder="Target" value={this.state.target}
					   onChange={changeTarget} />
				{' '}
				<button disabled={isBobaAvailable()} onClick={() => sendBoba()} className="btn btn-danger"
						title={isBobaAvailable() ? "Does not work for rebel scum and need a hit-list" : ""}
				>
					Hire Boba Fett
				</button>
				<br /> <br />
				<table className="table">
					<tbody>
					{list.sort(sortByName).map((item) => (
						<tr key={item.url}>
							<td>
								<ItemDisplay isExpanded={expandedItems.indexOf(item.url) !== -1}
											 onExpandToggle={onExpandToggle}
								>
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
