import React from 'react';

export default class ItemDisplay extends React.PureComponent {

	static propTypes = {
		children: React.PropTypes.shape({
			url: React.PropTypes.string.isRequired,
			name: React.PropTypes.string.isRequired,
			kind: React.PropTypes.string.isRequired,
		}),
		type: React.PropTypes.string
	};

	render() {
		const { children: { name }, isExpanded, type, onExpandToggle, index} = this.props;


		return (<span>
			<button
				className="btn btn-xs btn-default"
				onClick={()=>onExpandToggle(index, isExpanded)}
				aria-label={isExpanded ? 'Collapse' : 'Expand'}>
				{isExpanded
					? <i className="fa fa-chevron-circle-up" />
					: <i className="fa fa-chevron-circle-down" />}
				</button>
				{' '}
				{type === "people"
					? <i className="fa fa-user" />
					: <i className="fa fa-film" />
				}
				{' '}
				{name}
				{ isExpanded ? <pre>{JSON.stringify(this.props.children, null, 4)}</pre> : null}
			</span>);
	}
}
