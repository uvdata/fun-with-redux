import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLoadCharacterIntoSpaceship } from '../actions';
import CharacterSpaceshipList from './character-spaceship-list';

class ChooseSpacshipModal extends Component {
	state = {
		localActiveCrewMembers: this.props.activeShip.crew_people.length
	};

	handleLoadCharacterIntoSpaceship = (person, activeShip) => {
		const { localActiveCrewMembers } = this.state;
		this.props.onLoadCharacterIntoSpaceship(person, activeShip);

		// Purely local
		this.setState({ localActiveCrewMembers: localActiveCrewMembers + 1 });

		// Prevent loading more than 3 people into a ship
		if (localActiveCrewMembers >= 2) {
			this.props.onCloseClick();
		}
	};

	render() {
		return (
			<div>
				<div className="row crew-chooser">
					Who do you want to load into {this.props.activeShip.name}?
				</div>
				<div className="row crew-chooser">
					<CharacterSpaceshipList
						ownedEntities={this.props.ownedEntities}
						activeShip={this.props.activeShip}
						onLoadCharacterIntoSpaceship={this.handleLoadCharacterIntoSpaceship}
					/>
				</div>
				<div className="row">
					<button className="btn btn-success" onClick={this.props.onCloseClick}>
						Close
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { ownedEntities: state.ownedEntities };
};

export default connect(
	mapStateToProps,
	{ onLoadCharacterIntoSpaceship }
)(ChooseSpacshipModal);
