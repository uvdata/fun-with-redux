import React from 'react';
import PropTypes from 'prop-types';

export default class ItemDisplay extends React.PureComponent {

	static propTypes = {
		onExpandItem: PropTypes.func.isRequired,
		isExpanded: PropTypes.bool.isRequired,
		children: PropTypes.shape({
			url: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			kind: PropTypes.string.isRequired,
		})
	};

	render() {
		const { children: { name, url }, onExpandItem, isExpanded} = this.props;
		const kind = this.props.children.kind;
		
		console.log('itemDisplay', this.props);

		return (<span>
			<button className="btn btn-xs btn-default" onClick={() => onExpandItem(url, isExpanded)} aria-label={isExpanded ? 'Collapse' : 'Expand'}>
				{isExpanded
					? <i className="fa fa-chevron-circle-up" />
					: <i className="fa fa-chevron-circle-down" />}
			</button>
			{' '}
			{name}
			{ isExpanded ? <pre>{JSON.stringify(this.props.children, null, 4)}</pre> : null}
			<div className={kind}>{kind}</div>
		</span>);
	}
}
