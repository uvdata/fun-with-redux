import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import CategoryDisplay from '../components/category-display';

import { onChooseEndpoint } from '../actions';

const mapStateToProps = (state, categoryDisplay) => {
	return {
		loading: state.operations > 0,
		endpoint: state.endpoint
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChooseEndpoint,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDisplay);
