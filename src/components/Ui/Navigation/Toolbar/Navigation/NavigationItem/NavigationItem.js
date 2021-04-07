import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <div className={classes.NavigationItem}>
        <Link onClick={props.clicked} to={props.link || '/'} >{props.linkName}</Link>
    </div>
)

export default navigationItem