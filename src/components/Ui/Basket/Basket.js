import React, { useState } from 'react';
import classes from './Basket.module.css';
import Aux from '../../../hoc/Auxilary/Auxilary';
import { format } from 'date-fns';
import { FcCalendar } from "react-icons/fc";
import Backdrop from '../Backdrop/Backdrop';
import BasketItem from './BasketItem/BasketItem';
import enGb from 'date-fns/locale/en-GB';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';
import getDay from 'date-fns/getDay';
registerLocale('en-gb', enGb);

const Basket = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const isWeekday = date => {
        const day = getDay(date);
        return day !== 0;
      };
    function onChange(date) {
        setStartDate(date);
        props.dateChangehandler(format(date, 'dd/MM/yyyy'));
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
                    <input 
                        type="text" 
                        placeholder="Full Name"
                        name="bookingRequestName"
                        autoComplete="off"
                        value={props.bookingRequestName}
                        onChange={props.changeHandler}
                    />
                    {props.bookingRequestNameError}
                    <input 
                        type="text" 
                        placeholder="Email Address"
                        name="bookingRequestEmail"
                        autoComplete="off"
                        value={props.bookingRequestEmail}
                        onChange={props.changeHandler}
                    />
                    {props.bookingRequestEmailError}
                    <input 
                        type="number" 
                        placeholder="Contact Number"
                        name="bookingRequestNumber"
                        autoComplete="off"
                        value={props.bookingRequestNumber}
                        onChange={props.changeHandler}
                    />
                    {props.bookingRequestNumberError}
                    <div className={classes.calanderContainer}>
                        <DatePicker
                            locale="en-gb"
                            dateFormat={'dd/MM/yyyy'}
                            // selected={startDate}
                            placeholderText="Please select a date"
                            onChange={onChange}
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 330)}
                            customInput={<p><FcCalendar /></p>}
                            filterDate={isWeekday}
                        />
                        <p>{props.bookingRequestDate}</p>
                    </div>
                    {props.bookingRequestDateError}
                <select
                    name="bookingRequestTime"
                    value={props.bookingRequestTime}
                    onChange={props.changeHandler}
                >
                    <option value="select">Select Time</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                </select>
                {props.bookingRequestTimeError}
                </div>
                <div className={classes.totalPrice}>
                    <p>Total: £ {totalCost}</p>
                </div>
                <div className={classes.basketControlsContainer}>
                    <button className={classes.bookTreatmentsButton} onClick={props.toggleCheckout}>Back to Basket</button>
                    <button className={classes.bookTreatmentsButton} onClick={props.finishHandler}>Finish</button>
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