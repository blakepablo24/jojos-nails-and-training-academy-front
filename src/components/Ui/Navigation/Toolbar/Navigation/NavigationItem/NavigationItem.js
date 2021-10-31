import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    
    return(
        <Link className={classes.NavigationItem+" largeNavItem"} onClick={props.clicked} to={props.link || '/'}>
            <h5>{props.linkName}</h5>
        </Link>
    )
}

export default navigationItem