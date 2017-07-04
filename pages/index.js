import React from 'react';
import { Provider } from 'react-redux';
import Header from '../swapi/header';

import store from '../swapi/store';
import MillenniumFalconConnected from '../swapi/components/millennium-falcon-connected';

export default class ReduxPage extends React.PureComponent {
	render() {
		return (<Provider store={store}><div>
			<Header />
			<style>{`
			      body {
			        background: #f4f4f4;
			        font: 12px menlo;
			        color: #000b1e;
			      }
			`}</style>
			<div className="container">
				<h1>Greatest Star Wars page in the World</h1>
				<MillenniumFalconConnected />
			</div>
		</div></Provider>);
	}
}
