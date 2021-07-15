import React from 'react';
import classes from './Loading.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';

const Loading = (props) => {
    return (
        <Aux>
            <Backdrop loading ={true} full={true} />
            <div className={classes.loadingContainer}>
                <div className={classes.loading}>
                    <h3>Please Wait</h3>
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>  
                </div>
            </div>
        </Aux>
    )
}

export default Loading