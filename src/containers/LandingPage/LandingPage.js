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
        largeImages: [],
        image: 0
    }

    componentDidMount(){
        let prePopulatedImages = [];
        let largePrePopulatedImages = [];
        axios.get(CONST.BASE_URL + '/api/get-front-page-images').then(response => {
            response.data.db_images.forEach(db_image => {
                prePopulatedImages.push({ url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-images/" + db_image.image});
            });
            response.data.large_db_images.forEach(large_db_image => {
                largePrePopulatedImages.push({ url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-images/" + large_db_image.image});
            });

            if(window.innerWidth > window.innerHeight){
                this.setState({
                    images: largePrePopulatedImages
                })
            } else {
                this.setState({
                    images: prePopulatedImages,
                })
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
        // function handleResize() {
        //     if(window.innerWidth === 1024){
        //         console.log("large screen");
        //     }
        // }
              
        // window.addEventListener('resize', handleResize)
        
        let imageSlideShow = "";

        if(this.state.images.length > 0) {
            imageSlideShow = <img src={this.state.images[this.state.image].url} alt="" className={classes.landingPageImage}/>;
        }

        window.addEventListener("keydown", this.keyDownHandler);

        let leftArrow = <div className={classes.imageNav +" "+ classes.prev}><BiLeftArrow onClick={this.previousImage} /></div>;
        let rightArrow = <div className={classes.imageNav +" "+ classes.next}><BiRightArrow onClick={this.nextImage} /></div>;

        if(this.state.image === (this.state.images.length - 1)) {
            rightArrow = <div className={classes.notSelectable +" "+ classes.next}><BiRightArrow /></div>;
        }

        if(this.state.image === 0) {
            leftArrow = <div className={classes.notSelectable +" "+ classes.prev}><BiLeftArrow /></div>;
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