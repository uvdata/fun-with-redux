import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import * as types from './types';

const defaultData = {
	endpoint: null,
	data: {
		/** will contain response from SWAPI, indexed by endpiont */
	},
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

		case types.TOGGLE_EXPAND_ITEM: {
			return {
				...state,
				data: {
					...state.data,
					[state.endpoint]: state.data[state.endpoint].map(item => item.url === action.payload ? { ...item, expanded: !item.expanded } : item)
				}
			}
			
		}

		case types.MERGE_LISTS: {
			return {
				...state,
				data: {
					...state.data,
					[action.payload]: state.data.films.map(film => ({ ...film, charactersNames: film.characters.map(character => ({
						name: state.data.people.filter(person => person.url === character)[0].name
					})).sort((a, b) => (a.name.toString()).localeCompare(b.name.toString(), 'en')) }))
				}
			}
			
		}
	}

	return state;
};

export default createStore(reducer, defaultData, applyMiddleware(thunkMiddleware));
