import React, { Component } from 'react';
class BuyEntityButton extends Component {
	handleBuyEntity = () => {
		const {
			item: { kind },
			item,
			onBuyEntity
		} = this.props;
		onBuyEntity(item, kind);
	};

	render() {
		const {
			item: { name },
			isAvailable
		} = this.props;
		return (
			<button
				disabled={!isAvailable}
				onClick={this.handleBuyEntity}
				className={`btn btn-xs btn-${isAvailable ? 'success' : 'default'}`}
				title={isAvailable ? `Buy ${name}` : `You can't afford ${name} yet`}
			>
				Buy {name}
			</button>
		);
	}
}

export default BuyEntityButton;
