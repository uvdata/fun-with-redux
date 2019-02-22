import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import * as types from './types';

const composeEnhancers =
	(typeof window != 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const defaultData = {
	endpoint: null,
	data: {
		/** will contain response from SWAPI, indexed by endpiont */
	},
	operations: 0
};

const reducer = (state = {}, action) => {
	switch (action.type) {
		case types.SET_DATA: {
			const { endpoint, data } = action.payload;
			return {
				...state,
				data: {
					...state.data,
					[endpoint]: data
				}
			};
		}

		case types.TOGGLE_ITEM: {
			const { endpoint, url } = action.payload;
			return {
				...state,
				data: {
					[endpoint]: state.data[endpoint].map(item => {
						if (item.url === url) {
							return { ...item, expanded: !item.expanded };
						} else {
							return item;
						}
					})
				}
			};
		}

		case types.PICK_ENDPOINT: {
			return {
				...state,
				endpoint: action.payload
			};
		}

		case types.START_LOAD: {
			return {
				...state,
				operations: state.operations + 1
			};
		}

		case types.DONE_LOAD: {
			return {
				...state,
				operations: state.operations - 1
			};
		}
	}

	return state;
};

export default createStore(
	reducer,
	defaultData,
	composeEnhancers(applyMiddleware(thunkMiddleware))
);
