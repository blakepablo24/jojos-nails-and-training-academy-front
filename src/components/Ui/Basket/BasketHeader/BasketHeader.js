import React from 'react';
import classes from './BasketHeader.module.css';
import Logo from '../../Navigation/Header/Logo/Logo';

const basketHeader = (props) => {
    return(
        <div className={classes.basketHeader}>
            <Logo nonClickable={true} />
            <h3 className={classes.title}>{props.title}</h3>
        </div>
    )
}

export default basketHeader