import React from 'react';
import classNames from 'classnames';
import ItemDisplay from './item-display';
import DarkPromotion from './darkside-promotion';

export default class MillenniumFalcon extends React.PureComponent {

	static propTypes = { // bruges til validering af data - Den springer jeg lige over i første omgang...
		handleExpandToggle: React.PropTypes.func.isRequired,
		onChooseEndpoint: React.PropTypes.func.isRequired,
		// list: React.PropTypes.arrayOf(React.PropTypes.shape({
		// 	url: React.PropTypes.string.isRequired,
		// })).isRequired,
		side: React.PropTypes.string,
	};


	render() {
		const { loading, list, onChooseEndpoint, handleExpandToggle, sortList, toggleArray, loadedEndpoint, endpoint, listedData } = this.props; // Underlig syntax - undersøg
			//const { renderedItems, itemsRendered, renderEndpoint } = this.state;
		//listedData[loadedEndpoint][0] ? console.log(listedData[loadedEndpoint][0]) : listedData[loadedEndpoint][0] = false;
		const iconClass = classNames('fa', {
			'fa-refresh': loading,
			'fa-spin': loading,
			'fa-star': !loading,
		});

		// sorterings knapperne
		const sortBtn = [
			{loadEnd: 'films', sortBy: 'title', name: 'Title'},
			{loadEnd: 'films', sortBy: 'episode_id', name: 'Episode'},
			{loadEnd: 'films', sortBy: 'release_date', name: 'Release date'}
		];

		return (<div>
			<p>
				<i className="fa fa-star" aria-hidden="true"/> What do you want to see?
			</p>
			<div className="btn-group">
				<button disabled={loading} onClick={() => onChooseEndpoint('people')} className="btn btn-danger">People</button>
				<button disabled={loading} onClick={() => onChooseEndpoint('films')} className="btn btn-danger">Movies</button>
				<button disabled={loading} onClick={() => onChooseEndpoint('species')} className="btn btn-danger">Species</button>

				{ sortBtn.map((data) => <span key={data.name}>{ loadedEndpoint === data.loadEnd && !loading ? <button onClick={() => sortList(data.sortBy)} className="btn btn-link">{data.name}</button> : null} </span>) }

			</div>
			<br /><br />

			{loading? <div style={{display: 'flex', justifyContent: 'center'}}><h3><i className={iconClass} aria-hidden="true"/> Fetching data...</h3></div>  : null}

			<p>{ toggleArray[0] !== void 0 && !loading ? <button onClick={() => handleExpandToggle(false, toggleArray)} className="btn btn-danger btn-xs styles.closeToggles">Close all toggles</button> : null} </p>



			<table className="table">
			{listedData[loadedEndpoint] === void 0 || loading
				? <tbody>
						<tr>
							<td> <DarkPromotion /> </td>
						</tr>
					</tbody>
				: <tbody>
					{listedData[loadedEndpoint].map((data, index) => <tr key={data.name}>
						<td><ItemDisplay renderId={index} endpoint={endpoint} loadedEndpoint={loadedEndpoint} isExpanded={toggleArray.indexOf(data.name) !== -1} handleExpandToggle={handleExpandToggle}>{data}</ItemDisplay>
						</td>
					</tr>)}

				</tbody>}
			</table>
				</div>);
	}
}
