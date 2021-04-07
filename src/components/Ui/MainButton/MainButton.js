import React from 'react';
import classes from './MainButton.module.css';

const mainButton = (props) => (
    <button className={classes.MainButton}>
        {props.name}
    </button>
)

export default mainButton