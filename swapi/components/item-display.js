import React from 'react';

export default class ItemDisplay extends React.PureComponent {

	static propTypes = {
		onExpandToggle: React.PropTypes.func.isRequired,
		selectTarget: React.PropTypes.func.isRequired,
		revive: React.PropTypes.func.isRequired,
		isExpanded: React.PropTypes.bool.isRequired,
		children: React.PropTypes.shape({
			url: React.PropTypes.string.isRequired,
			name: React.PropTypes.string.isRequired,
			kind: React.PropTypes.string.isRequired,
		}),
		kills: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		side: React.PropTypes.string.isRequired
	};

	render() {
		const { children: { name, kind, url }, isExpanded, onExpandToggle, selectTarget, kills, side, revive } = this.props;
		const isPeople = kind === 'people';
		const isKilled = kills.indexOf(name) !== -1;

		const darkSideIcon = (
			<button className="btn btn-xs btn-default" onClick={() => selectTarget(name)} disabled={isKilled}>
				<i className="fa fa-crosshairs" />
			</button>);
		const lightSideIcon = (
			<button className="btn btn-xs btn-default" onClick={() => revive(name)} disabled={!isKilled}>
				<i className="fa fa-heartbeat" />
			</button>
		);


		return (<span>
			{ side === 'dark' ? darkSideIcon : lightSideIcon }

			<button className="btn btn-xs btn-default"
					onClick={() => onExpandToggle(url, !isExpanded)}
					aria-label={isExpanded ? 'Collapse' : 'Expand'}>
				{
					isExpanded ? <i className="fa fa-chevron-circle-up" /> : <i className="fa fa-chevron-circle-down" />
				}
			</button>
			{' '}
			{isPeople ? <i className="fa fa-users" /> : <i className="fa fa-film" />} {name}
			{' '}
			{isKilled ?
				<span className="terminated">
					TERMINATED!
				</span>
				: ''
			}

			{isExpanded ? <pre>{JSON.stringify(this.props.children, null, 4)}</pre> : null}

				</span>);
	}
}
