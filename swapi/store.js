// Lav kun en store. Brug combine reducers hvis nødvendigt.
// Her opstiller jeg min initial state!
////http://redux.js.org/docs/api/createStore.html

import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as types from './types';

const defaultData = {
	endpoint: null,
	data: {
		/** will contain response from SWAPI, indexed by endpiont */
	},
	operations: 0,
	toggleArray: [],
	loadedEndpoint: 'No endpoint loaded',
	listedData: {} // gør det samme som data. Men jeg har valgt at bevare data intakt for en sikkerheds skyld :)
};

// Reduceren samler den nye state.
// Og sender den ud til alle containers, hvorpå mapStateToProps kører igen, og alt bliver rerendered
const reducer = (state = {}, action) => {
	switch(action.type) {
		case types.SET_DATA: {
			const { endpoint, data } = action.payload;
			return {
				...state,
				listedData: {...state.listedData, [endpoint]: data},
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
			}
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
				loadedEndpoint: action.loadedEndpoint,
				operations: state.operations - 1,
				}
		}
		// Opgave 1
		case types.EXPAND_TOGGLE: {
			return {
				...state,
				toggleArray: action.name === false ? [] : state.toggleArray.find(item => item == action.name)
					? state.toggleArray.filter(item => item !== action.name)
					: [action.name, ...state.toggleArray],
			}
		}
	}
	return state;
};


export default createStore(reducer, defaultData, applyMiddleware(thunkMiddleware));
