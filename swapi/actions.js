import * as types from './types';
import { relativeTimeRounding } from 'moment';


const sleep = (seconds, withValue) => new Promise(resolve => setTimeout(resolve, seconds * 1000, withValue));

export const onChooseEndpoint = (endpoint) => (dispatch, getState) => {
	dispatch({ type: types.PICK_ENDPOINT, payload: endpoint });

	const dataCached = getState().data[endpoint]

	if (!dataCached || dataCached.length === 0) {
		dispatch({ type: types.START_LOAD });
		
		return loadData('https://swapi.co/api/' + endpoint + '/')
			.catch((err) => {
				console.error(err);
				alert('It went wrong.')
			})
			.then(() => dispatch({ type: types.DONE_LOAD }))
	} else {
		return;
	}

	function loadData(url, loadedData = []) {
		dispatch({ type: types.START_LOAD });

		return fetch(url)
			.then((response) => response.json())
			.then((json) => {
				const result = json.results.map((item) => ({ ...item, name: item.title || item.name, kind: endpoint }));

				loadedData = loadedData.concat(result)
				loadedData = loadedData.sort((a, b) => (a.name.toString()).localeCompare(b.name.toString(), 'en'));

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
};

export const onExpandToggle = (item) => (dispatch) => {
	dispatch({ type: types.TOGGLE_EXPAND_ITEM, payload: item });
};

export const onMergeLists = (endpoint) => (dispatch, getState) => {
	dispatch({ type: types.START_LOAD });
	dispatch({ type: types.PICK_ENDPOINT, payload: endpoint });

	const dataCached = getState().data[endpoint]

	if (!dataCached) {
		dispatch({ type: types.MERGE_LISTS, payload: endpoint });
	}

	dispatch({ type: types.DONE_LOAD });
};
