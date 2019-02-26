import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
		const iconClass = classNames('fa', {
			'fa-users': kind == 'people',
			'fa-film': kind == 'films'
		});

		return (<span>
			<button className="btn btn-xs btn-default" onClick={() => onExpandItem(url, isExpanded)} aria-label={isExpanded ? 'Collapse' : 'Expand'}>
				{isExpanded
					? <i className="fa fa-chevron-circle-up" />
					: <i className="fa fa-chevron-circle-down" />}
			</button>
			{' '}
			<i className={iconClass} />
			{' '}
			{name}
			{ isExpanded ? <pre>{JSON.stringify(this.props.children, null, 4)}</pre> : null}
			
		</span>);
	}
}
