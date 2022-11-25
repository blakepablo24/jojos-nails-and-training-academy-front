import React, { useState } from 'react';
import classes from './Basket.module.css';
import Aux from '../../../hoc/Auxilary/Auxilary';
import CONST from '../../../constants/constants';
import Logo from '../../../components/Ui/Navigation/Header/Logo/Logo';
import { format } from 'date-fns';
import { FcCalendar } from "react-icons/fc";
import Backdrop from '../Backdrop/Backdrop';
import BasketHeader from './BasketHeader/BasketHeader';
import BasketItem from './BasketItem/BasketItem';
import enGb from 'date-fns/locale/en-GB';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays';
import getDay from 'date-fns/getDay';
import FUNCTIONS from '../../../functions/functions';
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import StripePaymentForm from './StripePaymentForm/StripePaymentForm';
import Axios from "axios";
registerLocale('en-gb', enGb);

const stripePromise = loadStripe('pk_test_51KwVSIC7O3LzD5wBnxb3SaYuZYrCQIuiRBBlW1WQ8tsQeU9UMDfyuaEEINx8iLOqOHy7xqrtkHfYxK17aT457Tll00BUdIrkEd');

const Basket = (props) => {

    const [trainingCourseStartDate, setTrainingCourseStartDate] = useState(new Date());
    const [treatmentStartDate, settreatmentStartDate] = useState(new Date());
    const isWeekday = date => {
        const day = getDay(date);
        return day !== 0;
      };
    
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

    let options = {
        // passing the client secret obtained in step 3
        clientSecret: props.sk,
        // Fully customizable with appearance API.
        // appearance: {/*...*/},
      };

    if(props.itemsInBasket.length > 0){
        let priceArray = [];
        let price = 0;
        props.itemsInBasket.forEach(item => {
            price = item.price * item.quantity;
            priceArray.push(price);
            return priceArray
        });

        totalCost = priceArray.reduce(function(pv, cv) { return pv + cv; }).toFixed(2);

        currentBasketItems =
        props.itemsInBasket.map(item =>
            <BasketItem
                id={item.id}
                key={item.id}
                to={item.to}
                from={item.from}
                title={item.title}
                price={item.price * item.quantity}
                image={item.image}
                type={item.type}
                quantity={item.quantity}
                remove={props.remove}
                minus={props.minus}
                plus={props.plus}
                subCategoryTitle={item.subCategoryTitle}
            />
        )
    }

    function checkIfGiftVouchersInBasket() {
        FUNCTIONS.checkBasket("gift_voucher")
            ? handleStripePaymentSubmit()
            : checkIfTrainingCoursesInBasket();
    }

    function checkIfTrainingCoursesInBasket() {
        FUNCTIONS.checkBasket(CONST.TC)
        ? props.checkoutView("book-training-courses")
        : checkIfSalonTreatmentsInBasket();
    }

    function checkIfSalonTreatmentsInBasket() {
        FUNCTIONS.checkBasket(CONST.ST)
        ? props.checkoutView("book-salon-treatments")
        : props.checkoutView("customer-details");
    }

   

    // Send details from card payment section
    const handleStripePaymentSubmit = async () => {
        try {const response = await Axios.post(CONST.BASE_URL + '/api/stripe-payment-intent', {
            currency: 'gbp',
            'totalCost': totalCost,
            'basketItems': props.itemsInBasket
        })
        options.clientSecret = response.data;
        props.checkoutView("complete-gift-voucher", response.data)
        } catch (err) {
            console.log(err);
        }
    }

    if (props.showBasket) {
        attachedClasses = [classes.Basket, classes.Show];
    }

    let totalPrice =    <div className={classes.totalPrice}>
                            <p>Total: £ {totalCost}</p>
                        </div>

    let shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <BasketHeader title="Your Basket" />
                <div className={classes.basketContainer}>
                    {currentBasketItems}
                </div>
                {totalPrice}
                <div className={classes.basketControlsContainer}>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.toggleBasket}>Continue Shopping</button>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={checkIfGiftVouchersInBasket}>Checkout</button>
                </div>
            </div>
    
    if(props.itemsInBasket.length === 0){
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <BasketHeader title="Your Basket" />
                <div className={classes.basketContainer}>
                    {currentBasketItems}
                </div>
                {totalPrice}
                <div className={classes.basketControlsContainer}>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.toggleBasket}>Continue Shopping</button>
                </div>
            </div>
    }

    if(props.checkout === "book-training-courses"){
        let today = new Date();
        let shownDateChoiceMessage = <h3>Select Preferred Training Course Start Date</h3>;
        let shownDateChoice = "";
        if(format(trainingCourseStartDate, 'dd/MM/yyyy') !== format(today, 'dd/MM/yyyy')){
            shownDateChoiceMessage = <h3>Your Selected Training Course Date is:</h3>;
            shownDateChoice =   <div>
                                    <h2>{format(trainingCourseStartDate, 'dd/MM/yyyy')}</h2>
                                    <br></br>
                                    <h4>(Tap Calander to change)</h4>
                                </div>;
        }
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <BasketHeader title="Training Course Booking" />
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
                {totalPrice}
                <div className={classes.basketControlsContainer}>
                <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.checkoutView.bind(this, "main")}>Back to Basket</button>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.trainingCourseErrorCheckHandler}>Next</button>
                </div>
            </div>
    }

    if(props.checkout === "book-salon-treatments"){
        let today = new Date();
        let shownDateChoiceMessage = <h3>Select Preferred Salon Treatments Date</h3>;
        let shownDateChoice = "";
        if(format(treatmentStartDate, 'dd/MM/yyyy') !== format(today, 'dd/MM/yyyy')){
            shownDateChoiceMessage = <h3>Your Selected Salon Treatments Date is:</h3>;
            shownDateChoice =   <div>
                                    <h2>{format(treatmentStartDate, 'dd/MM/yyyy')}</h2>
                                    <br></br>
                                    <h4>(Tap Calander to change)</h4>
                                </div>;
        }
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <BasketHeader title="Your Salon Treatments" />
                <div className={classes.basketContainer}>
                    <div className={classes.calanderContainer}>
                        <DatePicker
                            locale="en-gb"
                            dateFormat={'dd/MM/yyyy'}
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
                {totalPrice}
                <div className={classes.basketControlsContainer}>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.checkoutView.bind(this, "main")}>Back to Basket</button>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.treatmentErrorCheckHandler}>Next</button>
                </div>
            </div>
    }

    if(props.checkout === "complete-gift-voucher"){
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <BasketHeader title="Gift Voucher Payment" />
                <div className={classes.basketContainer}>
                <Elements stripe={stripePromise} options={options}>
                    <StripePaymentForm statusView={props.statusView}/>
                </Elements>    
                </div>
                {totalPrice}
                <div className={classes.basketControlsContainer}>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.checkoutView.bind(this, "main")}>Back to Basket</button>
                </div>
            </div>
    }

    if(props.checkout === "customer-details"){
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <BasketHeader title="Your Information" />
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
                {totalPrice}
                <div className={classes.basketControlsContainer}>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={props.checkoutView.bind(this, "main")}>Back to Basket</button>
                    <button className={"customButton " + classes.bookTreatmentsButton} onClick={(event) => props.finishHandler(event, totalCost)}>Finish</button>
                </div>
            </div>
    }

    if(props.checkout === "payment-status-view"){
        shownBasketInfo = 
            <div className={attachedClasses.join(' ')}>
                <BasketHeader title="Payment Status" />
                <div className={classes.basketContainer}>
                    <h1>Payment status</h1>
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