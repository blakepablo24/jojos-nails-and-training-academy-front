import React from 'react';
import classes from './Basket.module.css';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop';

const basket = (props) => {
    let attachedClasses = [classes.Basket, classes.Hide];

    if (props.showBasket) {
        attachedClasses = [classes.Basket, classes.Show];
    }

    return(
        <Aux>
            <Backdrop clicked={props.clicked} showBasket={props.open} />
            <div className={attachedClasses.join(' ')}>

            </div>
        </Aux>
    )
}

export default basket