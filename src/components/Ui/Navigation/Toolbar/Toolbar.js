import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from './DrawerToggle/DrawerToggle';
import { BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import NavigationItems from '../Toolbar/Navigation/NavigationItems/NavigationItems';

const toolbar = (props) => {

    let icon = "";

    if(props.showSideDrawer && props.numberOfItemsInBasket){
        icon = <p><TiShoppingCart/>({props.numberOfItemsInBasket})</p>;
    }

    if(JSON.parse(localStorage.getItem("user"))){
        icon = <Link to="/admin"><BiUser /></Link>;
    }

    if(props.numberOfItemsInBasket){
        icon = <div className={classes.basketIconContainer+" largeNavItem"} onClick={props.toggleBasket}><TiShoppingCart/><p>({props.numberOfItemsInBasket})</p></div>;
    }

    return(
        <div className={classes.Toolbar}>
            <div className={classes.largeScreensOnly}>
                <NavigationItems />
            </div>
            <div className={classes.basketIconContainer+" largeNavItem"}>{icon}</div>
            <DrawerToggle menu={props.menu} clicked={props.clicked}/>
        </div>
    )
}

export default toolbar