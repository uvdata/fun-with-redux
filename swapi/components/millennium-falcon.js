import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ItemDisplay from './item-display';

class MillenniumFalcon extends React.PureComponent {
	static propTypes = {
		onChooseEndpoint: PropTypes.func.isRequired,
		list: PropTypes.arrayOf(
			PropTypes.shape({
				url: PropTypes.string.isRequired
			})
		).isRequired,
		side: PropTypes.string
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
			<table className="table">
				<tbody>
					{list.map(item => (
						<tr key={item.url}>
							<td>
								<ItemDisplay item={item} name={item.name} kind={item.kind} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
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
