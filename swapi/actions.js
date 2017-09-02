import * as types from './types';

const sleep = (seconds, withValue) => new Promise(resolve => setTimeout(resolve, seconds * 1000, withValue));

// Cache for 15 seconds. (Only 15 for easy testing.)
const timeToCache = 15000;

const isCached = (currentState, endpoint) => {
	return Date.now() - currentState.lastTimeFetched[endpoint] < timeToCache;
};

export const onChooseEndpoint = (endpoint) => (dispatch, getState) => {
	const currentState = getState();

	dispatch({ type: types.PICK_ENDPOINT, payload: endpoint });
	dispatch({ type: types.START_LOAD });

	function loadData(url, loadedData = []) {
		dispatch({ type: types.START_LOAD });

		return fetch(url)
			.then((response) => response.json())
			.then((json) => {
				const result = json.results.map((item) => ({ ...item, name: item.title || item.name, kind: endpoint }));
				loadedData = loadedData.concat(result);

				dispatch({
					type: types.SET_DATA,
					payload: {
						endpoint: endpoint,
						data: loadedData,
					}
				});

				dispatch({ type: types.DONE_LOAD });

				if (json.next) {
					return sleep(0.1).then(() => loadData(json.next, loadedData));
				}

				return loadedData;
			})
			.catch(() => console.error('Oops'))
	}

	if (isCached(currentState, endpoint)) {
		return dispatch({ type: types.DONE_LOAD });
	}

	return loadData('https://swapi.co/api/' + endpoint + '/')
		.catch((err) => {
			console.error(err);
			alert('It went wrong.')
		})
		.then(() => dispatch({ type: types.DONE_LOAD }))
};

/**
 *  Toggles the selected item.
 * @param {*} itemId Unique id, eg. URL.
 * @param {*} expand True to expand, false will close it again.
 */
export const onExpandToggle = (itemId, expand) => (dispatch) => {
	if (expand) {
		dispatch(
			{
				type: types.EXPAND_ITEM,
				payload: itemId
			}
		)
	} else {
		dispatch(
			{
				type: types.CLOSE_ITEM,
				payload: itemId
			}
		)
	}
};

export const chooseSide = (side) => (dispatch) => {
	dispatch(
		{
			type: types.JOIN_DARK_SIDE,
			payload: side
		}
	)
};

export const selectTarget = (target) => (dispatch) => {
	dispatch(
		{
			type: types.SELECT_TARGET,
			payload: target
		}
	)
};

export const sendBoba = (target) => (dispatch) => {
	dispatch(
		{
			type: types.SEND_BOBA,
			payload: target
		}
	)
};
