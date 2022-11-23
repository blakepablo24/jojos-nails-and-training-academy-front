import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import classes from "./StripePaymentForm.module.css";
import Axios from "axios";
import CONST from '../../../../constants/constants';

const CheckoutForm = (props) => {
    const elements = useElements();
    const stripe = useStripe();

    const cardNumber = elements.getElement('cardNumber');

    console.log(cardNumber);

    // Send details from card payment section
    const handleStripePaymentSubmit = (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }
        const clientSecret = Axios.post(CONST.BASE_URL + '/api/stripe-payment-intent', {
            paymentMethodType: 'card',
            currency: 'gbp',
            'totalCost': props.totalCost,
            'basketItems': props.currentBasketItems
        }).then(clientSecret => {
            handleStripeAwait(clientSecret);
        }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        
          });
    }
    // Await response from Stripe
    const handleStripeAwait = async (clientSecret)=> {
        console.log(clientSecret);
        const {paymentIntent} = await stripe.confirmCardPayment(
            clientSecret.data, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            }
        )
        console.log("payment successful" + paymentIntent.id + paymentIntent.status);
    }

    return (
        <div className={classes.CheckoutForm} >
            <form onSubmit={handleStripePaymentSubmit}>
                <label className={classes.formLabel} htmlFor="card-element"><h2>Card</h2></label>
                <CardElement id="card-element"/>
                <button className={"customButton " + classes.payButton}>Pay</button>
            </form>
        </div>
    );
};

export default CheckoutForm