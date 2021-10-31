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
        number: 0
    }

    componentDidMount = () => {
        axios.get(CONST.FB).then(response => {
            this.setState({
                facebookInfo: {overall_star_rating: response.data.overall_star_rating, rating_count: response.data.rating_count, ratings: response.data.ratings.data.slice(0, 10)}
            })
        }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        
          });
    }

    next = () => {
        this.setState({
            number: this.state.number + 1
        })
    }

    previous = () => {
        this.setState({
            number: this.state.number - 1
        })
    }

    render(){

        let rightArrow = <div className={classes.selectable} onClick={this.next}><BiRightArrow /></div>;
        let leftArrow = <div className={classes.selectable} onClick={this.previous}><BiLeftArrow /></div>;

        if(this.state.number === (this.state.facebookInfo.ratings.length - 1)) {
            rightArrow = <div className={classes.notSelectable}><BiRightArrow /></div>;
        }

        if(this.state.number === 0) {
            leftArrow = <div className={classes.notSelectable}><BiLeftArrow /></div>;
        }

        let stars = <div className={classes.fbStars}>{Array.from({length:this.state.facebookInfo.overall_star_rating}, (_, i) => <FaStar key={i}/>)}</div>


        return(
            <div className={classes.Reviews}>
                <div className={classes.fbHeader}><ImFacebook2 />{stars} from {this.state.facebookInfo.rating_count} Reviews</div>
                <div className={classes.ReviewsContainer}>
                    {leftArrow}
                    <div className={classes.Review}>
                        <p>{new Date(this.state.facebookInfo.ratings[this.state.number].created_time).toLocaleDateString()}</p>
                        <div>{this.state.facebookInfo.ratings[this.state.number].review_text}</div>
                    </div>  
                    {rightArrow}
                </div>
            </div>
        )
    }

}

export default Reviews