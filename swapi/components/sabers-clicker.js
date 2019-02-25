import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
	onAddMoney,
	onGenerateMoney,
	onLoadFromLocalStorage
} from '../actions';

class SabersClicker extends Component {
	static propTypes = {
		money: PropTypes.number.isRequired,
		onAddMoney: PropTypes.func.isRequired,
		onGenerateMoney: PropTypes.func.isRequired,
		onLoadFromLocalStorage: PropTypes.func.isRequired
	};

	componentDidMount() {
		setInterval(() => {
			this.update();
		}, 1000);
		this.props.onLoadFromLocalStorage(localStorage.getItem('redux-money'));
		this.defaultTitle = document.title;
	}

	// Runs once every second
	update() {
		this.props.onGenerateMoney();
		localStorage.setItem('redux-money', this.props.money);
		document.title = `${this.props.money} credits - ${this.defaultTitle}`;
	}

	render() {
		return (
			<div>
				<p className="money-title lead">{this.props.money} credits</p>
				<a
					href="#"
					onClick={() => this.props.onAddMoney(1)}
					title="Collect credits"
				>
					<div>
						<img className="sabers" src="/static/sabers.png" />
						<img className="glow-outline-right" src="/static/streaks.png" />
						<img className="glow-outline-left" src="/static/streaks.png" />
					</div>
				</a>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		money: state.money
	};
};

export default connect(
	mapStateToProps,
	{ onAddMoney, onGenerateMoney, onLoadFromLocalStorage }
)(SabersClicker);
