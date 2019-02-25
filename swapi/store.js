import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import * as types from './types';

const defaultData = {
	endpoint: null,
	data: {
		/** will contain response from SWAPI, indexed by endpiont */
	},
	operations: 0,
	expandedItems: [],
	model: {}
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
			return {
				...state,
				expandedItems: [...state.expandedItems, action.payload]
			}
		}
		
		case types.COLLAPSE_ITEM: {
			return {
				...state,
				expandedItems: state.expandedItems.filter(itemId => itemId !== action.payload)
			}
		}

		case types.UPDATE_MODEL: {
			var obj = state.model;
			obj[action.payload] = state.data[state.endpoint];

			state = {
				...state,
				model: state.model = obj
			}
		}
	}

	return state;
};

export default createStore(reducer, defaultData, applyMiddleware(thunkMiddleware));
