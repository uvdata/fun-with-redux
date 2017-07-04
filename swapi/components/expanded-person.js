import React from 'react'

export default class ExpandedPerson extends React.PureComponent {


	render(){
		const { kind, name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = this.props;

		return(
      <div>
        <h3>{name}</h3>
        <p>
          {gender}, Born: {birth_year} <br />
        </p>
        <hr />
        <h5>Physical Description:</h5>
        <p>
          Height: {height} cm <br />
          Weight: {mass} kg<br />
          Hair Color: {hair_color} <br />
          Eye Color: {eye_color} <br />
          Skin Color: {skin_color} <br />
        </p>
      </div>
			)
	}
}
