import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Layout from './hoc/Layout/Layout';
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51KwVSIC7O3LzD5wBnxb3SaYuZYrCQIuiRBBlW1WQ8tsQeU9UMDfyuaEEINx8iLOqOHy7xqrtkHfYxK17aT457Tll00BUdIrkEd');

ReactDOM.render(
    <Router>
        <Elements stripe={stripePromise}>
            <Layout />
        </Elements>
    </Router>,
    document.getElementById('root')
);