import React from 'react';
import classes from './DrawerToggle.module.css';
import { BiMenu, BiX } from "react-icons/bi";

const drawerToggle = (props) => {

    let menuIcon = <BiX />;

    if(props.menu){
        menuIcon = <BiMenu />
    }

    return (
        <div onClick={props.clicked} className={classes.DrawerToggle}>
            {menuIcon}
        </div>
    )
}

export default drawerToggle