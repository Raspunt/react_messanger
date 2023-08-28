import React, { Component } from 'react';

import axios from 'axios'

import AuthLoginBtn from './OAuth/Login';

import "../static/loginPage.css"

import { Cookies } from 'react-cookie';
import { gapi } from "gapi-script";


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// Define a class component
class LoginComponent extends Component {

  
  

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      show_email_error:false,
      show_password_error:false,
      empty_field_error:false,
      
    };

    this.handleChange = this.handleChange.bind(this);
    this.CheckPassword = this.CheckPassword.bind(this);
    this.cookies = new Cookies();


    gapi.load("client:auth2",()=>{
        gapi.client.init({
          clientId:process.env.REACT_APP_GOOGLE_ID,
          scope:""
        })
    })

  }


  

  render() {
    return (
      <div className='MainContainer'>
        <div className="LoginBox">


          
          <div className="formBox">
              <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  className='login_input'
                  id='email'
                  placeholder='enter email'
                  type="email"
              />
          </div>

        


          <div className="formBox">
              <input
                value={this.state.password}
                onChange={this.handleChange}
                className='login_input'
                id='password'
                placeholder='enter password'
                type="password"
                />
          </div>


          {this.state.show_email_error &&  <this.ErrorMessageBox message="the email doesn't exist."/>}
          {this.state.show_password_error &&  <this.ErrorMessageBox message="wrong password"/>}
          {this.state.empty_field_error &&  <this.ErrorMessageBox message="fields are empty"/>}
        

        


          <div className="formBox">

            <button
              onClick={this.CheckPassword}
              id='ConfirmBtn'
              className='formBox ConfirmBtn'
              >Confirm </button>

          </div>

          <AuthLoginBtn/>
          

        </div>
      </div>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };


  ErrorMessageBox(props){
      return (
        <div className="messageBox">
            <p>{props.message}</p>
        </div>
      )
  }




  CheckPassword() {

    const data = {
        email:this.state.email,
        password:this.state.password
    }

    const serverUrl =  process.env.REACT_APP_SERVER_URL;
    const _this = this;


    if (data.email.trim().length === 0 && data.password.trim().length === 0){
      // console.log(data.email.trim().length);
      this.setState({
        empty_field_error:true,
        show_email_error:false,
        show_password_error:false
      })
      return
    }

    axios.defaults.withCredentials = true
    axios.post(`${serverUrl}/user/Login`, data)
    .then(function (response) {
      
      console.log(response.data);
      let resp_data = response.data
      
      if(resp_data.status == false){
        
        
        if(resp_data.message == "wrong_email"){
          _this.setState({
            empty_field_error:false,
            show_email_error:true,
            show_password_error:false
          })
        }else if (resp_data.message == "wrong_password"){
          _this.setState({
            empty_field_error:false,
            show_email_error:false,
            show_password_error:true
          })
        }

      }else if (resp_data.status == true){
        _this.setState({
          empty_field_error:false,
          show_email_error:false,
          show_password_error:false
        })

        
        _this.cookies.set('token', resp_data.token, { path: '/' });

      }

      
    })
    .catch(function (error) {
      console.log(error);
    });
    

  }



}

export default LoginComponent;