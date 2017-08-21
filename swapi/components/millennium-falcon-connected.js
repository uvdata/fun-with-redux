import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';

import { onChooseEndpoint, onExpandToggle } from '../actions';

const mapStateToProps = (state) => {
	const  { expandetIndex, endpoint, data } = state;

	const list = (data && data[endpoint]) || [];
	return {
		list,
		endpoint,
		expandetIndex,
		loading: state.operations > 0,
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChooseEndpoint: onChooseEndpoint,
		onExpandToggle
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MillenniumFalcon);
