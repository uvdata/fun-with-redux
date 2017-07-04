import React from 'react'

export default class DarkPromotion extends React.PureComponent {

	state={promo: ''}

	componentDidMount = () => {
		const promotions = [
			"Evil will always triumph over good, because good is dumb",
			"We have cake",
			"Because Jedi Masters die in dirt caves on bog-infested planets",
			"Because Jedi Masters die as 900 year old virgins",
			"Because our Death Star is a massive chick magnet",
			"You'll get a genuine shaggy wookie carpet as a welcome gift",
			"Because we never let the wookies win",
			"Just imagine showing up at a party in a Star Destroyer",
			"Because we just set a huge bounty on Jar Jar Binks... and we mean huge!",
			"Because Ewoks are target practice, not friends...",
			];

		this.setState({promo: promotions[Math.floor(Math.random() * promotions.length)]})
	}


	render(){
		const promo = this.state.promo;

		return(
			<div className="jumbotron">
			  <h2>Join the Dark Side!</h2>
			  <p>{promo}</p>
			  <p><a className="btn btn-danger btn-lg pull-right" href="https://facebook.github.io/react/" target="_blank" role="button">Learn more</a></p><br />
			</div>
			)
	}
}
