import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';

import { onChooseEndpoint } from '../actions';
import { onExpandItem } from '../actions';

const mapStateToProps = (state) => {
	const  { endpoint, data } = state;

	const list = (data && data[endpoint]) || [];
	console.log(state.operations);
	console.log('data', data);
	console.log('list', list);
	console.log('onExpandItem', onExpandItem);
	return {
		list,
		endpoint,
		loading: state.operations > 0,
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChooseEndpoint: onChooseEndpoint,
		onExpandItem: onExpandItem
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MillenniumFalcon);
