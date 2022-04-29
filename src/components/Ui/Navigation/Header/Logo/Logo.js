import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.css';
import logoImage from './logo.png';

const logo = (props) => {
    
    let logoClass = classes.Logo

    if(props.admin){
        logoClass = classes.adminLogo
    }

    let logoType =  <Link onClick={props.clicked} to="/">
                        <img src={logoImage} alt=""/>
                    </Link>

    if(props.nonClickable) {
        logoType = <img src={logoImage} alt=""/>
    }

    return (
        <div className={logoClass}>
            {logoType}
        </div>
    )
}

export default logo