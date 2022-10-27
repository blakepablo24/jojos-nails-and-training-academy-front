import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Layout from './hoc/Layout/Layout';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(
    'pk_test_51KwVSIC7O3LzD5wBnxb3SaYuZYrCQIuiRBBlW1WQ8tsQeU9UMDfyuaEEINx8iLOqOHy7xqrtkHfYxK17aT457Tll00BUdIrkEd'
);

const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51KwVSIC7O3LzD5wBk4b8crikI2bYpwZa9OFGyW5ngRYPQ3HzYFweNDUa8Uu9dBFq4Npsn8iBIMlWjgml4DQMojxS0083fxbUl7',
  };

ReactDOM.render(
    <Router>
        <Elements stripe={stripePromise} options={options}>
            <Layout />
        </Elements>
    </Router>,
    document.getElementById('root')
);