import * as types from './types';

const sleep = (seconds, withValue) => new Promise(resolve => setTimeout(resolve, seconds * 1000, withValue));

export const onChooseEndpoint = (endpoint) => (dispatch, getState) => {
	const url = `https://swapi.co/api/${endpoint}/`;

	dispatch({ type: types.PICK_ENDPOINT, payload: endpoint });
	dispatch({ type: types.START_LOAD });

	const isCached = () => {
		var current_state = getState();
		var data = current_state.data[endpoint];

		if (data === undefined || data.length === 0)
			return false;

		dispatch({
			type: types.SET_DATA,
			payload: {
				endpoint: endpoint,
				data: data,
			}
		});

		dispatch({ type: types.DONE_LOAD });

		return true;
	}

	const loadData = (url, loadedData = []) => {
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

	const loadSchema = (url) => {
		dispatch({ type: types.START_LOAD });

		return fetch(url + 'schema')
			.then((response) => response.json())
			.then((json) => {
				dispatch({
					type: types.SET_SCHEMA,
					payload: {
						endpoint: endpoint,
						data: json,
					}
				});

				dispatch({ type: types.DONE_LOAD });
			})
			.catch(() => console.error('Oops'))
	}

	if (isCached())
		return;

	return Promise.all([loadData(url), loadSchema(url)])
		.catch((err) => {
			console.error(err);
			alert('It went wrong.')
		})
		.then(() => dispatch({ type: types.DONE_LOAD }))
};

export const onOrderList = (selectedKey) => (dispatch, getState) => {
	dispatch({ type: types.START_LOAD });

	var current_state = getState();

	var data = [].concat(current_state.data[current_state.endpoint]);
	data.sort((a, b) => ((a[selectedKey] || '').toString()).localeCompare((b[selectedKey] || '').toString(), 'en', {sensitivity: 'base'}));

	dispatch({
		type: types.SET_DATA,
		payload: {
			endpoint: current_state.endpoint,
			data: data,
		}
	});

	dispatch({ type: types.DONE_LOAD });
};

export const onExpandToggle = (url) => (dispatch, getState) => {
	dispatch({ type: types.START_LOAD });

	dispatch({
		type: types.EXPAND_ITEM,
		url: url,
	});

	dispatch({ type: types.DONE_LOAD });
};

export const onExpandAll = (expand) => (dispatch, getState) => {
	dispatch({ type: types.START_LOAD });

	dispatch({
		type: types.EXPAND_ITEM,
		expandAll: expand,
	});

	dispatch({ type: types.DONE_LOAD });
};
