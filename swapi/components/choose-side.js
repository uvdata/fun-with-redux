import React from 'react';
import classNames from 'classnames';

export default class ChooseSide extends React.PureComponent {

	static propTypes = {
		chooseSide: React.PropTypes.func.isRequired,
		side: React.PropTypes.string,
	};

	render() {
		const { chooseSide, side } = this.props;

		const lightSide = classNames('the-light-side', {
			'the-light-side-selected': side === 'light'
		});

		const darkSide = classNames('the-dark-side', {
			'the-dark-side-selected': side === 'dark'
		});

		return (
			<div className="row text-center">
				<div className="side-menu">Choose your side.</div>
				<div className="col-xs-6 side-menu-icon">
					<span className={lightSide} onClick={() => chooseSide('light')}>
						<i className="fa fa-rebel" />
						<h3>The Light Side</h3>
					</span>
				</div>
				<div className="col-xs-6 side-menu-icon">
					<span className={darkSide} onClick={() => chooseSide('dark')}>
						<i className="fa fa-empire" />
						<h3>The Dark Side</h3>
					</span>
				</div>
			</div>
		);
	}
}
