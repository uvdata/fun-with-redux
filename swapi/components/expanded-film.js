import React from 'react'

export default class ExpandedFilm extends React.PureComponent {



    	render() {
    		const {
          kind,
          name,
          title,
          episode_id,
          opening_crawl,
          director,
          producer,
          release_date
        } = this.props;

      		return(
            <div>
                  <h3>{title}</h3>
                  <p>
                    Director: {director} <br />
                    Producer: {producer} <br />
                    Released: {release_date}
                  </p>
                  <hr />
                  <h5>Opening Crawl:</h5>
                  <p>{opening_crawl}</p>

                </div>
      			)
      	}
}
