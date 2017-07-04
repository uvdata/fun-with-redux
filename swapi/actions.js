import * as types from './types';
// Er i tvivl om det er god stil at importere 'store' - derfor de grimme function calls.

const sleep = (seconds, withValue) => new Promise(resolve => setTimeout(resolve, seconds * 1000, withValue));


// Henter data fra StarWars API
export const onChooseEndpoint = (endpoint) => (dispatch, getState) => {


		const listedData = getState().listedData; // Brug dette istedet for grimme function calls
		const loadedEndpoint = getState().loadedEndpoint;
		if(listedData[endpoint] === void 0) { // Opgave 2 - Opgraderet - Bruger ikke ES6 syntax fordi dette er lettere at læse
				dispatch({ type: types.PICK_ENDPOINT, payload: endpoint });
				dispatch({ type: types.START_LOAD });

				function loadData(url, loadedData = []) {
						dispatch({ type: types.START_LOAD });

						return fetch(url)
							.then((response) => response.json())
							.then((json) => {
								let result = json.results.map((item) => ({ ...item, name: item.title || item.name, kind: endpoint})); //Hvis result er en const bliver den ikke garbage collected.
								// https://stackoverflow.com/questions/31686412/does-es6-const-affect-garbage-collection/38318597#38318597
								// Eller er det vrøvl fra min side??? :D

								// Opgave 4 - Her sorterer jeg listen mens den bliver hentet.
								// Rydder loadedData, og smelter det sorterede array ind.
								loadedData = [].concat(sortingEngine('name', loadedData.concat(result), endpoint));
								result = null;

								dispatch({ type: types.DONE_LOAD, loadedEndpoint: loadedEndpoint  });

								if (json.next) {
									return sleep(0.1).then(() => loadData(json.next, loadedData)); // itererer over samme funktion
								}
								else{

									// Da jeg har erstattet den løbende visning af data med en reklame, har jeg flyttet SET_DATA herned, for at der ikke skal itereres over denne.
									dispatch({
										type: types.SET_DATA,
										payload: {
											endpoint: endpoint,
											tester: loadedData,
											data: loadedData,
										} // payload
									}); //dispatch
								} // else
								return loadedData;

							}) // loadData
							.catch(() => console.error('Oops'))
						} // then json

		return loadData(`https://swapi.co/api/${endpoint}/`) //ES6 Template string eller string interpolation
			.catch((err) => {
				console.error(err);
				alert('It went wrong.')
			})
			.then(() => {
				dispatch({ type: types.DONE_LOAD, loadedEndpoint: endpoint })
			});
		} // if initial
		dispatch({ type: types.PICK_ENDPOINT, payload: endpoint });
		dispatch({ type: types.DONE_LOAD, loadedEndpoint: endpoint });
};

// Åbner og Lukker alle toggles. Og styrer close all knappen.
export const handleExpandToggle = (name) => {
	if(!name) { // hvis name er false, så tøm array - Bruger slice i denne omgang.
		return { type: types.EXPAND_TOGGLE, name: false };
	}

	return {type: types.EXPAND_TOGGLE, name}
}

// Sender sorteret array med endpoint til reducer.
export const sortList = (val) => (dispatch, getState) => {

	const endpoint = getState().endpoint;
	const loadedEndpoint = getState().loadedEndpoint;
	const list = getState().listedData;

	const sortedList = [].concat(sortingEngine(val, list[loadedEndpoint], endpoint));

	 dispatch({type: types.SET_DATA,
				payload: {
					endpoint: endpoint,
					tester: sortedList,
					data: sortedList,
				}
			})
}

// Sorterer listen efter værdi.
export function sortingEngine(val, list, endpoint) {

		return list.sort((a, b) => a[val] < b[val] ? -1 : 1);


			// let nameA, nameB, r;
			// const nameA = isNaN(a[val]) ? a[val].toUpperCase() : a[val]; // hvis a værdien er en string, så ignorer store/små bogstaver, eller er værdien et tal.
			// const nameB = isNaN(b[val]) ? b[val].toUpperCase() : b[val];
			// return nameA === nameB ? 0 : (nameA < nameB && nameA !== nameB ? -1 : 1);


		// return myLis
}
