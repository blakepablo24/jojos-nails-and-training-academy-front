import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Snippet.module.css';
import { TiShoppingCart } from "react-icons/ti";

const snippet = (props) => {

    let snippetLink = '/single-training-course/'; 
    let shoppingControlContainer = "";
    let snippetStyle = classes.SnippetLink;

    function checkBasket(id) {
        let alreadyInBasket = false;
        let basketItems = JSON.parse(localStorage.getItem("basketItems"));
        basketItems.forEach(basketItem => {
            if (basketItem.id === id) {
                alreadyInBasket = true;
            }
        });
        return alreadyInBasket;
    }

    if(props.salonTreatment) {
        snippetLink = '/category/' + props.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/';
    }

    if(props.salonTreatmentSubCat) {
        snippetLink = '/treatment/' + props.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/';
        snippetStyle = classes.SnippetWithBasket;
        if(JSON.parse(localStorage.getItem("basketItems"))){
            if(checkBasket(props.id)){
                shoppingControlContainer = 
                    <div onClick={props.addToShoppingBasket.bind(this, props.id, props.title, props.price, props.subCategoryTitle)} className={classes.basketButtonContainer + " " + classes.inBasketButtonContainer}>
                        <TiShoppingCart />In Basket
                    </div>
            } else {
                shoppingControlContainer = 
                    <div onClick={props.addToShoppingBasket.bind(this, props.id, props.title, props.price, props.subCategoryTitle)} className={classes.basketButtonContainer}>
                        <TiShoppingCart />Add to Basket
                    </div>
            }
        } else {
            shoppingControlContainer = 
                <div onClick={props.addToShoppingBasket.bind(this, props.id, props.title, props.price, props.subCategoryTitle)} className={classes.basketButtonContainer}>
                    <TiShoppingCart />Add to Basket
                </div>
        }
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