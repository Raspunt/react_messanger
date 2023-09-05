import React, { Component } from 'react';
import { Navigate } from "react-router-dom";

import axios from 'axios'
import "../static/loginPage.css"



import footer_bg from "../static/img/logo_footer.svg"

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// Define a class component
class LoginComponent extends Component {




  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      show_email_error: false,
      show_password_error: false,
      empty_field_error: false,
      is_aunticated:false,

    };

    this.handleChange = this.handleChange.bind(this);
    this.CheckPassword = this.CheckPassword.bind(this);




  }




  render() {
    return (
      <div className='MainContainer'>

        <h1 className='important_empty'> </h1>

        <div className="LoginBox">
          <div className="input_container">
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
          </div>


          {this.state.show_email_error && <this.ErrorMessageBox message="the email doesn't exist." />}
          {this.state.show_password_error && <this.ErrorMessageBox message="wrong password" />}
          {this.state.empty_field_error && <this.ErrorMessageBox message="fields are empty" />}

          {this.state.is_aunticated &&  <Navigate to="/" replace={true} /> }
          


          <div className="btn_container">
            <div className="formBox">

              <button
                onClick={this.CheckPassword}
                id='ConfirmBtn'
                className='formBox ConfirmBtn'
              >Confirm </button>

            </div>
          </div>


        </div>

        <img className='footer_bg' src={footer_bg} alt="" />
      </div>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };


  ErrorMessageBox(props) {
    return (
      <div className="messageBox">
        <p>{props.message}</p>
      </div>
    )
  }




  CheckPassword() {

    const data = {
      email: this.state.email,
      password: this.state.password
    }

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    // console.log(serverUrl);
    const _this = this;


    if (data.email.trim().length === 0 && data.password.trim().length === 0) {
      // console.log(data.email.trim().length);
      this.setState({
        empty_field_error: true,
        show_email_error: false,
        show_password_error: false
      })
      return
    }


    axios.post(`${serverUrl}/user/Login`,data,{
      withCredentials:true
    })
      .then(function (response) {
        if (response.status === 200) {

          console.log(response.headers);
          
          _this.setState({
            empty_field_error: false,
            show_email_error: false,
            show_password_error: false,
            is_aunticated:true
          })

        }

      })
      .catch(function (error) {
        console.log(error.response.data);
        let resp_data = error.response.data

        if (resp_data.message === "email_not_found") {

          _this.setState({
            empty_field_error: false,
            show_email_error: true,
            show_password_error: false
          })
        } else if (resp_data.message === "wrong_password") {
          _this.setState({
            empty_field_error: false,
            show_email_error: false,
            show_password_error: true
          })
        }

      });


  }



}

export default LoginComponent;