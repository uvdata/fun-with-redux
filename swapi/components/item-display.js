
import React from 'react';
import ToggleContent from './toggle-content';
import ExpandedFilm from './expanded-film';
import ExpandedPerson from './expanded-person';
import ExpandedSpecies from './expanded-species';

const expandedComponentMap = {
	films: ExpandedFilm,
	people: ExpandedPerson,
	species: ExpandedSpecies,
}

export default class ItemDisplay extends React.PureComponent {

	static propTypes = {

		children: React.PropTypes.shape({
			url: React.PropTypes.string.isRequired,
			name: React.PropTypes.string.isRequired,
			kind: React.PropTypes.string.isRequired,
		}),

	};

	getColor = (str)=> {
		switch(str) {
			case 'people': {
				return 'red';
			}
			case 'films': {
				return 'green'
			}
		}

			return 'blue'

	}

// animations delay

// Kunne have brugt addon . ReactCssTransitionGroup for en mere glidende effekt.
  state = {
      color: 'black',
      opacity: 0,
    }

  componentDidMount = () => {
    this.scheduleUpdate()
  }

  scheduleUpdate = () => {
    this.timer = setTimeout(this.updateReady, this.props.renderId*20)
  }

  updateReady = () => {
    const farve = this.getColor(this.props.endpoint)
    this.setState(({
          color: farve,
          opacity: 100,
    }))
  }

	handleExpandToggle = () => this.props.handleExpandToggle(this.props.children.name);

  componentWillUnmount = () => {
    clearTimeout(this.timer)
  }


    // Alle React-baserede class components skal have en render funktion.
	render() {
		const { isExpanded, children: { name }, handleExpandToggle, loadedEndpoint, toggleArray, onExpandToggle, endpoint, renderId} = this.props;
		// Opgave 3 - 	Her bruger jeg simpelt end 'endpoint' til at bestemme hvilken type objekt som ItemDisplay har fået.
		//				      Alternativt kunne jeg have brugt 'children: kind'
		const spanStyle = {
      display: "block",
      padding: 2,
			color: this.state.color,
      opacity: this.state.opacity,
		}

		const ExpandedComponent = expandedComponentMap[endpoint];

		return (

      <span style={spanStyle}>
      <button className="btn btn-xs btn-default" onClick={this.handleExpandToggle} aria-label={isExpanded ? 'Collapse' : 'Expand'}>
      				{isExpanded
      					? <i className="fa fa-chevron-circle-up" />
      					: <i className="fa fa-chevron-circle-down" />}
      			</button>
      			{' '}
      			{name}

						{ isExpanded
							? <pre style={{whiteSpace: 'pre-wrap', overflowX: 'auto', backgroundColor: 'white'}}>
							<ExpandedComponent {...this.props.children}></ExpandedComponent>
						</pre>
						: null}





		</span>

  );
	}
}

// { toggleArray.indexOf(this.props.children.name)!==-1 ?
// 	<pre style={{whiteSpace: 'pre-wrap', overflowX: 'auto', backgroundColor: 'white'}}><ToggleContent children={this.props.children} /></pre> : null}
