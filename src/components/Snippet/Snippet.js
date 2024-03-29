import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Snippet.module.css';
import { TiShoppingCart } from "react-icons/ti";
import FUNCTIONS from '../../functions/functions';

const snippet = (props) => {

    let snippetLink = '/single-training-course/'; 
    let shoppingControlContainer = "";
    let snippetStyle = classes.Snippet;
    let snippetLinkStyle = classes.SnippetLink;
    let price = <h4 className={classes.price}>£{props.price}</h4>;

    if(props.salonTreatment) {
        snippetLinkStyle = classes.SnippetLinkNoPrice;
        price = "";
        snippetLink = '/category/' + props.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/';
    }

    if(props.salonTreatmentSubCat) {
        price = "";
        snippetLinkStyle = classes.SnippetLinkNoPrice;
        snippetLink = '/treatment/' + props.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/';
        snippetStyle = classes.SnippetWithBasket;
        let addToBasket =   <div onClick={props.addToShoppingBasket.bind(this, props.id + props.type, "", "", props.title, props.price, props.subCategoryTitle, props.type, props.image)} className={classes.basketButtonContainer}>
                                <TiShoppingCart /><h5>£{props.price}</h5>
                            </div>
        if(JSON.parse(localStorage.getItem("basketItems"))){
            if(FUNCTIONS.checkBasket(props.id + props.type)){
                shoppingControlContainer = 
                    <div onClick={props.toggleBasket} className={classes.basketButtonContainer + " " + classes.inBasketButtonContainer}>
                        <TiShoppingCart />Continue to Basket
                    </div>
            } else {
                shoppingControlContainer = addToBasket;
            }
        } else {
            shoppingControlContainer = addToBasket;
        }
    }
    
    return (
        <div className={snippetStyle} onClick={FUNCTIONS.handleStoringScrollPosition.bind(this, "nav")}>
            <Link to={snippetLink + props.id} className={snippetLinkStyle}>
                <img src={props.image} alt="" />
                <h3 className={classes.title}>{props.title}</h3>
                {price}
            </Link>
            {shoppingControlContainer}
        </div>
    )
}

export default snippet