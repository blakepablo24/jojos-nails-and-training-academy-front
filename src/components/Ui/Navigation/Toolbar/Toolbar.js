import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from './DrawerToggle/DrawerToggle';
import { BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import NavigationItems from '../Toolbar/Navigation/NavigationItems/NavigationItems';

const toolbar = (props) => {

    let userIcon = "";
    let basketIcon = <div className={classes.basketIconContainer+" largeNavItem"} onClick={props.toggleBasket}><TiShoppingCart/><p>({props.numberOfItemsInBasket})</p></div>;

    if(props.showSideDrawer){
        basketIcon = <div className={classes.basketIconContainer+" largeNavItem"}><TiShoppingCart/><p>({props.numberOfItemsInBasket})</p></div>;
    }

    if(JSON.parse(localStorage.getItem("user"))){
        userIcon = <Link to="/admin"><BiUser /></Link>;
        basketIcon = "";
    }

    return(
        <div className={classes.Toolbar}>
            <div className={classes.largeScreensOnly}>
                <NavigationItems />
            </div>
            {basketIcon}
            {userIcon}
            <DrawerToggle menu={props.menu} clicked={props.clicked}/>
        </div>
    )
}

export default toolbar