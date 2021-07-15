import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {

    let showBackdrop = classes.Backdrop;

    if(props.full) {
        showBackdrop = classes.full;
    }

    if(props.loading) {
        showBackdrop = classes.loading;
    }

    if(props.open){
        showBackdrop = classes.show;
    }

    return (
        <div onClick={props.clicked} className={showBackdrop}>

        </div>
    )
}

export default backdrop