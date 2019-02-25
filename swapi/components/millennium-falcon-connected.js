import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';

import { onChooseEndpoint } from '../actions';
import { onExpandItem } from '../actions';

const mapStateToProps = (state) => {
	const  { endpoint, data, expandedItems } = state;
	const list = (data && data[endpoint]) || [];

	return {
		list,
		endpoint,
		loading: state.operations > 0,
		expandedItems
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChooseEndpoint: onChooseEndpoint,
		onExpandItem: onExpandItem
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MillenniumFalcon);
