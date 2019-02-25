import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';

import {
	onChooseEndpoint,
	onSortListData,
	onToggleItem,
	onAddMoney,
	onBuyEntity,
	onGenerateMoney
} from '../actions';

const mapStateToProps = state => {
	const { endpoint, data, money } = state;

	const list = (data && data[endpoint]) || [];
	return {
		list,
		endpoint,
		loading: state.operations > 0,
		money
	};
};

export default connect(
	mapStateToProps,
	{
		onChooseEndpoint: onChooseEndpoint,
		onSortListData: onSortListData,
		onToggleItem: onToggleItem,
		onAddMoney: onAddMoney,
		onBuyEntity: onBuyEntity,
		onGenerateMoney: onGenerateMoney
	}
)(MillenniumFalcon);
