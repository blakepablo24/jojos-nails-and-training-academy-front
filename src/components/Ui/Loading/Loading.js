import React from 'react';
import classes from './Loading.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';

const Loading = (props) => {

    let backdrop = <Backdrop loading={true} full={true} />;
    let standardUsage = classes.loadingContainer;
    let message = <h3>Please Wait</h3>;
    if(props.component){
        message = "";
        backdrop = "";
        standardUsage = classes.componentContainer
    }

    if(props.message){
        message = <h3>{props.message}</h3>
    }

    if(props.componentContained){
        message = "";
        backdrop = "";
        standardUsage = classes.componentContained
    }

    return (
        <Aux>
            {backdrop}
            <div className={standardUsage}>
                <div className={classes.loading}>
                    {message}
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>  
                </div>
            </div>
        </Aux>
    )
}

export default Loading