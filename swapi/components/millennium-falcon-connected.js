import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';

import { onChooseEndpoint } from '../actions';
import { onExpandToggle } from '../actions';
import { onMergeLists } from '../actions';

const mapStateToProps = (state) => {
	const  { endpoint, data } = state;

	const list = (data && data[endpoint]) || [];

	return {
		list,
		endpoint,
		loading: state.operations > 0,
		data,
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChooseEndpoint: onChooseEndpoint,
		onExpandToggle: onExpandToggle,
		onMergeLists: onMergeLists,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MillenniumFalcon);
