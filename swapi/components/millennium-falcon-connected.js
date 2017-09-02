import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';
import ChooseSide from '../components/choose-side';
import EndpointMenu from '../components/endpoint-menu';

import * as actions from '../actions';

class MillenniumFalconConnected extends React.PureComponent {

	render() {
		const {
			loading, list, onChooseEndpoint, onExpandToggle, expandedItems,
			side, endpoint, chooseSide, selectTarget, target
		} = this.props;

		return (
			<div className="container">
				<ChooseSide chooseSide={chooseSide} side={side} />


				{side ? <EndpointMenu onChooseEndpoint={onChooseEndpoint} loading={loading} side={side} /> : ''}

				{side ? <MillenniumFalcon list={list}
										  onChooseEndpoint={onChooseEndpoint}
										  onExpandToggle={onExpandToggle}
										  selectTarget={selectTarget}
										  loading={loading}
										  endpoint={endpoint}
										  side={side}
										  expandedItems={expandedItems}
										  target={target}
				/> : ''}

			</div>
		)
	};
}

const mapStateToProps = (state) => {
	const { endpoint, data, expandedItems, side, target } = state;
	const list = (data && data[endpoint]) || [];

	return {
		list,
		endpoint,
		expandedItems,
		loading: state.operations > 0,
		side: side,
		target
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChooseEndpoint: actions.onChooseEndpoint,
		onExpandToggle: actions.onExpandToggle,
		chooseSide: actions.chooseSide,
		selectTarget: actions.selectTarget,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MillenniumFalconConnected);
