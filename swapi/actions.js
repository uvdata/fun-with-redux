import * as types from './types';

const sleep = (seconds, withValue) => new Promise(resolve => setTimeout(resolve, seconds * 1000, withValue));

export const onChooseEndpoint = (endpoint) => (dispatch, getState) => {
	dispatch({ type: types.PICK_ENDPOINT, payload: endpoint });
	dispatch({ type: types.START_LOAD });
	
	function loadData(url, loadedData = []) {
		dispatch({ type: types.START_LOAD });
		
		/*if (url in getState().model) {
			loadedData = getState().model.url
			endpoint = 'films';
			
			return loadedData;
		} else {*/
			return fetch(url)
				.then((response) => response.json())
				.then((json) => {
					const result = json.results.map((item) => ({ ...item, name: item.title || item.name, kind: endpoint }));
					loadedData = loadedData.concat(result).sort((a, b) => a.name.localeCompare(b.name) || a.title.localeCompare(b.title));

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
					
					dispatch({
						type: types.UPDATE_MODEL,
						payload: url
					});
					
					console.log('done', loadedData);

					return loadedData;
				})
				.catch(() => console.error('Oops'))
		//}
	}
	
	return loadData('https://swapi.co/api/' + endpoint + '/')
		.catch((err) => {
			console.error(err);
			alert('It went wrong.')
		})
		.then(() => dispatch({ type: types.DONE_LOAD }))
};

export const onExpandItem = (itemId, expanded) => (dispatch) => {
	console.log('itemId', itemId);
	console.log('expanded', expanded);
	if (!expanded) {
		dispatch ({
			type: types.EXPAND_ITEM,
			payload: itemId
		})
	} else {
		dispatch ({
			type: types.COLLAPSE_ITEM,
			payload: itemId
		})
	}
};