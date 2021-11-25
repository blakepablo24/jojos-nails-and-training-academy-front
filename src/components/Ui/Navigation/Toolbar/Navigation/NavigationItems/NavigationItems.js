import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import Logo from '../../../Header/Logo/Logo';

const navigationItems = (props) => {
        return(
            <div className={classes.NavigationItems}>
                <div className={classes.smallScreenOnly}>
                    <Logo nonClickable={true} clicked={props.clicked}  />
                </div>
                <div className={classes.topNavItemsContainer}>
                    <NavigationItem clicked={props.clicked} link="/training-courses" linkName="Training Courses"/>
                    <NavigationItem clicked={props.clicked} link="/salon-treatments" linkName="Salon Treatments"/>
                    <NavigationItem clicked={props.clicked} link="/gift-vouchers" linkName="Gift Vouchers"/>
                    <NavigationItem clicked={props.clicked} link="/find-us" linkName="Find Us"/>
                </div>
            </div>           
        )
}

export default navigationItems