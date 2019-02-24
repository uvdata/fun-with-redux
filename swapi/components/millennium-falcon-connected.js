import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';

import { onChooseEndpoint, onOrderList, onExpandAll } from '../actions';

const getSchemaProperties = (schema, endpoint) => {
	return (schema && schema[endpoint] && schema[endpoint].properties) || [];
}

const getOrderableSchemaProperties = (schema, endpoint) => {
	var schemaProperties = getSchemaProperties(schema, endpoint);
	return Object.keys(schemaProperties)
		.map((propertyKey) => {
			var value = schemaProperties[propertyKey];
			value['key'] = propertyKey;
			return value;
		})
		.filter((property) => (property.type === 'string' || property.type === 'integer') && property.format === undefined);
}

const mapStateToProps = (state) => {
	const  { endpoint, data, schema } = state;

	const list = (data && data[endpoint]) || [];

	return {
		list,
		endpoint,
		loading: state.operations > 0,
		hasData: list.length > 0,
		orderOptions: getOrderableSchemaProperties(schema, endpoint),
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChooseEndpoint,
		onOrderList,
		onExpandAll,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MillenniumFalcon);
