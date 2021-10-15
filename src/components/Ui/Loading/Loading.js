import React from 'react';
import classes from './Loading.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';

const Loading = (props) => {

    let backdrop = <Backdrop loading={true} full={true} />;
    let standardUsage = classes.loadingContainer
    if(props.component){
        backdrop = "";
        standardUsage = classes.componentContainer
    }

    return (
        <Aux>
            {backdrop}
            <div className={standardUsage}>
                <div className={classes.loading}>
                    <h3>Please Wait</h3>
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>  
                </div>
            </div>
        </Aux>
    )
}

export default Loading