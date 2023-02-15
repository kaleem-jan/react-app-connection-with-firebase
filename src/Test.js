import React, { Component } from 'react'

class Test extends Component {
  state = {superpower: 'shape shifting and teleporation'};
  attack() {
    console.log('this refers to ',this);
    console.log('superpower is : ', this.state.superpower);

  }  
  render() {
    return( <button onClick={() => this.attack()}>Attack</button>)
  }
}
export default Test