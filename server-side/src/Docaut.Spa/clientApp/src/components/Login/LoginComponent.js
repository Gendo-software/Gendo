import React, { Component } from 'react'
import AuthManager from '../../Auth/AuthManager';




export default class LoginComponent extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }

    this.authCore = AuthManager.getAuthObject();
    this.authCore.onSuccess = this.loginSuccess.bind(this);    
    this.redirectUrl = "/";          
    
    if(this.props.location.state != null){
      this.redirectUrl = this.props.location.state.from;      
    }    
  }

  loginSuccess(){    
    console.log(`login success, and redirect now to: ${this.redirectUrl}`);        
    this.props.history.push(this.redirectUrl);

    //this.props.history.replace(this.redirectUrl);

  }

  showPopUp(){    
    if(this.props.location.state)
    {
      const mode = this.props.location.state.mode;
      if(mode == "Register"){
        this.authCore.ShowRegisterBox();
      }
      else if(mode == "Login"){
        this.authCore.ShowLoginBox();
      }
    }
    else{
      //default login
      this.authCore.ShowLoginBox()
    }
  }

  componentDidUpdate(){
    this.showPopUp();
  }
  
  componentDidMount(){    
    this.showPopUp();            
  }

  render() {
    return (
      <div>
        Login, please wait
      </div>
    )
  }
}
