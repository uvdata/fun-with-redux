import React from 'react';
import LoadCharacterIntoSpaceship from './buttons/load-character-into-spaceship';
const CharacterSpaceshipList = props => {
	const {
		ownedEntities: { people },
		activeShip,
		onLoadCharacterIntoSpaceship
	} = props;
	return (
		<table className="table">
			<tbody>
				{people.map(person => {
					if (!person.inShip) {
						return (
							<tr key={person.id}>
								<td>
									<LoadCharacterIntoSpaceship
										activeShip={activeShip}
										onLoadCharacterIntoSpaceship={onLoadCharacterIntoSpaceship}
										person={person}
									/>
								</td>
							</tr>
						);
					}
				})}
			</tbody>
		</table>
	);
};

export default CharacterSpaceshipList;
