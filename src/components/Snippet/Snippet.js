import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Snippet.module.css';

const snippet = (props) => {

    let snippetLink = '/single-training-course/'; 

    if(props.salonTreatment) {
        snippetLink = '/category/' + props.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/';
    }

    if(props.salonTreatmentSubCat) {
        snippetLink = '/treatment/' + props.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/';
    }

    return (
        <Link to={snippetLink + props.id} className={classes.Snippet}>
            <img src={props.image} alt="" />
            <h3>{props.title}</h3>
        </Link>
    )
}

export default snippet