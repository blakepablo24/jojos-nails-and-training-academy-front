import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <div className={classes.NavigationItem}>
        <Link onClick={props.clicked} to={props.link || '/'} ><h5>{props.linkName}</h5></Link>
    </div>
)

export default navigationItem