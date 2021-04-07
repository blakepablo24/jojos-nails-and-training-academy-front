import React, { Component } from 'react';
import classes from './NewTrainingCourse.module.css';
import ImageUpload from '../../../components/Ui/ImageUpload/ImageUpload';
import CONST from '../../../constants/constants';
import { Redirect } from 'react-router';
import axios from 'axios';
import GoBack from '../../../components/Ui/GoBack/GoBack';

class NewTrainingCourse extends Component {

    state = {
        title: "",
        teacherStudentRatio: "",
        price: "",
        extras: "",
        duration: "",
        imageFile: "",
        redirectOnSuccess: "",
        titleError: "",
        imageError: "",
        priceError: "",
        durationError: "",
        teacherStudentRatioError: "",
        extrasError: "",
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

        let titleError = "";
        let priceError = "";
        let durationError =  "";
        let teacherStudentRatioError = "";
        let extrasError = "";
        
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

        if(this.state.duration === "select" || this.state.duration === ""){
            durationError = <h4 className="error">Please choose a Duration!</h4>;
        }

        if(this.state.teacherStudentRatio === "select" || this.state.teacherStudentRatio === ""){
            teacherStudentRatioError = <h4 className="error">Please choose a Ratio!</h4>;
        }

        if (/[^a-zA-Z0-9 -,?!']/.test(this.state.extras)) {
            extrasError = <h4 className="error">Please enter only letters and numbers</h4>;
        }

        if(!durationError && !titleError && !teacherStudentRatioError && !priceError && !extrasError){
            let fd = new FormData();
            fd.append('title', this.state.title);
            fd.append('price', this.state.price);
            fd.append('duration', this.state.duration);
            fd.append('teacher_student_ratio', this.state.teacherStudentRatio);
            fd.append('extras', this.state.extras);

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
            }).catch(err => {
                if (err.response) {
                    this.setState({
                        imageError: <h4 className="error">{err.response.data.errors.newImage}</h4>
                    })
                }
            })
        } else {
            this.setState({
                titleError: titleError,
                priceError: priceError,
                teacherStudentRatioError: teacherStudentRatioError,
                extrasError: extrasError,
                durationError: durationError
            })
        }
    }

    render(){

        return(
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
                <textarea
                    type="text"
                    name="extras"
                    autoComplete="off"
                    value={this.state.extras}
                    onChange={this.changeHandler}
                    placeholder="Any Extra information here"
                />
                {this.state.extrasError}
                <button className="main-button" onClick={this.finishHandler}>Finish</button>
            </div>
        )
    }
}

export default NewTrainingCourse