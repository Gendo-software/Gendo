import React, { Component } from 'react'


const debugInfoStyle =
{    
    background: '#777'      
}

export default class DebugInfoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }

        this.refreshCounter = 0;
    }

    componentDidMount() {

    }
  
    refresh(event) {
      console.log(("debug force update " + this.refreshCounter));
      this.refreshCounter++;
      this.forceUpdate();
    }
  
    componentDidUpdate(a, b, c) {
      console.log("DebugInfo -> componentDidUpdate");
    }
  
    componentWillUpdate(a, b, c) {
      console.log("DebugInfo -> componentWillUpdate");
    }

    someAction(event){
        event.stopPropagation();
        alert("action");
    }

    render() {
        return (
            <div onClick={this.refresh.bind(this)} style={debugInfoStyle}>
            <div className="container">
              <div className="row">
                <div className="col">
                  <b>Section1:</b> <br />
                  
                </div>
                <div className="col">
                  <b>Section2: </b> <br />
                  
                </div>
                <div className="col">
    
                  click to refresh data! <br />
                  counter: {this.refreshCounter} <br />
                  <button onClick={this.someAction.bind(this)}>Action!</button><br />
                </div>
              </div>
            </div>
          </div>            
        )
    }
}
