import React, { useState } from 'react';
import classes from './Basket.module.css';
import Aux from '../../../hoc/Auxilary/Auxilary';
import CONST from '../../../constants/constants';
import Logo from '../../../components/Ui/Navigation/Header/Logo/Logo';
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

    const [trainingCourseStartDate, setTrainingCourseStartDate] = useState(new Date());
    const [treatmentStartDate, settreatmentStartDate] = useState(new Date());
    const isWeekday = date => {
        const day = getDay(date);
        return day !== 0;
      };

      function checkBasket(id) {
        let alreadyInBasket = false;
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));
        basketItems.forEach(basketItem => {
            if (basketItem.type === id) {
                alreadyInBasket = true;
            }
        });
        return alreadyInBasket;
    }
    
    function onTrainingCourseStartDateChange(date) {
        setTrainingCourseStartDate(date);
        props.trainingCourseStartdateChangehandler(format(date, 'dd/MM/yyyy'));
    }

    function onTreatmentStartDateChange(date) {
        settreatmentStartDate(date);
        props.treatmentsStartdateChangehandler(format(date, 'dd/MM/yyyy'));
    }

    function enquirySentButton() {
        props.toggleBasket();
        props.checkoutView(false);
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
                type={item.type}
                quantity={item.quantity}
                remove={props.remove}
                minus={props.minus}
                plus={props.plus}
                subCategoryTitle={item.subCategoryTitle}
            />
        )
    }

    let checkoutButtonFunction = "book-salon-treatments";

    if(JSON.parse(localStorage.getItem("basketItems"))){
        if(checkBasket(CONST.TC)){
            checkoutButtonFunction = "book-training-courses"
        }
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
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.toggleBasket}>Continue Shopping</button>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.checkoutView.bind(this, checkoutButtonFunction)}>Checkout</button>
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
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.toggleBasket}>Continue Shopping</button>
                </div>
            </div>
    }

    if(props.checkout === "book-training-courses"){
        let today = new Date();
        let shownDateChoiceMessage = <h3>Select Preferred Training Course Start Date</h3>;
        let shownDateChoice = "";
        if(format(trainingCourseStartDate, 'dd/MM/yyyy') != format(today, 'dd/MM/yyyy')){
            shownDateChoiceMessage = <h3>Your Selected Training Course Date is:</h3>;
            shownDateChoice =   <div>
                                    <h2>{format(trainingCourseStartDate, 'dd/MM/yyyy')}</h2>
                                    <br></br>
                                    <h4>(Tap Calander to change)</h4>
                                </div>;
        }
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <h3 className={classes.title}>Treatment Course Booking</h3>
                <div className={classes.basketContainer}>
                    <div className={classes.calanderContainer}>
                        <DatePicker
                            locale="en-gb"
                            dateFormat={'dd/MM/yyyy'}
                            // selected={startDate}
                            placeholderText="Please select a date"
                            onChange={onTrainingCourseStartDateChange}
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 330)}
                            customInput={
                                <div className={classes.calanderImagecontainer}>
                                    <FcCalendar />
                                    {shownDateChoiceMessage}
                                    {shownDateChoice}
                                </div>
                            }
                            filterDate={isWeekday}
                        />
                    </div>
                    {props.trainingCourseStartdateError}
                </div>
                <div className={classes.totalPrice}>
                    <p>Total: £ {totalCost}</p>
                </div>
                <div className={classes.basketControlsContainer}>
                <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.checkoutView.bind(this, "main")}>Back to Basket</button>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.trainingCourseErrorCheckHandler}>Next</button>
                </div>
            </div>
    }

    if(props.checkout === "book-salon-treatments"){
        let today = new Date();
        let shownDateChoiceMessage = <h3>Select Preferred Salon Tretments Date</h3>;
        let shownDateChoice = "";
        if(format(treatmentStartDate, 'dd/MM/yyyy') != format(today, 'dd/MM/yyyy')){
            shownDateChoiceMessage = <h3>Your Selected Salon Treatments Date is:</h3>;
            shownDateChoice =   <div>
                                    <h2>{format(treatmentStartDate, 'dd/MM/yyyy')}</h2>
                                    <br></br>
                                    <h4>(Tap Calander to change)</h4>
                                </div>;
        }
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <h3 className={classes.title}>Your Salon Treatments</h3>
                <div className={classes.basketContainer}>
                    <div className={classes.calanderContainer}>
                        <DatePicker
                            locale="en-gb"
                            dateFormat={'dd/MM/yyyy'}
                            // selected={startDate}
                            placeholderText="Please select a date"
                            onChange={onTreatmentStartDateChange}
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 330)}
                            customInput={
                                <div className={classes.calanderImagecontainer}>
                                    <FcCalendar />
                                    {shownDateChoiceMessage}
                                    {shownDateChoice}
                                </div>
                            }
                            filterDate={isWeekday}
                        />
                    </div>
                    {props.treatmentsStartdateError}
                    <select
                            name="bookingRequestTime"
                            value={props.bookingRequestTime}
                            onChange={props.changeHandler}
                        >
                        <option value="select">Select preferred Time</option>
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
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.checkoutView.bind(this, "main")}>Back to Basket</button>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.treatmentErrorCheckHandler}>Next</button>
                </div>
            </div>
    }

    if(props.checkout === "customer-details"){
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <h3 className={classes.title}>Your Information</h3>
                <div className={classes.basketContainer}>
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
                </div>
                <div className={classes.totalPrice}>
                    <p>Total: £ {totalCost}</p>
                </div>
                <div className={classes.basketControlsContainer}>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.checkoutView.bind(this, "main")}>Back to Basket</button>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={(event) => props.finishHandler(event, totalCost)}>Finish</button>
                </div>
            </div>
    }

    if(props.checkout === "completed"){
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <div className={classes.completed}>
                    <div className={classes.logo}>
                        <Logo />
                    </div>
                    <h3 className="success">
                        Thank you for your enquiry. JOJOS will get back to you as soon as possible with availability
                    </h3>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={enquirySentButton}>Close</button>
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