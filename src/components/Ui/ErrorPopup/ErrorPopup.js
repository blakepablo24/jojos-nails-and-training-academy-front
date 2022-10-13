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
            <p>"{props.message}"</p>
            <p>If you require further information please contact Jojos technical support unit</p>
            <button onClick={props.shownErrorToggle} className={classes.closeButton + " customButton"}>Close</button>
        </div>
    </Aux>
)

export default errorPopup