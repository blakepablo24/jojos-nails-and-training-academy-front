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
        showErrorPopup: false
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

    getData = (val) => {
        this.setState({
            imageFile: val
        })
    }

    finishHandler = (event) => {
        event.preventDefault();

        let categoryError = "";
        let titleError = "";
        let imageError = "";
        let priceError = "";
        let durationError = "";
        let descriptionError = "";
        
        if(this.state.category === "select" || this.state.category === ""){
            categoryError = <h4 className="error">Please choose a category!</h4>;
        }

        if(this.state.title === ""){
            titleError = <h4 className="error">Title cannot be empty</h4>;
        } else if(this.state.title.length < 5){
            titleError = <h4 className="error">Title must be longer 5 characters</h4>;
        }

        if (/[^a-zA-Z0-9 -,?!']/.test(this.state.title)) {
            titleError = <h4 className="error">Please enter only letters and numbers</h4>;
        }

        if(this.state.price === ""){
            priceError = <h4 className="error">Price cannot be empty</h4>;
        }

        if (/[^0-9.]/.test(this.state.price)) {
            priceError = <h4 className="error">Please enter only numbers and decimal point</h4>;
        }

        if(this.state.duration === ""){
            durationError = <h4 className="error">Duration cannot be empty</h4>;
        }

        if (/[^0-9]/.test(this.state.duration)) {
            durationError = <h4 className="error">Please enter only numbers</h4>;
        }

        if(this.state.description === ""){
            descriptionError = <h4 className="error">Title cannot be empty</h4>;
        } else if(this.state.description.length < 5){
            descriptionError = <h4 className="error">Title must be longer 5 characters</h4>;
        }

        if (/[^a-zA-Z0-9 -,?!.']/.test(this.state.description)) {
            descriptionError = <h4 className="error">Please enter only letters and numbers</h4>;
        }

        if(!categoryError && !titleError && !imageError && !priceError && !durationError && !descriptionError){
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
                this.setState({
                    loading: "",
                    showErrorPopup: true
                })
              })
        } else {
            this.setState({
                categoryError: categoryError,
                titleError: titleError,
                priceError: priceError,
                durationError: durationError,
                descriptionError: descriptionError
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
                {this.state.imageError}
            </div>

        if(this.state.image){
            currentImage = 
                <div className={classes.currentImageContainer}>
                    <BiXCircle className={"delete selectable " + classes.deleteImageButton}
                        onClick={this.confirmDeleteHandler}
                    />
                    <img src={CONST.BASE_URL + "/storage/images/salon-treatment-images/single-salon-treatment-images/" + this.state.image} alt="" className={classes.currentImage} />
                    <ImageUpload wording="Update Image?" sendData={this.getData} />
                    {this.state.imageError}
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
            errorPopup = <ErrorPopup shownErrorToggle={this.errorPopupHandler} message={"Edit Salon Treatment " + this.props.match.params.id}/>;
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