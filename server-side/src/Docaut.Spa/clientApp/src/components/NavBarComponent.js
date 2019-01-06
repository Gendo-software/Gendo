import React, { Component } from 'react'
import logo from './../assets/logo128x50.png';
import { Link } from 'react-router-dom'

export default class NavBarComponent extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark  py-0">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img className="img-fluid" src={logo}/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample07">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/CreateTemplate">Create template<span className="sr-only">(current)</span></Link>
                {/* <a className="nav-link" href="#">Link</a> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/CreateDocument">Create document<span className="sr-only">(current)</span></Link>
              </li>

              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="https://example.com" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div className="dropdown-menu" aria-labelledby="dropdown07">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-md-0">
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </form>
          </div>
        </div>
      </nav>      
    )
  }
}
