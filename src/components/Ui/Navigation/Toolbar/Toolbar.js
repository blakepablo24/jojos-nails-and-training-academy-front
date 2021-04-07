import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from './DrawerToggle/DrawerToggle';
import { BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom';

const toolbar = (props) => {

    let userIcon = "";
    let styles = classes.Toolbar;

    if(JSON.parse(localStorage.getItem("user"))){
        userIcon = <Link to="/admin"><BiUser /></Link>;
        styles = classes.toolBarWithUser;
    }

    return(
        <div className={styles}>
            {userIcon}
            <DrawerToggle menu={props.menu} clicked={props.clicked}/>
        </div>
    )
}

export default toolbar