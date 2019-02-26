import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ItemDisplay extends React.PureComponent {

	static propTypes = {
		children: PropTypes.shape({
			name: PropTypes.string.isRequired,
			kind: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			expanded: PropTypes.bool,
			episode_id: PropTypes.number,
			gender: PropTypes.string,
		}),
	};

	expandToggle = () => {
		this.props.setExpandToggle(this.props.children.url)
	};

	render() {
		const { children: { name, kind, expanded, gender, episode_id, charactersNames }, endpoint} = this.props;

		const iconKindClass = classNames('fa', {
			'fa-female': kind === 'people' && gender === 'female',
			'fa-male': kind === 'people' && gender === 'male',
			'fa-android': kind === 'people' && (gender === 'none' || gender === 'n/a'),
			'fa-transgender-alt': kind === 'people' && gender === 'hermaphrodite',
			'fa-flag': episode_id,
		});

		return (
			<span>
				
				<button className="btn btn-xs btn-default" onClick={this.expandToggle} aria-label={expanded > 0 ? 'Collapse' : 'Expand'}>
					{expanded > 0
						? <i className="fa fa-chevron-circle-up" />
						: <i className="fa fa-chevron-circle-down" />
					}
				</button>
				{' '}
				{name} - <i className={iconKindClass}/>
				{' '}
				{ episode_id  && 
					<span> Episode {episode_id}</span>
				}
				{' '}
				{ endpoint === 'charactersNames' && 
					<span> - <span className='fa fa-users'> {charactersNames.length}</span></span>
				}
				{ endpoint === 'charactersNames'
					? expanded ? <pre>{JSON.stringify(charactersNames, null, 4)}</pre> : null
					: expanded ? <pre>{JSON.stringify(this.props.children, null, 4)}</pre> : null
				}
			</span>);
	}
}
