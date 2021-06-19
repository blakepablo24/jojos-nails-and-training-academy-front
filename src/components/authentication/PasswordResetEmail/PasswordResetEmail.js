import Axios from 'axios';
import React, { Component } from 'react';
import styles from './PasswordResetEmail.module.css';
import CONST from '../../../constants/constants';
import EmailValidator from 'email-validator';
import LoadingScreen from '../../Ux/LoadingScreen/LoadingScreen';

class EmailVerification extends Component {

    state = {
        verifyLinkStatus: false,
        email: "",
        emailErrorMessage: "",
        LoadingScreen: ""
    }

    onChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
            email: event.target.value,
            emailErrorMessage: ""
        })
    }

    onClickHandler = (event) => {
        event.preventDefault();

        let emailErrorMessage = "";

        if (this.state.email === '') {
            emailErrorMessage = <h4 className="error">Email Cannot be empty</h4>
        } else if(!EmailValidator.validate(this.state.email)) {
            emailErrorMessage = <h4 className="error">Please use a valid email</h4>
        }

        if(!emailErrorMessage){
            this.setState({
                loadingScreen: <LoadingScreen message="Attemping to send email. Please wait"/>
            })
            Axios.post(CONST.BASE_URL + '/api/forgot-password', {email: this.state.email}).then(response => {
                if(response.data.message === "Email Sent"){
                    this.setState({
                        verifyLinkStatus: true,
                        loadingScreen: ""
                    })      
                }
            })
        } else {
            this.setState({
                emailErrorMessage: emailErrorMessage
            })
        }
    }

    render(){

        let verifyLinkStatus =  <div className={styles.passwordResetContainer}>
                                <p>Please enter the email address you would like to reset the password for:</p>
                                    <input 
                                        type="email"
                                        placeholder="Input Email Here"
                                        value={this.state.email}
                                        onChange={this.onChangeHandler}
                                    />
                                    <button className="customButton" onClick={this.onClickHandler}>Submit</button>
                                    {this.state.emailErrorMessage}
                                </div>;

        if(this.state.verifyLinkStatus){
            verifyLinkStatus = <p className="success">If there is an account relating to this email. You will receive a password reset email</p>;
        }

        return(
            <div className={styles.PasswordResetEmail}>
                {this.state.loadingScreen}
                {verifyLinkStatus}
            </div>
        )
    }
}

export default EmailVerification;