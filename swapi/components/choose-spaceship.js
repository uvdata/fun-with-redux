import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLoadCharacterIntoSpaceship } from '../actions';

let localActiveCrewmembers = 0;

class ChooseSpacshipModal extends Component {
	componentDidMount() {
		localActiveCrewmembers = this.props.activeShip.crew_people.length;
	}

	handleLoadCharacterIntoSpaceship(person, activeShip) {
		this.props.onLoadCharacterIntoSpaceship(person, activeShip);

		// Purely local 'state'
		localActiveCrewmembers++;

		// Prevent loading more than 3 people into a ship
		if (localActiveCrewmembers >= 3) {
			this.props.onCloseClick();
		}
	}

	renderTable() {
		return (
			<table className="table">
				<tbody>
					{this.props.ownedEntities.people.map(person => {
						if (!person.inShip) {
							return (
								<tr key={person.id}>
									<td>
										<a
											href="#"
											onClick={() =>
												this.handleLoadCharacterIntoSpaceship(
													person,
													this.props.activeShip
												)
											}
										>
											{person.name}
										</a>
									</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
		);
	}

	render() {
		return (
			<div>
				<div className="row crew-chooser">
					Who do you want to load into {this.props.activeShip.name}?
				</div>
				<div className="row crew-chooser">{this.renderTable()}</div>
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
