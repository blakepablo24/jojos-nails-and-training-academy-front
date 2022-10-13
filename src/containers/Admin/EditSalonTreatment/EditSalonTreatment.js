import React, { Component } from 'react';
import classes from './EditSalonTreatment.module.css';
import ImageUpload from '../../../components/Ui/ImageUpload/ImageUpload';
import axios from 'axios';
import CONST from '../../../constants/constants';
import { Redirect } from 'react-router';
import GoBack from '../../../components/Ui/GoBack/GoBack';
import { BiXCircle } from "react-icons/bi";
import ConfirmDelete from '../../../components/Ui/ConfirmDelete/ConfirmDelete';
import FlashMessage from 'react-flash-message';
import Loading from '../../../components/Ui/Loading/Loading';
import Aux from '../../../hoc/Auxilary/Auxilary';
import ErrorPopup from '../../../components/Ui/ErrorPopup/ErrorPopup';
import Latest from '../../../components/Ui/Navigation/Latest/Latest';
import FUNCTIONS from '../../../functions/functions';

class EditSalonTreatment extends Component {

    state = {
        title: "",
        price: "",
        duration: "",
        description: "",
        categories: [],
        image: "",
        imageFile: "",
        redirectOnSuccess: "",
        category: "",
        categoryId: "",
        categoryError: "",
        titleError: "",
        imageError: "",
        priceError: "",
        durationError: "",
        descriptionError: "",
        confirmDelete: "",
        open: false,
        imageChangedMessage: "",
        loading: "",
        showErrorPopup: false,
        errorMessage: ""
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + '/api/get-salon-treatment-to-edit/' + this.props.match.params.id).then(response => {
            this.setState({
                categories: response.data.categories.original.categories,
                title: response.data.salonTreatment.title,
                price: response.data.salonTreatment.price,
                duration: response.data.salonTreatment.duration,
                description: response.data.salonTreatment.description,
                category: response.data.salonTreatment.category,
                image: response.data.salonTreatment.image
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
            loading: <Loading />
        })
        axios.delete(CONST.BASE_URL + '/api/delete-salon-treatment-image/' + this.props.match.params.id).then(response => {
            axios.defaults.withCredentials = true;
            axios.get(CONST.BASE_URL + '/api/get-salon-treatment-to-edit/' + this.props.match.params.id).then(response => {
            this.setState({
                confirmDelete: "",
                open: false,
                categories: response.data.categories.original.categories,
                title: response.data.salonTreatment.title,
                price: response.data.salonTreatment.price,
                duration: response.data.salonTreatment.duration,
                description: response.data.salonTreatment.description,
                category: response.data.salonTreatment.category,
                image: response.data.salonTreatment.image,
                imageChangedMessage: "Image Successfully Deleted",
                loading: "",
                errorScreen: ""
            })
        })
        })
    }

    changeHandler = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
            [name + "Error"]: ""
        });
    }

    getData = (val, imageError) => {
        this.setState({
            imageFile: val,
            imageError: imageError
        })
    }

    finishHandler = (event) => {
        event.preventDefault();

        if(!FUNCTIONS.checkAllowedSelectInput(this.state.category, CONST.category)
            && !FUNCTIONS.checkAllowedTextInput(this.state.title, CONST.titleUp) 
            && !FUNCTIONS.checkAllowedPriceInput(this.state.price)  
            && !FUNCTIONS.checkAllowedDurationInput(this.state.duration, CONST.Duration)
            && !FUNCTIONS.checkAllowedTextInput(this.state.description, false)
            && !this.state.imageError){
            this.setState({
                loading: <Loading />
            })
            let fd = new FormData();
            fd.append('id', this.props.match.params.id);
            fd.append('category', this.state.category);
            fd.append('title', this.state.title);
            fd.append('price', this.state.price);
            fd.append('duration', this.state.duration);
            fd.append('description', this.state.description);

            if(this.state.imageFile){
                fd.append('newImage', this.state.imageFile, this.state.imageFile.name);
            }
            axios.defaults.withCredentials = true;
            axios.post(CONST.BASE_URL + '/api/update-salon-treatment', fd).then(response => {
                this.setState({
                    redirectOnSuccess: <Redirect to={{
                        pathname: '/treatment/' + response.data.salonTreatment.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/' + response.data.salonTreatment.id,
                        state: { fromRedirect: "Salon Treatment Successfully Updated" }
                        }}                  
                    />
                })
            }).catch(error => {
                if (error.response) {
                    this.setState({
                        loading: "",
                        imageError: <h4 className="error">{error.response.data.errors.newImage}</h4>,
                        showErrorPopup: true,
                        errorMessage: error.response.data.errors[Object.keys(error.response.data.errors)]
                    })
                } else if (error.request) {
                    this.setState({
                        loading: "",
                        showErrorPopup: true
                    })
                } else {
                    this.setState({
                        loading: "",
                        showErrorPopup: true
                    })
                }
              })
        } else {
            this.setState({
                categoryError: FUNCTIONS.checkAllowedSelectInput(this.state.category, "category"),
                titleError: FUNCTIONS.checkAllowedTextInput(this.state.title, "Title"),
                priceError: FUNCTIONS.checkAllowedPriceInput(this.state.price),
                durationError: FUNCTIONS.checkAllowedDurationInput(this.state.duration),
                descriptionError: FUNCTIONS.checkAllowedTextInput(this.state.description, "Description")
            })
        }
    }

    errorPopupHandler = () => {
        this.setState({
            showErrorPopup: !this.state.showErrorPopup
        })
    }

    render(){

        let currentImage = 
            <div className={classes.noImageContainer}>
                <ImageUpload wording="Add Image?" sendData={this.getData} />
            </div>

        if(this.state.image){
            currentImage = 
                <div className={classes.currentImageContainer}>
                    <BiXCircle className={"delete selectable " + classes.deleteImageButton}
                        onClick={this.confirmDeleteHandler}
                    />
                    <img src={CONST.BASE_URL + "/storage/images/salon-treatment-images/single-salon-treatment-images/" + this.state.image} alt="" className={classes.currentImage} />
                    <ImageUpload wording="Update Image?" sendData={this.getData} />
                </div>
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

        let errorPopup = "";

        if(this.state.showErrorPopup){
            errorPopup = <ErrorPopup shownErrorToggle={this.errorPopupHandler} message={"Error: " + this.state.errorMessage}/>;
        }
        
        return(
            <Aux>
                <Latest message="Edit This Salon Treatment"/>
                {this.state.loading}
                {this.state.confirmDelete}
                {errorPopup}
                <div className={classes.EditSalonTreatment}>
                    {this.state.redirectOnSuccess}
                    <GoBack back={() => this.props.history.goBack()} />
                    <select
                        name="category"
                        value={this.state.category}
                        onChange={this.changeHandler}
                    >
                        <option value="select">Select Category</option>
                        {this.state.categories.map(category =>
                            <option key={category.id} name={category.title} value={category.id}>{category.title}</option>
                        )}
                    </select>
                    {this.state.categoryError}
                    <input
                        type="text"
                        name="title"
                        autoComplete="off"
                        value={this.state.title}
                        onChange={this.changeHandler}
                        placeholder="Title"
                    />
                    {this.state.titleError}
                    {imageChangedMessage}
                    {currentImage}
                    <input
                        type="number"
                        name="price"
                        autoComplete="off"
                        value={this.state.price}
                        onChange={this.changeHandler}
                        placeholder="Price"
                    />
                    {this.state.priceError}
                    <input
                        type="number"
                        name="duration"
                        autoComplete="off"
                        value={this.state.duration}
                        onChange={this.changeHandler}
                        placeholder="Duration in minutes"
                    />
                    {this.state.durationError}
                    <textarea
                        type="text"
                        name="description"
                        autoComplete="off"
                        value={this.state.description}
                        onChange={this.changeHandler}
                        placeholder="Description"
                    />
                    {this.state.descriptionError}
                    <button className="customButton" onClick={this.finishHandler}>Finish</button>
                </div>
            </Aux>
        )
    }
}

export default EditSalonTreatment