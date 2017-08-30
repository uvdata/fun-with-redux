import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';

import * as actions from '../actions';

const mapStateToProps = (state) => {
	const { endpoint, data, expandedItems, theDarkSide } = state;
	const list = (data && data[endpoint]) || [];

	return {
		list,
		endpoint,
		expandedItems,
		loading: state.operations > 0,
		side: theDarkSide
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChooseEndpoint: actions.onChooseEndpoint,
		onExpandToggle: actions.onExpandToggle,
		joinTheDarkSide: actions.joinTheDarkSide,
		hireBoba: actions.hireBoba,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MillenniumFalcon);
