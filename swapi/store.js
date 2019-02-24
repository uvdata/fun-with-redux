import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import * as types from './types';

const defaultData = {
	endpoint: null,
	data: {
		/** will contain response from SWAPI, indexed by endpiont */
	},
	schema: {},
	operations: 0,
};

const reducer = (state = {}, action) => {
	switch(action.type) {
		case types.SET_DATA: {
			const { endpoint, data } = action.payload;
			return {
				...state,
				data: {
					...state.data,
					[endpoint]: data,
				}
			}
		}

		case types.SET_SCHEMA: {
			const { endpoint, data } = action.payload;
			return {
				...state,
				schema: {
					...state.schema,
					[endpoint]: data,
				}
			}
		}

		case types.PICK_ENDPOINT: {
			return {
				...state,
				endpoint: action.payload,
			};
		}

		case types.START_LOAD: {
			return {
				...state,
				operations: state.operations + 1,
			}
		}

		case types.DONE_LOAD: {
			return {
				...state,
				operations: state.operations - 1,
			}
		}

		case types.EXPAND_ITEM: {
			const itemDisplay = action.itemDisplay;
			const expandAll = action.expandAll;

			var data = state.data[state.endpoint];
			data = data.map((item) => {
				if (itemDisplay !== undefined && item.url === itemDisplay.props.children.url) {
					item = Object.assign({}, item);
					item.isExpanded = item.isExpanded !== true;
				}
				else if (expandAll !== undefined && (item.isExpanded === true) !== expandAll) {
					item = Object.assign({}, item);
					item.isExpanded = expandAll === true;
				}
				return item;
			});

			return {
				...state,
				data: {
					...state.data,
					[state.endpoint]: data
				}
			}
		}
	}

	return state;
};

export default createStore(reducer, defaultData, applyMiddleware(thunkMiddleware));
