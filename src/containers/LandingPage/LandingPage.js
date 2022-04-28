import React, { Component } from 'react';
import classes from './LandingPage.module.css';
import CONST from '../../constants/constants';
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import Latest from '../../components/Ui/Navigation/Latest/Latest';
import Aux from '../../hoc/Auxilary/Auxilary';
import axios from 'axios';
import Reviews from '../../components/Ui/Reviews/Reviews';
import Loading from '../../components/Ui/Loading/Loading';

class LandingPage extends Component {
    
    state = {
        images: [],
        largeImages: [],
        smallImages: [],
        image: 0,
        landscape: false,
        loading: <Loading component={true} />
    }

    componentDidMount(){
        let prePopulatedImages = [];
        let largePrePopulatedImages = [];
        axios.get(CONST.BASE_URL + '/api/get-front-page-images').then(response => {
            response.data.fPImages.forEach(db_image => {
                prePopulatedImages.push({ url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-images/" + db_image});
            })
            response.data.largeFPImages.forEach(large_db_image => {
                largePrePopulatedImages.push({ url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-images/" + large_db_image});
            });

            this.setState({
                loading: "",
                largeImages: largePrePopulatedImages,
                smallImages: prePopulatedImages,
            })

            this.displayedImagesHandler();
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

    displayedImagesHandler = () => {
        if(!this.state.landscape){
            if(window.innerWidth > window.innerHeight){
                this.setState({
                    images: this.state.largeImages,
                    landscape: true,
                    image: 0
                })
            } else {
                this.setState({
                    images: this.state.smallImages,
                    landscape: false,
                    image: 0
                })
            }
        } else {
            if(window.innerWidth < window.innerHeight){
                this.setState({
                    images: this.state.smallImages,
                    landscape: false,
                    image: 0
                })
            } else {
                this.setState({
                    images: this.state.largeImages,
                    landscape: true,
                    image: 0
                })
            }
        }
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
              
        window.addEventListener('resize', this.displayedImagesHandler)
        
        let imageSlideShow = "";
        let leftArrow = "";
        let rightArrow = "";

        if(this.state.images.length > 0) {
            imageSlideShow = <img src={this.state.images[this.state.image].url} alt="" className={classes.landingPageImage}/>;
            leftArrow = <div className={classes.imageNav + " selectable " + classes.prev} onClick={this.previousImage} ><BiLeftArrow /></div>;
            rightArrow = <div className={classes.imageNav + " selectable " + classes.next} onClick={this.nextImage} ><BiRightArrow /></div>;
        }

        window.addEventListener("keydown", this.keyDownHandler);

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
                    <div className={classes.imageContainer}>
                        {this.state.loading}
                        {leftArrow}
                            {imageSlideShow}
                        {rightArrow}
                    </div>
                    <Reviews />
                </div>
            </Aux>
        )
    }
}

export default LandingPage