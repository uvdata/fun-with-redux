import React from 'react';

export default class ItemDisplay extends React.PureComponent {

	static propTypes = {
		onExpandToggle: React.PropTypes.func.isRequired,
		isExpanded: React.PropTypes.bool.isRequired,
		children: React.PropTypes.shape({
			url: React.PropTypes.string.isRequired,
			name: React.PropTypes.string.isRequired,
			kind: React.PropTypes.string.isRequired,
		})
	};

	render() {
		const { children: { name, kind, url }, isExpanded, onExpandToggle } = this.props;

		return (<span>
			<button className="btn btn-xs btn-default" onClick={() => onExpandToggle(url, !isExpanded)} aria-label={isExpanded ? 'Collapse' : 'Expand'}>
				{
					isExpanded ? <i className="fa fa-chevron-circle-up" /> : <i className="fa fa-chevron-circle-down" />
				}
			</button>
			{' '}
			{kind === 'people' ? <i className="fa fa-users" /> : <i className="fa fa-film" />}
			{' '}
			{name}

			{isExpanded ? <pre>{JSON.stringify(this.props.children, null, 4)}</pre> : null}
		</span>);
	}
}
