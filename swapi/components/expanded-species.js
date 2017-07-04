import React from 'react'

export default class ExpandedSpecies extends React.PureComponent {



    	render() {
    		const {
          kind,
          name,
        } = this.props;

      		return(
            <div>
                  <h3>{name}</h3>
                  <p>
                    'Species er også Species i ental - haha'
                  </p>
                </div>
      			)
      	}
}
