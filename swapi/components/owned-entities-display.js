import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseSpaceshipModal from './choose-spaceship';

class OwnedEntitiesDisplay extends Component {
	static propTypes = {
		ownedEntities: PropTypes.shape({
			people: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired
				})
			),
			starships: PropTypes.arrayOf(
				PropTypes.shape({
					crew_people: PropTypes.any.isRequired
				})
			)
		}).isRequired
	};

	state = {
		showChooser: false,
		activeShip: {}
	};
	handleCloseChooser = () => {
		this.setState({ showChooser: false, activeShip: {} });
	};
	handleOpenChooser = e => {
		const shipIndex = e.target.dataset.index;
		// find ship by id
		const {
			ownedEntities: { starships }
		} = this.props;
		const ship = starships[shipIndex];
		if (ship) {
			this.setState({ showChooser: true, activeShip: ship });
		}
	};

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
		const { ownedEntities, peopleGroup } = this.props;

		return (
			<div>
				<h4>You own the following people:</h4>
				<ul>
					{Object.keys(peopleGroup).map(ent => {
						return (
							<li key={ent}>
								{ent}: {peopleGroup[ent].count} ({peopleGroup[ent].inShipCount}{' '}
								in a starship)
							</li>
						);
					})}
				</ul>
				<h4>You own the following starships:</h4>
				<ul>
					{ownedEntities.starships.map((ent, index) => {
						return (
							<li key={ent.id}>
								{ent.name}: ({ent.crew_people.length}/3)
								{ent.crew_people.length < 3 && (
									<button
										className="btn btn-primary btn-xs"
										data-index={index}
										onClick={this.handleOpenChooser}
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

function groupEntity(list) {
	let groups = {};
	list.forEach(ent => {
		let key = ent.name;
		if (!groups.hasOwnProperty(key)) {
			groups[key] = {};
			groups[key]['count'] = 0;
			groups[key]['inShipCount'] = 0;
			groups[key]['data'] = ent;
		}
		groups[key].count += 1;

		if (ent.inShip) {
			groups[key].inShipCount += 1;
		}
	});
	return groups;
}

const mapStateToProps = state => {
	return {
		ownedEntities: state.ownedEntities,
		peopleGroup: groupEntity(state.ownedEntities.people)
	};
};

export default connect(mapStateToProps)(OwnedEntitiesDisplay);
