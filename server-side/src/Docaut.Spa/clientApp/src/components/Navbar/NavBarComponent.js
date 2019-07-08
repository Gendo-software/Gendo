import React, { Component } from 'react'
import logo from './../../assets/img/logo128x50.png';
import { Link } from 'react-router-dom'
import UserSection from './UserSectionComponent';

export default class NavBarComponent extends Component {
  constructor(props) {
    super(props)
  
    this.toggle = this.toggle.bind(this);

    this.state = {
      show: false
    }
  }
    
  toggle(){
    this.setState({show: !this.state.show});
  }

  render() {    
    const show = this.state.show ? "show" : "";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark  py-0">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img className="img-fluid" src={logo}/>
          </a>
          <button className="navbar-toggler" type="button" 
            onClick={this.toggle} aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className= {"collapse navbar-collapse " + show}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/"><i className="fa fa-home" aria-hidden="true" /> Home<span className="sr-only">(current)</span></Link>
                {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Template/Create"><i className="fa fa-plus-square" aria-hidden="true" /> Create template<span className="sr-only">(current)</span> </Link>
                {/* <a className="nav-link" href="#">Link</a> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Document/Create"><i className="far fa-file-alt" aria-hidden="true" /> Create document<span className="sr-only">(current)</span></Link>
              </li>

              {/* disabled button template
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li> */}

              {/* dropdown template */}
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="https://example.com" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div className="dropdown-menu" aria-labelledby="dropdown07">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li> */}

            </ul>
            {/*template search*/}
            {/* <form className="form-inline my-2 my-md-0">
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </form> */}
            <UserSection />

            
          </div>
        </div>
      </nav>      
    )
  }
}
