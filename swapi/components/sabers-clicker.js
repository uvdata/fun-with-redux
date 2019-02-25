import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onAddMoney, onGenerateMoney } from '../actions';

class SabersClicker extends Component {
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
	{ onAddMoney, onGenerateMoney }
)(SabersClicker);
