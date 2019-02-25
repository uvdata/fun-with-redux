import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ItemDisplayConnected from './item-display-connected';
import CategoryDisplayConnected from './category-display-connected';

export default class MillenniumFalcon extends React.PureComponent {

	static propTypes = {
		onChooseEndpoint: PropTypes.func.isRequired,
		onOrderList: PropTypes.func.isRequired,
		onExpandAll: PropTypes.func.isRequired,
		list: PropTypes.arrayOf(PropTypes.shape({
			url: PropTypes.string.isRequired,
		})).isRequired,
		categoryList: PropTypes.arrayOf(PropTypes.shape({
			key: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})).isRequired,
		side: PropTypes.string,
	};

	handleOrderList = (e) => this.props.onOrderList(e.target.value);

	handleExpandAll = () => this.props.onExpandAll(true);
	handleCollapseAll = () => this.props.onExpandAll(false);

	render() {
		const { loading, hasData, list, categoryList, onChooseEndpoint, onOrderList, onExpandAll, endpoint, orderOptions } = this.props;

		const iconClass = classNames('fa', {
			'fa-refresh': loading,
			'fa-spin': loading,
			'fa-star': !loading,
		});

		return (<div>
			<p><i className={iconClass} /> What do you want to see?</p>
			<div className="btn-group">
				{categoryList.map((category) => <React.Fragment key={category.key}><CategoryDisplayConnected>{category}</CategoryDisplayConnected></React.Fragment>)}
			</div>
			<br /><br />
			<div className="btn-group">
				<button disabled={!hasData || loading} onClick={this.handleExpandAll} className="btn btn-default"><i className="fa fa-chevron-circle-down" /> Expand all</button>
				<button disabled={!hasData || loading} onClick={this.handleCollapseAll} className="btn btn-default"><i className="fa fa-chevron-circle-up" /> Collapse all</button>
			</div>
			<div className="btn-group">
				<select className="form-control" disabled={!hasData || loading} onChange={this.handleOrderList}>
					<option defaultValue>Order by</option>
					{orderOptions !== undefined && orderOptions.map((orderOption) => <option key={orderOption.key} value={orderOption.key}>{orderOption.key}</option>)}
				</select>
			</div>
			<br /><br />
			<table className="table">
				<tbody>
					{list.map((item) => <tr key={item.url}><td><ItemDisplayConnected>{item}</ItemDisplayConnected></td></tr>)}
				</tbody>
			</table>
		</div>);
	}
}
