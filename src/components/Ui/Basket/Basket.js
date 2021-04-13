import React from 'react';
import classes from './Basket.module.css';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop';
import { BiSend } from "react-icons/bi";

const basket = (props) => {
    let attachedClasses = [classes.Basket, classes.Hide];

    if (props.showBasket) {
        attachedClasses = [classes.Basket, classes.Show];
    }

    return(
        <Aux>
            <Backdrop full={props.showBasket} clicked={props.toggleBasket} showBasket={props.showBasket} />
            <div className={attachedClasses.join(' ')}>
                <div className={props.basketItemsContainer}>

                </div>
                <div className={classes.basketControlsContainer}>
                <button className={classes.bookTreatmentsButton}>Continue Shopping</button>
                    <button className={classes.bookTreatmentsButton}>Book treatments</button>
                </div>
            </div>
        </Aux>
    )
}

export default basket