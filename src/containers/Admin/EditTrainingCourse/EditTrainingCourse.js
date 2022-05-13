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
import Loading from '../../../components/Ui/Loading/Loading';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Latest from '../../../components/Ui/Navigation/Latest/Latest';
import ErrorPopup from '../../../components/Ui/ErrorPopup/ErrorPopup';
import FUNCTIONS from '../../../functions/functions';

class EditTrainingCourse extends Component {

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
        image: "",
        confirmDelete: "",
        open: false,
        imageChangedMessage: "",
        loading: "",
        showErrorPopup: false
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
                extras: !response.data.trainingCourse.extras ? "" : response.data.trainingCourse.extras,
                prerequisites: !response.data.trainingCourse.prerequisites ? "" : response.data.trainingCourse.prerequisites
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
                    extras: !response.data.trainingCourse.extras ? "" : response.data.trainingCourse.extras,
                    prerequisites: !response.data.trainingCourse.prerequisites ? "" : response.data.trainingCourse.prerequisites,
                    imageChangedMessage: "Image Successfully Deleted",
                    loading: ""
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

        if(!FUNCTIONS.checkAllowedSelectInput(this.state.duration, CONST.duration)
            && !FUNCTIONS.checkAllowedTextInput(this.state.title, CONST.titleUp)  
            && !FUNCTIONS.checkAllowedSelectInput(this.state.teacherStudentRatio, CONST.ratio)
            && !FUNCTIONS.checkAllowedPriceInput(this.state.price)
            && !FUNCTIONS.checkAllowedTextInput(this.state.extras, false)
            && !FUNCTIONS.checkAllowedTextInput(this.state.prerequisites, false)){
            this.setState({
                loading: <Loading />
            })
            let fd = new FormData();
            fd.append('id', this.props.match.params.id);
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
            axios.post(CONST.BASE_URL + '/api/update-training-course', fd).then(response => {
                this.setState({
                    redirectOnSuccess: <Redirect to={{
                        pathname: '/single-training-course/' + response.data.trainingCourse.id,
                        state: { fromRedirect: "Training Course Successfully Updated" }
                        }}                  
                    />
                })
            }).catch(error => {
                    if (error.response) {
                        console.log(error.response);
                        this.setState({
                            showErrorPopup: <ErrorPopup shownErrorToggle={this.errorPopupHandler} message={"Edit Training Course " + this.props.match.params.id + " code: " + error.response.status + " " + error.response.data.errors[Object.keys(error.response.data.errors)[0]]}/>,
                            loading: ""
                        })
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                })
        } else {
            this.setState({
                titleError: FUNCTIONS.checkAllowedTextInput(this.state.title, CONST.titleUp),
                priceError: FUNCTIONS.checkAllowedPriceInput(this.state.price),
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

        let currentImage = 
            <div className={classes.noImageContainer}>
                <ImageUpload wording="Add Image?" sendData={this.getData} />
            </div>

        if(this.state.image){
            currentImage = 
                <div className={classes.currentImageContainer}>
                    <img src={CONST.BASE_URL + "/storage/images/training-course-images/" + this.state.image} alt="" className={classes.currentImage} />
                    <div className='image-details-container'>
                    <ImageUpload wording="Change?" sendData={this.getData} />
                        <BiXCircle className={"delete selectable " + classes.deleteImageButton}
                            onClick={this.confirmDeleteHandler}
                        />
                    </div>
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

        return(
            <Aux>
                <Latest message="Edit This Training Course" />
                {this.state.loading}
                {this.state.showErrorPopup}
                {this.state.confirmDelete}
                <div className={classes.EditTrainingCourse}>
                    {this.state.redirectOnSuccess}
                    <GoBack back={() => this.props.history.goBack()} />
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

export default EditTrainingCourse