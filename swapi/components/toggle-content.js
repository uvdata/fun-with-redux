import React from 'react'

export default class ToggleContent extends React.PureComponent {





	render(){
		const { children: { kind, name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, title, episode_id, opening_crawl, director, producer, release_date }} = this.props;


		const films = 	(<div>
					<h3>{title}</h3>
					<p>
						Director: {director} <br />
						Producer: {producer} <br />
						Released: {release_date}
					</p>
					<hr />
					<h5>Opening Crawl:</h5>
					<p>{opening_crawl}</p>

				</div>)

		const people = (
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



		return(
			<div>
			kind === 'films' ? {films} :	{people}

			</div>
			)
	}
}
