import React from 'react';
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi';
import { TiDeleteOutline } from 'react-icons/ti';
import classes from './BasketItem.module.css';

const basketItem = (props) => {

    let addMinus =  <div className={classes.quantityContainer}>
                        <BiMinusCircle className="selectable" onClick={props.minus.bind(this, props.id)} />
                        <p>{props.quantity}</p>
                        <BiPlusCircle className="selectable" onClick={props.plus.bind(this, props.id, props.title, props.price, props.subCategoryTitle, props.type)}/>
                    </div>

    if(props.type === "gift_voucher"){
        addMinus =  <div className={classes.quantityContainer}>
                        
                    </div>
    }

    let description = <p>{props.title}</p>;

    if(props.to && props.from) {
        description =   <div>
                            <p>from: {props.from}</p>
                            <p>to: {props.to}</p>
                            <p>message: {props.title}</p>
                        </div>
    }

    return(
        <div className={classes.basketItem}>
            <div className={classes.basketItemImage}>
                <img src={props.image} alt="" />
            </div>
            <div className={classes.basketItemTitleContainer}>
                <p>{props.subCategoryTitle}:</p>
                {description}
            </div>
            {addMinus}
            <p className={classes.price}>£ {props.price}</p>
            <TiDeleteOutline className={classes.delete + " selectable"} color="red" onClick={props.remove.bind(this, props.id)} />
        </div>
    )
}

export default basketItem