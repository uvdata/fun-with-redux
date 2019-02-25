import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ItemDisplay extends React.PureComponent {

	static propTypes = {
		onExpandToggle: PropTypes.func.isRequired,
		children: PropTypes.shape({
			url: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			kind: PropTypes.string.isRequired,
		}),
		isExpanded: PropTypes.bool,
		loading: PropTypes.bool.isRequired,
		getIconName: PropTypes.func.isRequired,
	};

	handleExpandToggle = () => this.props.onExpandToggle(this.props.children.url);

	render() {
		const { data, onExpandToggle, isExpanded, loading, getIconName } = this.props;

		return (<span>
			<button disabled={loading} className="btn btn-xs btn-default" onClick={this.handleExpandToggle} aria-label={isExpanded ? 'Collapse' : 'Expand'}>
				{isExpanded
					? <i className="fa fa-chevron-circle-up" />
					: <i className="fa fa-chevron-circle-down" />}
			</button>
			{' '}
			<i className={classNames('fa', getIconName(data))} />
			{' '}
			{data.kind === 'films' ? `Episode ${data.episode_id}: ` : null}
			{data.name}
			{isExpanded ? <pre>{JSON.stringify(data, null, 4)}</pre> : null}
		</span>);
	}
}
