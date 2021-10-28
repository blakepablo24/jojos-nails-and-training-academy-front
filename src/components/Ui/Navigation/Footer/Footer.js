import React, { Component } from 'react';
import classes from './Footer.module.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import CONST from '../../../../constants/constants';

class Footer extends Component {

    state = {
        redirectOnSuccess: "" 
    }

    getData = (val) => {
        this.props.sendData(val);
    }

    logoutHandler = (event) => {
        event.preventDefault();
        localStorage.clear();
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + '/api/logout');
        this.getData("not_logged_in");
        this.setState({
            redirectOnSuccess: <Redirect to={{
                                    pathname: "/staff-login",
                                    state: { fromRedirect: "You have been successfully logged out" }
                                    }}                  
                                />
        })
    }

    render(){
    
    let loggedInIcon = "";

        if(JSON.parse(localStorage.getItem("user"))){
            loggedInIcon = <Link onClick={this.logoutHandler} to="">Logout</Link>
        } else {
            loggedInIcon = <Link onClick={this.props.scrollToTop} to="/staff-login">Staff Login</Link>
        }

    return(
        <div className={classes.Footer}>
            {this.state.redirectOnSuccess}
            {loggedInIcon}
        </div>
    )
    }
}

export default Footer