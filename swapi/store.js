import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import * as types from './types';

const defaultData = {
	endpoint: null,
	data: {
		/** will contain response from SWAPI, indexed by endpiont */
	},
	expandetIndex: null,
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

		case types.TOGGLE_EXPAND: {
			const { index } = action.payload;
			return {
				...state,
				expandetIndex: index,
			}
		}

		case types.PICK_ENDPOINT: {
			return {
				...state,
				expandetIndex: null,
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
	}

	return state;
};

export default createStore(reducer, defaultData, applyMiddleware(thunkMiddleware));
