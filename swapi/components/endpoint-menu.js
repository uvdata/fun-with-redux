import React from 'react';
import classNames from 'classnames';

export default class EndpointMenu extends React.PureComponent {

	static propTypes = {
		onChooseEndpoint: React.PropTypes.func.isRequired,
		loading: React.PropTypes.bool.isRequired,
		side: React.PropTypes.string.isRequired
	};

	render() {
		const { loading, onChooseEndpoint, side } = this.props;
		const isDarkSide = side === 'dark';
		const iconClass = classNames('fa', {
			'fa-refresh': loading,
			'fa-spin': loading,
			'fa-empire': !loading && isDarkSide,
			'fa-rebel': !loading && !isDarkSide
		});

		const buttonClass = classNames('btn', {
			'btn-danger': isDarkSide,
			'btn-info': !isDarkSide
		});

		const darkText = (
			<span>
				Welcome to the {side} side. <br />
				Download the contracts and get started hunting rebel scum!
			</span>
		);
		const lightText = (
			<span>
				Welcome to the {side} side. <br />
				Find terminated bounties and revive the poor soul.
			</span>
		);

		return (
			<div className="row text-center">
				<h4>
					<i className={iconClass} /><br />
					{
						isDarkSide
							? darkText
							: lightText
					}

				</h4>

				<div className="btn-group">
					<button disabled={loading} onClick={() => onChooseEndpoint('people')}
							className={buttonClass}>
						{isDarkSide ? 'Bounties' : 'Casualties'}
					</button>
					<button disabled={loading} onClick={() => onChooseEndpoint('films')} className={buttonClass}>
						Films
					</button>
				</div>
			</div>
		);
	}
}
