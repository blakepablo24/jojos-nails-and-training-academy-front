import axios from 'axios';
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import styles from './Login.module.css';
import CONST from '../../../constants/constants';
import FlashMessage from 'react-flash-message';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Latest from '../../Ui/Navigation/Latest/Latest';
import Loading from '../../Ui/Loading/Loading';
import FUNCTIONS from '../../../functions/functions';

class Login extends Component {

    state = {
        user: "",
        email: "",
        password: "",
        errorMessage: "",
        redirectOnSuccess: "",
        loading: ""
    }

    componentDidMount(){
        FUNCTIONS.scrollToTop();
    }

    emailChangeHandler = (event) => {
        this.setState({
            email: event.target.value,
            errorMessage: ""
        });
    }

    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value,
            errorMessage: ""
        });
    }

    getData = (val) => {
        this.props.sendData(val);
    }

    loginHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: <Loading message="Logging In Please Wait"/>
        })
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
                        loading: "",
                        redirectOnSuccess: <Redirect to={"/admin"} />
                    });
                }
            }, (error) => {
                this.setState({
                    errorMessage: <h4 className="error">That username and password combination is incorrect. Please try again.</h4>,
                    loading: ""
                })
            })
        })
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
            <Aux>
                {this.state.loading}
                <Latest message={"Staff Login"}/>
                <div className={styles.loginContainer}>
                    <form className={styles.Login}>
                        <h1>Login</h1>
                        {successMsg}
                        {this.state.redirectOnSuccess}
                        <input type="email" name="email" placeholder="Email" onChange={this.emailChangeHandler}/>
                        <input type="password" name="password" placeholder="Password" onChange={this.passwordChangeHandler} />
                        {this.state.errorMessage}
                        <button className="customButton" onClick={this.loginHandler}>Login</button>
                    </form>
                </div>
            </Aux>
        )
    }
}

export default Login