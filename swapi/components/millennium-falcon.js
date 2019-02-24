import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ItemDisplayConnected from './item-display-connected';

export default class MillenniumFalcon extends React.PureComponent {

	static propTypes = {
		onChooseEndpoint: PropTypes.func.isRequired,
		onOrderList: PropTypes.func.isRequired,
		onExpandAll: PropTypes.func.isRequired,
		list: PropTypes.arrayOf(PropTypes.shape({
			url: PropTypes.string.isRequired,
		})).isRequired,
		side: PropTypes.string,
	};

	render() {
		const { loading, hasData, list, onChooseEndpoint, onOrderList, onExpandAll, endpoint, orderOptions } = this.props;

		const iconClass = classNames('fa', {
			'fa-refresh': loading,
			'fa-spin': loading,
			'fa-star': !loading,
		});

		const getEndpointButtonClassNames = (buttonEndpoint) => classNames('btn', {
			'btn-default': endpoint != buttonEndpoint,
			'btn-success': endpoint == buttonEndpoint
		});

		return (<div>
			<p><i className={iconClass} /> What do you want to see?</p>
			<div className="btn-group">
				<button disabled={loading} onClick={() => onChooseEndpoint('people')} className={getEndpointButtonClassNames('people')}>People</button>
				<button disabled={loading} onClick={() => onChooseEndpoint('films')} className={getEndpointButtonClassNames('films')}>Films</button>
				<button disabled={loading} onClick={() => onChooseEndpoint('planets')} className={getEndpointButtonClassNames('planets')}>Planets</button>
				<button disabled={loading} onClick={() => onChooseEndpoint('species')} className={getEndpointButtonClassNames('species')}>Species</button>
				<button disabled={loading} onClick={() => onChooseEndpoint('starships')} className={getEndpointButtonClassNames('starships')}>Starships</button>
				<button disabled={loading} onClick={() => onChooseEndpoint('vehicles')} className={getEndpointButtonClassNames('vehicles')}>Vehicles</button>
			</div>
			<br /><br />
			<div className="btn-group">
				<button disabled={!hasData || loading} onClick={() => onExpandAll(true)} className="btn btn-default"><i className="fa fa-chevron-circle-down" /> Expand all</button>
				<button disabled={!hasData || loading} onClick={() => onExpandAll(false)} className="btn btn-default"><i className="fa fa-chevron-circle-up" /> Collapse all</button>
			</div>
			<div className="btn-group">
				<select className="form-control" disabled={!hasData || loading} onChange={(e) => onOrderList(e.target.value)}>
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
