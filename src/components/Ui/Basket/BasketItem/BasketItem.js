import React from 'react';
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi';
import { TiDeleteOutline } from 'react-icons/ti';
import classes from './BasketItem.module.css';

const basketItem = (props) => (
    <div className={classes.basketItem}>
        <p className={classes.basketItemTitle}>{props.title}</p>
        <div className={classes.quantityContainer}>
            <BiMinusCircle onClick={props.minus.bind(this, props.id)} />
            <p>{props.quantity}</p>
            <BiPlusCircle onClick={props.plus.bind(this, props.id, props.title, props.price)}/>
        </div>
        <p>£ {props.price}</p>
        <TiDeleteOutline color="red" onClick={props.remove.bind(this, props.id)} />
    </div>
)

export default basketItem