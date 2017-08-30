import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';

import * as actions from '../actions';

const mapStateToProps = (state) => {
	const { endpoint, data, expandedItems } = state;

	const list = (data && data[endpoint]) || [];
	return {
		list,
		endpoint,
		expandedItems,
		loading: state.operations > 0,
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChooseEndpoint: actions.onChooseEndpoint,
		onExpandToggle: actions.onExpandToggle,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MillenniumFalcon);
