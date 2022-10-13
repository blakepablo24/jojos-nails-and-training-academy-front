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
import ErrorPopup from '../../../components/Ui/ErrorPopup/ErrorPopup';
import FUNCTIONS from '../../../functions/functions';

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
        loading: "",
        showErrorPopup: false,
        errorMessage: ""
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
            && !FUNCTIONS.checkAllowedDurationInput(this.state.duration, CONST.durationUp)
            && !FUNCTIONS.checkAllowedTextInput(this.state.description, false)
            && !this.state.imageError){
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
            }).catch(error => {
                if (error) {
                    this.setState({
                        loading: "",
                        showErrorPopup: true,
                        errorMessage: error.response.data.errors[Object.keys(error.response.data.errors)]
                    })
    
                }
              })
        } else {
            this.setState({
                categoryError: FUNCTIONS.checkAllowedSelectInput(this.state.category, CONST.category),
                titleError: FUNCTIONS.checkAllowedTextInput(this.state.title, CONST.titleUp),
                priceError: FUNCTIONS.checkAllowedPriceInput(this.state.price),
                durationError: FUNCTIONS.checkAllowedDurationInput(this.state.duration, CONST.durationUp),
                descriptionError: FUNCTIONS.checkAllowedTextInput(this.state.description, false)
            })
        }
    }

    errorPopupHandler = () => {
        this.setState({
            showErrorPopup: !this.state.showErrorPopup
        })
    }

    render(){

        let errorPopup = "";

        if(this.state.showErrorPopup){
            errorPopup = <ErrorPopup shownErrorToggle={this.errorPopupHandler} message={"Error: " + this.state.errorMessage}/>;
        }

        return(
            <Aux>
                <Latest message={"New Salon Treatment"} />
                {this.state.loading}
                {errorPopup}
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