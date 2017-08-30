import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import * as types from './types';

const defaultData = {
	endpoint: null,
	data: {
		/** will contain response from SWAPI, indexed by endpiont */
	},
	expandedItems: [],
	operations: 0,
	lastTimeFetched: {
		/** Will hold timestamp when last updated for each endpoint */
	}
};

const reducer = (state = {}, action) => {
	switch (action.type) {
		case types.SET_DATA: {
			const { endpoint, data } = action.payload;
			return {
				...state,
				data: {
					...state.data,
					[endpoint]: data,
				},
				lastTimeFetched: {
					...state.lastTimeFetched,
					[endpoint]: Date.now()
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

		case types.CLOSE_ITEM: {
			return {
				...state,
				expandedItems: state.expandedItems.filter(id => id !== action.payload)
			}
		}
	}

	return state;
};

export default createStore(reducer, defaultData, applyMiddleware(thunkMiddleware, logger));
