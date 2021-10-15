import React from 'react';
import classes from './Footer.module.css';
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { ImFacebook2 } from "react-icons/im";
import { FaStar } from "react-icons/fa";

const footer = (props) => {

    let rightArrow = <div className={classes.selectable} onClick={props.next}><BiRightArrow /></div>;
    let leftArrow = <div className={classes.selectable} onClick={props.previous}><BiLeftArrow /></div>;

    if(props.number === (props.facebookInfo.ratings.length - 1)) {
        rightArrow = <div className={classes.notSelectable}><BiRightArrow /></div>;
    }

    if(props.number === 0) {
        leftArrow = <div className={classes.notSelectable}><BiLeftArrow /></div>;
    }

    let stars = <div className={classes.fbStars}>{Array.from({length:props.facebookInfo.overall_star_rating}, (_, i) => <FaStar key={i}/>)}</div>

    console.log(props.facebookInfo.ratings);

    return(
        <div className={classes.Footer}>
            <div className={classes.fbHeader}><ImFacebook2 />{stars} from {props.facebookInfo.rating_count} Reviews</div>
            <div className={classes.ReviewsContainer}>
                {leftArrow}
                <div className={classes.Review}>
                    <p>{new Date(props.facebookInfo.ratings[props.number].created_time).toLocaleDateString()}</p>
                    <p>{props.facebookInfo.ratings[props.number].review_text}</p>
                </div>  
                {rightArrow}
            </div>
            {/* <p>I will either not be here or I will be replaced by facebook reviews</p> */}
        </div>
    )
}

export default footer