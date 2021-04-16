import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Snippet.module.css';
import { TiShoppingCart } from "react-icons/ti";

const snippet = (props) => {

    let snippetLink = '/single-training-course/'; 
    let shoppingControlContainer = "";
    let snippetStyle = classes.SnippetLink;

    if(props.salonTreatment) {
        snippetLink = '/category/' + props.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/';
    }

    if(props.salonTreatmentSubCat) {
        snippetLink = '/treatment/' + props.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/';
        snippetStyle = classes.SnippetWithBasket;
        shoppingControlContainer = 
        <div onClick={props.addToShoppingBasket.bind(this, props.id, props.title, props.price)} className={classes.basketButtonContainer}>
            <TiShoppingCart />Add to Basket
        </div>
    }

    return (
        <div className={classes.Snippet}>
            <Link to={snippetLink + props.id} className={snippetStyle} >
                <img src={props.image} alt="" />
                <h3>{props.title}</h3>
            </Link>
            {shoppingControlContainer}
        </div>
    )
}

export default snippet