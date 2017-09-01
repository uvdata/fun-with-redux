import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';
import ChooseSide from '../components/choose-side';

import * as actions from '../actions';


class MillenniumFalconConnected extends React.PureComponent {

	render() {
		const { loading, list, onChooseEndpoint, onExpandToggle, expandedItems,
			side, endpoint, chooseSide, hireBoba } = this.props;

		return (
			<div className="container">
				<ChooseSide chooseSide={chooseSide} side={side} />

				<MillenniumFalcon list={list}
					onChooseEndpoint={onChooseEndpoint}
					onExpandToggle={onExpandToggle}
					chooseSide={chooseSide}
					hireBoba={hireBoba} loading={loading}
					endpoint={endpoint}
					side={side}
					expandedItems={expandedItems}
				/>
			</div>
		)
	};
}

const mapStateToProps = (state) => {
	const { endpoint, data, expandedItems, side } = state;
	const list = (data && data[endpoint]) || [];

	return {
		list,
		endpoint,
		expandedItems,
		loading: state.operations > 0,
		side: side
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChooseEndpoint: actions.onChooseEndpoint,
		onExpandToggle: actions.onExpandToggle,
		chooseSide: actions.chooseSide,
		hireBoba: actions.hireBoba,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MillenniumFalconConnected);

