import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Snippet.module.css';
import { TiShoppingCart } from "react-icons/ti";
import FUNCTIONS from '../../functions/functions';

const snippet = (props) => {

    let snippetLink = '/single-training-course/'; 
    let shoppingControlContainer = "";
    let snippetStyle = classes.Snippet;

    if(props.salonTreatment) {
        snippetLink = '/category/' + props.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/';
    }

    if(props.salonTreatmentSubCat) {
        snippetLink = '/treatment/' + props.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/';
        snippetStyle = classes.SnippetWithBasket;
        if(JSON.parse(localStorage.getItem("basketItems"))){
            if(FUNCTIONS.checkBasket(props.id + props.type)){
                shoppingControlContainer = 
                    <div onClick={props.toggleBasket} className={classes.basketButtonContainer + " " + classes.inBasketButtonContainer}>
                        <TiShoppingCart />Continue to Basket
                    </div>
            } else {
                shoppingControlContainer = 
                    <div onClick={props.addToShoppingBasket.bind(this, props.id + props.type, props.title, props.price, props.subCategoryTitle, props.type)} className={classes.basketButtonContainer}>
                        <TiShoppingCart />Add to Basket
                    </div>
            }
        } else {
            shoppingControlContainer = 
                <div onClick={props.addToShoppingBasket.bind(this, props.id + props.type, props.title, props.price, props.subCategoryTitle, props.type)} className={classes.basketButtonContainer}>
                    <TiShoppingCart />Add to Basket
                </div>
        }
    }

    return (
        <div className={snippetStyle}>
            <Link to={snippetLink + props.id} className={classes.SnippetLink}>
                <img src={props.image} alt="" />
                <h3 className={classes.title}>{props.title}</h3>
            </Link>
            {shoppingControlContainer}
        </div>
    )
}

export default snippet