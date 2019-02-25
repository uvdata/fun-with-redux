import * as types from './types';

export const onChooseEndpoint = endpoint => async (dispatch, getState) => {
	dispatch({ type: types.PICK_ENDPOINT, payload: endpoint });
	dispatch({ type: types.START_LOAD });

	async function loadData(url, loadedData = []) {
		dispatch({ type: types.START_LOAD });

		const response = await fetch(url);
		const json = await response.json();

		const result = json.results.map(item => ({
			...item,
			name: item.title || item.name,
			kind: endpoint,
			expanded: false
		}));

		if (getState().data.hasOwnProperty(endpoint)) {
			// Using getState() to avoid overriding the expanded state
			loadedData = [...getState().data[endpoint], ...result];
		} else {
			loadedData = result;
		}

		dispatch({
			type: types.SET_DATA,
			payload: {
				endpoint: endpoint,
				data: loadedData
			}
		});

		dispatch({ type: types.DONE_LOAD });

		if (json.next) {
			return await loadData(json.next, loadedData);
		}

		return loadedData;
	}

	// Poor mans caching
	// This works under the assumption that the API data never changes
	// You might add a cache duration to this
	// Even better you could save this to localStorage
	if (getState().data.hasOwnProperty(endpoint)) {
		dispatch({ type: types.DONE_LOAD });
		return;
	}
	try {
		await loadData(`https://swapi.co/api/${endpoint}/`);
		dispatch({ type: types.DONE_LOAD });
	} catch (err) {
		console.error(err);
		alert('It went wrong.'); // Descriptive 🔥
		dispatch({ type: types.DONE_LOAD });
	}
};

export const onSortListData = (endpoint, downDirection = true) => (
	dispatch,
	getState
) => {
	const list = [...getState().data[endpoint]];
	if (!list) {
		return;
	}

	const sortedList = list.sort((n, m) => {
		let propA = n.name || n.title;
		let propB = m.name || m.title;

		if (propA < propB) {
			return downDirection ? -1 : 1;
		}
		if (propB > propA) {
			return downDirection ? 1 : -1;
		}
		return 0;
	});

	dispatch({
		type: types.SET_DATA,
		payload: {
			endpoint: endpoint,
			data: sortedList
		}
	});
};

export const onToggleItem = (endpoint, url) => dispatch => {
	dispatch({ type: types.TOGGLE_ITEM, payload: { endpoint, url } });
};
export const onLoadFromLocalStorage = payload => dispatch => {
	dispatch({ type: types.LOAD_FROM_LOCALSTORAGE, payload });
};

export const onBuyEntity = (entity, kind) => (dispatch, getState) => {
	let moneyToSpend = kind === 'people' ? entity.mass : entity.cost_in_credits;
	moneyToSpend = parseInt(moneyToSpend);

	const { money } = getState();
	if (money >= moneyToSpend) {
		// Create an ID so we later on can distinguish between possible duplicate characters/ships
		let newEntity = { ...entity };
		newEntity.id = new Date().getTime();
		if (kind === 'starships') {
			newEntity.crew_people = [];
		}
		dispatch({ type: types.SPEND_MONEY, payload: moneyToSpend });
		dispatch({
			type: types.BUY_ENTITY,
			payload: { type: kind, entity: newEntity }
		});
	} else {
		console.log('Not enough money to buy this character');
	}
};

export const onLoadCharacterIntoSpaceship = (
	character,
	starship
) => dispatch => {
	dispatch({
		type: types.LOAD_CHARACTER_INTO_SHIP,
		payload: { character: character, starship: starship }
	});
};

export const onAddMoney = moneyToAdd => dispatch => {
	dispatch({ type: types.ADD_MONEY, payload: moneyToAdd });
};

export const onGenerateMoney = () => (dispatch, getState) => {
	const defaultMoney = 1;
	const defaultHeight = 2;
	let computedMoney = 0;

	// We generate money based on the peoples 'weight' multiplied by the ship they are in's max_atmosphering_speed
	// Get all characters not in a ship (max 3 per ship)
	const { ownedEntities } = getState();

	// Credits from ships
	let moneyFromShips = 0;
	ownedEntities.starships.forEach(ship => {
		let shipMultiplier = ship.max_atmosphering_speed;
		if (shipMultiplier === 'unknown' || shipMultiplier === 'n/a') {
			shipMultiplier = 5;
		} else {
			shipMultiplier = parseInt(shipMultiplier);
		}
		ship.crew_people.forEach(crewMember => {
			let height = crewMember.height;
			if (height === 'unknown' || height === 'n/a') {
				height = defaultHeight;
			} else {
				height = parseInt(crewMember.height / 10);
			}
			moneyFromShips += height * shipMultiplier;
		});
	});

	// Credits from people
	let moneyFromPeople = 0;
	const peopleNotInShips = ownedEntities.people.filter(p => !p.inShip);

	// Not all Star Wars characters are created equal with height
	peopleNotInShips.forEach(person => {
		let height = person.height;
		if (height === 'unknown' || height === 'n/a') {
			height = defaultHeight;
		} else {
			height = parseInt(person.height / 10);
		}
		moneyFromPeople += height;
	});

	computedMoney = moneyFromShips + moneyFromPeople;

	dispatch({ type: types.ADD_MONEY, payload: computedMoney + defaultMoney });
};
