import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from './DrawerToggle/DrawerToggle';
import { BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";

const toolbar = (props) => {

    let userIcon = "";
    let basketIcon = <div className={classes.basketIconContainer} onClick={props.toggleBasket}><TiShoppingCart/><p>({props.numberOfItemsInBasket})</p></div>;
    
    if(JSON.parse(localStorage.getItem("user"))){
        userIcon = <Link to="/admin"><BiUser /></Link>;
    }

    if(props.showSideDrawer){
        basketIcon = <div className={classes.basketIconContainer}><TiShoppingCart/><p>({props.numberOfItemsInBasket})</p></div>;
    }

    return(
        <div className={classes.Toolbar}>
            {basketIcon}
            {userIcon}
            <DrawerToggle menu={props.menu} clicked={props.clicked}/>
        </div>
    )
}

export default toolbar