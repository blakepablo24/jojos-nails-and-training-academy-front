import React from 'react';
import classes from './ErrorPopup.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';

const errorPopup = (props) => (
    <Aux>
        <Backdrop full={true} clicked={props.shownErrorToggle}/>
        <div className={classes.ErrorPopup}>
            <p className={classes.title}>Network Error</p>
            <p>Well This is Embarrasing!</p>
            <p>Get in contact with JOJO's technical support mention the error came from "{props.message}"</p>
            <button onClick={props.shownErrorToggle} className={classes.closeButton + " customButton"}>Close</button>
        </div>
    </Aux>
)

export default errorPopup