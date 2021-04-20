import React from 'react';
import classes from './Basket.module.css';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop';
import BasketItem from './BasketItem/BasketItem';

const basket = (props) => {
    let attachedClasses = [classes.Basket, classes.Hide];
    let totalCost = 0;
    let currentBasketItems = <h2 className={classes.noItemsInBasket}>There are currently no items in your basket</h2>;

    if(props.itemsInBasket.length > 0){
        let priceArray = [];
        let price = 0;
        props.itemsInBasket.forEach(item => {
            price = item.price * item.quantity;
            priceArray.push(price);

            return priceArray
        });

        totalCost = priceArray.reduce(function(pv, cv) { return pv + cv; });
        
        currentBasketItems =
        props.itemsInBasket.map(item =>
            <BasketItem
                id={item.id}
                key={item.id}
                title={item.title}
                price={item.price * item.quantity}
                quantity={item.quantity}
                remove={props.remove}
                minus={props.minus}
                plus={props.plus}
            />
        )
    }

    if (props.showBasket) {
        attachedClasses = [classes.Basket, classes.Show];
    }

    return(
        <Aux>
            <Backdrop full={props.showBasket} clicked={props.toggleBasket} showBasket={props.showBasket} />
            <div className={attachedClasses.join(' ')}>
            <h3 className={classes.title}>Your Basket</h3>
                <div className={classes.basketContainer}>
                    {currentBasketItems}
                </div>
                <div className={classes.totalPrice}>
                    <p>Total: £ {totalCost}</p>
                </div>
                <div className={classes.basketControlsContainer}>
                    <button className={classes.bookTreatmentsButton} onClick={props.toggleBasket}>Continue Shopping</button>
                    <button className={classes.bookTreatmentsButton}>Book treatments</button>
                </div>
            </div>
        </Aux>
    )
}

export default basket;