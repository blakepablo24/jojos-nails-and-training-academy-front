import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Layout from './hoc/Layout/Layout';

ReactDOM.render(<Router><Layout /></Router>, document.getElementById('root'));