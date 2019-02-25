import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ItemDisplay from './item-display';

export default class MillenniumFalcon extends React.PureComponent {

	static propTypes = {
		onChooseEndpoint: PropTypes.func.isRequired,
		onExpandToggle: PropTypes.func.isRequired,
		onMergeLists: PropTypes.func.isRequired,
		list: PropTypes.arrayOf(PropTypes.shape({
			url: PropTypes.string.isRequired,
		})).isRequired,
		side: PropTypes.string,
	};

	render() {
		const { loading, list, onChooseEndpoint, onExpandToggle, onMergeLists, endpoint } = this.props;

		const listName = endpoint === 'people' ? endpoint : 'films'

		const iconClass = classNames('fa', {
			'fa-refresh': loading,
			'fa-spin': loading,
			'fa-star': !loading,
		});

		return (
			<div>
				<p>
					<i className={iconClass} />
					{' '}
					{loading
						? <span>Loading {endpoint}, please wait...</span>
						: <span>What do you want to see?</span>
					}
					<br />
					{!this.props.data.films || !this.props.data.people 
						? <span>Hint: A secret button will appear when you have seen both the lists of characters and films</span>
						: <span>You can now see the new button</span>
					}
				</p>
				<div className="btn-group">
					<button disabled={loading} onClick={() => onChooseEndpoint('people')} className={"btn " + (endpoint === 'people' ? 'btn-success' : 'btn-primary')}><i className="fa fa-male"/><i className="fa fa-female"/> Characters</button>
					<button disabled={loading} onClick={() => onChooseEndpoint('films')} className={"btn " + (endpoint === 'films' ? 'btn-success' : 'btn-primary')}><i className="fa fa-film"/> Films</button>
					{this.props.data.films && this.props.data.people && !loading &&
						<button onClick={() => onMergeLists('charactersNames')} className={"btn " + (endpoint === 'charactersNames' ? 'btn-success' : 'btn-primary')}><i className="fa fa-users"/> Cast</button>
					}
				</div>
				<br /><br />
				<p>{!loading && endpoint &&
						<span>{listName.toUpperCase()}({this.props.data[endpoint].length})</span>
					}
				</p>
				<table className="table">
					<tbody>
						{list.map((item) => <tr key={item.url}><td><ItemDisplay endpoint={endpoint} setExpandToggle={onExpandToggle}>{item}</ItemDisplay></td></tr>)}
					</tbody>
				</table>
			</div>
		);
	}
}
