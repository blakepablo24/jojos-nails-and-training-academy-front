import React, { Component } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import Logo from '../../../Header/Logo/Logo';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import CONST from '../../../../../../constants/constants';

class NavigationItems extends Component {

    state = {
        redirectOnSuccess: "" 
    }

    componentDidMount(){
        if(JSON.parse(localStorage.getItem("user"))){
            this.setState({
                userLoggedIn: JSON.parse(localStorage.getItem("user"))
            })   
        }
    }
    
    getData = (val) => {
        this.props.sendData(val);
    }

    logoutHandler = (event) => {
        event.preventDefault();
        if(!this.props.sideDrawerVisible){
            this.props.clicked();
        }
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
            loggedInIcon = <NavigationItem clicked={this.logoutHandler} link="" linkName="Logout"/>
        } else {
            loggedInIcon = <NavigationItem clicked={this.props.clicked} link="/staff-login" linkName="Staff Login"/>
        }

        return(
            <div className={classes.NavigationItems}>
                {this.state.redirectOnSuccess}
                <Logo menuLogo={true} clicked={this.props.clicked}  />
                <div className={classes.topNavItemsContainer}>
                    <NavigationItem clicked={this.props.clicked} link="/training-courses" linkName="Training Courses"/>
                    <NavigationItem clicked={this.props.clicked} link="/salon-treatments" linkName="Salon Treatments"/>
                    <NavigationItem clicked={this.props.clicked} link="/gift-vouchers" linkName="Gift Vouchers"/>
                    <NavigationItem clicked={this.props.clicked} link="/find-us" linkName="Find Us"/>
                </div>
                <div className={classes.bottomNavItemsContainer}>
                    {loggedInIcon}
                </div>
            </div>           
        )
    }

}

export default NavigationItems