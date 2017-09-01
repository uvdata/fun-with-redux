import React from 'react';

export default class DarkSide extends React.PureComponent {

	static propTypes = {
		side: React.PropTypes.string,
		endpoint: React.PropTypes.string,
		joinTheDarkSide: React.PropTypes.func.isRequired,
		hireBoba: React.PropTypes.func.isRequired,
		loading: React.PropTypes.bool.isRequired
	};

	state = {
		target: ''
	};

	render() {
		const { loading, side, endpoint, joinTheDarkSide, hireBoba } = this.props;

		const changeTarget = (e) => {
			this.setState({
				target: e.target.value
			});
		};

		const sendBoba = () => {
			hireBoba(this.state.target);

			this.setState({
				target: ''
			});
		};

		const isBobaAvailable = () => {
			return loading || side !== 'dark' || endpoint !== 'people';
		};

		return (
			<span>
				<button disabled={loading || side === 'dark'} onClick={() => joinTheDarkSide()}
					className="btn btn-danger">
					Join the Dark Side
				</button>
				{' '}
				<input disabled={isBobaAvailable()} type="text" placeholder="Target" value={this.state.target}
					onChange={changeTarget} />
				{' '}
				<button disabled={isBobaAvailable()} onClick={() => sendBoba()} className="btn btn-danger"
					title={isBobaAvailable() ? "Does not work for rebel scum and need a hit-list" : ""}>
					Hire Boba Fett
				</button>
			</span>
		);
	}
}
