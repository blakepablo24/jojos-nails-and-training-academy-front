import React, { Component } from 'react';
import classes from './NewTrainingCourse.module.css';
import ImageUpload from '../../../components/Ui/ImageUpload/ImageUpload';
import CONST from '../../../constants/constants';
import { Redirect } from 'react-router';
import axios from 'axios';
import GoBack from '../../../components/Ui/GoBack/GoBack';
import Loading from '../../../components/Ui/Loading/Loading';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Latest from '../../../components/Ui/Navigation/Latest/Latest';
import ErrorPopup from '../../../components/Ui/ErrorPopup/ErrorPopup';
import FUNCTIONS from '../../../functions/functions';

class NewTrainingCourse extends Component {

    state = {
        title: "",
        teacherStudentRatio: "",
        price: "",
        extras: "",
        prerequisites: "",
        duration: "",
        imageFile: "",
        redirectOnSuccess: "",
        titleError: "",
        imageError: "",
        priceError: "",
        durationError: "",
        teacherStudentRatioError: "",
        extrasError: "",
        prerequisitesError: "",
        loading: "",
        showErrorPopup: false,
        errorMessage: ""
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

        if(!FUNCTIONS.checkAllowedSelectInput(this.state.duration, CONST.duration) 
            && !FUNCTIONS.checkAllowedTextInput(this.state.title, CONST.titleUp) 
            && !FUNCTIONS.checkAllowedSelectInput(this.state.teacherStudentRatio, CONST.ratio)
            && !FUNCTIONS.checkAllowedPriceInput(this.state.price) 
            && !FUNCTIONS.checkAllowedTextInput(this.state.extras, false) 
            && !FUNCTIONS.checkAllowedTextInput(this.state.prerequisites, false) 
            && !this.state.imageError){
            this.setState({
                loading: <Loading />
            })
            let fd = new FormData();
            fd.append('title', this.state.title);
            fd.append('price', this.state.price);
            fd.append('duration', this.state.duration);
            fd.append('teacher_student_ratio', this.state.teacherStudentRatio);
            fd.append('extras', this.state.extras);
            fd.append('prerequisites', this.state.prerequisites);

            if(this.state.imageFile){
                fd.append('newImage', this.state.imageFile, this.state.imageFile.name);
            }
            
            axios.defaults.withCredentials = true;
            axios.post(CONST.BASE_URL + '/api/new-training-course', fd).then(response => {
                this.setState({
                    redirectOnSuccess: <Redirect to={{
                        pathname: '/single-training-course/' + response.data.newTrainingCourse.id,
                        state: { fromRedirect: "New Training Course Successfully Created" }
                        }}                  
                    />
                })
            })
            .catch(error => {
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
                titleError: FUNCTIONS.checkAllowedTextInput(this.state.title, CONST.titleUp),
                priceError: FUNCTIONS.checkAllowedTextInput(this.state.price),
                teacherStudentRatioError: FUNCTIONS.checkAllowedSelectInput(this.state.teacherStudentRatio, CONST.ratio),
                extrasError: FUNCTIONS.checkAllowedTextInput(this.state.extras, false),
                durationError: FUNCTIONS.checkAllowedSelectInput(this.state.duration, CONST.duration),
                prerequisitesError: FUNCTIONS.checkAllowedTextInput(this.state.prerequisites, false)
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
                <Latest message={"New Training Course"} />
                {this.state.loading}
                {errorPopup}
                <div className={classes.NewTrainingCourse}>
                    {this.state.redirectOnSuccess}
                    <GoBack back={() => this.props.history.goBack()} />
                    <h2>New Training Course</h2>
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
                    <select
                        name="duration"
                        value={this.state.duration}
                        onChange={this.changeHandler}
                    >
                        <option value="select">Select Duration</option>
                        <option value="Half Day">Half Day</option>
                        <option value="1 Day">1 Day</option>
                        <option value="2 Days">2 Days</option>
                        <option value="3 Days">3 Days</option>
                        <option value="4 Days">4 Days</option>
                        <option value="5 Days">5 Days</option>
                    </select>
                    {this.state.durationError}
                    <select
                        name="teacherStudentRatio"
                        value={this.state.teacherStudentRatio}
                        onChange={this.changeHandler}
                    >
                        <option value="select">Select Ratio</option>
                        <option value="one-to-one">One-to-One</option>
                        <option value="upto-One-to-Two">upto-One-to-Two</option>
                        <option value="upto-One-to-Three">upto-One-to-Three</option>
                    </select>
                    {this.state.teacherStudentRatioError}
                    <input
                        type="text"
                        name="prerequisites"
                        autoComplete="off"
                        value={this.state.prerequisites}
                        onChange={this.changeHandler}
                        placeholder="Prerequisites"
                    />
                    {this.state.prerequisitesError}
                    <textarea
                        type="text"
                        name="extras"
                        autoComplete="off"
                        value={this.state.extras}
                        onChange={this.changeHandler}
                        placeholder="Any Extra information here"
                    />
                    {this.state.extrasError}
                    <button className="customButton" onClick={this.finishHandler}>Finish</button>
                </div>
            </Aux>
        )
    }
}

export default NewTrainingCourse