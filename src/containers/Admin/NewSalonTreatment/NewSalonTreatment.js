import React, { Component } from 'react';
import classes from './NewSalonTreatment.module.css';
import ImageUpload from '../../../components/Ui/ImageUpload/ImageUpload';
import axios from 'axios';
import CONST from '../../../constants/constants';
import { Redirect } from 'react-router';
import GoBack from '../../../components/Ui/GoBack/GoBack';
import Loading from '../../../components/Ui/Loading/Loading';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Latest from '../../../components/Ui/Navigation/Latest/Latest';

class NewSalonTreatment extends Component {

    state = {
        title: "",
        price: "",
        duration: "",
        description: "",
        categories: [],
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
        loading: ""
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + '/api/get-salon-treatment-categories/').then(response => {
            this.setState({
                categories: response.data.categories
            })
        });
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

        if (/[^a-zA-Z0-9 -,?!']/.test(this.state.description)) {
            descriptionError = <h4 className="error">Please enter only letters and numbers</h4>;
        }

        if(!categoryError && !titleError && !imageError && !priceError && !durationError && !descriptionError){
            this.setState({
                loading: <Loading />
            })
            let fd = new FormData();
            fd.append('category', this.state.category);
            fd.append('title', this.state.title);
            fd.append('price', this.state.price);
            fd.append('duration', this.state.duration);
            fd.append('description', this.state.description);

            if(this.state.imageFile){
                fd.append('newImage', this.state.imageFile, this.state.imageFile.name);
            }
            axios.defaults.withCredentials = true;
            axios.post(CONST.BASE_URL + '/api/new-salon-treatment', fd).then(response => {
                this.setState({
                    redirectOnSuccess: <Redirect to={{
                        pathname: '/treatment/' + response.data.newSalonTreatment.title.replace(/\s+/g, '-').replace(/,/g,"").toLowerCase() + '/' + response.data.newSalonTreatment.id,
                        state: { fromRedirect: "New Salon Treatment Successfully Created" }
                        }}                  
                    />
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

    render(){

        return(
            <Aux>
                <Latest message={"New Training Course"} />
                {this.state.loading}
                <div className={classes.NewSalonTreatment}>
                    
                    {this.state.redirectOnSuccess}
                    <GoBack back={() => this.props.history.goBack()} />
                    <h2>New Salon Treatment</h2>
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
                    <ImageUpload wording="Add Image?" sendData={this.getData} />
                    {this.state.imageError}
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

export default NewSalonTreatment