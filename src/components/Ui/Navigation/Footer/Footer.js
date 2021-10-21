import React, { Component } from 'react';
import classes from './Footer.module.css';
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { ImFacebook2 } from "react-icons/im";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import CONST from '../../../../constants/constants';

class Footer extends Component {

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
    let rightArrow = <div className={classes.selectable} onClick={this.props.next}><BiRightArrow /></div>;
    let leftArrow = <div className={classes.selectable} onClick={this.props.previous}><BiLeftArrow /></div>;

    if(this.props.number === (this.props.facebookInfo.ratings.length - 1)) {
        rightArrow = <div className={classes.notSelectable}><BiRightArrow /></div>;
    }

    if(this.props.number === 0) {
        leftArrow = <div className={classes.notSelectable}><BiLeftArrow /></div>;
    }

    let stars = <div className={classes.fbStars}>{Array.from({length:this.props.facebookInfo.overall_star_rating}, (_, i) => <FaStar key={i}/>)}</div>

    let loggedInIcon = "";

        if(JSON.parse(localStorage.getItem("user"))){
            loggedInIcon = <Link onClick={this.logoutHandler} to="">Logout</Link>
        } else {
            loggedInIcon = <Link onClick={this.props.scrollToTop} to="/staff-login">Staff Login</Link>
        }

    return(
        <div className={classes.Footer}>
            {this.state.redirectOnSuccess}
            <div className={classes.fbHeader}><ImFacebook2 />{stars} from {this.props.facebookInfo.rating_count} Reviews</div>
            <div className={classes.ReviewsContainer}>
                {leftArrow}
                <div className={classes.Review}>
                    <p>{new Date(this.props.facebookInfo.ratings[this.props.number].created_time).toLocaleDateString()}</p>
                    <div>{this.props.facebookInfo.ratings[this.props.number].review_text}</div>
                </div>  
                {rightArrow}
            </div>
            <div className={classes.bottomFooterContainer}>
                {loggedInIcon}
            </div>
        </div>
    )
    }
}

export default Footer