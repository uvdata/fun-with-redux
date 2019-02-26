import React, { Component } from 'react';
class LoadCharacterIntoSpaceship extends Component {
	handleLoadCharacterIntoSpaceship = () => {
		const { activeShip, person, onLoadCharacterIntoSpaceship } = this.props;
		onLoadCharacterIntoSpaceship(person, activeShip);
	};

	render() {
		return (
			<a href="#" onClick={this.handleLoadCharacterIntoSpaceship}>
				{this.props.person.name}
			</a>
		);
	}
}

export default LoadCharacterIntoSpaceship;
