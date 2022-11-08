import { CardElement } from "@stripe/react-stripe-js";
import classes from "./StripePaymentForm.module.css";

const CheckoutForm = (props) => {



    return (
        <form className={classes.CheckoutForm}>
            <CardElement />
            {props.totalPrice}
        </form>
    );
};

export default CheckoutForm