import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.css';
import logoImage from './logo.png';

const logo = (props) => {

    let logoSize = classes.Logo;

    if(props.menuLogo) {
        logoSize = classes.menuLogo;
    }

    return (
        <Link onClick={props.clicked} to="/" className={logoSize}>
            <img src={logoImage} alt=""/>
        </Link>
    )
}

export default logo