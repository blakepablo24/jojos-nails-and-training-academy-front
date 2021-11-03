import React, { Component } from 'react';
import classes from './Reviews.module.css';
import Loading from '../Loading/Loading';
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { ImFacebook2 } from "react-icons/im";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import CONST from '../../../constants/constants';

class Reviews extends Component {

    state = {
        loading: "",
        facebookInfo: {
            overall_star_rating: 0,
            rating_count: 0,
            ratings: [{review_text:<Loading component={true}/>}]
        },
        number: 0,
        largeScreenImage: 3
    }

    componentDidMount = () => {
        axios.get(CONST.FB).then(response => {
            this.setState({
                facebookInfo: {overall_star_rating: response.data.overall_star_rating, rating_count: response.data.rating_count, ratings: response.data.ratings.data.slice(0, 12)}
            })
        })
    }

    next = () => {
        this.setState({
            number: this.state.number + 1,
            largeScreenImage: this.state.largeScreenImage + 1
        })
    }

    previous = () => {
        this.setState({
            number: this.state.number - 1,
            largeScreenImage: this.state.largeScreenImage - 1
        })
    }

    render(){

        let rightArrow = <div className={classes.selectable} onClick={this.next}><BiRightArrow /></div>;
        let leftArrow = <div className={classes.selectable} onClick={this.previous}><BiLeftArrow /></div>;

        if(this.state.number === (this.state.facebookInfo.ratings.length) || this.state.largeScreenImage === (this.state.facebookInfo.ratings.length + 2)) {
            rightArrow = <div className={classes.notSelectable}><BiRightArrow /></div>;
        }

        if(this.state.number === 0) {
            leftArrow = <div className={classes.notSelectable}><BiLeftArrow /></div>;
        }

        let stars = <div className={classes.fbStars}>{Array.from({length:this.state.facebookInfo.overall_star_rating}, (_, i) => <FaStar key={i}/>)}</div>
        let shownReviews =  <div className={classes.largeScreenReviewsContainer}>
                                <div className={classes.Review}>
                                    <p>{new Date(this.state.facebookInfo.ratings[this.state.number].created_time).toLocaleDateString()}</p>
                                    <div>{this.state.facebookInfo.ratings[this.state.number].review_text}</div>
                                </div>
                            </div>
                            
        
        if(window.innerWidth > window.innerHeight){
            let threeReviews = this.state.facebookInfo.ratings.slice(this.state.number, this.state.largeScreenImage);

            shownReviews = <div className={classes.largeScreenReviewsContainer}>
                                {threeReviews.map((review, key) => 
                                    <div className={classes.Review} key={key}>
                                        <p>{new Date(review.created_time).toLocaleDateString()}</p>
                                        <div>{review.review_text}</div>
                                    </div>
                                )}
                            </div>
        }

        return(
            <div className={classes.Reviews}>
                <div className={classes.fbHeader}><ImFacebook2 />{stars} from {this.state.facebookInfo.rating_count} Reviews</div>
                <div className={classes.ReviewsContainer}>
                    {leftArrow}
                    {shownReviews}
                    {rightArrow}
                </div>
            </div>
        )
    }

}

export default Reviews