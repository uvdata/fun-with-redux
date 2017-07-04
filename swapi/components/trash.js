// Timeout på items i array - giver en fed load effekt!


var List = React.createClass({

  getInitialState() {
    return {
      renderedThings: [],
      itemsRendered: 0
    }
  }

  render() {
    return (
      <div>{
        this.state.renderedThings.map((thing, index) => (
          <div key={index}>{thing.content}</div>
        ))
      }</div>
    )
  },

  componentDidMount() {
    this.scheduleNextUpdate()
  },

  scheduleNextUpdate() {
    this.timer = setTimeout(this.updateRenderedThings, 10) // siger sig selv, har indstiller du tiden mellem hver load.
  },

  updateRenderedThings() {
    const itemsRendered = this.state.itemsRendered // starter på 0 og går opefter
    const updatedState = {
      renderedThings: this.state.renderedThings.concat(this.props.things[this.state.itemsRendered]), // concat(array[0]) etc...
      itemsRendered: itemsRendered+1
    }
    this.setState(updatedState)
  	if (updatedState.itemsRendered < this.props.things.length) { // starter en loop indtil alt er rendered.
      this.scheduleNextUpdate()
    }
  },

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

})


React.render(
  <List things={[
    { content: 'hello' },
    { content: 'Lorem' },
    { content: 'Ipsum'}
   ]}/>,
  document.getElementById('container')
 )
