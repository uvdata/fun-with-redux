import * as types from './types';

const sleep = (seconds, withValue) =>
	new Promise(resolve => setTimeout(resolve, seconds * 1000, withValue));

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

		loadedData = loadedData.concat(result);

		dispatch({
			type: types.SET_DATA,
			payload: {
				endpoint: endpoint,
				data: loadedData
			}
		});

		dispatch({ type: types.DONE_LOAD });

		if (json.next) {
			return sleep(0.1).then(() => loadData(json.next, loadedData));
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
