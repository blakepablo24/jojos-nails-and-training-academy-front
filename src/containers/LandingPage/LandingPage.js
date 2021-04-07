import React, { Component } from 'react';
import classes from './LandingPage.module.css';
import CONST from '../../constants/constants';
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import Aux from '../../hoc/Auxilary/Auxilary';

const images = [
    { url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-slideshow/Studio01.jpg" },
    { url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-slideshow/Studio02.jpg" },
    { url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-slideshow/Studio03.jpg" },
    { url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-slideshow/Studio04.jpg" },
    { url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-slideshow/Studio05.jpg" },
  ];

class LandingPage extends Component {
    
    state = {
        image: 0
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
            if(this.state.image !== (images.length - 1)) {
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
        
        window.addEventListener("keydown", this.keyDownHandler);

        let leftArrow = <BiLeftArrow onClick={this.previousImage} className={classes.imageNav} />;
        let rightArrow = <BiRightArrow onClick={this.nextImage} className={classes.imageNav} />;

        if(this.state.image === (images.length - 1)) {
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
                        <img src={images[this.state.image].url} alt="" className={classes.landingPageImage}/>
                    </div>
                    {rightArrow}
                </div>
            </Aux>
        )
    }
}

export default LandingPage