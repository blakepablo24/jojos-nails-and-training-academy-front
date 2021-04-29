import React, { useState } from 'react';
import classes from './Basket.module.css';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop';
import BasketItem from './BasketItem/BasketItem';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';

const Basket = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    
    function onChange(date) {
        setStartDate(date);
        props.dateChangehandler(date);
    }

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
                subCategoryTitle={item.subCategoryTitle}
            />
        )
    }

    if (props.showBasket) {
        attachedClasses = [classes.Basket, classes.Show];
    }

    let shownBasketInfo = 
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
                    <button className={classes.bookTreatmentsButton} onClick={props.toggleCheckout}>Book treatments</button>
                </div>
            </div>
    
    if(props.itemsInBasket.length === 0){
        shownBasketInfo = 
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
                </div>
            </div>
    }

    if(props.checkout){
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <h3 className={classes.title}>Treatment Booking form</h3>
                <div className={classes.basketContainer}>
                    <h3 >Please enter the following information:</h3>
                    <input type="text" placeholder="Full Name" />
                    <input type="text" placeholder="Email Address" />
                    <input type="number" placeholder="Contact Number" />
                    <DatePicker
                        dateFormat={'dd/MM/yyyy'}
                        selected={startDate} 
                        onChange={onChange}
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 330)}
                    />
                </div>
                <div className={classes.totalPrice}>
                    <p>Total: £ {totalCost}</p>
                </div>
                <div className={classes.basketControlsContainer}>
                    <button className={classes.bookTreatmentsButton} onClick={props.toggleCheckout}>Back to Basket</button>
                    <button className={classes.bookTreatmentsButton} >Book treatments</button>
                </div>
            </div>
    }

    return(
        <Aux>
            <Backdrop full={props.showBasket} clicked={props.toggleBasket} showBasket={props.showBasket} toggleCheckout={props.toggleCheckout}/>
            {shownBasketInfo}
        </Aux>
    )
}

export default Basket;