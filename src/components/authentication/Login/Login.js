import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from './Login.module.css';
import CONST from '../../../constants/constants';
import FlashMessage from 'react-flash-message';

class Login extends Component {

    state = {
        user: "",
        email: "",
        password: "",
        errorMessage: "",
        authStatus: "Not Logged In",
        redirectOnSuccess: ""
    }

    emailChangeHandler = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    getData = (val) => {
        this.props.sendData(val);
    }

    loginHandler = (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + '/sanctum/csrf-cookie').then(response => {
            axios.post(CONST.BASE_URL + '/api/login', {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                if(response.data.message === "Login successful"){
                    localStorage.setItem('user', JSON.stringify(response.data.authUser));
                    this.getData("logged_in");
                    this.setState({
                        redirectOnSuccess: <Redirect to={"/admin"} />
                    });
                }
            }
            , (error) => {
                this.setState({errorMessage: <h4 className="error">That username and password combination is incorrect. Please try again.</h4>})
            })
        });
    }

    render(){

        let successMsg = "";
        
        let showSuccessMsg = (message) => {
        successMsg = (
            <FlashMessage duration={5000}>
                <div className="load-msg">
                <h3 className="success">{message}</h3>
                </div>
            </FlashMessage>
        );
        };

        if (this.props.location.state !== undefined) {
            const message = this.props.location.state.fromRedirect;
            if (message) {
                showSuccessMsg(message);
            }
            }

        return(
            <form className={styles.Login}>
                {successMsg}
                {this.state.redirectOnSuccess}
                <h2>Staff Login</h2>
                <input type="email" name="email" placeholder="Email" onChange={this.emailChangeHandler}/>
                <input type="password" name="password" placeholder="Password" onChange={this.passwordChangeHandler} />
                {this.state.errorMessage}
                <button className="main-button" onClick={this.loginHandler}>Login</button>
                <p>Forgot Your Password <Link to="/forgot-password-email">Reset here</Link></p>
            </form>
        )
    }
}

export default Login