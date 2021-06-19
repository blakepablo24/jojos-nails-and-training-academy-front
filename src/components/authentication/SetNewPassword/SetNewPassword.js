import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './SetNewPassword.module.css';
import CONST from '../../../constants/constants';

const windowUrl = window.location.search;
const token = new URLSearchParams(windowUrl).get("tkn");
const email = new URLSearchParams(windowUrl).get("em");

class Register extends Component {

    state = {
        password: "",
        confirmPassword: "",
        passwordErrorMessage: "",
        redirectOnSuccess: ""
    }

    passwordChangeHandler = (event) => {
        event.preventDefault();
        if(this.state.passwordErrorMessage){
            this.setState({
                passwordErrorMessage: ""
            })
        }
        this.setState({
            password: event.target.value
        }, () => {
        })
    }

    confirmPasswordChangeHandler = (event) => {
        event.preventDefault();
        if(this.state.passwordErrorMessage){
            this.setState({
                passwordErrorMessage: ""
            })
        }
        this.setState({
            confirmPassword: event.target.value
        }, () => {
        })
    }

    // Check if user has token or email, if not redirect to login
    componentDidMount(){
        if(!token || !email){
            this.setState({
                redirectOnSuccess: <Redirect to="/login" />
            })
        }
    }

    submitHandler = (event) => {

        let passwordErrorMessage = "";

        event.preventDefault();

        if(this.state.password === "" || this.state.confirmPassword === ""){
            passwordErrorMessage = <h4 className="error">Please enter your password</h4>
        }

        if(this.state.password !== this.state.confirmPassword){
            passwordErrorMessage = <h4 className="error">Passwords do not match. Please try again</h4>
        }
        if(!passwordErrorMessage){
            axios.post(CONST.BASE_URL + '/api/set-new-password', {
                token: token,
                email: email,
                password: this.state.password
            }).then(response => {
                if(response.data.msg === 'changed'){
                    this.setState({
                        redirectOnSuccess: <Redirect to={{
                                                pathname: "/login",
                                                state: { fromRedirect: "Password Changed. Please login with your new password." }
                                                }}                  
                                            />
                    })
                }
            })
        } else {
            this.setState({
                passwordErrorMessage: passwordErrorMessage,
            })
        }
    }

    render(){
        return(
            <form className={styles.SetNewPassword}>
                {this.state.redirectOnSuccess}
                <h3>Set your new password here</h3>
                <input type="password" name="password" placeholder="New Password" onChange={this.passwordChangeHandler}/>
                <input type="password" name="confirm_password" placeholder="Confirm New Password" onChange={this.confirmPasswordChangeHandler}/>
                {this.state.passwordErrorMessage}
                <button className="customButton" onClick={this.submitHandler}>Submit</button>
            </form>
        )
    }
}

export default Register