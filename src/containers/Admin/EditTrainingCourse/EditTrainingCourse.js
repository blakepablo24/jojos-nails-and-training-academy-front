import React, { Component } from 'react';
import classes from './EditTrainingCourse.module.css';
import ImageUpload from '../../../components/Ui/ImageUpload/ImageUpload';
import axios from 'axios';
import CONST from '../../../constants/constants';
import { Redirect } from 'react-router';
import GoBack from '../../../components/Ui/GoBack/GoBack';
import { BiXCircle } from "react-icons/bi";
import ConfirmDelete from '../../../components/Ui/ConfirmDelete/ConfirmDelete';
import FlashMessage from 'react-flash-message';

class EditTrainingCourse extends Component {

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
        image: "",
        confirmDelete: "",
        open: false,
        imageChangedMessage: ""
    }

    componentDidMount(){
        axios.defaults.withCredentials = true;
        axios.get(CONST.BASE_URL + '/api/get-training-course-to-edit/' + this.props.match.params.id).then(response => {
            this.setState({
                title: response.data.trainingCourse.title,
                price: response.data.trainingCourse.price,
                duration: response.data.trainingCourse.duration,
                teacherStudentRatio: response.data.trainingCourse.teacher_student_ratio,
                image: response.data.trainingCourse.image,
                extras: response.data.trainingCourse.extras
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
        axios.delete(CONST.BASE_URL + '/api/delete-training-course-image/' + this.props.match.params.id).then(response => {
                axios.defaults.withCredentials = true;
                axios.get(CONST.BASE_URL + '/api/get-training-course-to-edit/' + this.props.match.params.id).then(response => {
                this.setState({
                    confirmDelete: "",
                    open: false,
                    title: response.data.trainingCourse.title,
                    price: response.data.trainingCourse.price,
                    duration: response.data.trainingCourse.duration,
                    teacherStudentRatio: response.data.trainingCourse.teacher_student_ratio,
                    image: response.data.trainingCourse.image,
                    extras: response.data.trainingCourse.extras,
                    imageChangedMessage: "Image Successfully Deleted"
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

        if (/[^a-zA-Z0-9-,?!'. ]/.test(this.state.extras)) {
            extrasError = <h4 className="error">Please enter only letters and numbers</h4>;
        }

        if(!durationError && !titleError && !teacherStudentRatioError && !priceError && !extrasError){
            let fd = new FormData();
            fd.append('id', this.props.match.params.id);
            fd.append('title', this.state.title);
            fd.append('price', this.state.price);
            fd.append('duration', this.state.duration);
            fd.append('teacher_student_ratio', this.state.teacherStudentRatio);
            fd.append('extras', this.state.extras);

            if(this.state.imageFile){
                fd.append('newImage', this.state.imageFile, this.state.imageFile.name);
            }
            axios.defaults.withCredentials = true;
            axios.post(CONST.BASE_URL + '/api/update-training-course', fd).then(response => {
                this.setState({
                    redirectOnSuccess: <Redirect to={{
                        pathname: '/single-training-course/' + response.data.trainingCourse.id,
                        state: { fromRedirect: "Training Course Successfully Updated" }
                        }}                  
                    />
                })
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

        let currentImage = 
            <div className={classes.noImageContainer}>
                <ImageUpload wording="Add Image?" sendData={this.getData} />
                {this.state.imageError}
            </div>

        if(this.state.image){
            currentImage = 
                <div className={classes.currentImageContainer}>
                    <BiXCircle className={"delete " + classes.deleteImageButton}
                        onClick={this.confirmDeleteHandler}
                    />
                    <img src={CONST.BASE_URL + "/storage/images/training-course-images/" + this.state.image} alt="" className={classes.currentImage} />
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

        return(
            <div className={classes.EditTrainingCourse}>
                {this.state.redirectOnSuccess}
                {this.state.confirmDelete}
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
                    <option value="One-to-One">One-to-One</option>
                    <option value="upto One-to-Two">Upto-One-to-Two</option>
                    <option value="upto One-to-Three">Upto-One-to-Three</option>
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
                <button className="customButton" onClick={this.finishHandler}>Finish</button>
            </div>
        )
    }
}

export default EditTrainingCourse