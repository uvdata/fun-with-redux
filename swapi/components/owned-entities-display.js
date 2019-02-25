import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseSpaceshipModal from './choose-spaceship';

class OwnedEntitiesDisplay extends Component {
	state = {
		showChooser: false,
		activeShip: {}
	};
	handleCloseChooser = () =>
		this.setState({ showChooser: false, activeShip: {} });
	handleOpenChooser = ship =>
		this.setState({ showChooser: true, activeShip: ship });

	render() {
		return (
			<div>
				{this.state.showChooser ? (
					<ChooseSpaceshipModal
						onCloseClick={this.handleCloseChooser}
						activeShip={this.state.activeShip}
					/>
				) : (
					this.renderOwnedEntities()
				)}
			</div>
		);
	}

	renderOwnedEntities() {
		const { ownedEntities } = this.props;
		let uniquePeople = countUniques(ownedEntities.people); // We are all unique :)
		return (
			<div>
				<h4>You own the following people:</h4>
				<ul>
					{Object.keys(uniquePeople).map(ent => {
						return (
							<li key={ent}>
								{ent}: {uniquePeople[ent].count}({uniquePeople[ent].inShipCount}
								{'  '}
								in a starship)
							</li>
						);
					})}
				</ul>
				<h4>You own the following starships:</h4>
				<ul>
					{ownedEntities.starships.map(ent => {
						return (
							<li key={ent.id}>
								{ent.name}: ({ent.crew_people.length}/3)
								{ent.crew_people.length < 3 && (
									<button
										className="btn btn-primary btn-xs"
										onClick={() => this.handleOpenChooser(ent)}
									>
										Load into...
									</button>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

function countUniques(list) {
	let uniques = {};
	list.map(ent => {
		let key = ent.name;
		if (!uniques.hasOwnProperty(key)) {
			uniques[key] = {};
			uniques[key]['count'] = 0;
			uniques[key]['inShipCount'] = 0;
			uniques[key]['data'] = ent;
		}
		uniques[key].count += 1;

		if (ent.inShip) {
			uniques[key].inShipCount += 1;
		}
	});
	return uniques;
}

const mapStateToProps = state => {
	return { ownedEntities: state.ownedEntities };
};

export default connect(mapStateToProps)(OwnedEntitiesDisplay);
