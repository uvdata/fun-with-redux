import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ItemDisplay from './item-display';

export default class MillenniumFalcon extends React.PureComponent {

	static propTypes = {
		onChooseEndpoint: PropTypes.func.isRequired,
		onExpandItem: PropTypes.func.isRequired,
		list: PropTypes.arrayOf(PropTypes.shape({
			url: PropTypes.string.isRequired,
		})).isRequired,
		side: PropTypes.string,
		expandedItems: PropTypes.arrayOf(PropTypes.string)
	};

	render() {
		const { loading, list, onChooseEndpoint, onExpandItem, expandedItems } = this.props;
		console.log('props', this.props);

		const iconClass = classNames('fa', {
			'fa-refresh': loading,
			'fa-spin': loading,
			'fa-star': !loading,
		});

		return (<div>
			<p><i className={iconClass} /> What do you want to see?</p>
			<div className="btn-group">
				<button disabled={loading} onClick={() => onChooseEndpoint('people')} className="btn btn-danger">People</button>
				<button disabled={loading} onClick={() => onChooseEndpoint('films')} className="btn btn-danger">Films</button>
			</div>
			<br /><br />
			<table className="table">
				<tbody>
				{ console.log('expandedItems', expandedItems) }
					{list.map((item) => <tr key={item.url}><td><ItemDisplay onExpandItem={onExpandItem} isExpanded={expandedItems.includes(item.url)}>{item}</ItemDisplay></td></tr>)}
				</tbody>
			</table>
		</div>);
	}
}
