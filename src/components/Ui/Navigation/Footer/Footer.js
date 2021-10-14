import React from 'react';
import classes from './Footer.module.css';
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

const footer = (props) => {

    let rightArrow = <BiRightArrow onClick={props.next} />;
    let leftArrow = <BiLeftArrow onClick={props.previous} />;

    if(props.facebookReviews === (props.facebookReviews.length - 1)) {
        rightArrow = <BiRightArrow />;
    }

    if(props.number === 0) {
        leftArrow = <BiLeftArrow />;
    }

    return(
        <div className={classes.Footer}>
            <div className={classes.ReviewsContainer}>
                {leftArrow}
                <div className={classes.Review}>
                    <p>{new Date(props.facebookReviews[props.number].created_time).toLocaleDateString()}</p>
                    <p>{props.facebookReviews[props.number].review_text}</p>
                </div>  
                {rightArrow}
            </div>
            {/* <p>I will either not be here or I will be replaced by facebook reviews</p> */}
        </div>
    )
}

export default footer