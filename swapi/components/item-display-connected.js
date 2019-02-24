import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import ItemDisplay from '../components/item-display';

import { onExpandToggle } from '../actions';

const getIconName = (data) => {
	switch (data.kind) {
		case 'people':
			if (data.gender == 'female')
				return 'fa-female'
			else if (data.gender == 'male')
				return 'fa-male'
			else
				return 'fa-android'
		case 'films':
			return 'fa-film'
		case 'planets':
			return 'fa-globe'
		case 'species':
			return 'fa-user'
		case 'starships':
			return 'fa-plane'
		case 'vehicles':
			return 'fa-bus'
	}
}

const mapStateToProps = (state, itemDisplay) => {
	const data = Object.assign({}, itemDisplay.children);
	const isExpanded = data.isExpanded;
	delete data.isExpanded;

	return {
		data,
		isExpanded,
		loading: state.operations > 0,
		getIconName
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onExpandToggle,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDisplay);
