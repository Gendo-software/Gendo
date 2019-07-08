import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AuthManager from './../../Auth/AuthManager';


export default class UserSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: ""
        }

        this.AuthCore = AuthManager.getAuthObject();


    }

    refreshUser(){

        let receiveUserData = (error, profile) => {
            if(error){
                this.setState({userName: "unknown"})
            }
            else if(profile){
                this.setState({userName: profile.nickname})
            }
        }

        if(this.AuthCore.UserIsLogged()){
            this.AuthCore.GetUserProfile(receiveUserData.bind(this));
        }                            
    }

    componentDidUpdate()
    {
         if(this.state.userName.length == 0){
             this.refreshUser();
         }
    }
    componentDidMount(){        
        this.refreshUser();
    }

    renewClick() {
        this.AuthCore.RenewSession();        
    }

    logoutClick() {
        this.AuthCore.logout();
    }

    userProfileClick(){
        console.log("user profile click");
        console.dir(this.AuthCore.UserProfile);        
    }

    LoginHere(){
        this.authCore = AuthManager.getAuthObject();
        this.authCore.ShowLoginBox();
    }

    render() {
        return (
            <div>                
                <ul className="navbar-nav mr-auto">
                    
                    {this.AuthCore.UserIsLogged() &&
                        <React.Fragment>
                            <li className="nav-item">
                                <a onClick={this.userProfileClick.bind(this)} className="nav-link">
                                    <i className="far fa-user" /> Witaj {this.state.userName}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a onClick={this.logoutClick.bind(this)} className="nav-link">
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </a>
                            </li>                        
                        </React.Fragment>
                    }     
                    
                    {!this.AuthCore.UserIsLogged() &&
                        <React.Fragment>                        
                                <li className="nav-item">
                                    <button onClick={() => this.LoginHere()}>LoginHere!</button>
                                    <Link className="nav-link" to={{ pathname: "/Login", state: { from: window.location.pathname, mode: "Login" }}}>
                                        <i className="far fa-user" /> Login
                                    </Link>                                    
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={{ pathname: "/Login", state: { from: window.location.pathname, mode: "Register" }}}>
                                        <i className="fas fa-user-plus" /> Register
                                </Link>
                                </li>
                        </React.Fragment>                        
                    }            
                </ul>
            </div>
        )
    }
}
