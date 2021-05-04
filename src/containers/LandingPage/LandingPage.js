import React, { Component } from 'react';
import classes from './LandingPage.module.css';
import CONST from '../../constants/constants';
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import Aux from '../../hoc/Auxilary/Auxilary';
import axios from 'axios';

class LandingPage extends Component {
    
    state = {
        images: [],
        image: 0
    }

    componentDidMount(){
        let prePopulatedImages = [];
        axios.get(CONST.BASE_URL + '/api/get-front-page-images').then(response => {
            response.data.db_images.forEach(db_image => {
                prePopulatedImages.push({ url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-images/" + db_image.image});
            });
            this.setState({
                images: prePopulatedImages
            })
        }).catch(err => {
            if (err.response) {
                console.log(err.response);
              // client received an error response (5xx, 4xx)
            } else if (err.request) {
                console.log(err.request);
              // client never received a response, or request never left
            } else {
              // anything else
            }
        })
    }

    nextImage = () => {
        this.setState({
            image: this.state.image + 1
        })
    }

    previousImage = () => {
        this.setState({
            image: this.state.image - 1
        })
    }

    keyDownHandler = (event) => {
        if(event.key === "ArrowRight"){
            if(this.state.image !== (this.state.images.length - 1)) {
                this.nextImage();
            }
        }
        if(event.key === "ArrowLeft"){
            if(this.state.image !== 0) {
                this.previousImage();
            }
        }
    }

    render(){
        
        let imageSlideShow = "";

        if(this.state.images.length > 0) {
            imageSlideShow = <img src={this.state.images[this.state.image].url} alt="" className={classes.landingPageImage}/>;
        }

        window.addEventListener("keydown", this.keyDownHandler);

        let leftArrow = <BiLeftArrow onClick={this.previousImage} className={classes.imageNav} />;
        let rightArrow = <BiRightArrow onClick={this.nextImage} className={classes.imageNav} />;

        if(this.state.image === (this.state.images.length - 1)) {
            rightArrow = <BiRightArrow className={classes.notSelectable} />;
        }

        if(this.state.image === 0) {
            leftArrow = <BiLeftArrow className={classes.notSelectable} />;
        }

        return(
            <Aux>
                <Latest message="Specializing in only the best training" />
                <div className={classes.LandingPage}>
                    {leftArrow}
                    <div className={classes.imageContainer}>
                        {imageSlideShow}
                    </div>
                    {rightArrow}
                </div>
            </Aux>
        )
    }
}

export default LandingPage