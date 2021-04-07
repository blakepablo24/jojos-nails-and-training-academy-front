import React from 'react';
import classes from './Header.module.css';
import Logo from './Logo/Logo';

const header = () => (
    <div className={classes.Header}>
        <Logo />
    </div>
)

export default header