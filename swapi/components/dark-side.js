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
		const { loading, side, endpoint, hireBoba } = this.props;

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
				<div className="col-xs-4">
					<div className="well target-card">
						<i className="fa fa-crosshairs target-card-icon " aria-hidden="true" />{' '}
						<span className="target-card-text">No target selected</span>
					</div>
					<button disabled={isBobaAvailable()} onClick={() => sendBoba()} className="btn btn-danger target-card-button"
							title={isBobaAvailable() ? "Does not work for rebel scum and need a hit-list" : ""}>
					Send Boba Fett
						</button>
				</div>
			</span>
		);
	}
}
