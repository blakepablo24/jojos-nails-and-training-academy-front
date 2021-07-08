import React from 'react';
import classes from './Latest.module.css';

const latest = (props) => {
    
    return(
        <div className={classes.Latest}>
            <h3>{props.message}</h3>
        </div>
    )
}

export default latest