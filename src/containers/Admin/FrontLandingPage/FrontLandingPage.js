import React, { Component } from 'react';
import classes from './FrontLandingPage.module.css';
import CONST from '../../../constants/constants';
import axios from 'axios';
import { BiXCircle, BiRightArrow, BiLeftArrow } from "react-icons/bi";
import ImageUpload from '../../../components/Ui/ImageUpload/ImageUpload';
import ConfirmDelete from '../../../components/Ui/ConfirmDelete/ConfirmDelete';
import FlashMessage from 'react-flash-message';
import Loading from '../../../components/Ui/Loading/Loading';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Latest from '../../../components/Ui/Navigation/Latest/Latest';
import GoBack from '../../../components/Ui/GoBack/GoBack';

class FrontLandingPage extends Component {
    
    state = {
        images: [],
        image: 0,
        imageFile: "",
        confirmDelete: "",
        open: false,
        imageChangedMessage: "",
        addedImage: false,
        loading: "",
        imageError: ""
    }

    componentDidMount(){
        let prePopulatedImages = [];
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + '/api/get-all-front-page-images').then(response => {
            response.data.all_db_images.forEach(db_image => {
                prePopulatedImages.push({ id: db_image.id, url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-images/" + db_image.image});
            });
            this.setState({
                images: prePopulatedImages
            })
        })
    }

    removeConfirmDeleteHandler = () => {
        this.setState({
            confirmDelete: "",
            open: false
        })
    }

    confirmDeleteHandler = () => {
        this.setState({
            open: true,
            confirmDelete: <ConfirmDelete delete={this.deleteImageHandler} clicked={this.removeConfirmDeleteHandler} />
        })
    }

    deleteImageHandler = () => {
        this.setState({
            confirmDelete: "",
            loading: <Loading />
        })
        axios.defaults.withCredentials = true;
        axios.delete(CONST.BASE_URL + '/api/delete-front-page-image/' + this.state.images[this.state.image].id).then(response => {
            let prePopulatedImages = [];
            axios.defaults.withCredentials = true;
            axios.get(CONST.BASE_URL + '/api/get-all-front-page-images').then(response => {
                response.data.all_db_images.forEach(db_image => {
                    prePopulatedImages.push({ id: db_image.id, url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-images/" + db_image.image});
                });
                this.setState({
                    loading: "",
                    images: prePopulatedImages,
                    open: false,
                    imageChangedMessage: "Image Successfully Deleted",
                    imageFile: "",
                    image: prePopulatedImages.length - 1
                })
            })
        })
    }

    addImageHandler = (event) => {
        if(!this.state.imageError) {
            event.preventDefault();
            this.setState({
                loading: <Loading />
            })
            let fd = new FormData();    
            fd.append('newImage', this.state.imageFile, this.state.imageFile.name);
            axios.defaults.withCredentials = true;
            axios.post(CONST.BASE_URL + '/api/add-new-front-page-image', fd).then(response => {
                let prePopulatedImages = [];
                axios.defaults.withCredentials = true;
                axios.get(CONST.BASE_URL + '/api/get-all-front-page-images').then(response => {
                    response.data.all_db_images.forEach(db_image => {
                        prePopulatedImages.push({ id: db_image.id, url: CONST.BASE_URL + "/storage/images/front-page-images/landing-page-images/" + db_image.image});
                    });
                    this.setState({
                        loading: "",
                        images: prePopulatedImages,
                        confirmDelete: "",
                        open: false,
                        imageFile: "",
                        imageChangedMessage: "Image Successfully Added",
                        image: prePopulatedImages.length - 1,
                        addedImage: false
                    })
                })
            })
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

    getData = (val, imageError) => {
        this.setState({
            imageFile: val,
            imageError: imageError,
            addedImage: true
        })
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

    let imageChangedMessage = "";

        if(this.state.imageChangedMessage){
            imageChangedMessage = 
                <FlashMessage duration={5000}>
                    <div className="load-msg">
                    <h3 className="success">{this.state.imageChangedMessage}</h3>
                    </div>
                </FlashMessage>
        }

    let finishAddingImageButton = "";

    if(this.state.imageFile && !this.state.imageError){
        finishAddingImageButton = <button className="customButton" onClick={this.addImageHandler}>Finish</button>
    }

    return(
        <Aux>
            {this.state.loading}
            {this.state.confirmDelete}
            <Latest message={"Front Page Images"} />
            <div className={classes.FrontLandingPage}>
            <GoBack back={() => this.props.history.goBack()} />
                {imageChangedMessage}
                <div className="image-details-container">
                    <h2>{this.state.image + 1} of {this.state.images.length}</h2>
                    <BiXCircle className={"delete selectable " + classes.deleteImageButton} onClick={this.confirmDeleteHandler} />
                </div>
                <div className={classes.imageAndControlsContainer}>
                    {leftArrow}
                    <div className={classes.imageContainer}>
                        {imageSlideShow}
                    </div>
                    {rightArrow}
                </div>
                <ImageUpload wording="Add Image?" sendData={this.getData} flushData={this.state.addedImage}/>
                {finishAddingImageButton}           
            </div>
        </Aux>
    )
}
}

export default FrontLandingPage