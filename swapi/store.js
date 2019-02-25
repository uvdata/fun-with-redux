import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import * as types from './types';

const composeEnhancers =
	(typeof window != 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

let defaultData = {
	endpoint: null,
	data: {
		/** will contain response from SWAPI, indexed by endpiont */
	},
	operations: 0,
	money: 0,
	ownedEntities: {
		people: [],
		starships: []
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
					[endpoint]: data
				}
			};
		}

		case types.LOAD_FROM_LOCALSTORAGE: {
			if (!isNaN(parseInt(action.payload))) {
				return {
					...state,
					money: parseInt(action.payload)
				};
			}
		}

		// This logic should probably be rewritten to be in the action creator to follow
		// this projects convention
		case types.TOGGLE_ITEM: {
			const { endpoint, url } = action.payload;
			return {
				...state,
				data: {
					...state.data,
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

		case types.ADD_MONEY: {
			return {
				...state,
				money: state.money + action.payload
			};
		}

		case types.SPEND_MONEY: {
			return {
				...state,
				money: state.money - action.payload
			};
		}

		case types.BUY_ENTITY: {
			const { type, entity } = action.payload;
			return {
				...state,
				ownedEntities: {
					...state.ownedEntities,
					[type]: [...state.ownedEntities[type], entity]
				}
			};
		}

		case types.LOAD_CHARACTER_INTO_SHIP: {
			const { starship, character } = action.payload;
			return {
				...state,
				ownedEntities: {
					people: state.ownedEntities.people.map(person => {
						if (person.id === character.id) {
							return { ...person, inShip: true };
						} else {
							return person;
						}
					}),
					starships: state.ownedEntities.starships.map(ship => {
						if (ship.id === starship.id) {
							return { ...ship, crew_people: [...ship.crew_people, character] };
						} else {
							return ship;
						}
					})
				}
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
