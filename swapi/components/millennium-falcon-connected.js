import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import MillenniumFalcon from '../components/millennium-falcon';

import { onChooseEndpoint, sortList, handleExpandToggle, runAnimation } from '../actions';

// Funktionelle funtioner

// Hvad der bliver returneret vil blive vist som props - typisk et objekt
const mapStateToProps = (state) => {
	const  { endpoint, data, toggleArray, loadedEndpoint, listedData } = state;

	const list = (data && data[endpoint]) || [];
	//console.log('Operations' + state.operations);

	return {
		loadedEndpoint,
    toggleArray,
		list,
		endpoint,
		listedData,
		loading: state.operations > 0,
	}
};

// Alt hvad der bliver retuneret fra denne funktion, vil blive til props
// på containeren -  som er ... json filen eller ???
const mapDispatchToProps = (dispatch) => {
	// Hver gang onChooseEndpoint bliver kaldt, skal resultatet sendest til alle reducers
	// Der er dispatch som sender det videre.
	return bindActionCreators({
		onChooseEndpoint: onChooseEndpoint, // onChooseEndpoint('films') eller 'people
		handleExpandToggle: handleExpandToggle,
		sortList: sortList,
		runAnimation: runAnimation,
	}, dispatch);
};

// Her bindes Redux sammen med React
// Connect tager en funktion og en component, og skaber en container** Dvs. at millinnium-falcon-connected bliver en container.
export default connect(mapStateToProps, mapDispatchToProps)(MillenniumFalcon);
